export async function uploadImages(
    files: File[]
): Promise<string[]> {

    const uploadedUrls: string[] = []

    for (const file of files) {

        const formData = new FormData()

        formData.append('file', file)

        const response = await fetch(
            '/api/upload',
            {
                method: 'POST',
                body: formData,
            }
        )

        if (!response.ok) {
            throw new Error('Failed to upload image')
        }

        const data = await response.json()

        uploadedUrls.push(data.url)
    }

    return uploadedUrls
}