import { useEffect, useState } from 'react';
import { getAllServices, getCategories, getConfig } from '../api/services.api'; // <--- Importamos getConfig
import { Link } from 'react-router-dom';

export function CatalogPage() {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [whatsappNumber, setWhatsappNumber] = useState(""); // <--- Estado número

    // Filtros
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });

    // Cargar Datos Iniciales (Categorías y Configuración)
    useEffect(() => {
        async function loadInitialData() {
            try {
                const [catsRes, configRes] = await Promise.all([
                    getCategories(),
                    getConfig()
                ]);
                setCategories(catsRes.data.filter(c => c.isActive));
                setWhatsappNumber(configRes.data.whatsapp || ""); // Guardamos número
            } catch (error) {
                console.error("Error cargando datos iniciales", error);
            }
        }
        loadInitialData();
    }, []);

    // Cargar Servicios (Filtros)
    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const res = await getAllServices({
                    search,
                    category: selectedCategory,
                    minPrice: priceRange.min,
                    maxPrice: priceRange.max,
                    isActive: true
                });
                setServices(res.data.services);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(fetchServices, 400);
        return () => clearTimeout(timeout);
    }, [search, selectedCategory, priceRange]);

    const cleanNumber = whatsappNumber ? whatsappNumber.replace(/\D/g, '') : "";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 font-display flex flex-col md:flex-row gap-8">

            {/* --- SIDEBAR FILTROS --- */}
            <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
                <div>
                    <h3 className="font-bold text-gray-800 mb-4">Buscar</h3>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg">search</span>
                        <input
                            type="text"
                            placeholder="Ej: Boda Vintage..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 p-2 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary text-sm"
                        />
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-800 mb-4">Categorías</h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio" name="cat"
                                checked={selectedCategory === ""}
                                onChange={() => setSelectedCategory("")}
                                className="text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-gray-600">Todas</span>
                        </label>
                        {categories.map(cat => (
                            <label key={cat._id} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio" name="cat"
                                    checked={selectedCategory === cat.name}
                                    onChange={() => setSelectedCategory(cat.name)}
                                    className="text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-gray-600">{cat.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-800 mb-4">Precio (S/)</h3>
                    <div className="flex gap-2">
                        <input
                            type="number" placeholder="Min"
                            value={priceRange.min}
                            onChange={e => setPriceRange({ ...priceRange, min: e.target.value })}
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                        />
                        <input
                            type="number" placeholder="Max"
                            value={priceRange.max}
                            onChange={e => setPriceRange({ ...priceRange, max: e.target.value })}
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                        />
                    </div>
                </div>
            </aside>

            {/* --- GRID DE RESULTADOS --- */}
            <div className="flex-1">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Catálogo de Servicios</h1>
                    <p className="text-sm text-gray-500">{services.length} resultados encontrados</p>
                </div>

                {loading ? (
                    <div className="text-center py-20">Cargando...</div>
                ) : services.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl">
                        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">search_off</span>
                        <p className="text-gray-500">No encontramos resultados con esos filtros.</p>
                        <button onClick={() => { setSearch(""); setSelectedCategory(""); setPriceRange({ min: "", max: "" }) }} className="text-primary font-bold text-sm mt-2 hover:underline">Limpiar filtros</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map(service => (
                            <div key={service._id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                                <Link to={`/servicio/${service._id}`} className="block h-48 overflow-hidden relative">
                                    <img
                                        src={service.images[0] || 'placeholder.jpg'}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold uppercase">
                                        {service.category}
                                    </div>
                                </Link>
                                <div className="p-4 flex-1 flex flex-col">
                                    <Link to={`/servicio/${service._id}`}>
                                        <h3 className="font-bold text-gray-800 mb-1 truncate hover:text-primary transition-colors">{service.title}</h3>
                                    </Link>
                                    <div className="flex justify-between items-center mt-auto pt-2">
                                        <p className="text-primary font-bold">S/ {service.price}</p>

                                        {/* BOTÓN WHATSAPP EN CATALOGO */}
                                        <a
                                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola, me interesa: ${service.title}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-600 hover:text-white transition-colors"
                                            title="Cotizar rápido"
                                        >
                                            <span className="material-symbols-outlined text-[20px] block">chat</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}