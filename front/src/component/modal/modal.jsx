import "./modal.scss"

export default function Modal({isOpen, onClose, children, variant = "side" }) {
    if (!isOpen) return null

    return (
        <div className="overlay" onClick={onClose}>
            <form className= {`modal modal--${variant}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </form>
        </div>
    )
}