/* Configuration pm2 : fait tourner l'API en permanence et la relance
   automatiquement en cas de plantage ou de redémarrage du serveur.
   Démarrage : pm2 start deploy/ecosystem.config.cjs (voir le guide) */
module.exports = {
  apps: [
    {
      name: "cotedetente-api",
      // Le back écrit et lit les uploads dans "uploads/" : il doit tourner depuis back/
      cwd: "/var/www/cotedetente/back",
      script: "server.js",
      env: {
        NODE_ENV: "production"
      },
      max_memory_restart: "400M"
    }
  ]
}
