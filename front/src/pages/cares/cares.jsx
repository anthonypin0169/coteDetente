import "./cares.scss"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Cares() {

    const { sousTypeSlug } = useParams()


    /* Récuperer les sous types et mettre à jour sur le sous type actuel */
    const [currentSousType, setCurrentSousType] = useState(null)
    useEffect(()=>{
        const loadSousTypes = async () => {
            try {
                const typesResponse = await fetch ("/api/sous-types")
                const typesResponseJson = await typesResponse.json()

                if(!typesResponseJson){
                    throw new Error ("erreur dans la récuperation des sous-types")
                }
                const found = typesResponseJson.find(sousType => sousType.route === `/soins/${sousTypeSlug}`)
                setCurrentSousType(found)

            }catch(error){
                (error.message)
            }
        }
        loadSousTypes()
    },[sousTypeSlug])


    /* Récuperer les groupes d'un sous-type */
    const [groups, setGroups] = useState([])

    useEffect(()=>{
        if (!currentSousType) return
        const loadGroup = async () => {
            try{
                const groupResponse = await fetch (`/api/groups/sous-type/${currentSousType._id}`)
                const groupResponseJson = await groupResponse.json()

                if(!groupResponseJson){
                    throw new Error ("erreur dans la récuperation des groupes")
                }
                setGroups(groupResponseJson)

            }catch(error){
                (error.message)
            }
        }
        loadGroup()
    },[currentSousType])


    /* Récuperer toutes les prestations */
    const [prestations, setPrestations] = useState([])

    useEffect(() => {
        const loadPrestations = async () => {
            try{
                const prestaResponse = await fetch ("/api/prestations")
                const prestaResponseJson = await prestaResponse.json()

                if(!prestaResponseJson){
                    throw new Error ("erreur dans la récuperation des groupes")
                }
                setPrestations(prestaResponseJson) 

            }catch(error){
                (error.message)
            }
        }
        loadPrestations()
    },[groups])


    return (
        <main className="cares">
         <h1 className="cares__title">Découvrez nos soins</h1>

            <section className="cares__section">
                {groups.map((bloc, i) => (
                    <div className="cares__section--type" key={bloc._id}>
                        <div className="presenting">
                            <h3>{bloc.name}</h3>
                            <h4>{bloc.description}</h4>
                        </div>
                        <div className={`content-bloc ${i % 2 === 0 ? "content-bloc--reverse" : ""}`}>
                            <div className="prestation-list-container">
                                {prestations.filter(p => p.group === bloc._id).map(presta => (
                                    <div className="content-bloc__prestations" key={presta._id}>
                                        <div className="content-bloc__prestations--text">
                                            <p>{presta.name}</p>
                                            <div className="content-bloc__prestations--text--infos">
                                                <p>{presta.price}</p>
                                                <p>{presta.duration}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>   
                            <img src={bloc.photoUrl} alt="" className="content-bloc__img"/>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    )
}