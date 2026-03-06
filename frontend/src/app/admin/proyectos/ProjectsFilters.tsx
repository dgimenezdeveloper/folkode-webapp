'use client'

import { useRouter, useSearchParams, } from 'next/navigation'
import { ProjectCategory, ProjectStatus } from '@/lib/db/types'
import { useCallback, useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

const categoryLabels: Record<ProjectCategory, string> = {
    ECOMMERCE: 'E-commerce',
    LANDING_PAGE: 'Landing Page',
    CORPORATIVO: 'Corporativo',
    MULTIMEDIA: 'Multimedia',
    WEB: 'Web',
    SOFTWARE: 'Software'
}

const statusLabels: Record<ProjectStatus, string> = {
    IN_DEVELOPMENT: 'En desarrollo',
    COMPLETED: 'Completado',
    MAINTENANCE: 'Mantenimiento',
    PAUSED: 'Pausado'
}

export default function ProjectsFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const category = searchParams.get('category') || ''
    const status = searchParams.get('status') || ''
    const from = searchParams.get('from') || ''
    const [search, setSearch] = useState('')


    const updateParams = useCallback((values: {
        search?: string
        category?: string
        status?: string
        from?: string
    }) => {

        const params = new URLSearchParams(window.location.search)

        if (values.search !== undefined) {
            const trimmed = values.search.trim()
            trimmed ? params.set('search', trimmed) : params.delete('search')
        }

        if (values.category !== undefined) {
            values.category ? params.set('category', values.category) : params.delete('category')
        }

        if (values.status !== undefined) {
            values.status ? params.set('status', values.status) : params.delete('status')
        }

        if (values.from !== undefined) {
            values.from ? params.set('from', values.from) : params.delete('from')
        }

        params.delete('page')

        router.replace(`?${params.toString()}`)
    }, [router])

    // debounce SOLO para search
    useEffect(() => {
        const currentSearch = searchParams.get('search') || ''

        if (search === currentSearch) return

        const timeout = setTimeout(() => {
            updateParams({ search })
        }, 400)

        return () => clearTimeout(timeout)

    }, [search, updateParams, searchParams])


    return (
        <>
            <div className="w-[25%] flex flex-col items-start flex-1 md:flex-initial">
                <span className='!w-fit !h-7 !text-slate-500'>
                    Buscar proyectos / clientes:
                </span>
                <div className="relative w-full">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar proyectos o clientes..."
                        className="!w-full bg-[#161f30] rounded border border-white/5 !pl-10 !pr-4 !py-2.5 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-slate-600"
                    />
                </div>
            </div>
            <div className='flex flex-col'>
                <span className='!w-fit !h-7 !text-slate-500'>
                    Filtrar por categoría:
                </span>

                <select
                    value={category}
                    onChange={(e) => {
                        const value = e.target.value
                        updateParams({
                            category: value,
                            status: status // mantiene el estado actual
                        })
                    }}
                    className="!px-2 !py-2.5 border bg-[#161f30] text-white border-white/5 rounded-lg"
                >
                    <option value="">Todas las categorías</option>

                    {Object.entries(categoryLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </div>

            <div className='flex flex-col'>
                <span className='!w-fit !h-7 !text-slate-500'>
                    Filtrar por estado:
                </span>

                <select
                    value={status}
                    onChange={(e) => {
                        const value = e.target.value
                        updateParams({ status: value })
                    }}
                    className="!px-2 !py-2.5 border bg-[#161f30] text-white border-white/5 rounded-lg"
                >
                    <option value="">Todos los estados</option>

                    {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </div>

            <div className='flex flex-col'>
                <span className='!w-fit !h-7 !text-slate-500'>
                    Fecha desde:
                </span>

                <input
                    type="date"
                    value={from}
                    onChange={(e) => {
                        const value = e.target.value
                        updateParams({ from: value })
                    }}
                    className="!px-2 !py-2.5 border bg-[#161f30] text-white border-white/5 rounded-lg"
                />
            </div>
        </>
    )
}