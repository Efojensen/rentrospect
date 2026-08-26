import RoleGate from "@/components/RoleGate"

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <RoleGate role='vendor'>
            <section className='flex flex-col min-h-full px-4'>
                {children}
            </section>
        </RoleGate>
    )
}
