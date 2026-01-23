import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getService, getConfig } from '../api/services.api';

export function ServiceDetailPage() {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [whatsappNumber, setWhatsappNumber] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                const [serviceRes, configRes] = await Promise.all([
                    getService(id),
                    getConfig()
                ]);

                setService(serviceRes.data);
                setWhatsappNumber(configRes.data.whatsapp || "");

                if (serviceRes.data.images && serviceRes.data.images.length > 0) {
                    setActiveImage(serviceRes.data.images[0]);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        loadData();
    }, [id]);

    if (loading) return <div className="text-center p-20">Cargando...</div>;
    if (!service) return <div className="text-center p-20">No encontrado</div>;

    // Formatear número de WhatsApp correctamente
    const formatWhatsAppNumber = (number) => {
        if (!number) return "51999999999"; // Número de respaldo
        
        // Remover todo excepto dígitos
        let cleaned = number.replace(/\D/g, '');
        
        // Si el número empieza con 9 y tiene 9 dígitos, es un número peruano sin código de país
        if (cleaned.startsWith('9') && cleaned.length === 9) {
            cleaned = '51' + cleaned; // Agregar código de Perú
        }
        
        // Si no empieza con 51 y tiene 9 dígitos, agregar código de país
        if (!cleaned.startsWith('51') && cleaned.length === 9) {
            cleaned = '51' + cleaned;
        }
        
        return cleaned;
    };
    
    const cleanNumber = formatWhatsAppNumber(whatsappNumber);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(`Hola, me interesa: ${service.title}`)}`;

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-10 font-display">
            <Link to="/catalogo" className="text-gray-500 hover:text-primary mb-6 inline-flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-lg">arrow_back</span> Volver
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                    <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm relative group">
                        {activeImage ? (
                            <img src={activeImage} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">Sin imagen</div>
                        )}
                    </div>
                    {service.images && service.images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {service.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(img)}
                                    className={`size-20 min-w-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary opacity-100 ring-2 ring-primary/30' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit mb-4 uppercase tracking-wider">
                        {service.category}
                    </span>
                    <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{service.title}</h1>
                    <div className="prose prose-gray max-w-none text-gray-600 mb-8 leading-relaxed">
                        {service.description}
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Precio estimado</p>
                            <p className="text-3xl font-bold text-gray-900">S/ {service.price}</p>
                        </div>
                        <div className="h-10 w-px bg-gray-200"></div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 font-medium">Disponibilidad</p>
                            <p className="text-green-600 font-bold flex items-center gap-1 justify-end">
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                Inmediata
                            </p>
                        </div>
                    </div>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-xl font-bold text-center flex items-center justify-center gap-3 transition-all hover:shadow-lg hover:shadow-green-200 transform hover:-translate-y-1"
                    >
                        <span className="material-symbols-outlined">chat</span>
                        Cotizar por WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}