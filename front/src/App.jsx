import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import ScrollToTop from "./component/scrollToTop/scrollToTop"
import Header from "./component/header/header"
import Footer from "./component/footer/footer"
import Home from "./pages/home/home"
import "./index.css"
import "./variables.scss"

const Services = lazy(() => import("./pages/services/services"))
const Cares = lazy(() => import("./pages/cares/cares"))
const Epilation = lazy(() => import("./pages/epilation/epilation"))
const HandsAndFoots = lazy(() => import("./pages/handsAndFoots/handsAndFoots"))
const Makeup = lazy(() => import("./pages/makeup/makeup"))
const Event = lazy(() => import("./pages/event/event"))
const GiftCard = lazy(() => import("./pages/giftCard/giftCard"))
const Contact = lazy(() => import("./pages/contact/contact"))
const Conditions = lazy(() => import("./pages/conditions/conditions"))
const Mentions = lazy(() => import("./pages/mentions/mentions"))
const NotFound = lazy(() => import("./pages/notFound/notFound"))

function App() {
return (
    <HelmetProvider>
    <BrowserRouter>
    <ScrollToTop />
    <Header />

    <Suspense fallback={null}>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prestations" element={<Services />} />

        <Route path="/soins/:sousTypeSlug" element={<Cares />} />
        <Route path="/epilation" element={<Epilation />} />
        <Route path="/mains-et-pieds" element={<HandsAndFoots />} />
        <Route path="/maquillage" element={<Makeup />} />

        <Route path="/evenements" element={<Event />} />
        <Route path="/carte-cadeau" element={<GiftCard />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions" element={<Mentions />} />
        <Route path="/conditions" element={<Conditions />} />

        <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>

    <Footer />
    </BrowserRouter>
    </HelmetProvider>
)
}

export default App
