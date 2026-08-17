export async function apiFetch(url, { method = "GET", body, token } = {}) {
    const headers = {}
    if (token) headers.Authorization = `Bearer ${token}`

    let finalBody = body
    if (body && !(body instanceof FormData)) {
        headers["Content-Type"] = "application/json"
        finalBody = JSON.stringify(body)
    }

    const response = await fetch(url, { method, headers, body: finalBody })
    const data = await response.json().catch(() => null)

    return { ok: response.ok, data }
}
