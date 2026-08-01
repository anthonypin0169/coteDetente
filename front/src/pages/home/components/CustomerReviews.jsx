import Carrousel from "@/component/carrousel/carrousel"
import "./CustomerReviews.scss"

export default function CustomerReviews() {
    return (
        <section className="home__customers-review">
            <div className="home__customers-review--reviews">
                <h2>Nos avis clients</h2>
                <Carrousel mode={"manual"} reviews = {[
                    {name: "Fany D.",rating: 5, text: "Pas de mot pour dire combien c'était parfait. L'équipe au petit soin, le massage exactement ce qu'il me fallait, les produits avec une odeur de dingue et de super qualité. Merci à mes collègues (en or), ça fait partie des cadeaux dont je me souviendrais longtemps, et merci à l'équipe de côté détente."},
                    {name: "Aurélie B.",rating: 5, text: "Merci à sabine et à toute son équipe pour leurs professionnalismes et leurs suivis. Grâce à elles j’ai réussi à perdre une dizaine de kilos avant mon mariage avec un programme adapté, ps: merci aussi pour votre touche esthétique.. (beautés des mains avec gel, beauté des pieds avec semi permanent et soin du visage pour le jour J) Je recommande ++++++"},
                    {name: "Julie R.",rating: 5, text: "Institut très agréable, accueil toujours chaleureux. Les personnes sont disponibles, professionnelles, à l'écoute. Je recommande vivement leurs prestations."},
                    {name: "Michelle B.",rating: 5, text: "Je fréquente cet Institut depuis de nombreuses années pour différentes prestations : les filles sont sympas, sérieuses. Jamais déçue, je recommande cet établissement"},
                    {name: "Julie S.",rating: 5, text: "Une equipe aux petits soins. Discrètes, professionnelles et de bons conseils. Je recommande cet institut que ce soit pour l épilation, les soins ou les ongles"},
                    {name: "Isabelle M.",rating: 5, text: "Ça fait 12 ans que je viens chez Côté Détente. Service personnalisé, Toujours le sourire. C'est un plaisir de venir pour un résultat toujours impeccable"},
                    {name: "Murielle C.",rating: 5, text: "Je me suis vu offrir un soin du visage Decleor pour mon anniversaire; un moment de pure détente, l'esthéticienne très professionnelle, douce, à l'écoute de mes souhaits, des messages de relaxation délivrés durant le soin aidant au lâcher prise....Très bien!. Les produits utilisés très onctueux, des senteurs agréables. Le cadre agréable lui aussi et reposant. Une belle découverte."},
                    {name: "Charlène B.",rating: 5, text: "Encore un grand merci à l'institut. Une heure de massage, un pur moment de détente qui m'a fait énormément de bien. Merci à l'esthéticienne qui a été au petit soin et respectueuse des demandes. Je recommande !"},
                    {name: "Sarah A.",rating: 5, text: "Équipe très professionnelle, un institut où l’on est très bien accueillie et conseillée! Les gammes de produits utilisées sont de grande qualité, un savoir faire unique. Merci à Sabine et à ses collaboratrices !"}
                ]}  className="home__customers-review--carrousel" />
            </div>
        </section>
    )
}
