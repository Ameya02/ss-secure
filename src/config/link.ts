import { Navigation } from "@/types";

export const dashboardLinks: Navigation = {
    data: [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: "dashboard",
        },
        {
            title: "Bucket",
            href: "/dashboard/scan",
            icon: "bucket",
        }
    ],
}

export const navLinks: Navigation = {
    data: [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "Features",
            href: "/#features",
        },
        {
            title: "Pricing",
            href: "/#pricing",
        },
        {
            title: "Dashboard",
            href: "/dashboard",
        },
    ],
}
