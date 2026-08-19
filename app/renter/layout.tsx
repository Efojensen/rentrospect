import NavBar from "@/components/nav/NavBar"
import RoleGate from "@/components/RoleGate"

export default function RentalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <RoleGate role='renter'>
            <section className='flex flex-col min-h-full px-4 md:px-30'>
                <NavBar
                    location='Kumasi '
                />
                {children }
            </section>
        </RoleGate>
    )
}