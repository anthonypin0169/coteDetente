/* Vrai si l'URL pointe vers une vidéo (selon l'extension du fichier) */
export const isVideo = (url) => /\.(mp4|webm|mov)$/i.test(url || "")
