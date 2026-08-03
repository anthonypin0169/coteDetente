import "./cares.scss"
import imgTest from "../../assets/images/carrousel1.jpg"

export default function Cares() {
    return (
        <main className="cares">
            <h1 className="cares__title">Découvrez nos soins</h1>

            <section className="cares__section">
                <h2 className="cares__section--title">Soins du visage</h2>
                <div className="cares__section--type">
                    <div className="presenting">
                        <h3>Docteur Hauschka</h3>
                        <h4>Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eum ducimus veniam voluptatem molestias placeat in nesciunt, aliquid cumque nemo accusamus excepturi maxime commodi recusandae obcaecati. Libero, deserunt! Temporibus, fuga eaque! Mollitia iste dolore delectus porro fugit velit quam ipsam placeat optio, inventore consequuntur voluptate ullam hic ex iusto cum obcaecati officia nesciunt pariatur animi sapiente repudiandae vitae cupiditate? Quo.</h4>
                    </div>
                    <div className="content-bloc">
                        <div className="content-bloc__prestations">
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                        </div>
                        <img src={imgTest} alt="" className="content-bloc__img"/>
                    </div>
                </div>
                <div className="cares__section--type">
                    <div className="presenting">
                        <h3>WishPro</h3>
                        <h4>Soins Anti-âge à forts résultats</h4>
                    </div>
                    <div className="content-bloc">
                        <img src={imgTest} alt="" className="content-bloc__img"/>
                        <div className="content-bloc__prestations">
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cares__section">
                <h2 className="cares__section--title">Soins du corps</h2>
                <div className="cares__section--type">
                    <div className="presenting">
                        <h3>Massages</h3>
                        <h4>Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eum ducimus veniam voluptatem molestias placeat in nesciunt, aliquid cumque nemo accusamus excepturi maxime commodi recusandae obcaecati. Libero, deserunt! Temporibus, fuga eaque! Mollitia iste dolore delectus porro fugit velit quam ipsam placeat optio, inventore consequuntur voluptate ullam hic ex iusto cum obcaecati officia nesciunt pariatur animi sapiente repudiandae vitae cupiditate? Quo.</h4>
                    </div>
                    <div className="content-bloc">
                        <div className="content-bloc__prestations">
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                        </div>
                        <img src={imgTest} alt="" className="content-bloc__img"/>
                    </div>
                </div>
                <div className="cares__section--type">
                    <div className="presenting">
                        <h3>Massages en duo</h3>
                        <h4>Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eum ducimus veniam voluptatem molestias placeat in nesciunt, aliquid cumque nemo accusamus excepturi maxime commodi recusandae obcaecati. Libero, deserunt! Temporibus, fuga eaque! Mollitia iste dolore delectus porro fugit velit quam ipsam placeat optio, inventore consequuntur voluptate ullam hic ex iusto cum obcaecati officia nesciunt pariatur animi sapiente repudiandae vitae cupiditate? Quo.</h4>
                    </div>
                    <div className="content-bloc">
                        <img src={imgTest} alt="" className="content-bloc__img"/>
                        <div className="content-bloc__prestations">
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cares__section--type">
                    <div className="presenting">
                        <h3>Soins ciblés</h3>
                        <h4>Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eum ducimus veniam voluptatem molestias placeat in nesciunt, aliquid cumque nemo accusamus excepturi maxime commodi recusandae obcaecati. Libero, deserunt! Temporibus, fuga eaque! Mollitia iste dolore delectus porro fugit velit quam ipsam placeat optio, inventore consequuntur voluptate ullam hic ex iusto cum obcaecati officia nesciunt pariatur animi sapiente repudiandae vitae cupiditate? Quo.</h4>
                    </div>
                    <div className="content-bloc">
                        <div className="content-bloc__prestations">
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                        </div>
                        <img src={imgTest} alt="" className="content-bloc__img"/>
                    </div>
                </div>
            </section>

            <section className="cares__section">
                <h2 className="cares__section--title">Soins minceur</h2>
                <div className="cares__section--type">
                    <div className="presenting">
                        <h3>BodySculptor</h3>
                        <h4>Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eum ducimus veniam voluptatem molestias placeat in nesciunt, aliquid cumque nemo accusamus excepturi maxime commodi recusandae obcaecati. Libero, deserunt! Temporibus, fuga eaque! Mollitia iste dolore delectus porro fugit velit quam ipsam placeat optio, inventore consequuntur voluptate ullam hic ex iusto cum obcaecati officia nesciunt pariatur animi sapiente repudiandae vitae cupiditate? Quo.</h4>
                    </div>
                    <div className="content-bloc">
                        <img src={imgTest} alt="" className="content-bloc__img"/>
                        <div className="content-bloc__prestations">
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cares__section--type">
                    <div className="presenting">
                        <h3>Palper rouler</h3>
                        <h4>Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eum ducimus veniam voluptatem molestias placeat in nesciunt, aliquid cumque nemo accusamus excepturi maxime commodi recusandae obcaecati. Libero, deserunt! Temporibus, fuga eaque! Mollitia iste dolore delectus porro fugit velit quam ipsam placeat optio, inventore consequuntur voluptate ullam hic ex iusto cum obcaecati officia nesciunt pariatur animi sapiente repudiandae vitae cupiditate? Quo.</h4>
                    </div>
                    <div className="content-bloc">
                        <div className="content-bloc__prestations">
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p>Nom de la prestation</p>
                                <p>Prix et durée</p>
                            </div>
                        </div>
                        <img src={imgTest} alt="" className="content-bloc__img"/>
                    </div>
                </div>
            </section>

            <section className="cares__section">
                <h2 className="cares__section--title">Luxopuncture</h2>
                <h3>Perte de poids, addiction au sucre, inconfort, ménopause, relaxation et sommeil, arret du tabac</h3>
                <div className="content-bloc">
                        <img src={imgTest} alt="" className="content-bloc__img"/>
                        <div className="content-bloc__prestations">
                            <div className="content-bloc__prestations--text">
                                <p></p>
                                <p></p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p></p>
                                <p></p>
                            </div>
                            <div className="content-bloc__prestations--text">
                                <p></p>
                                <p></p>
                            </div>
                        </div>
                    </div>
            </section>
        </main>
    )
}