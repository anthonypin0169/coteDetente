import { useState, useEffect } from "react"

export default function PhotoInput({ id, className, onChange }) {

    const [preview, setPreview] = useState(null)

    useEffect(() => {
        return () => { if (preview) URL.revokeObjectURL(preview) }
    }, [preview])

    const handleChange = (e) => {
        const file = e.target.files[0]
        setPreview(file ? URL.createObjectURL(file) : null)
        onChange(file)
    }

    return (
        <input
            id={id}
            type="file"
            className={className}
            style={preview ? { backgroundImage: `url(${preview})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
            onChange={handleChange}
        />
    )
}
