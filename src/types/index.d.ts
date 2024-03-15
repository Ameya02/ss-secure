import { IconKeys } from "@/components/icons"

export type NavItem = {
    title: string
    disabled?: boolean
    external?: boolean
    icon?: IconKeys
} & (
        | {
            href: string
            items?: never
        }
        | {
            href?: string
            items: NavLink[]
        }
    )

export type Navigation = {
    data: NavItem[]
}

export type SearchParams = {
    from: string
    to: string
}

export type ActivityEntry = {
    name: string,
    malicious: number, // Change this to number
    color: string,
}


export type ActivityByDate = {
    date: string
    count: number
}
export type SiteConfig = {
    name: string
    author: string
    description: string
    keywords: Array<string>
    url: {
        base: string
        author: string
    }
}
