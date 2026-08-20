import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Modal from "@/component/modal/modal"
import PhotoInput from "@/component/photoInput/photoInput"
import { apiFetch } from "@/utils/api"
import "./services.scss"

export default function Services() {
    
    const [types, setTypes] = useState([])

    useEffect(()=>{
        const loadTypes = async () => {
            try {
                const { data } = await apiFetch("/api/types")

                if(!data){
                    throw new Error ("erreur dans la récuperation des types")
                }

                setTypes(data)

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

    const token = useSelector((state) => state.auth.token)

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append("name", typeName)
        formData.append("route", typeRoute)
        formData.append("photo", typePhoto)

        try{
            const { ok, data: updatedType } = await apiFetch(`/api/types/${selectedTypeId}`, {
                method : "PUT",
                body : formData,
                token
            })
            if(ok){
                setTypes(prev => prev.map(type => type._id === updatedType._id ? updatedType : type))
            }

            setModifyViewMode("list") 
            setTypeName("")
            setTypeRoute("") 
            setTypePhoto(null)
        }catch(error){
            return(error.message)
        }
    }

    const [expandedTypeId, setExpandedTypeId] = useState(null)
    const [caresTypes, setCaresTypes] = useState([])
    const bannerRef = useRef(null)

    useEffect(() => {
        if (!expandedTypeId) return

        const handleClickOutside = (e) => {
            if (bannerRef.current && !bannerRef.current.contains(e.target)) {
                setExpandedTypeId(null)
            }
        }

        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [expandedTypeId])

    const handleCaresTypes = async (id) => {
        try{
            const { data } = await apiFetch(`/api/sous-types/type/${id}`)

            if(!data){
                    throw new Error ("erreur dans la récuperation des types")
                }

                setCaresTypes(data)
        }catch(error){
            return(error.message)
        }
    }

    return (
        <main className="services">
            <h1 className="services__title">Prestations</h1>
            {isAuthenticated &&
                <button className="services__btn btn" onClick={() => setModalIsOpen(true)}>Modifier</button>
            }
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} variant="modify" >
                {modifyViewMode === "list" ?
                    <div className="services__modal-list-view">
                        <h2 className="services__modal-title">Liste des liens :</h2>
                        {types.map((type)=>( 
                            <div key={type._id} className="services__modal-list-view--card">
                                <h2 className="list-view-card-title">{type.name}</h2>
                                <img src={type.photoUrl} alt={type.name} className="list-view-card-img"/>
                                <button onClick={() => {setModifyViewMode("edit"); setSelectedTypeId(type._id); setTypeName(type.name); setTypeRoute(type.route)}} className="list-view-card-btn btn">Modifier</button>
                            </div>
                        ))}
                    </div> 
                    :
                    <div className="services__modal-edit-view">
                        <h2 className="services__modal-title">Reglez vos paramètres :</h2>
                        <label htmlFor="type-name" className="services__modal-edit-view--label">Titre</label>
                        <input type="text" id="type-name" value={typeName} onChange={(e) => setTypeName(e.target.value)} className="services__modal-edit-view--input" />

                        <label htmlFor="type-route" className="services__modal-edit-view--label">Redirection</label>
                        <select id="type-route" value={typeRoute} onChange={(e) => setTypeRoute(e.target.value)} className="services__modal-edit-view--option">
                            <option value="/soins">Soins</option>
                            <option value="/maquillage">Maquillage</option>
                            <option value="/epilation">Epilation et bronzage</option>
                            <option value="/mains-et-pieds">Mains et pieds</option>
                        </select>


                        <label htmlFor="type-photo" className="services__modal-edit-view--label">Image</label>
                        <PhotoInput id="type-photo" className="services__modal-edit-view--upload" onChange={setTypePhoto}/>

                        <button className="services__modal-edit-view--btn btn" onClick={() => handleUpload()}>Valider</button>
                    </div>
                }
            </Modal>
            <section className="banner" ref={bannerRef}>
                {types.map((type)=>(
                    type.route === "/soins" ? (
                        <div key={type._id} className={`banner__div ${expandedTypeId === type._id ? "banner__div--expanded" : ""}`} onClick={() => {setExpandedTypeId(type._id); handleCaresTypes(type._id)}}>
                            <h2 className="banner__div--text">{type.name}</h2>
                            <img src={type.photoUrl} alt={type.name} className="banner__div--image"/>
                        </div>
                    ):(
                        <Link to={type.route} key={type._id} className="banner__div">
                            <h2 className="banner__div--text">{type.name}</h2>
                            <img src={type.photoUrl} alt={type.name} className="banner__div--image"/>
                        </Link>
                    )
                ))}
                <div className={`banner__sous-types ${expandedTypeId ? "banner__sous-types--open" : ""}`}>
                    {caresTypes.map((careType)=>(
                        <Link to={careType.route} key={careType._id} className="banner__sous-types--link">
                            <h3>{careType.name}</h3>
                        </Link>
                    ))}
                    <button onClick={() => setExpandedTypeId(null)} className="banner__sous-types--back-btn">Retour</button>
                </div>
            </section>
        </main>
    )
}