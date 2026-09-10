import "./staffProfile.scss"

export default function StaffProfile({src, srcSet, alt, title, text, speciality}) {
    return (
        <article className="profile-card">
            <img src={src} srcSet={srcSet} sizes="(min-width: 768px) 200px, 130px" alt={alt || "photo du personnel"} className="home__staff-profile--pics" />
            <h3 className="home__staff-profile--title">{title}</h3>
            <h4 className="home__staff-profile--speciality">{speciality}</h4>
            <p className="home__staff-profile--text">{text}</p>
        </article>
    )
}