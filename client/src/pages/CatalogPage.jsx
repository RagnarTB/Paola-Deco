// client/src/pages/CatalogPage.jsx
import { useEffect, useState } from 'react';
import { getAllServices } from '../api/services.api';
import { Link } from 'react-router-dom';

export function CatalogPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadServices() {
            try {
                const res = await getAllServices();
                console.log("Datos recibidos:", res.data);
                setServices(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error cargando servicios:", error);
                setLoading(false);
            }
        }
        loadServices();
    }, []);

    if (loading) return <div className="text-center p-10">Cargando catálogo...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary">Nuestros Servicios</h1>

                <Link
                    to="/admin/crear"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-md transition-colors"
                >
                    + Nuevo Servicio
                </Link>
            </div>

            {services.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">Aún no hay servicios registrados.</p>
                    <p className="text-sm text-gray-400 mt-2">¡Ve al panel de admin para agregar uno!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map(service => (
                        <Link
                            to={`/servicio/${service._id}`}
                            key={service._id}
                            className="block group"
                        >
                            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">

                                {/* Imagen con efecto Zoom */}
                                <div className="relative overflow-hidden h-48">
                                    {service.images && service.images.length > 0 ? (
                                        <img
                                            src={service.images[0]}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            Sin foto
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 flex flex-col flex-grow">
                                    <h2 className="font-bold text-xl mb-1 text-gray-800 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h2>

                                    <p className="text-primary font-bold text-lg mb-2">
                                        S/ {service.price}
                                    </p>

                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                                        {service.description}
                                    </p>

                                    <span className="text-center w-full py-2 rounded-lg bg-gray-50 text-gray-600 text-sm font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                                        Ver Detalle
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
