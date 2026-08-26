import PreviewClient from './previewClient'

const PreviewPage = async ({
    params,
}: {
    params: Promise<{ assetId: string }>;
}) => {
    const { assetId } = await params

    return <PreviewClient assetId={assetId} />
}

export default PreviewPage
