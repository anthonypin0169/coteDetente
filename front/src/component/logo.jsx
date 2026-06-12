import "./logo.scss"

export default function Logo ({src, alt="coté-détente", className="logo", onClick}) {
    return (
        <img
        src={src}
        alt={alt}
        className={className}
        onClick={onClick}
        />
    )
}
