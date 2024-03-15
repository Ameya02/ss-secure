import { PWARedirect } from "@/components/pwa-re"
import Hero from "@/components/pages/hero"
import FeatureCards from "@/components/pages/feature-cards"
import ImageOverview from "@/components/image-overview"
import PricePlan from "@/components/priceplan"

export default function Home() {
    return (
        <main>
            <Hero />
            <FeatureCards />
            <ImageOverview />
            <PWARedirect />
            <PricePlan />
        </main>
    )
}