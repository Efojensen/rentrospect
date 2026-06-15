import SideNav from "@/components/nav/SideNav"
import VendorNavBar from "@/components/nav/VendorNavBar"

export default function RentalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='flex min-h-screen bg-white'>
            <SideNav />

            <div className='flex flex-col flex-1 md:ml-20'>
                <VendorNavBar location='Kumasi'/>
                {children}
            </div>

        </section>
    )
}