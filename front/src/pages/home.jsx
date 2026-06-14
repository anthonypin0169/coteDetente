import Carrousel from "@/component/carrousel"
import StaffProfile from "@/component/staffProfile"
import NavLink from "../component/nav"
import photo1 from "../assets/images/carrousel1.jpg"
import photo2 from "../assets/images/carrousel2.jpg"
import photo3 from "../assets/images/carrousel3.jpg"
import photo4 from "../assets/images/carrousel4.jpg"
import "./home.scss"

export default function Home() {
    return (
        <main className="home">
            <Carrousel images={[photo1, photo2, photo3, photo4]} mode="auto" className="home__carrousel" />
            
            <section className="home__services">
                <NavLink text="Découvrez nos prestations" to="/prestations" className="home__services--link" /> 
            </section>

            <section className="home__company-profile">
                <h2 className="home__company-profile--h2">L'institut</h2>
                <div className="home__company-profile--content">
                    <p className="company-text"></p>
                    <Carrousel className="company-carrousel-container"/>
                </div>
            </section>

            <section className="home__staff-profile">
                <StaffProfile className="home__staff-profile--1" />
                <StaffProfile className="home__staff-profile--2" />
                <StaffProfile className="home__staff-profile--3" />
            </section>

                <Carrousel className="home__customers-review"/>
        </main>
    )
}