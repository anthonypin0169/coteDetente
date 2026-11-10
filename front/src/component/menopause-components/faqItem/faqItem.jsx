import "./faqItem.scss"

export default function FaqItem ({faqData}) {
    return(
        <div className="faq-container">
            {faqData.map((item) =>(
                <div key={item.id} className="faq-container__item">
                    <h3 className="faq-container__item--question">{item.question}</h3>
                    {/*La grille anime la hauteur de la réponse (0fr → 1fr) sans valeur fixe*/}
                    <div className="faq-container__item--anwser-container">
                        <p className="faq-container__item--anwser">{item.anwser}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}