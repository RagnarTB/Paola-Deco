import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllServices, deleteService } from '../api/services.api';
import { useAuth } from '../context/AuthContext';

export function AdminDashboardPage() {
    const { user } = useAuth();
    const [services, setServices] = useState([]);

    // Cargar servicios al iniciar
    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        const res = await getAllServices();
        setServices(res.data);
    };

    // Función para borrar
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de querer eliminar este servicio?")) {
            try {
                await deleteService(id);
                setServices(services.filter(service => service._id !== id));
                alert("Servicio eliminado");
            } catch (error) {
                console.error(error);
                alert("Error al eliminar");
            }
        }
    };

    return (
        <div className="p-8 overflow-y-auto">

            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        Panel de Control
                    </h2>
                    <p className="text-gray-500">
                        Bienvenido de nuevo, {user?.username}
                    </p>
                </div>

                <Link
                    to="/admin/crear"
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/30 transition-transform hover:scale-105 flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Agregar Servicio
                </Link>
            </div>

            {/* Tabla de Servicios */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {services.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        No hay servicios creados aún.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                                <tr>
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                                        Imagen
                                    </th>
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                                        Servicio
                                    </th>
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                                        Categoría
                                    </th>
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider">
                                        Precio
                                    </th>
                                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-right">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {services.map(service => (
                                    <tr
                                        key={service._id}
                                        className="hover:bg-gray-50 transition-colors group"
                                    >
                                        <td className="py-4 px-6 w-20">
                                            <div className="size-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                                                {service.images[0] ? (
                                                    <img
                                                        src={service.images[0]}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                        Sin foto
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td className="py-4 px-6">
                                            <span className="font-bold text-gray-800 block">
                                                {service.title}
                                            </span>
                                        </td>

                                        <td className="py-4 px-6">
                                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
                                                {service.category}
                                            </span>
                                        </td>

                                        <td className="py-4 px-6 font-medium text-gray-600">
                                            S/ {service.price}
                                        </td>

                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Editar (visual) */}
                                                <button
                                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                                                    title="Editar"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        edit
                                                    </span>
                                                </button>

                                                {/* Eliminar */}
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
