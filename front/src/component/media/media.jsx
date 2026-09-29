export const isVideo = (url) => /\.(mp4|webm|mov)$/i.test(url || "")

/* Affiche une <img> ou une <video> selon l'extension du fichier */
export default function Media({ src, srcSet, sizes, alt, videoProps, ...rest }) {
    if (isVideo(src)) {
        return <video src={src} autoPlay muted loop playsInline {...videoProps} {...rest}></video>
    }
    return <img src={src} srcSet={srcSet || undefined} sizes={sizes} alt={alt} {...rest}/>
}
