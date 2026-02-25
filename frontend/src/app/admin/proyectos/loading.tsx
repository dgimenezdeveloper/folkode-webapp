export default function ProjectsLoading() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                    <div className="h-4 w-64 bg-gray-100 rounded-lg animate-pulse"></div>
                </div>
                <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Filters Skeleton */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="w-full sm:w-48 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="w-full sm:w-48 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <th key={i} className="px-6 py-4">
                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5].map((row) => (
                                <tr key={row}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-6 w-24 bg-gray-100 rounded-full animate-pulse"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-6 w-24 bg-gray-100 rounded-full animate-pulse"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse"></div>
                                            <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
