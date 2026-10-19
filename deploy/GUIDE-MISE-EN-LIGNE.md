# Mise en ligne de Côté Détente

Procédure complète, du VPS vierge au site en ligne sur `www.institut-cote-detente.fr`.
Les commandes sont à copier une par une. Remplacer `IP_DU_VPS` par l'adresse reçue d'OVH.

Architecture : un seul serveur. **nginx** sert les pages du site (build Vite), les photos
(`/uploads`) et transmet `/api` à l'**API Node**, que **pm2** fait tourner en permanence.
La base de données reste sur **MongoDB Atlas**.

---

## 0. Avant de commencer

- [ ] VPS commandé, e-mail OVH reçu (adresse IP + identifiants)
- [ ] Clés Stripe du **mode réel** disponibles (compte Stripe activé)
- [ ] Mot de passe de l'adresse mail utilisée par le site
- [ ] Accès au compte MongoDB Atlas

## 1. Se connecter au serveur

Sur ton PC, ouvrir **PowerShell** :

```
ssh ubuntu@IP_DU_VPS
```

- Répondre `yes` à la question sur l'empreinte du serveur (première connexion seulement).
- Saisir le mot de passe reçu par e-mail (rien ne s'affiche pendant la saisie, c'est normal).
- Si le serveur demande de changer le mot de passe : le faire et le noter en lieu sûr.

Toutes les commandes suivantes se tapent **dans cette fenêtre**, sur le serveur.

## 2. Mettre à jour et installer les outils

```
sudo apt update && sudo apt upgrade -y
```

Pare-feu : n'ouvrir que la connexion SSH et le web (le port 5000 de l'API reste fermé) :

```
sudo ufw allow OpenSSH
sudo ufw allow "Nginx Full"
sudo ufw enable
```

> Le pare-feu "Nginx Full" n'existe qu'après l'installation de nginx : si la 2e commande
> échoue, faire d'abord l'étape suivante puis revenir ici.

Node.js 22 (même version qu'en développement), nginx, git, certbot (https) et pm2 :

```
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx git certbot python3-certbot-nginx
sudo npm install -g pm2
node -v
```

`node -v` doit afficher `v22.x.x`.

## 3. Récupérer le code

```
sudo mkdir -p /var/www/cotedetente
sudo chown ubuntu:ubuntu /var/www/cotedetente
git clone https://github.com/anthonypin0169/coteDetente.git /var/www/cotedetente
```

> Si le dépôt GitHub est **privé**, git demande un identifiant et un mot de passe :
> l'identifiant est ton nom GitHub, et le mot de passe un **jeton d'accès** à créer sur GitHub
> (Settings → Developer settings → Personal access tokens → droit "Contents : Read-only").

## 4. Copier les photos et vidéos du site

Les fichiers uploadés doivent correspondre exactement à la base de données : on copie le
dossier de ton PC. Dans une **deuxième fenêtre PowerShell, sur ton PC** :

```
scp -r C:\repo_pro\cotedetente\back\uploads ubuntu@IP_DU_VPS:/var/www/cotedetente/back/
```

## 5. Configurer le serveur (.env)

Retour sur la fenêtre du serveur :

```
cd /var/www/cotedetente/back
cp .env.example .env
nano .env
```

Remplir chaque valeur (voir les commentaires du fichier). Pour générer un nouveau `JWT_SECRET` :

```
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

`STRIPE_WEBHOOK_SECRET` se remplit à l'étape 12 : le laisser vide pour l'instant.
Enregistrer avec **Ctrl+O** puis **Entrée**, quitter avec **Ctrl+X**.

## 6. Autoriser le serveur dans MongoDB Atlas

Atlas refuse les connexions inconnues. Dans Atlas : **Network Access → Add IP Address**,
saisir `IP_DU_VPS`, valider.

## 7. Installer les dépendances et construire le site

```
cd /var/www/cotedetente
npm ci
npm run build
cd back
npm ci --omit=dev
```

Le build crée `front/dist` (les pages servies par nginx).

## 8. Démarrer l'API

```
cd /var/www/cotedetente
pm2 start deploy/ecosystem.config.cjs
pm2 logs cotedetente-api --lines 20
```

Les logs doivent indiquer la connexion à MongoDB et `Serveur démarré sur le port 5000`
(**Ctrl+C** pour quitter les logs, l'API continue de tourner). Puis, pour qu'elle redémarre
toute seule après un redémarrage du serveur :

```
pm2 save
pm2 startup
```

`pm2 startup` affiche une commande commençant par `sudo env PATH=...` : la copier et l'exécuter.

## 9. Configurer nginx

```
sudo cp /var/www/cotedetente/deploy/nginx-cotedetente.conf /etc/nginx/sites-available/cotedetente
sudo ln -s /etc/nginx/sites-available/cotedetente /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` doit répondre `syntax is ok` et `test is successful`. Sinon, ne pas recharger :
m'envoyer le message d'erreur.

nginx doit pouvoir lire les photos :

```
sudo chmod o+x /var/www /var/www/cotedetente /var/www/cotedetente/back
```

## 10. Tester AVANT de toucher au domaine

Le domaine pointe encore vers l'ancien hébergement. Pour voir le nouveau site, on fait croire
à **ton PC seulement** que le domaine est sur le VPS :

1. Ouvrir le Bloc-notes **en tant qu'administrateur** (clic droit → Exécuter en tant qu'administrateur).
2. Fichier → Ouvrir : `C:\Windows\System32\drivers\etc\hosts` (choisir "Tous les fichiers").
3. Ajouter à la fin :
   ```
   IP_DU_VPS www.institut-cote-detente.fr
   ```
4. Enregistrer, puis ouvrir **http://www.institut-cote-detente.fr** (bien en `http`, le https
   n'existe pas encore).

Vérifier : pages, photos, vidéos, connexion admin, une modification depuis une modale.

**Penser à retirer cette ligne du fichier hosts après le test.**

## 11. Bascule du domaine (OVH)

**a. Préparer la zone DNS d'OVH** (inactive tant que le domaine est confié à Wix).
OVH → Web Cloud → Noms de domaine → `institut-cote-detente.fr` → onglet **Zone DNS** :

| Ligne actuelle | Action |
|---|---|
| `A` (domaine seul) `213.186.33.5` | modifier → `IP_DU_VPS` |
| `A` `www` `213.186.33.5` | modifier → `IP_DU_VPS` |
| `TXT` `"1\|www.institut-cote-detente.fr"` | supprimer (ancienne redirection OVH) |
| `TXT` `www` `"3\|welcome"` et `"l\|fr"` | supprimer (page d'accueil par défaut d'OVH) |
| `MX` sur `www` | supprimer |
| Tout le reste (MX du domaine, SPF, mail, imap, smtp…) | ne pas toucher |

**b. Basculer** : onglet **Serveurs DNS** → **Modifier les serveurs DNS** → revenir aux
serveurs **OVH** (`dns109.ovh.net` et `ns109.ovh.net`) à la place de `ns12/ns13.wixdns.net`.

**c. Attendre la propagation** (de quelques minutes à 24 h). Vérifier depuis PowerShell
(après avoir retiré la ligne du fichier hosts) :

```
nslookup www.institut-cote-detente.fr
```

C'est bon quand la réponse affiche `IP_DU_VPS`.

## 12. Activer https et Stripe

**https** (une fois que `nslookup` répond la bonne IP), sur le serveur :

```
sudo certbot --nginx -d www.institut-cote-detente.fr -d institut-cote-detente.fr
```

Donner une adresse e-mail (alertes d'expiration), accepter les conditions. Le certificat se
renouvelle seul ; pour vérifier :

```
sudo certbot renew --dry-run
```

**Webhook Stripe** (valide les paiements des cartes cadeaux). Dans Stripe, en **mode réel** :
Développeurs → **Webhooks** → **Ajouter un endpoint** :
- URL : `https://www.institut-cote-detente.fr/api/stripe/webhook`
- Évènement : `checkout.session.completed`

Copier la **clé secrète de signature** (`whsec_...`), puis sur le serveur :

```
nano /var/www/cotedetente/back/.env
pm2 restart cotedetente-api
```

(coller la clé dans `STRIPE_WEBHOOK_SECRET`, enregistrer, quitter, redémarrer l'API).

## 13. Vérifications finales

- [ ] `https://www.institut-cote-detente.fr` s'affiche avec le cadenas
- [ ] `institut-cote-detente.fr` (sans www) redirige vers `https://www...`
- [ ] Les deux autres domaines redirigent vers le site
- [ ] Formulaire de contact → mail reçu
- [ ] Demande de RDV ménopause → mail reçu
- [ ] Carte cadeau : vrai paiement d'un petit montant → mails reçus, puis remboursement dans Stripe
- [ ] Connexion admin et upload d'une photo depuis une modale
- [ ] Publication Instagram d'un évènement (si utilisée)

## Plus tard : mettre à jour le site

Après avoir poussé des modifications sur GitHub :

```
cd /var/www/cotedetente
git pull
npm ci
npm run build
cd back && npm ci --omit=dev && cd ..
pm2 restart cotedetente-api
```

## En cas de problème

| Symptôme | Commande pour voir l'erreur |
|---|---|
| Le site ne s'affiche pas | `sudo nginx -t` puis `sudo tail -n 30 /var/log/nginx/error.log` |
| Pages OK mais données absentes / erreurs API | `pm2 logs cotedetente-api --lines 50` |
| L'API ne démarre pas (MongoDB) | vérifier l'IP du VPS dans Atlas → Network Access |
