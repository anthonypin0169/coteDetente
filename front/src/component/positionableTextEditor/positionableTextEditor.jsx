import { useRef, useState } from "react"
import "./positionableTextEditor.scss"

export default function PositionableTextEditor({ imageUrl, elements, positions, onPositionsChange }) {

    const containerRef = useRef(null)
    const [draggingKey, setDraggingKey] = useState(null)

    const updatePositionFromEvent = (e) => {
        if (!draggingKey || !containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100))
        const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100))

        onPositionsChange({ ...positions, [draggingKey]: { x, y } })
    }

    return (
        <div
            className="positionable-editor"
            ref={containerRef}
            style={{ backgroundImage: `url(${imageUrl})` }}
            onMouseMove={updatePositionFromEvent}
            onMouseUp={() => setDraggingKey(null)}
            onMouseLeave={() => setDraggingKey(null)}
        >
            {elements.filter((el) => el.text).map((el) => (
                <div
                    key={el.key}
                    className={`positionable-editor__item positionable-editor__item--${el.key}`}
                    style={{
                        left: `${positions[el.key]?.x ?? 50}%`,
                        top: `${positions[el.key]?.y ?? 50}%`
                    }}
                    onMouseDown={() => setDraggingKey(el.key)}
                >
                    {el.text}
                </div>
            ))}
        </div>
    )
}
