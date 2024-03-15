import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import { ImageFrame } from "@/components/image-frame"

export default function HeroHeader() {
    return (
        <>
            <section className="space-y-8 pb-12 pt-4 md:space-y-16 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
                        Monitor Security.
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Analyse suspicious files, domains, IPs and URLs to detect malware and other breaches, automatically share them with the security community.
                    </p>
                    <div className="space-x-4">
                        <Link href="/signin" className={cn(buttonVariants({ size: "lg" }))}>
                            Get Started
                        </Link>
                    </div>
                </div>
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <ImageFrame>
                        <Image
                            className="rounded-lg"
                            src="/images/hero-img.png"
                            width={1364}
                            height={866}
                            quality={100}
                            alt="Header image"
                        />
                    </ImageFrame>
                </div>
            </section>
        </>
    )
}