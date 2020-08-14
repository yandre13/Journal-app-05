export const fileUpload = async (file) => {
	const url = 'https://api.cloudinary.com/v1_1/dwecduvll/upload'

	const form = new FormData()
	form.append('upload_preset', 'react-journal')
	form.append('file', file, file.name)

	try {
		const res = await fetch(url, { method: 'POST', body: form })
		const json = await res.json()
		return json.secure_url || null
	} catch (e) {
		console.log(e)
		throw e
	}
}
