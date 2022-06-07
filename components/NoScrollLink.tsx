import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

interface NoScrollLinkProps extends LinkProps {
    children: ReactNode
}

const NoScrollLink: React.FC<NoScrollLinkProps> = ({ children, href, passHref }) => (
    <Link href={href} passHref={passHref} scroll={false}>
        {children}
    </Link>
)

export default NoScrollLink