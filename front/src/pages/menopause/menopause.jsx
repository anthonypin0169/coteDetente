import "./menopause.scss"
import { Link } from "react-router-dom"
import CardSlider from "@/component/cardSlider/cardSlider"
import Carrousel from "@/component/carrousel/carrousel"
import FaqItem from "@/component/faqItem/faqItem"

/* Page ménopause : à compléter. Le bouton mène au formulaire de prise de contact */
export default function Menopause () {
    return(
        <main className="menopause-main">
            <section className="intro-section">
                <div className="intro-section__global-container">
                    <div className="intro-section__global-container--content-container">
                        <h1>Sabine</h1>
                        <h2>Conseillère en ménopause certifiée formation ménopause Marie Bourel</h2>
                        <h2>Agrée Cosmosoft Préssothérapie</h2>
                        <h2>Consultation Saint-Denis-Les-Bourgs et téléconsultation</h2>
                    </div>
                    <div className="intro-section__global-container--content-container">
                        <h3>Tel : 00 00 00 00 00</h3>
                        <h3>Mail : cotedetente24@orange.fr</h3>
                        <div>
                            <div className="media-icon"></div>
                            <div className="media-icon"></div>
                        </div>
                    </div>
                </div>
                <div className="intro-section__text-container">Texte d’intro : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus</div>
            </section>

            <section className="section1">
                <div className="section1__bloc">
                    <div className="section1__bloc--photo">
                        <Link className="section1-btn1 btn">15 min offert</Link>
                    </div>     
                    <div className="section1__bloc--text">
                        <h4>Titre du texte</h4>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus, recusandae omnis a amet error nihil nulla eum quidem! Iure quibusdam aut nemo neque quasi, voluptates sunt incidunt voluptate facilis reprehenderit!</p>
                    </div>               
                </div>
                <div className="section1__bloc">
                    <div className="section1__bloc--photo">
                        
                    </div>    
                    <div className="section1__bloc--text">
                        <h4>Titre du texte</h4>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus, recusandae omnis a amet error nihil nulla eum quidem! Iure quibusdam aut nemo neque quasi, voluptates sunt incidunt voluptate facilis reprehenderit!</p>
                        <Link className="section1-btn2 btn">15 min offert</Link>
                    </div>
                </div>
            </section>

            <section className="section2">
                <p className="section2__text">J’accompagne les femmes à la ménopause et péri-ménopause pour les aider à se sentir bien, à reprendre possession de leur corps et à retrouver leur capacités intellectuelles</p>
                <CardSlider />
            </section>

            <section className="section3">
                <div className="section3__ban"></div>
                <div className="section3__bloc">
                    <div className="section3__bloc--text">
                        <Link className="section3-btn1 btn">15 min offert</Link>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus, recusandae omnis a amet error nihil nulla eum quidem! Iure quibusdam aut nemo neque quasi, voluptates sunt incidunt voluptate facilis reprehenderit!</p>
                    </div>
                    <div className="section3__bloc--photo"></div>
                </div>
                <div className="section3__bloc">
                    <div className="section3__bloc--presenting-text">
                        <h4>Titre zone de texte de présentation.</h4>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus, recusandae omnis a amet error nihil nulla eum quidem! Iure quibusdam aut nemo neque quasi, voluptates sunt incidunt voluptate facilis reprehenderit! Beatae expedita quidem vitae fuga autem!</p>
                        <Link className="section3-btn2 btn">15 min offert</Link>
                    </div>
                    <div className="section3__bloc--profile-photo"></div>
                </div>
                <div className="section3__bloc">
                    <div className="section3__bloc--text">
                        <h4>Titre du texte</h4>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, eius nam ea, accusantium deleniti est non beatae minus sequi ut quia veniam temporibus, recusandae omnis a amet error nihil nulla eum quidem! Iure quibusdam aut nemo neque quasi, voluptates sunt incidunt voluptate facilis reprehenderit!</p>
                    </div>
                    <div className="section3__bloc--photo"></div>
                </div>
            </section>

            <section className="section4">
                <Link className="section4-btn btn">15 min offert</Link>
                <Carrousel />
            </section>

            <section className="section5">
                <div className="section5__bloc">
                    <div className="section5__bloc--prices">
                        <h4>Tarifs des consultations :</h4>
                        <ul>
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
                <div className="section5__bloc">
                    <h4 className="section5__bloc--title">FAQ</h4>
                    <div className="section5__bloc--faq-bloc">
                        <FaqItem />
                        <FaqItem />
                        <FaqItem />
                    </div>
                </div>
            </section>
        </main>
    )
}
