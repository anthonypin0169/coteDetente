import "./logo.scss"

export default function Logo ({src, alt="coté-détente", className="logo"}) {
    return (
        <img
        src={src}
        alt={alt}
        className={className}
        />
    )
}
