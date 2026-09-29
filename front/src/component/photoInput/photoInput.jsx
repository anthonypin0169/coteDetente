import { useState, useEffect } from "react"

export default function PhotoInput({ id, className, onChange, accept = "image/*,video/*" }) {

    const [preview, setPreview] = useState(null)

    useEffect(() => {
        return () => { if (preview) URL.revokeObjectURL(preview) }
    }, [preview])

    const handleChange = (e) => {
        const file = e.target.files[0]
        // Pas d'aperçu en fond pour une vidéo
        setPreview(file && file.type.startsWith("image/") ? URL.createObjectURL(file) : null)
        onChange(file)
    }

    return (
        <input
            id={id}
            type="file"
            accept={accept}
            className={className}
            style={preview ? { backgroundImage: `url(${preview})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
            onChange={handleChange}
        />
    )
}
