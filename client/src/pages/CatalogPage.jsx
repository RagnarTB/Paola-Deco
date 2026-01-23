// client/src/pages/CatalogPage.jsx
import { useEffect, useState } from 'react';
import { getAllServices } from '../api/services.api';
import { Link } from 'react-router-dom';

export function CatalogPage() {
    // Estado para guardar los servicios
    const [services, setServices] = useState([]);
    // Estado para saber si está cargando
    const [loading, setLoading] = useState(true);

    // useEffect se ejecuta cuando el componente se monta (carga)
    useEffect(() => {
        async function loadServices() {
            try {
                const res = await getAllServices();
                console.log("Datos recibidos:", res.data); // Para ver en la consola del navegador
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

                {/* 2. Botón para crear (Solo visible temporalmente para todos) */}
                <Link to="/admin/crear" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-md transition-colors">
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
                        <div key={service._id} className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                            <h2 className="font-bold text-xl mb-2">{service.title}</h2>
                            <p className="text-primary font-bold">S/ {service.price}</p>
                            <p className="text-gray-600 text-sm mt-2">{service.description}</p>
                            <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mt-3">
                                {service.category}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}