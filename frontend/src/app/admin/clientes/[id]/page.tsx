import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
    FiArrowLeft,
    FiEdit2,
    FiMail,
    FiPhone,
    FiGlobe,
    FiBriefcase,
    FiCalendar,
    FiFolder
} from 'react-icons/fi'
import { auth } from '@/lib/auth/auth'
import { clientService } from '@/services/client.service'
import DeleteClientButton from '../DeleteClientButton'
import { Client } from '@/lib/db/types'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ClientDetailPage({ params }: PageProps) {
    const { id } = await params
    const session = await auth()
    const token = (session as { accessToken?: string })?.accessToken

    let client: Client & {
        projects?: { id: string; title: string; category: string }[];
        transactions?: { id: string; description: string; date: string | Date; type: 'INCOME' | 'EXPENSE'; amount: number }[];
    } | null = null
    try {
        client = await clientService.getClientById(id, token)
    } catch (error) {
        console.error('Error fetching client:', error)
    }

    if (!client) {
        notFound()
    }

    const formatDate = (date: Date | string) => {
        return new Intl.DateTimeFormat('es-AR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(new Date(date))
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(amount)
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                    <Link
                        href="/admin/clientes"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors mt-1"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {client.avatar ? (
                                <Image
                                    src={client.avatar}
                                    alt={client.name}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-primary font-semibold text-2xl">
                                    {client.name.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
                            {client.company && (
                                <p className="text-gray-600 mt-1 flex items-center gap-2">
                                    <FiBriefcase className="w-4 h-4 text-gray-400" />
                                    {client.company}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 ml-auto sm:ml-0 mt-2 sm:mt-0">
                    <Link
                        href={`/admin/clientes/${client.id}/editar`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                        <FiEdit2 className="w-4 h-4" />
                        Editar
                    </Link>
                    <DeleteClientButton clientId={client.id} clientName={client.name} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Notes */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="px-6 py-5 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Notas sobre el cliente</h2>
                        </div>
                        <div className="px-6 py-5">
                            {client.notes ? (
                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{client.notes}</p>
                            ) : (
                                <p className="text-gray-500 italic">No hay notas registradas para este cliente.</p>
                            )}
                        </div>
                    </div>

                    {/* Projects associated */}
                    {client.projects && client.projects.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="px-6 py-5 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">Proyectos asociados ({client.projects.length})</h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {client.projects.map((project: { id: string; title: string; category: string }) => (
                                    <div key={project.id} className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                <FiFolder className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">{project.title}</h3>
                                                <p className="text-sm text-gray-500">{project.category}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/admin/proyectos/${project.id}`}
                                            className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                                        >
                                            Ver proyecto
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Contact Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-5 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Contacto</h2>
                        </div>
                        <div className="p-5 space-y-4">
                            {client.email && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                        <FiMail className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Email</p>
                                        <a href={`mailto:${client.email}`} className="text-sm font-medium text-primary hover:underline">
                                            {client.email}
                                        </a>
                                    </div>
                                </div>
                            )}
                            {client.phone && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                        <FiPhone className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Teléfono</p>
                                        <a href={`tel:${client.phone}`} className="text-sm font-medium text-primary hover:underline">
                                            {client.phone}
                                        </a>
                                    </div>
                                </div>
                            )}
                            {client.website && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                        <FiGlobe className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Sitio web</p>
                                        <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                                            {client.website}
                                        </a>
                                    </div>
                                </div>
                            )}
                            {!client.email && !client.phone && !client.website && (
                                <p className="text-sm text-gray-500 italic text-center py-2">
                                    No hay información de contacto.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-5 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Resumen</h2>
                        </div>
                        <div className="p-5 space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-gray-100 rounded-lg">
                                    <FiCalendar className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Cliente desde</p>
                                    <p className="font-medium text-gray-900 mt-0.5">{client.createdAt ? formatDate(client.createdAt) : '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transactions */}
                    {client.transactions && client.transactions.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="p-5 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">Últimas transacciones</h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {client.transactions.slice(0, 5).map((transaction: { id: string; description: string; date: string | Date; type: 'INCOME' | 'EXPENSE'; amount: number }) => (
                                    <div key={transaction.id} className="flex items-center justify-between px-5 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">{transaction.description}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{formatDate(transaction.date)}</p>
                                        </div>
                                        <span className={`font-semibold text-sm ${transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {client.transactions.length > 5 && (
                                <div className="p-3 border-t border-gray-100">
                                    <Link
                                        href={`/admin/finanzas?clientId=${client.id}`}
                                        className="block text-center text-sm text-primary font-medium hover:underline"
                                    >
                                        Ver todo
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
