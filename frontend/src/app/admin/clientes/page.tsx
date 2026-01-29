import { Suspense } from 'react'
import Link from 'next/link'
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiMail, FiPhone, FiUsers, FiExternalLink } from 'react-icons/fi'
import DeleteClientButton from './DeleteClientButton'

interface SearchParams {
  search?: string
}

async function getClients(searchParams: SearchParams) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/clients`)
  if (searchParams.search) url.searchParams.append('search', searchParams.search)
  const res = await fetch(url.toString())
  if (!res.ok) return []
  return res.json()
}

async function ClientsTable({ searchParams }: { searchParams: SearchParams }) {
  const clients = await getClients(searchParams)

  if (clients.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <FiUsers className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay clientes</h3>
        <p className="text-gray-500 mb-4">
          {searchParams.search
            ? 'No se encontraron clientes con los filtros aplicados'
            : 'Comienza agregando tu primer cliente'}
        </p>
        <Link
          href="/admin/clientes/nuevo"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Agregar cliente
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Cliente</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Contacto</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Proyectos</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Transacciones</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
              {clients.map((client: { id: string; name: string; avatar?: string; company?: string; email?: string; phone?: string; website?: string; projects?: { id: string; name: string }[]; transactions?: { id: string; amount: number }[] }) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {client.avatar ? (
                        <img 
                          src={client.avatar} 
                          alt={client.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-primary font-semibold">
                          {client.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      {client.company && (
                        <p className="text-sm text-gray-500">{client.company}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {client.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiMail className="w-4 h-4 text-gray-400" />
                        <a href={`mailto:${client.email}`} className="hover:text-primary">
                          {client.email}
                        </a>
                      </div>
                    )}
                    {client.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiPhone className="w-4 h-4 text-gray-400" />
                        <a href={`tel:${client.phone}`} className="hover:text-primary">
                          {client.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {Array.isArray(client.projects) ? client.projects.length : 0}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {Array.isArray(client.transactions) ? client.transactions.length : 0}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {typeof client.website === 'string' && client.website && (
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Sitio web"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <Link
                      href={`/admin/clientes/${client.id}/editar`}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </Link>
                    <DeleteClientButton clientId={client.id} clientName={client.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function LoadingTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="animate-pulse">
        <div className="h-14 bg-gray-50 border-b border-gray-100"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function ClientsPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">Gestiona todos los clientes de Folkode</p>
        </div>
        <Link
          href="/admin/clientes/nuevo"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
        >
          <FiPlus className="w-5 h-5" />
          Nuevo Cliente
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <form className="flex gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="search"
              defaultValue={params.search}
              placeholder="Buscar clientes por nombre, email o empresa..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Buscar
          </button>
        </form>
      </div>

      <Suspense fallback={<LoadingTable />}>
        <ClientsTable searchParams={params} />
      </Suspense>
    </div>
  )
}
