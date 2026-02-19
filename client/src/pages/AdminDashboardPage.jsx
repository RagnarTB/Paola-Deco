import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllServices, deleteService, updateService } from '../api/services.api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { ServiceModal } from '../components/ServiceModal';

export function AdminDashboardPage() {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);

    // Estados de filtros y paginación
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Debounce para búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            loadServices();
        }, 500);

        return () => clearTimeout(timer);
    }, [search, page]);

    const loadServices = async () => {
        setLoading(true);
        try {
            const res = await getAllServices({
                page,
                search,
                limit: 5
            });

            setServices(Array.isArray(res.data?.services) ? res.data.services : []);
            setTotalPages(res.data?.totalPages || 1);
        } catch (error) {
            console.error("Error cargando servicios:", error);
            toast.error("Error cargando servicios");
        } finally {
            setLoading(false);
        }
    };

    // Activar / Desactivar servicio
    const handleToggleStatus = async (service) => {
        try {
            await updateService(service._id, {
                isActive: !service.isActive
            });
            loadServices();
            toast.success(`Servicio ${service.isActive ? 'desactivado' : 'activado'}`);
        } catch (error) {
            console.error(error);
            toast.error("Error al cambiar el estado");
        }
    };

    // Eliminar servicio con SweetAlert
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ee2b6c',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteService(id);
                toast.success('Servicio eliminado');
                loadServices();
            } catch (error) {
                toast.error('Error al eliminar');
            }
        }
    };

    return (
        <div className="w-full font-display pb-20">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                {/* Header del Dashboard */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Servicios</h2>
                    <p className="text-sm text-gray-500 mt-1">Administra tu catálogo.</p>
                </div>

                <Link
                    to="/admin/crear"
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all"
                >
                    <span className="material-symbols-outlined">add</span>
                    Nuevo Servicio
                </Link>
            </div>

            {/* BARRA DE BÚSQUEDA */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex gap-4 items-center">
                <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar servicio por nombre..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                </div>
            </div>

            {/* TABLA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                            <tr>
                                <th className="py-4 px-6 text-xs font-bold uppercase">Imagen</th>
                                <th className="py-4 px-6 text-xs font-bold uppercase">Servicio</th>
                                <th className="py-4 px-6 text-xs font-bold uppercase">Categoría</th>
                                <th className="py-4 px-6 text-xs font-bold uppercase">Precio</th>
                                <th className="py-4 px-6 text-xs font-bold uppercase text-center">Estado</th>
                                <th className="py-4 px-6 text-xs font-bold uppercase text-right">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">
                                        Cargando servicios...
                                    </td>
                                </tr>
                            ) : services.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">
                                        No se encontraron servicios.
                                    </td>
                                </tr>
                            ) : (
                                services.map(service => (
                                    <tr key={service._id} className="hover:bg-gray-50 transition-colors">

                                        {/* Imagen */}
                                        <td className="py-4 px-6">
                                            <div className="size-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                                                {service.images?.[0] && (
                                                    <img
                                                        src={service.images[0]}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                        </td>

                                        {/* Título */}
                                        <td className="py-4 px-6 font-bold text-gray-800">
                                            {service.title}
                                        </td>

                                        {/* Categoría */}
                                        <td className="py-4 px-6">
                                            <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold border">
                                                {service.category}
                                            </span>
                                        </td>

                                        {/* Precio */}
                                        <td className="py-4 px-6 text-gray-600 font-medium">
                                            S/ {service.price}
                                        </td>

                                        {/* Estado */}
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                onClick={() => handleToggleStatus(service)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${service.isActive
                                                    ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                                                    : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                                                    }`}
                                            >
                                                {service.isActive ? 'Activo' : 'Inactivo'}
                                            </button>
                                        </td>

                                        {/* Acciones */}
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">

                                                {/* EDITAR -> ABRE MODAL */}
                                                <button
                                                    onClick={() => setEditingService(service)}
                                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                                                    title="Editar"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        edit
                                                    </span>
                                                </button>

                                                {/* ELIMINAR */}
                                                <button
                                                    onClick={() => handleDelete(service._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        delete
                                                    </span>
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>

                {/* PAGINACIÓN */}
                <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-gray-100"
                    >
                        Anterior
                    </button>

                    <span className="text-sm text-gray-600">
                        Página {page} de {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-gray-100"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            {/* MODAL DE EDICIÓN */}
            {
                editingService && (
                    <ServiceModal
                        service={editingService}
                        onClose={() => setEditingService(null)}
                        onUpdate={loadServices}
                    />
                )
            }

        </div >
    );
}
