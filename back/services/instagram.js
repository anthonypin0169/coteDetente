const GRAPH_API_BASE = 'https://graph.facebook.com/v19.0'

const publishPhotoToInstagram = async (imageUrl, caption) => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID

  if (!accessToken || !businessAccountId) {
    throw new Error('Configuration Instagram manquante (INSTAGRAM_ACCESS_TOKEN / INSTAGRAM_BUSINESS_ACCOUNT_ID)')
  }

  const containerParams = new URLSearchParams({ image_url: imageUrl, caption, access_token: accessToken })
  const containerResponse = await fetch(`${GRAPH_API_BASE}/${businessAccountId}/media?${containerParams}`, { method: 'POST' })
  const containerData = await containerResponse.json()
  if (!containerResponse.ok) {
    throw new Error(containerData.error?.message || 'Erreur lors de la création du conteneur média Instagram')
  }

  const publishParams = new URLSearchParams({ creation_id: containerData.id, access_token: accessToken })
  const publishResponse = await fetch(`${GRAPH_API_BASE}/${businessAccountId}/media_publish?${publishParams}`, { method: 'POST' })
  const publishData = await publishResponse.json()
  if (!publishResponse.ok) {
    throw new Error(publishData.error?.message || 'Erreur lors de la publication Instagram')
  }

  return publishData
}

module.exports = { publishPhotoToInstagram }
