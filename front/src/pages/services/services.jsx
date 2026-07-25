import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Modal from "@/component/modal/modal"
import "./services.scss"

export default function Services() {
    
    const [types, setTypes] = useState([])

    useEffect(()=>{
        const loadTypes = async () => {
            try {
                const typesResponse = await fetch ("/api/types")
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

    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modifyViewMode, setModifyViewMode] = useState("list")
    const [selectedTypeId, setSelectedTypeId] = useState("")
    const [typeName ,setTypeName] = useState("")
    const [typeRoute ,setTypeRoute] = useState("")
    const [typePhoto ,setTypePhoto] = useState(null)    

    return (
        <main className="services">
            <h1 className="services__title">Prestations</h1>
            {isAuthenticated &&
                <button className="services__btn" onClick={() => setModalIsOpen(true)}>Modifier</button>
            }
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} variant="modify" >
                {modifyViewMode === "list" ?
                    <div className="services__modal-list-view">
                        {types.map((type)=>( 
                            <div key={type._id} className="services__modal-list-view--card">
                                <h2 className="list-view-card-title">{type.name}</h2>
                                <img src={type.photoUrl} alt={type.name} className="list-view-card-img"/>
                                <button onClick={() => {setModifyViewMode("edit"); setSelectedTypeId(type._id); setTypeName(type.name); setTypeRoute(type.route)}}>Modifier</button>
                            </div>
                        ))}
                    </div> 
                    :
                    <div className="services__modal-edit-view">
                        <label htmlFor="type-name" className="services__modal-edit-view--label">Titre</label>
                        <input type="text" id="type-name" value={typeName} onChange={(e) => setTypeName(e.target.value)} className="services__modal-edit-view--input" />

                        <label htmlFor="type-route" className="services__modal-edit-view--label">Redirection</label>
                        <select id="type-route" value={typeRoute} onChange={(e) => setTypeRoute(e.target.value)}>
                            <option value="/soins">Soins</option>
                            <option value="/maquillage">Maquillage</option>
                            <option value="/epilation">Epilation et bronzage</option>
                            <option value="/mains-et-pieds">Mains et pieds</option>
                        </select>


                        <label htmlFor="type-photo" className="services__modal-edit-view--label">Image</label>
                        <input type="file" id="type-photo" className="services__modal-edit-view--input" onChange={(e) => setTypePhoto(e.target.files[0])}/>
                    </div>
                }
            </Modal>
            <section className="banner">
                {types.map((type)=>(    
                    <Link to={type.route} key={type._id} className="banner__div">
                        <h2 className="banner__div--text">{type.name}</h2>
                        <img src={type.photoUrl} alt={type.name} className="banner__div--image"/>
                    </Link>
                ))}
            </section>
        </main>
    )
}