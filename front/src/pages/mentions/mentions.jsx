import "./mentions.scss"
import SeoHead from "@/component/seoHead/seoHead"

export default function Mentions() {
    return (
        <main className="mentions-page">
            <SeoHead title="Mentions légales" description="Mentions légales de l'institut Côté Détente." />
            <div className="container">
                <h1 className="mentions-page__title">Mentions légales</h1>

                <section className="mentions-page__section">
                    <h2 className="mentions-page__section--title">Éditeur du site</h2>
                    <p className="mentions-page__section--text">
                        Ce site est édité par Institut Côté Détente, Entreprise individuelle (EI), immatriculée sous le numéro SIRET 501 240 964 00020, dont le siège social est situé 261 rue Schutterwald, 01000 Saint-Denis-lès-Bourg.
                    </p>
                    <p className="mentions-page__section--text">
                        Téléphone : 04 74 24 61 14<br/>
                        Email : cotedetente.24@orange.fr
                    </p>
                </section>

                <section className="mentions-page__section">
                    <h2 className="mentions-page__section--title">Directeur de la publication</h2>
                    <p className="mentions-page__section--text">Sabine Pin</p>
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
                        L'ensemble des contenus présents sur ce site (textes, images, logos, mise en page) est la propriété exclusive de l'Institut Côté Détente, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.
                    </p>
                </section>

                <section className="mentions-page__section">
                    <h2 className="mentions-page__section--title">Données personnelles</h2>
                    <p className="mentions-page__section--text">
                        Les informations recueillies via ce site font l'objet d'un traitement destiné à la gestion des demandes de contact, des commandes de cartes cadeaux et des prises de rendez-vous. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données, à exercer auprès de cotedetente.24@orange.fr.
                    </p>
                </section>

                <section className="mentions-page__section">
                    <h2 className="mentions-page__section--title">Contact</h2>
                    <p className="mentions-page__section--text">
                        Pour toute question relative au site, vous pouvez nous contacter à l'adresse cotedetente.24@orange.fr ou au 04 74 24 61 14.
                    </p>
                </section>
            </div>
        </main>
    )
}
