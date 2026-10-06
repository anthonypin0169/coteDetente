import av1 from "../../assets/ImagesPro/wishpro-resultat-01-av.jpg"
import ap1 from "../../assets/ImagesPro/wishpro-resultat-01-ap.jpg"
import av2 from "../../assets/ImagesPro/wishpro-resultat-02-av.jpg"
import ap2 from "../../assets/ImagesPro/wishpro-resultat-02-ap.jpg"
import av3 from "../../assets/ImagesPro/wishpro-resultat-03-av.jpg"
import ap3 from "../../assets/ImagesPro/wishpro-resultat-03-ap.jpg"
import av4 from "../../assets/ImagesPro/wishpro-resultat-04-av.jpg"
import ap4 from "../../assets/ImagesPro/wishpro-resultat-04-ap.jpg"
import "./beforeAfter.scss"
import Slider from "./slider"

const pairs = [
        {before :av1 , after :ap1},
        {before :av2 , after :ap2},
        {before :av3 , after :ap3},
        {before :av4 , after :ap4}
    ]

export default function BeforeAfter () {

    return(
        <div className="bef-aft-component-container">
           {pairs.map((pair, i)=>(
            <Slider key={i} before={pair.before} after={pair.after}/>
           ))}
        </div>
    )
}