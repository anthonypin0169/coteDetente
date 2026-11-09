import "./menopause.scss"
import { Link } from "react-router-dom"
import CardSlider from "@/component/menopause-components/cardSlider/cardSlider"
import Carrousel from "@/component/carrousel/carrousel"
import FaqItem from "@/component/menopause-components/faqItem/faqItem"
import ReverseBloc from "@/component/menopause-components/reverseBloc/reverseBloc"
import PhotoTest1 from "../../assets/images/pexels-krivitskiy-11830371.jpg"
import PhotoProfile from "../../assets/ImagesPro/photo_profil_sabine.jpg"
import PhotoBan from "../../assets/images/wallpaper.webp"
import LogoIntro from "../../assets/images/logo_menopause.png"
import Logo from "@/component/logo/logo"

/* Page ménopause : à compléter. Le bouton mène au formulaire de prise de contact */
export default function Menopause () {
    return(
        <main className="menopause-main">
            <section className="intro-section">
                <div className="intro-section__global-container">
                    <div className="intro-section__global-container--content-container">
                        <h1>Sabine Pin</h1>
                        <h2 className="intro-amovible-h2">Conseillère en ménopause certifiée formation ménopause Marie Bourel</h2>
                        <h2>Agrée Cosmosoft Préssothérapie</h2>
                        <h2>Consultation Saint-Denis-Les-Bourgs et téléconsultation</h2>
                    </div>
                    <Logo src={LogoIntro} alt="Logo coté détente ménopause"className="intro-section__global-container--logo"/>
                    <div className="intro-section__global-container--contact-container">
                        <h3>Tel : 00 00 00 00 00</h3>
                        <h3>Mail : cotedetente24@orange.fr</h3>
                        <div className="media-container">
                            <button className="media-container__icon">Facebook</button>
                            <button className="media-container__icon">Instagram</button>
                        </div>
                    </div>
                </div>
                <h2 className="intro-section__intro-title">Retrouver votre équilibre à la périménopause et ménopause</h2>
                <p className="intro-section__intro-text">Je vous accompagne pour vous aider à mieux vivre cette transition, à retrouver votre énergie et à vous sentir bien dans votre corps et votre vie.</p>
            </section>

            <section className="section1">
                <ReverseBloc photo={PhotoTest1} text="Fatigue inexpliquée Prise de poids Anxiété Déprime Palpitations Sommeil perturbé Baisse de libido et troubles urinaires Brouillard mental Douleurs articulaires Inconforts digestifs…Autant de symptômes qui peuvent apparaître sans prévenir et bouleverser votre quotidien. Votre bilan médical est normal pourtant vous ne vous sentez pas bien. Vous vous sentez perdue, et vous ne vous reconnaissez plus et vous cherchez à comprendre d’où vient ce" textBtn="Réserver un appel découverte Gratuit" linkPosition="photo" />
                <ReverseBloc photo={PhotoTest1} title="Mon approche du suivi" text="Chaque femme vit sa ménopause à sa manière et c’est pour cela que je prends le temps de vous connaître. Mon but est de vous aider à comprendre ce qui se passe dans votre corps pour que vos symptômes aient du sens. Notre première rencontre (1h30) : Nous prenons le temps d’échanger. Je vous explique ce qu’est la ménopause, puis nous faisons le tour de votre quotidien : vos symptômes, votre histoire, votre alimentation, votre sommeil, votre stress, votre activité physique. Souvent une analyse biologique vient compléter le tableau." paragraph="Ensemble nous identifions votre profil et vous repartez avec quelques conseilspersonnalisés dès le premier rendez-vous. Rééquilibrer un corps demande du temps, c’est pourquoi lesuivi d’étend sur plusieurs mois, chacune avançant à son rythme." textBtn="Réservez votre rendez vous 15 mn offert" linkPosition="text-bottom" reverse/>
            </section>

            <section className="section2">
                <h2>La ménopause parlons en !</h2>
                <p className="section2__text">La ménopause (ou pré ménopause) est une étape de la vie qui peut vraiment déstabiliser les femmes. On en parle encore trop peu et lorsqu'on aborde le sujet avec son médecin on peut avoir le sentiment que nos difficultés sont prises à la légère. Pourtant des solutions concrètent existent pour retrouver la forme physique et morale et se sentir à nouveau belle, dynamique et pleine d'ambition ! Ensemble nous explorons</p>
                {/*La bannière est dans le slider : elle reste visible sous les cartes pendant le défilement horizontal*/}
                <CardSlider>
                    <div className="ban">
                        <img src={PhotoBan} alt="PhotoBan" className="ban__img"/>
                    </div>
                </CardSlider>
            </section>

            <section className="section3">
                <div className="section3__bloc">
                    <div className="section3__bloc--presenting-text">
                        <h4>Titre zone de texte de présentation.</h4>
                        <p>Esthéticienne de formation, j’accompagne les femmes depuis 19 ans dans mon institut debeauté à Saint-Denis-lès-Bourg.Au fil des années, une vraie complicité s’est installée avec mes clientes et je suis chaque jourà l’écoute de celles qui traversent le bouleversement de la ménopause. J’ai moi-même ressenti ces changements dans mon corps sans savoir vers qui me tourner pourobtenir un bilan complet de ma santé, des explications, une écoute et un accompagnement naturel.</p>
                        <p>Ce sujet me tient donc particulièrement à cœur et j’ai choisi de vous accompagner autrement. C’est pourquoi je me suis formée auprès de Marie Bourel, Biologiste, Nutrithérapeute Relaxologue en Suisse afin de vous offrir le meilleur accompagnement possible dans cettetransition de vie</p>
                        <p>Je suis là pour vous aider à comprendre votre corps et à prendre votre santé en main, à votre rythme, sans pression.</p>
                        <Link to="/menopause/contact" className="section3-btn2 menopause-btn">Réserver un appel découverte gratuit de 15 mn</Link>
                    </div>
                    <div className="section3__bloc--profile-photo-container">
                        <img className="section3__bloc--profile-photo-container--img" src={PhotoProfile} alt="Photo test" />
                    </div>
                </div>
                <ReverseBloc photo={PhotoTest1} title="La ménopause parlons en !" text="La ménopause (ou pré ménopause) est une étape de la vie qui peut vraiment déstabiliser les femmes. On en parle encore trop peu et lorsqu'on aborde le sujet avec son médecin on peut avoir le sentiment que nos difficultés sont prises à la légère. Pourtant des solutions concrètent existent pour retrouver la forme physique et morale et se sentir à nouveau belle, dynamique et pleine d'ambition ! Ensemble nous explorons différents leviers sur lesquels vous pouvez agir afin de vous rééquilibrer." />
                <ReverseBloc photo={PhotoTest1} title="Titre du texte" text="La ménopause survient en moyenne à 51 ans , précédée de plusieurs années de préménopause et marque une étape qui s’inscrit dans la durée. Bien accompagnée, elle peut être vécue sereinement et devenir l’occasion de retrouver un équilibre durable. Elle peut même devenir une véritable renaissance. Il n’est pas toujours facile de faire le premier pas, c’est pourquoi je vous invite à ce rendez vous offert par téléphone." reverse />
            </section>

            <section className="section4">
                <Link to="/menopause/contact" className="section4__btn menopause-btn">Réservez votre rendez vous 15 mn offert</Link>
                <Carrousel className="section4__carrousel" mode="manual" reviews={[
                    {name:"Caroline C", text:"J’ai décidé de faire un bilan préménopause auprès de Sabine car je ressentais un épuisement important au quotidien, avec un manque d’énergie qui impactait mes journées. Lors de ce premier rendez-vous, Sabine a su mettre le doigt sur un point essentiel : mon alimentation n’était pas suffisamment équilibrée ni assez riche pour apporter à mon corps tout ce dont il avait besoin. Elle m’a accompagnée et conseillée pour , en m’expliquant ce qui était bon pour moi et comment mieux répondre aux besoins de mon corps. Un mois après, les premiers résultats sont déjà là ! Les gros coups de fatigue ont nettement diminué et je ressens une réelle amélioration au quotidien. Je suis ravie d’avoir fait cette démarche et d’avoir pu bénéficier de ses conseils et de son écoute. Ce n’est que le début de l’aventure, et j’ai hâte de poursuivre ce chemin avec Sabine ! 😊"},
                    {name:"Prenom", text:"Avant de rencontrer Sabine, la transition de la ménopause n'a pas été simple à apprivoiser. J'avais pris 10 à 15 kilos, je subissais des bouffées de chaleur épuisantes, et je me sentais souvent lourde, fatiguée, avec une vitalité  altérée. Son accompagnement a été une bouffée d'oxygène. Elle m'a reçue à plusieurs reprises avec beaucoup d'écoute, m'a posé les bonnes questions pour comprendre ma situation globale, et m'a guidée pas à pas grâce à des solutions naturelles et des conseils précieux en rééquilibrage alimentaire.. Résultat : en six mois, j'ai déjà perdu 7 kilos. Mais le plus important est ailleurs : je n'ai plus aucune bouffée de chaleur, j'ai retrouvé mon enthousiasme, de l'énergie et une vraie forme au quotidien. Ayant également consulté une nutritionniste en mars, ces résultats sont sans doute le fruit de cette dynamique globale, mais son écoute, ses conseils naturels et son suivi personnalisé y ont contribué de façon certaine."},
                    {name:"Prenom", text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatum pariatur sunt porro ex maiores, quaerat quo totam aliquam voluptas consequatur, id expedita consectetur, aspernatur doloribus? Reprehenderit sit ratione tempora?"}
                ]}/>
            </section>

            <section className="section5">
                <div className="section5__bloc">
                    <div className="section5__bloc--prices">
                        <h4>Tarifs des consultations :</h4>
                        <ul className="li-container">
                            <li>Le suivi de 5 séances 440€</li>
                        </ul>
                        <Link to="/menopause/contact" className="section5-btn menopause-btn">Prendre rendez-vous</Link>
                    </div>
                    <div className="section5__bloc--parting-line"></div>
                    <div className="section5__bloc--condition">
                        <h4>Conditions générales :</h4>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                        <p>Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus</p>
                    </div>
                </div>
                <div className="section5__faq">
                    <h4 className="section5__faq--title">FAQ</h4>
                    <div className="section5__faq--items">
                        <FaqItem />
                        <FaqItem />
                        <FaqItem />
                    </div>
                </div>
            </section>
        </main>
    )
}
