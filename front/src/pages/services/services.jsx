import { useState, useEffect } from "react"
import "./services.scss"

export default function Services() {
    
    const [types, setTypes] = useState([])

    useEffect(()=>{
        const loadTypes = async () => {
            try {
                const typesResponse = await fetch ("http://localhost:5000/api/types")
                const typesResponseJson = await typesResponse.json()

                if(!typesResponseJson){
                    throw new Error ("erreur dans la récuperation des types")
                }

                setTypes(typesResponseJson)

            }catch(error){
                (error.message)
            }
        }
        loadTypes()
    },[])
    return (
        <main className="services">
            <h1 className="services__title">Prestations</h1>
            <section className="banner">
                {types.map((type)=>(    
                    <div key={type._id} className="banner__div">
                        <h2 className="banner__div--text">{type.name}</h2>
                        <img src={type.photoUrl} alt={type.name} className="banner__div--image"/>
                    </div>
                ))}
            </section>
        </main>
    )
}