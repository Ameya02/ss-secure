import Navbar from "@/components/NavBar"
import Footer from "@/components/layout/footer"
import { User } from "@clerk/nextjs/server"


interface FrontPageLayoutProps {
    children: React.ReactNode
}

export default async function FrontPageLayout({
    children,
}: FrontPageLayoutProps) {
    const user = await User;

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}