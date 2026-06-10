import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./component/header"
import Footer from "./component/footer"
import Home from "./pages/home"
import Services from "./pages/services"
import Cares from "./pages/cares"
import Epilation from "./pages/epilation"
import HandsAndFoots from "./pages/handsAndFoots"
import Makeup from "./pages/makeup"
import Event from "./pages/event"
import GiftCard from "./pages/giftCard"
import Contact from "./pages/contact"

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
    </Routes>

    <Footer />
    </BrowserRouter>
)
}

export default App