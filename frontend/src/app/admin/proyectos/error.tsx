'use client'

import { useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi'

export default function ProjectsError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        // Aquí puedes loggear el error a un servicio como Sentry si lo deseas
        console.error('Projects Error:', error)
    }, [error])

    const handleRetry = () => {
        startTransition(() => {
            router.refresh()
            reset()
        })
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#0d1421] rounded-xl shadow-sm border border-white/5 p-8 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <FiAlertCircle className="w-8 h-8 text-red-500" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 !mb-4">
                ¡Ups! Algo salió mal
            </h2>

            <p className="text-gray-600 !mb-8 max-w-md">
                No pudimos cargar la información de los proyectos.
                {error.message ? ` Detalles: ${error.message}` : ' El servidor podría estar temporalmente fuera de servicio.'}
            </p>

            <button
                onClick={handleRetry}
                disabled={isPending}
                className="group inline-flex items-center gap-2 !px-6 !py-2.5 bg-primary cursor-pointer text-white border-2 border-white/5 hover:border-white/10 rounded-lg hover:bg-primary-600 disabled:!bg-gray-500 transition-colors font-medium shadow-sm hover:shadow"
            >
                <FiRefreshCw className={`w-4 h-4 group-hover:rotate-180 transition-transform duration-300 ${isPending ? 'animate-spin' : ''}`} />
                {isPending ? 'Reintentando...' : 'Intentar nuevamente'}
            </button>
        </div>
    )
}
