import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./component/header/header"
import Footer from "./component/footer/footer"
import Home from "./pages/home/home"
import Services from "./pages/services/services"
import Cares from "./pages/cares/cares"
import Epilation from "./pages/epilation/epilation"
import HandsAndFoots from "./pages/handsAndFoots/handsAndFoots"
import Makeup from "./pages/makeup/makeup"
import Event from "./pages/event/event"
import GiftCard from "./pages/giftCard/giftCard"
import Contact from "./pages/contact/contact"
import Conditions from "./pages/conditions/conditions"
import Mentions from "./pages/mentions/mentions"
import "./index.css"
import "./variables.scss"

function App() {
return (
    <BrowserRouter>
    <Header />
    
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prestations" element={<Services />} />

        <Route path="/soins" element={<Cares />} />
        <Route path="/epilation" element={<Epilation />} />
        <Route path="/mains-et-pieds" element={<HandsAndFoots />} />
        <Route path="/maquillage" element={<Makeup />} />

        <Route path="/evenements" element={<Event />} />
        <Route path="/carte-cadeau" element={<GiftCard />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions" element={<Mentions />} />
        <Route path="/conditions" element={<Conditions />} />

    </Routes>

    <Footer />
    </BrowserRouter>
)
}

export default App