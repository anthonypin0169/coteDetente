import "./mentions.scss"

export default function Mentions() {
    return (
        <main className="mentions-page">
            <h1 className="mentions-page__title">Mentions légales</h1>

            <section className="mentions-page__section">
                <h2 className="mentions-page__section--title">Éditeur du site</h2>
                <p className="mentions-page__section--text">
                    Le site [nom-du-site.fr] est édité par [Nom de l'entreprise / Nom et prénom si entrepreneur individuel], [forme juridique, ex : EI / SARL / SAS], immatriculé sous le numéro SIRET [XXX XXX XXX XXXXX], dont le siège social est situé [adresse complète].
                </p>
                <p className="mentions-page__section--text">
                    Numéro de TVA intracommunautaire : [FR XX XXXXXXXXX] (si applicable).
                </p>
                <p className="mentions-page__section--text">
                    Téléphone : [numéro]<br/>
                    Email : [adresse email de contact]
                </p>
            </section>

            <section className="mentions-page__section">
                <h2 className="mentions-page__section--title">Directeur de la publication</h2>
                <p className="mentions-page__section--text">[Nom du directeur de publication / gérant]</p>
            </section>

            <section className="mentions-page__section">
                <h2 className="mentions-page__section--title">Hébergement</h2>
                <p className="mentions-page__section--text">
                    Le site est hébergé par [Nom de l'hébergeur], [adresse de l'hébergeur], [téléphone de l'hébergeur].
                </p>
            </section>

            <section className="mentions-page__section">
                <h2 className="mentions-page__section--title">Propriété intellectuelle</h2>
                <p className="mentions-page__section--text">
                    L'ensemble des contenus présents sur ce site (textes, images, logos, mise en page) est la propriété exclusive de [Nom de l'entreprise], sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.
                </p>
            </section>

            <section className="mentions-page__section">
                <h2 className="mentions-page__section--title">Données personnelles</h2>
                <p className="mentions-page__section--text">
                    Les informations recueillies via ce site font l'objet d'un traitement destiné à [finalité, ex : gestion des demandes de contact et des réservations]. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données, à exercer auprès de [email de contact].
                </p>
            </section>

            <section className="mentions-page__section">
                <h2 className="mentions-page__section--title">Contact</h2>
                <p className="mentions-page__section--text">
                    Pour toute question relative au site, vous pouvez nous contacter à l'adresse [email] ou au [téléphone].
                </p>
            </section>
        </main>
    )
}
