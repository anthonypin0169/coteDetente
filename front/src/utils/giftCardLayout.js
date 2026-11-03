/* Découpage du message de la carte cadeau en lignes.
Copie identique côté back (back/utils/giftCardLayout.js) pour que la preview corresponde à l'image envoyée */
export const GIFT_MESSAGE_MAX_LENGTH = 150
const GIFT_MESSAGE_LINE_LENGTH = 42

export const wrapGiftMessage = (message = "") => {
    const lines = []
    String(message).slice(0, GIFT_MESSAGE_MAX_LENGTH).split("\n").forEach((paragraph) => {
        let line = ""
        paragraph.trim().split(/\s+/).filter(Boolean).forEach((word) => {
            if (line && (line + " " + word).length > GIFT_MESSAGE_LINE_LENGTH) {
                lines.push(line)
                line = word
            } else {
                line = line ? `${line} ${word}` : word
            }
        })
        if (line) lines.push(line)
    })
    return lines
}
