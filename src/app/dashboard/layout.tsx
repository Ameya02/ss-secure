import { dashboardLinks } from "@/config/link"

import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import Navbar from "@/components/NavBar"
import Footer from "@/components/layout/footer"


interface DashboardLayoutProps {
    children: React.ReactNode
}

export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {

    return (
        <div className="flex min-h-screen flex-col space-y-9">
            <Navbar />
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav items={dashboardLinks.data} />
                </aside>
                <main className="flex w-full flex-1 flex-col">{children}</main>
            </div>
            <Footer />
        </div>
    )
}