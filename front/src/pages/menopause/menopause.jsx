import "./menopause.scss"
import { Link } from "react-router-dom"
import CardSlider from "@/component/menopause-components/cardSlider/cardSlider"
import Carrousel from "@/component/carrousel/carrousel"
import FaqItem from "@/component/menopause-components/faqItem/faqItem"
import ReverseBloc from "@/component/menopause-components/reverseBloc/reverseBloc"
import PhotoTest1 from "../../assets/images/pexels-krivitskiy-11830371.jpg"
import PhotoTest2 from "../../assets/images/portrait2.jpg"
import PhotoBan from "../../assets/images/wallpaper.webp"
import LogoIntro from "../../assets/images/logo_menopause.png"
import Logo from "@/component/logo/logo"

/* Page ménopause : à compléter. Le bouton mène au formulaire de prise de contact */
export default function Menopause () {
    return(
        <main className="menopause-main">
            <section className="intro-section">
                <div className="intro-section__global-container">
                    {/*Avant le texte : en mobile il flotte à droite et le texte l'entoure,
                    en desktop il est replacé au centre avec "order"*/}
                    <Logo src={LogoIntro} alt="Logo coté détente ménopause" className="intro-section__global-container--logo"/>
                    <div className="intro-section__global-container--content-container">
                        <h1>Sabine Pin</h1>
                        <h2>Conseillère en ménopause certifiée formation ménopause Marie Bourel</h2>
                        <h2>Agrée Cosmosoft Préssothérapie</h2>
                        <h2>Consultation Saint-Denis-Les-Bourgs et téléconsultation</h2>
                    </div>
                    <div className="intro-section__global-container--contact-container">
                        <h3>Tel : 00 00 00 00 00</h3>
                        <h3>Mail : cotedetente24@orange.fr</h3>
                        <div className="media-container">
                            <button className="media-container__icon">Facebook</button>
                            <button className="media-container__icon">Instagram</button>
                        </div>
                    </div>
                </div>
                <div className="intro-section__text-container">Texte d’intro : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus</div>
            </section>

            <section className="section1">
                <ReverseBloc photo={PhotoTest1} title="Titre du texte" text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus, recusandae omnis a amet error nihil nulla eum quidem! Iure quibusdam aut nemo neque quasi, voluptates sunt incidunt voluptate facilis reprehenderit!" linkPosition="photo" />
                <ReverseBloc photo={PhotoTest1} title="Titre du texte" text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus, recusandae omnis a amet error nihil nulla eum quidem! Iure quibusdam aut nemo neque quasi, voluptates sunt incidunt voluptate facilis reprehenderit!" linkPosition="text-bottom" reverse/>
            </section>

            <section className="section2">
                {/*Le texte (top) et la bannière (children) sont dans le slider : ils restent visibles
                au-dessus et en dessous des cartes pendant le défilement horizontal*/}
                <CardSlider top={
                    <p className="section2__text">J’accompagne les femmes à la ménopause et péri-ménopause pour les aider à se sentir bien, à reprendre possession de leur corps et à retrouver leur capacités intellectuelles</p>
                }>
                    <div className="ban">
                        <img src={PhotoBan} alt="PhotoBan" className="ban__img"/>
                    </div>
                </CardSlider>
            </section>

            <section className="section3">
                <ReverseBloc photo={PhotoTest1} title="Titre du texte" text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus, recusandae omnis a amet error nihil nulla eum quidem! Iure quibusdam aut nemo neque quasi, voluptates sunt incidunt voluptate facilis reprehenderit!" linkPosition="text-top" />
                <div className="section3__bloc">
                    <div className="section3__bloc--presenting-text">
                        <h4>Titre zone de texte de présentation.</h4>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus, recusandae omnis a amet error nihil nulla eum quidem! Iure quibusdam aut nemo neque quasi, voluptates sunt incidunt voluptate facilis reprehenderit! Beatae expedita quidem vitae fuga autem!</p>
                        <Link className="section3-btn2 btn">15 min offert</Link>
                    </div>
                    <div className="section3__bloc--profile-photo-container">
                        <img className="section3__bloc--profile-photo-container--img" src={PhotoTest2} alt="Photo test" />
                    </div>
                </div>
                <ReverseBloc photo={PhotoTest1} title="Titre du texte" text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus, recusandae omnis a amet error nihil nulla eum quidem! Iure quibusdam aut nemo neque quasi, voluptates sunt incidunt voluptate facilis reprehenderit!" reverse />
            </section>

            <section className="section4">
                <Link className="section4-btn btn">15 min offert</Link>
                <Carrousel className="section4__carrousel" mode="manual" reviews={[
                    {name:"Prenom", text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatum pariatur sunt porro ex maiores, quaerat quo totam aliquam voluptas consequatur, id expedita consectetur, aspernatur doloribus? Reprehenderit sit ratione tempora?"},
                    {name:"Prenom", text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatum pariatur sunt porro ex maiores, quaerat quo totam aliquam voluptas consequatur, id expedita consectetur, aspernatur doloribus? Reprehenderit sit ratione tempora?"},
                    {name:"Prenom", text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatum pariatur sunt porro ex maiores, quaerat quo totam aliquam voluptas consequatur, id expedita consectetur, aspernatur doloribus? Reprehenderit sit ratione tempora?"}
                ]}/>
            </section>

            <section className="section5">
                <div className="section5__bloc">
                    <div className="section5__bloc--prices">
                        <h4>Tarifs des consultations :</h4>
                        <ul className="li-container">
                            <li>consultation initiale 1h30: 180 .</li>
                            <li>consultations de suivi 45min: 140.</li>
                        </ul>
                        <Link to="/menopause/contact" className="section5-btn btn ">Prendre rendez-vous</Link>
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
