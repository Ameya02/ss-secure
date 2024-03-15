import Image from "next/image"

import HeadingText from "@/components/heading-text"
import { ImageFrame } from "@/components/image-frame"
import ImageDescription from "./image-description"

export default function ImageOverview() {
    return (
        <section className="container py-12 lg:py-20" id="overview">
            <div className="flex flex-col gap-8 text-center">
                <HeadingText subtext="Get started with the app">
                    Discover what you can do
                </HeadingText>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                    <ImageFrame>
                        <Image
                            className="rounded-lg"
                            src="/images/image-1.png"
                            width="1280"
                            height="720"
                            alt="Showcase image"
                        />
                    </ImageFrame>
                    <ImageDescription subtext="Our built-in scanning feature enhances online security, allowing users to assess the safety of each link for a safer browsing experience">
                    Streamlined Link Management and Security Scanner
                    </ImageDescription>
                    <ImageDescription subtext="Our integrated scanning feature ensures enhanced online security by enabling users to evaluate the safety of each link for a more secure browsing experience.">
                    Link Management and Security Scanner Analysis
                    </ImageDescription>

                    <ImageFrame>
                        <Image
                            className="rounded-lg"
                            src="/images/image-2.png"
                            width="1280"
                            height="720"
                            alt="Showcase image"
                        />
                    </ImageFrame>
                    <ImageFrame>
                        <Image
                            className="rounded-lg"
                            src="/images/activity-stats.jpg"
                            width="1280"
                            height="720"
                            alt="Showcase image"
                        />
                    </ImageFrame>
                    <ImageDescription subtext="Get started with the app">
                        Discover what you can do
                    </ImageDescription>
                </div>
            </div>
        </section>
    )
}