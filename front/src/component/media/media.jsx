import { isVideo } from "@/utils/isVideo"

/* Affiche une <img> ou une <video> selon l'extension du fichier.
Images chargées seulement à l'approche de l'écran (loading="lazy") : passer loading="eager"
pour une image visible dès l'arrivée sur la page (ex. bannière d'accueil) */
export default function Media({ src, srcSet, sizes, alt, videoProps, ...rest }) {
    if (isVideo(src)) {
        return <video src={src} autoPlay muted loop playsInline {...videoProps} {...rest}></video>
    }
    return <img src={src} srcSet={srcSet || undefined} sizes={sizes} alt={alt} loading="lazy" decoding="async" {...rest}/>
}
