interface ParagraphProps {
    children: string
    subtext?: string
    className?: string
}

export default function ImageDescription({
    children,
    subtext,
    className,
}: ParagraphProps) {
    return (
        <div className="grid justify-items-center place-items-center">
            <div className={`space-y-2  ${className}`}>
                <h1 className="text-3xl font-bold lg:text-2xl">{children}</h1>
                {subtext && (
                    <h2 className="font-light text-muted-foreground lg:text-lg">
                        {subtext}
                    </h2>
                )}
            </div>
        </div>
    )
}