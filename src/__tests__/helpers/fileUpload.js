import { fileUpload } from 'helpers/fileUpload'
import cloudinary from 'cloudinary'

cloudinary.config({
	cloud_name: 'dwecduvll',
	api_key: '834925743854454',
	api_secret: 'TWrsD0Mnvy9GzCcxB4xj0t3VSYQ',
})

describe('tests in fileUpload', () => {
	test('should upload a file and return a url', async () => {
		const res = await fetch(
			'https://3.bp.blogspot.com/-oswOSXLkXrk/XK1JsehHzWI/AAAAAAAACO0/RvJ52hy_JiYTAwZZSKVGVWoL3tWXA2MEACLcBGAs/s1600/IMG_20190407_193106.jpg'
		)
		const blob = await res.blob()
		const file = new File([blob], 'image.jpg')
		const url = await fileUpload(file)

		expect(typeof url).toBe('string')
		const segments = url.split('/')
		const imageId = segments[segments.length - 1].replace('.jpg', '')
		await cloudinary.v2.api.delete_resources(imageId)
	})

	test('should return an error', async () => {
		const file = new File([], 'image.jpg')
		const url = await fileUpload(file)
		expect(url).toBe(null)
	})
})
