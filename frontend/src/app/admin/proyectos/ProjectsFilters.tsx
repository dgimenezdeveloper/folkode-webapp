'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

export default function ProjectsFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentSearch = searchParams.get('search') || ''
    const [search, setSearch] = useState(currentSearch)

    useEffect(() => {
        const timeout = setTimeout(() => {
            // Evita push innecesario
            if (search === currentSearch) return

            const params = new URLSearchParams(searchParams.toString())

            if (search.trim()) {
                params.set('search', search.trim())
            } else {
                params.delete('search')
            }

            // Siempre volvemos a página 1 al buscar
            params.delete('page')

            router.push(`?${params.toString()}`)
        }, 500)

        return () => clearTimeout(timeout)
    }, [search, searchParams, router, currentSearch])

    return (
        <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar proyectos o clientes..."
                className="!w-full bg-[#161f30] rounded border border-white/5 !pl-10 !pr-4 !py-2.5 border text-black rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-slate-600"
            />
        </div>
    )
}