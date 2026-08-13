import "./cares.scss"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Modal from "@/component/modal/modal"

export default function Cares() {

    const { sousTypeSlug } = useParams()
    const token = useSelector((state) => state.auth.token)


    /* Récuperer les sous types, mettre à jour sur le sous type actuel et modifier son titre */
    const [allSousTypes, setAllSousTypes] = useState([])
    const [currentSousType, setCurrentSousType] = useState("")
    const [actualSousTypeName,setActualSousTypeName] = useState("")

    useEffect(()=>{
        const loadSousTypes = async () => {
            try {
                const sousTypesResponse = await fetch ("/api/sous-types")
                const sousTypesResponseJson = await sousTypesResponse.json()

                if(!sousTypesResponseJson){
                    throw new Error ("erreur dans la récuperation des sous-types")
                }
                const found = sousTypesResponseJson.find(sousType => sousType.route === `/soins/${sousTypeSlug}`)
                setCurrentSousType(found)
                setAllSousTypes(sousTypesResponseJson)

            }catch(error){
                (error.message)
            }
        }
        loadSousTypes()
    },[sousTypeSlug])


    /* Modifier le nom d'un sous-type et n'en cibler qu'un seul */
    const handleUpdateSousType = async (id) => {
        
        const formData = new FormData()
        formData.append("name", actualSousTypeName)

        try{
            const uploadTitle = await fetch (`/api/sous-types/${id}`,{
                method : "PUT",
                body : formData,
                headers : { Authorization : `Bearer ${token}`}
            })
            const updatedTitle = await uploadTitle.json()

            if (uploadTitle.ok){
                setActualSousTypeName(updatedTitle.name)
                setAllSousTypes(prev => prev.map(t => t._id === updatedTitle._id ? updatedTitle : t))

            }

        }catch(error){
                (error.message)
            }
    }
    

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


    /* Boite modale */
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalVue, setModalVue] = useState("sousTypes")
    const [selectedSousTypeId, setSelectedSousTypeId] = useState("")
    const [modalGroups, setModalGroups] = useState([])
    const [editingSousTypeId, setEditingSousTypeId] = useState(null)

    useEffect(() => {
        if (!selectedSousTypeId) return

        const loadSelectedSousType = async () => {
            try{
                const response = await fetch (`/api/groups/sous-type/${selectedSousTypeId}`)
                const responseJson = await response.json()

                if(!responseJson){
                    throw new Error ("erreur dans la récuperation du sous-type")
                }
                setModalGroups(responseJson)

            }catch(error){
                (error.message)
            }
        }
        loadSelectedSousType()
    },[selectedSousTypeId])


    /* Vue 3 */
    const [selectedGroupId, setSelectedGroupId] = useState("")
    const [editingPrestaId, setEditingPrestaId] = useState(null)
    const [actualPrestaName, setActualPrestaName] = useState("")
    const [actualPrestaPrice, setActualPrestaPrice] = useState("")
    const [actualPrestaDuration, setActualPrestaDuration] = useState("")



    return (
        <main className="cares">
         <h1 className="cares__title">Découvrez nos soins</h1>

            <section className="cares__section">
                {isAuthenticated &&
                    <button type="button" onClick={() => setModalIsOpen(true)} className="btn">Modifier</button>
                }
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

            <Modal isOpen={modalIsOpen} onClose={() => {setModalIsOpen(false) ; setModalVue("sousTypes")}} variant="modify" >
                {modalVue === "sousTypes" ?
                    <div>
                        {allSousTypes.map((type)=>(
                            <div key={type._id}>
                                {editingSousTypeId === type._id ?
                                    <div>
                                        <label htmlFor="sous-type-title">Choisir un titre :</label>
                                        <input id="sous-type-title" type="text" value={actualSousTypeName} onChange={(e)=> setActualSousTypeName(e.target.value)}/>
                                        <div>
                                            <button type="button" onClick={() => setEditingSousTypeId(null)}>Retour</button>
                                            <button type="button" onClick={() => {handleUpdateSousType(type._id) ; setEditingSousTypeId(null)}}>Valider le titre</button>
                                            <button type="button" onClick={() => {setModalVue("groups"); setSelectedSousTypeId(type._id)}}>Modifier le contenu</button>
                                        </div>
                                    </div>
                                :
                                    <div>
                                        <p>{type.name}</p>
                                        <div>
                                            <button type="button" onClick={() => {setEditingSousTypeId(type._id) ; setActualSousTypeName(type.name)}}>Modifier le titre</button>
                                            <button type="button" onClick={() => {setModalVue("groups"); setSelectedSousTypeId(type._id)}}>Modifier le contenu</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                : modalVue === "groups" ?
                    <div>
                        {modalGroups.map((group) => (
                            <div key={group._id}>
                                <label htmlFor="title-edit">Modifier le nom du groupe</label>
                                <input type="text" id="title-edit"/>
                                <label htmlFor="description-edit">Modifier la description</label>
                                <input type="text" id="description-edit"/>
                                <label htmlFor="photo-edit">Modifier la photo</label>
                                <input type="file" id="photo-edit"/>
                                <button type="button" onClick={() => {setModalVue("prestations") ; setSelectedGroupId(group._id)}} className="btn">Modifier les prestations</button>
                            </div>
                        ))}
                        <div>
                            <button type="button" onClick={() => setModalVue("sousTypes")} className="btn">Retour</button>
                            <button type="button" className="btn">Ajouter un groupe</button>
                        </div>
                    </div>
                : 
                    <div>
                        {prestations.filter(p => p.group === selectedGroupId).map((presta) => (
                            <div key={presta._id}>
                                {editingPrestaId === presta._id ?
                                <div>
                                    <div>
                                        <input id="presta-name" type="text" value={actualPrestaName} onChange={(e) => setActualPrestaName(e.target.value)}/>
                                        <input id="presta-price" type="text" value={actualPrestaPrice} onChange={(e) => setActualPrestaPrice(e.target.value)}/>
                                        <input id="presta-time" type="text" value={actualPrestaDuration} onChange={(e) => setActualPrestaDuration(e.target.value)}/>
                                    </div>
                                    <div>
                                        <button type="button" onClick={() => setEditingPrestaId(null)}>Retour</button>
                                        <button>Supprimer la prestation</button>
                                    </div>
                                </div>
                                :
                                <div>
                                    <p>{presta.name}</p>
                                    <p>{presta.price}</p>
                                    <p>{presta.duration}</p>
                                    <button type="button" onClick={() => {setEditingPrestaId(presta._id) ; setActualPrestaName(presta.name) ; setActualPrestaPrice(presta.price) ; setActualPrestaDuration(presta.duration)}}>Modifier la prestation</button>
                                </div>
                                }
                            </div>
                        ))}
                        <div>
                            <button type="button" onClick={() => setModalVue("groups")}>Retour</button>
                            <button>Ajouter une prestation</button>
                        </div>
                    </div>
                }
            </Modal>
        </main>
    )
}