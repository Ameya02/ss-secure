import { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
    name: "SecureFlod",
    author: "su-shubham",
    description:
        "Analyse suspicious files, domains, IPs and URLs to detect malware and other breaches, automatically share them with the security community.",
    keywords: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Radix UI",
        "shadcn/ui",
        "Habits",
        "Activity",
        "Track",
        "Monitor",
    ],
    url: {
        base: `${process.env.NEXT_PUBLIC_APP_URL}`,
        author: "",
    }
}