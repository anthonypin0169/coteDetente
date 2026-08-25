import "./makeup.scss"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { apiFetch } from "@/utils/api"
import Modal from "@/component/modal/modal"

export default function Makeup() {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const token = useSelector((state) => state.auth.token)


    /* Récuperer le type de la page */
    const [type, setType] = useState([])
    const actualTypeId = type._id

    useEffect(() => {
        const loadTypes = async () => {
            try{
                const { data } = await apiFetch("/api/types")

                if(!data){
                    throw new Error("erreur lors de la récuperation des types")
                }
                const found = data.find((t) => t.route === "/maquillage")
                setType(found)

            }catch(error){
                (error.message)
            }
        }
        loadTypes()
    },[])


    /* Récuperer le sous-type correspondant */
    const [sousType, setSousType] = useState([])
    const actualSousTypeId = sousType._id

    useEffect(() => {
        if (!actualTypeId) return

        const loadSousTypes = async () => {
            try{
                const { data } = await apiFetch(`/api/sous-types/type/${actualTypeId}`)

                if (!data){
                    throw new Error("Erreur lors de la récuperation des sous types")
                }
                setSousType(data[0])

            }catch(error){
                (error.message)
            }
        }
        loadSousTypes()
    },[actualTypeId])


    /* Récuperer les groupes */
    const [groups, setGroups] = useState([])
    const actualGroupId = groups._id

    useEffect(() => {
        if (!actualSousTypeId) return

        const loadGroups = async () => {
            try{
                const { data } = await apiFetch(`/api/groups/sous-type/${actualSousTypeId}`)

                if (!data){
                    throw new Error("Erreur lors de la résuperation des groupes")
                }
                setGroups(data[0])
            }catch(error){
                (error.message)
            }
        }
        loadGroups()
    },[actualSousTypeId])


    /* Récuperer les prestations */
    const [presta, setPresta] = useState([])

    useEffect(() => {
        if (!actualGroupId) return

        const loadPrestations = async () => {
            try{
                const { data } = await apiFetch(`/api/prestations/group/${actualGroupId}`)

                if (!data){
                    throw new Error("Erreur lors de la récuperation des prestations")
                }

                setPresta(data)

            }catch(error){
                (error.message)
            }
        }
        loadPrestations()
    },[actualGroupId])


    /* Boite modale */
    const [modalIsOpen, setModalIsOpen] = useState(false)

    /* Ajouter une prestation */
    const [newNamePresta, setNewNamePresta] = useState("")
    const [newPricePresta, setNewPricePresta] = useState("")
    const [newPrestaDuration, setNewPrestaDuration] = useState("")
    const [isAddingPresta, setIsAddingPresta] = useState(false)

    const handleCreatePresta = async () => {
        try{
            const { ok, data : newPrestaUploaded } = await apiFetch("/api/prestations",{
                method : "POST",
                body: { 
                        name : newNamePresta, 
                        price : newPricePresta, 
                        duration : newPrestaDuration, 
                        group: actualGroupId 
                    }, token
            })
            
            if(ok){
                setNewNamePresta("")
                setNewPricePresta("")
                setNewPrestaDuration("")
                setPresta((prev)=>[...prev, newPrestaUploaded])
                setIsAddingPresta(false)
            }
        }catch(error){
            (error.message)
        }
    }

    /* Modifier une prestation */
    const [actualPrestaName, setActualPrestaName] = useState("")
    const [actualPrestaPrice, setActualPrestaPrice] = useState("")
    const [actualPrestaDuration, setActualPrestaDuration] = useState("")
    const [actualPrestaDescription, setActualPrestaDescription] = useState("")
    const [actualPrestaVideo, setActualPrestaVideo] = useState("")    
    const [editingPrestaId, setEditingPrestaId] = useState("")

    const handleUpdatePresta = async (id) => {
        const formData = new FormData()
        formData.append("name", actualPrestaName)
        formData.append("price", actualPrestaPrice)
        formData.append("duration", actualPrestaDuration)
        formData.append("description", actualPrestaDescription)
        if (actualPrestaVideo) formData.append("video", actualPrestaVideo)

        try{
            const { ok, data : updatedPresta } = await apiFetch(`/api/prestations/${id}`,{
                method : "PUT",
                body : formData,
                token
            })
            if(ok){
                setActualPrestaVideo("")
                setPresta(prev => prev.map(p => p._id === updatedPresta._id ? updatedPresta : p))
            }

        }catch(error){
            (error.message)
        }                
    }

    /* Supprimer une prestation */

    const handleDeletePresta = async (id) => {
        try{
            const { ok } = await apiFetch(`/api/prestations/${id}`,{
                method : "DELETE",
                token
            })

            if(ok){
                setPresta(prev => prev.filter(p => p._id !== id))
            }

        }catch(error){
            (error.message)
        }            
    }


    return (
        <main>

        </main>
    )
}