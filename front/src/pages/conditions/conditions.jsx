import "./conditions.scss"
import SeoHead from "@/component/seoHead/seoHead"

export default function Conditions() {
    return (
        <main className="conditions-page">
            <SeoHead title="Conditions générales de vente" description="Conditions générales de vente de l'institut Côté Détente." />
            <div className="container">
                <h1 className="conditions-page__title">Conditions générales de vente</h1>

                <section className="conditions-page__section">
                    <h2 className="conditions-page__section--title">Article 1 — Objet</h2>
                    <p className="conditions-page__section--text">
                        Les présentes conditions générales de vente régissent les relations contractuelles entre [Nom de l'entreprise] et ses clients dans le cadre de la réservation de prestations de bien-être et de l'achat de cartes cadeaux via le site [nom-du-site.fr].
                    </p>
                </section>

                <section className="conditions-page__section">
                    <h2 className="conditions-page__section--title">Article 2 — Prestations proposées</h2>
                    <p className="conditions-page__section--text">
                        [Nom de l'entreprise] propose des prestations de [type de prestations, ex : soins du visage, épilation, maquillage, soins des mains et pieds...], dont le détail et les tarifs sont consultables sur le site.
                    </p>
                </section>

                <section className="conditions-page__section">
                    <h2 className="conditions-page__section--title">Article 3 — Tarifs</h2>
                    <p className="conditions-page__section--text">
                        Les prix sont indiqués en euros, toutes taxes comprises. [Nom de l'entreprise] se réserve le droit de modifier ses tarifs à tout moment, les prestations étant facturées sur la base des tarifs en vigueur au moment de la réservation.
                    </p>
                </section>

                <section className="conditions-page__section">
                    <h2 className="conditions-page__section--title">Article 4 — Réservation et paiement</h2>
                    <p className="conditions-page__section--text">
                        Les rendez-vous peuvent être pris [via le site / par téléphone / en institut]. Le paiement s'effectue [au moment de la prestation / en ligne au moment de la réservation, selon le moyen de paiement retenu].
                    </p>
                </section>

                <section className="conditions-page__section">
                    <h2 className="conditions-page__section--title">Article 5 — Annulation et report de rendez-vous</h2>
                    <p className="conditions-page__section--text">
                        Toute annulation ou report doit être signalé au moins [délai, ex : 24h] avant l'heure du rendez-vous. [Conditions en cas d'annulation tardive ou d'absence, ex : facturation partielle].
                    </p>
                </section>

                <section className="conditions-page__section">
                    <h2 className="conditions-page__section--title">Article 6 — Droit de rétractation</h2>
                    <p className="conditions-page__section--text">
                        Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux prestations de services exécutées à une date déterminée fixée à la demande expresse du client (rendez-vous en institut).
                    </p>
                </section>

                <section className="conditions-page__section">
                    <h2 className="conditions-page__section--title">Article 7 — Cartes cadeaux</h2>
                    <p className="conditions-page__section--text">
                        Les cartes cadeaux vendues sur le site ont une date limite d'utilisation de [durée, ex : 12 mois] à compter de leur date d'achat. Elles ne sont ni remboursables, ni échangeables contre des espèces. [Autres conditions d'usage].
                    </p>
                </section>

                <section className="conditions-page__section">
                    <h2 className="conditions-page__section--title">Article 8 — Responsabilité</h2>
                    <p className="conditions-page__section--text">
                        [Nom de l'entreprise] ne saurait être tenu responsable de l'inexécution du contrat en cas de force majeure.
                    </p>
                </section>

                <section className="conditions-page__section">
                    <h2 className="conditions-page__section--title">Article 9 — Données personnelles</h2>
                    <p className="conditions-page__section--text">
                        Voir la rubrique « Mentions légales » du site pour les modalités de traitement des données personnelles.
                    </p>
                </section>

                <section className="conditions-page__section">
                    <h2 className="conditions-page__section--title">Article 10 — Médiation de la consommation</h2>
                    <p className="conditions-page__section--text">
                        Conformément à l'article L616-1 du Code de la consommation, le client peut recourir gratuitement au service de médiation [nom du médiateur à désigner], [coordonnées du médiateur].
                    </p>
                </section>

                <section className="conditions-page__section">
                    <h2 className="conditions-page__section--title">Article 11 — Droit applicable et juridiction compétente</h2>
                    <p className="conditions-page__section--text">
                        Les présentes conditions générales de vente sont soumises au droit français. Tout litige relève de la compétence des tribunaux [ville/juridiction].
                    </p>
                </section>

                <section className="conditions-page__section">
                    <h2 className="conditions-page__section--title">Article 12 — Contact</h2>
                    <p className="conditions-page__section--text">
                        Pour toute réclamation : [email de contact] — [téléphone].
                    </p>
                </section>
            </div>
        </main>
    )
}
