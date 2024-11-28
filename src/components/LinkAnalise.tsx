import Link from 'next/link';
import React from 'react'

interface LinkAnaliseProps {
    label: string;
    url: string;
    active: boolean;
}

const LinkAnalise = ({ label, url, active }: LinkAnaliseProps) => {
    return (
        <Link
            className={`py-1.5 px-10 rounded-full shadow ${active ? 'bg-[#154295] text-white' : 'bg-gray-50'}`}
            href={url}
        >
            {label}
        </Link>
    )
}

export default LinkAnalise