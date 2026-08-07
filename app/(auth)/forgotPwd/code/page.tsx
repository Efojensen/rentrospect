import CodeForPwd from "./codeForPwdClient";


export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ hashedMail?: string }>;
}) {
    const { hashedMail } = await searchParams;

    return <CodeForPwd hashedMail={hashedMail ?? ""} />;
}