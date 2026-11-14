import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import Store from "./store/store.jsx"
import App from './App.jsx'

/*Balises SEO par défaut de index.html (lues par les réseaux sociaux, qui n'exécutent pas le JS) :
retirées ici pour ne pas doubler celles que SeoHead ajoute sur chaque page*/
document.querySelectorAll("[data-default-seo]").forEach((tag) => tag.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = { Store }>
      <App />
    </Provider>
  </StrictMode>,
)
