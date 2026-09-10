import "./logo.scss"

export default function Logo ({src, alt, className="logo", onClick, width, height}) {
    return (
        <img
        src={src}
        alt={alt}
        className={className}
        onClick={onClick}
        width={width}
        height={height}
        />
    )
}
