import "./menopause.scss"
import { Link } from "react-router-dom"
import { useRef } from "react"
import SeoHead from "@/component/seoHead/seoHead"
import useParallax from "@/utils/useParallax"
import CardSlider from "@/component/menopause-components/cardSlider/cardSlider"
import Carrousel from "@/component/carrousel/carrousel"
import FaqItem from "@/component/menopause-components/faqItem/faqItem"
import ReverseBloc from "@/component/menopause-components/reverseBloc/reverseBloc"
import handPic from "../../assets/ImagesPro/bloc-2_section-3_menopause.jpg"
import PhotoProfile from "../../assets/ImagesPro/photo_profil_sabine.jpg"
import LogoIntro from "../../assets/images/logo_menopause.png"
import LogoMenopulse from "../../assets/ImagesPro/Menopulse_Logo.png"
import Logo from "@/component/logo/logo"
import Ban from "../../assets/ImagesPro/ban_menopause-3.jpg"
import BanSmall from "../../assets/ImagesPro/ban_menopause-3-1000.jpg"
import Bloc1 from "../../assets/ImagesPro/bloc_menopause-1.2.jpg"
import Bloc2 from "../../assets/ImagesPro/bloc_menopause-2.jpg"
import Bloc2Small from "../../assets/ImagesPro/bloc_menopause-2-1000.jpg"
import Method from "../../assets/ImagesPro/approche_menopause-1.jpg"
import MethodSmall from "../../assets/ImagesPro/approche_menopause-1-1000.jpg"
import Food from "../../assets/ImagesPro/assiette_menopause-3.jpg"
import Sleep from "../../assets/ImagesPro/lit_menopause-2.jpg"
import Sport from "../../assets/ImagesPro/sport_menopause-1.jpg"
import Stress from "../../assets/ImagesPro/stress_menopause-1.jpg"
import Complement from "../../assets/ImagesPro/complement_menopause-3.jpg"

/*Bulles du premier bloc de la section 1*/
const symptoms = [
    "Fatigue inexpliquée",
    "Prise de poids",
    "Anxiété",
    "Déprime",
    "Palpitations",
    "Sommeil perturbé",
    "Baisse de libido",
    "Troubles urinaires",
    "Brouillard mental",
    "Douleurs articulaires",
    "Inconforts digestifs",
    "Bouffées de chaleur"
]

const cardData = [
    {
        id: "1",
        title: "Hygiène alimentaire",
        img: {src: Food, alt:"Photo d'une assiette composée"},
        description:"Ce que vous mettez dans votre assiette a une influence sur vos hormones et peut apaiser vos symptômes."
    },
    {
        id: "2",
        title: "Sommeil",
        img: {src: Sleep, alt:"Photo d'un lit dans une chambre"},
        description:"Nombreuses sont les femmes dont le sommeil est haché ou diminué à cette période. Retrouver des nuits réparatrices est indispensable."
    },
    {
        id: "3",
        title: "Activité physique",
        img: {src: Sport, alt:"Photo d'une randonneuse"},
        description:"Bouger a un impact considérable sur l'ensemble des symptômes !"
    },
    {
        id: "4",
        title: "Stress et émotions",
        img: {src: Stress, alt:"Photo de profil d'une femme de la cinquantaine"},
        description:"À la ménopause, notre système nerveux est mis à rude épreuve : il devient plus sensible au stress. L'apaiser est possible !"
    },
    {
        id: "5",
        title: "Compléments alimentaires",
        img: {src: Complement, alt:"Photo d'une fiole pour fleurs de Bach"},
        description:"Le bon complément choisi selon votre profil peut soutenir votre corps."
    }
]

const faqData = [
    {
        id: "1",
        question: "Comment se déroule le premier rendez-vous ?",
        anwser: "Nous prenons le temps de faire un bilan de santé personnalisé et je vous explique ce qu’il se passe dans votre corps. Vous repartez avec quelques ajustements simples à mettre en place dans votre quotidien.",
    },
    {
        id: "2",
        question: "Cet accompagnement remplace-t-il mon médecin ?",
        anwser: "Non, il le complète. Je ne pose pas de diagnostic et ne prescris pas de traitement. Je vous apporte une écoute et vous aide à recaler une hygiène de vie.",
    },
    {
        id: "3",
        question: "Je suis encore réglée, est-ce trop tôt ?",
        anwser: "Non. La périménopause commence souvent dès la fin de la quarantaine, bien avant l’arrêt des règles. Plus on s’en occupe tôt, plus la transition peut se vivre sereinement.",
    },
    {
        id: "4",
        question: "Ai-je encore ma place si je suis ménopausée depuis plusieurs années ?",
        anwser: "Oui. Il n’est jamais trop tard pour retrouver un équilibre quels que soient vos symptômes et votre âge.",
    },
    {
        id: "5",
        question: "Les compléments alimentaires sont-ils obligatoires ?",
        anwser: "Le suivi comprend un protocole de compléments alimentaires choisis selon votre profil pour agir en synergie avec les autres leviers de l’accompagnement.",
    },
    {
        id: "6",
        question: "Faites-vous des programmes diététiques ?",
        anwser: "Non, c'est le métier d'une diététicienne ou d'une nutritionniste. Je vous oriente sur des nutriments qui vont être nécessaires en période de préménopause et de ménopause et qui vont vous remettre en énergie.",
    },
    {
        id: "7",
        question: "Le suivi de 5 séances est-il obligatoire ?",
        anwser: "Le suivi de 5 séances est généralement conseillé car les hormones mettent entre 3 et 6 mois à se rééquilibrer. Ce rythme permet d’avancer en douceur et d’aller travailler tous les leviers. Cependant, si vous vous sentez autonome et que vous ne souhaitez pas de suivi mensuel, les deux premières séances restent indispensables et vous pourrez me consulter selon vos besoins.",
    },
    {
        id: "8",
        question: "Puis-je régler le suivi en plusieurs fois ?",
        anwser: "Oui, pour que le suivi reste accessible vous pouvez régler en 3 ou 4 fois par carte bancaire.",
    }
]

/* Page ménopause : à compléter. Le bouton mène au formulaire de prise de contact */
export default function Menopause () {
    const bannerRef = useRef()
    const bannerImgRef = useRef()
    /*Même parallax que les photos des blocs*/
    useParallax(bannerRef, bannerImgRef)

    return(
        <main className="menopause-main">
            <SeoHead
                title="Accompagnement ménopause et périménopause"
                description="Sabine Pin, conseillère en périménopause et ménopause certifiée Ménopulse, à Saint-Denis-lès-Bourg et en téléconsultation : bilan personnalisé, alimentation, sommeil, stress."
            />
            <section className="intro-section">
                <div className="intro-section__global-container">
                    {/*Avant le texte : en mobile il flotte à droite et le texte l'entoure,
                    en desktop il est replacé au centre avec "order"*/}
                    <Logo src={LogoIntro} alt="Logo Côté Détente ménopause" className="intro-section__global-container--logo" width={600} height={431}/>
                    <div className="intro-section__global-container--content-container">
                        <h1>Sabine Pin</h1>
                        <h2 className="intro-amovible-h2">Conseillère en Périménopause et Ménopause - Certifiée Ménopulse <span className="intro-amovible-h2__logo-container"><img src={LogoMenopulse} alt="Logo certification ménopulse" className="intro-amovible-h2__logo-container--img" width={300} height={300}/></span></h2>
                        <h2>Esthéticienne de formation, 25 ans d’expérience dans l’accompagnement des femmes</h2>
                        <h2>Consultation Saint-Denis-lès-Bourg et téléconsultation</h2>
                    </div>
                    <div className="intro-section__global-container--contact-container">
                        <h3>Tél : 04 74 24 61 14</h3>
                        <h3>Mail : cotedetente.24@orange.fr</h3>
                        <div className="media-container">
                            <button className="media-container__icon">Facebook</button>
                            <button className="media-container__icon">Instagram</button>
                        </div>
                    </div>
                </div>
                <h2 className="intro-section__intro-title">Retrouver votre équilibre à la périménopause et ménopause</h2>
            </section>

            <section className="menopause-banner" ref={bannerRef}>
                <img src={Ban} srcSet={`${BanSmall} 1000w, ${Ban} 2400w`} sizes="100vw" alt="Photo d'un groupe de femmes faisant du pilates" className="menopause-banner__img" loading="lazy" decoding="async" ref={bannerImgRef}/>
                <h3 className="menopause-banner__text">Je vous accompagne pour vous aider à mieux vivre cette transition, à retrouver votre énergie et à vous sentir bien dans votre corps et votre vie.</h3>
            </section>

            <section className="section1">
                <ReverseBloc className="bloc--symptoms" photo={Bloc1} bubbles={symptoms} text="Autant de symptômes qui peuvent apparaître sans prévenir et bouleverser votre quotidien. Votre bilan médical est normal, pourtant vous ne vous sentez pas bien. Vous vous sentez perdue, vous ne vous reconnaissez plus et vous cherchez à comprendre d’où vient ce changement et surtout quelles solutions existent pour retrouver votre équilibre." textBtn="Réservez un appel découverte gratuit" linkPosition="photo" />
                <ReverseBloc className="bloc--talk" photo={Bloc2} photoSrcSet={`${Bloc2Small} 1000w, ${Bloc2} 1600w`} title="La ménopause parlons-en !" text="La ménopause (ou préménopause) est une étape de la vie qui peut vraiment déstabiliser les femmes. On en parle encore trop peu et lorsqu'on aborde le sujet avec son médecin, on peut avoir le sentiment que nos difficultés sont prises à la légère." paragraph="Pourtant, des solutions concrètes existent pour retrouver la forme physique et morale et se sentir à nouveau belle, dynamique et pleine d'ambition !" textBtn="Réservez votre rendez-vous de 15 min offert" linkPosition="text-bottom" reverse/>
            </section>

            <section className="section2">
                {/*Le titre (top) et la bannière (children) sont dans le slider : ils restent visibles
                au-dessus et en dessous des cartes pendant le défilement horizontal*/}
                <CardSlider cardData={cardData} top={
                    <h2 className="section2__text">Ensemble nous explorons différents leviers sur lesquels vous pouvez agir afin de vous rééquilibrer.</h2>
                }>
                    <div className="ban">
                        <h3 className="ban__txt">Un esprit sain dans un corps sain</h3>
                    </div>
                </CardSlider>
            </section>

            <section className="section3">
                <ReverseBloc className="bloc--approach" photo={Method} photoSrcSet={`${MethodSmall} 1000w, ${Method} 1600w`} title="Mon approche du suivi" text="Chaque femme vit sa ménopause à sa manière et c’est pour cela que je prends le temps de vous connaître. Mon but est de vous aider à comprendre ce qui se passe dans votre corps pour que vos symptômes aient du sens. Notre première rencontre (1h30) : nous prenons le temps d’échanger. Je vous explique ce qu’est la ménopause, puis nous faisons le tour de votre quotidien : vos symptômes, votre histoire, votre alimentation, votre sommeil, votre stress, votre activité physique. Souvent une analyse biologique vient compléter le tableau." paragraph="Ensemble nous identifions votre profil et vous repartez avec quelques conseils personnalisés dès le premier rendez-vous. Rééquilibrer un corps demande du temps, c’est pourquoi le suivi s’étend sur plusieurs mois, chacune avançant à son rythme." />
                <div className="section3__bloc">
                    <div className="section3__bloc--presenting-text">
                        <p>Esthéticienne de formation, j’accompagne les femmes depuis 19 ans dans mon institut de beauté à Saint-Denis-lès-Bourg. Au fil des années, une vraie complicité s’est installée avec mes clientes et je suis chaque jour à l’écoute de celles qui traversent le bouleversement de la ménopause. J’ai moi-même ressenti ces changements dans mon corps sans savoir vers qui me tourner pour obtenir un bilan complet de ma santé, des explications, une écoute et un accompagnement naturel.</p>
                        <p>Ce sujet me tient donc particulièrement à cœur et j’ai choisi de vous accompagner autrement. C’est pourquoi je me suis formée auprès de Marie Bourel, biologiste, nutrithérapeute et relaxologue en Suisse afin de vous offrir le meilleur accompagnement possible dans cette transition de vie.</p>
                        <p>Je suis là pour vous aider à comprendre votre corps et à prendre votre santé en main, à votre rythme, sans pression.</p>
                        <Link to="/menopause/contact" className="section3-btn2 menopause-btn">Réservez un appel découverte gratuit de 15 min</Link>
                    </div>
                    <div className="section3__bloc--profile-photo-container">
                        <img className="section3__bloc--profile-photo-container--img" src={PhotoProfile} alt="Portrait de Sabine Pin" />
                    </div>
                </div>
                <ReverseBloc className="bloc--rebirth" photo={handPic} text="La ménopause survient en moyenne à 51 ans, précédée de plusieurs années de préménopause et marque une étape qui s’inscrit dans la durée." paragraph="Bien accompagnée, elle peut être vécue sereinement et devenir l’occasion de retrouver un équilibre durable. Elle peut même devenir une véritable renaissance." reverse />
            </section>

            <section className="section4">
                <h3 className="section4__title">Il n’est pas toujours facile de faire le premier pas, c’est pourquoi je vous invite à ce rendez-vous offert par téléphone.</h3>
                <Link to="/menopause/contact" className="section4__btn menopause-btn">Réservez votre rendez-vous de 15 min offert</Link>
                <Carrousel className="section4__carrousel" mode="manual" reviews={[
                    {name:"Caroline C", text:"J’ai décidé de faire un bilan préménopause auprès de Sabine car je ressentais un épuisement important au quotidien, avec un manque d’énergie qui impactait mes journées. Lors de ce premier rendez-vous, Sabine a su mettre le doigt sur un point essentiel : mon alimentation n’était pas suffisamment équilibrée ni assez riche pour apporter à mon corps tout ce dont il avait besoin. Elle m’a accompagnée et conseillée, en m’expliquant ce qui était bon pour moi et comment mieux répondre aux besoins de mon corps. Un mois après, les premiers résultats sont déjà là ! Les gros coups de fatigue ont nettement diminué et je ressens une réelle amélioration au quotidien. Je suis ravie d’avoir fait cette démarche et d’avoir pu bénéficier de ses conseils et de son écoute. Ce n’est que le début de l’aventure, et j’ai hâte de poursuivre ce chemin avec Sabine ! 😊"},
                    {name:"Claudie L", text:"Avant de rencontrer Sabine, la transition de la ménopause n'a pas été simple à apprivoiser. J'avais pris 10 à 15 kilos, je subissais des bouffées de chaleur épuisantes, et je me sentais souvent lourde, fatiguée, avec une vitalité altérée. Son accompagnement a été une bouffée d'oxygène. Elle m'a reçue à plusieurs reprises avec beaucoup d'écoute, m'a posé les bonnes questions pour comprendre ma situation globale, et m'a guidée pas à pas grâce à des solutions naturelles et des conseils précieux en rééquilibrage alimentaire. Résultat : en six mois, j'ai déjà perdu 7 kilos. Mais le plus important est ailleurs : je n'ai plus aucune bouffée de chaleur, j'ai retrouvé mon enthousiasme, de l'énergie et une vraie forme au quotidien. Ayant également consulté une nutritionniste en mars, ces résultats sont sans doute le fruit de cette dynamique globale, mais son écoute, ses conseils naturels et son suivi personnalisé y ont contribué de façon certaine."},
                    {name:"Aude V", text:"C’est après des mois et des mois de mal-être sans comprendre ce qui m’arrivait que j’ai posé les choses avec Sabine. J’ai pu comprendre la cause de mes changements, comprendre que je pouvais faire autrement et être à l’écoute de mon corps en l’accompagnant différemment… et tout ça grâce à son écoute et sa méthode qui me permettent de traverser sereinement cette période… des résultats et un accompagnement professionnel. Merci Sabine"}
                ]}/>
            </section>

            <section className="section5">
                <div className="section5__bloc">
                    <div className="section5__bloc--prices">
                        <h4>Tarifs des consultations :</h4>
                        <ul className="li-container">
                            <li>Le suivi de 5 séances 440 €</li>
                        </ul>
                        <Link to="/menopause/contact" className="section5-btn menopause-btn">Prendre rendez-vous</Link>
                    </div>
                    {/*
                        <div className="section5__bloc--parting-line"></div>
                        <div className="section5__bloc--condition">
                            <h4>Conditions générales :</h4>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            <p>Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus</p>
                        </div>
                    */}
                </div>
                <div className="section5__faq">
                    <h4 className="section5__faq--title">FAQ</h4>
                    <FaqItem faqData={faqData}/>   
                </div>
            </section>
        </main>
    )
}
