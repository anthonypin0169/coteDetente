const STORAGE_KEY = "giftCardDraft"

export function getGiftCardDraft() {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export function saveGiftCardDraft(draft) {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    } catch {
        /* sessionStorage indisponible */
    }
}

export function clearGiftCardDraft() {
    try {
        sessionStorage.removeItem(STORAGE_KEY)
    } catch {
        /* sessionStorage indisponible */
    }
}
