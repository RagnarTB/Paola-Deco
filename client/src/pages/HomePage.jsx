import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConfig } from '../api/services.api';

export function HomePage() {
    const [config, setConfig] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // 1. Cargar Configuración
    useEffect(() => {
        async function loadData() {
            try {
                const res = await getConfig();
                setConfig(res.data);
            } catch (error) {
                console.error("Error cargando config", error);
            }
        }
        loadData();
    }, []);

    // 2. Lógica del Carrusel (Auto-play)
    useEffect(() => {
        if (!config || !config.heroSlides || config.heroSlides.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === config.heroSlides.length - 1 ? 0 : prev + 1));
        }, 5000); // Cambia cada 5 segundos

        return () => clearInterval(interval);
    }, [config]);

    // Funciones manuales para flechas
    const nextSlide = () => {
        if (!config?.heroSlides) return;
        setCurrentSlide((prev) => (prev === config.heroSlides.length - 1 ? 0 : prev + 1));
    };
    const prevSlide = () => {
        if (!config?.heroSlides) return;
        setCurrentSlide((prev) => (prev === 0 ? config.heroSlides.length - 1 : prev - 1));
    };

    if (!config) return <div className="h-screen flex items-center justify-center">Cargando...</div>;

    // Si el admin no ha subido slides, usamos uno por defecto
    const slides = config.heroSlides.length > 0 ? config.heroSlides : [{
        imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop',
        title: 'Bienvenido a Paola Deco',
        subtitle: 'Configura tus slides en el panel de admin',
        buttonText: 'Ir al Admin'
    }];

    return (
        <div className="font-display">

            {/* --- HERO CARRUSEL --- */}
            <section className="relative h-[85vh] overflow-hidden bg-gray-900">

                {/* Slides */}
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        {/* Imagen de Fondo (con overlay oscuro) */}
                        <div className="absolute inset-0 bg-black/40 z-10"></div>
                        <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="w-full h-full object-cover animate-pulse-slow"
                            style={{ animationDuration: '10s' }} // Efecto zoom suave
                        />

                        {/* Texto Centrado */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                            <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold mb-6 animate-fade-in-up uppercase tracking-widest">
                                {config.siteName || 'Eventos Exclusivos'}
                            </span>

                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg max-w-4xl">
                                {slide.title}
                            </h1>

                            <p className="text-gray-200 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-light">
                                {slide.subtitle}
                            </p>

                            <div className="flex gap-4">
                                <Link to="/catalogo" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-lg shadow-primary/30">
                                    {slide.buttonText || 'Ver Catálogo'}
                                </Link>

                                {/* Botón WhatsApp Dinámico */}
                                {config.whatsapp && (
                                    <a
                                        href={`https://wa.me/${config.whatsapp}`}
                                        target="_blank"
                                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2"
                                    >
                                        Contáctanos
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Flechas de Navegación */}
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white/50 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all">
                    <span className="material-symbols-outlined text-5xl">chevron_left</span>
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white/50 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all">
                    <span className="material-symbols-outlined text-5xl">chevron_right</span>
                </button>

                {/* Puntos Indicadores (Dots) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-10 bg-primary' : 'w-3 bg-white/50 hover:bg-white'}`}
                        />
                    ))}
                </div>
            </section>

            {/* --- SECCIÓN CATEGORÍAS (Estática por ahora, pero bonita) --- */}
            <section className="py-20 bg-background-light">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Transformamos Espacios</h2>
                    <p className="text-gray-500 mb-12">Descubre nuestras categorías más populares</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['Bodas', 'Infantiles', 'Corporativos'].map((cat, i) => (
                            <Link to="/catalogo" key={i} className="group relative rounded-2xl overflow-hidden h-80 shadow-lg cursor-pointer block">
                                {/* Nota: Aquí podrías usar imágenes dinámicas si quisieras en el futuro */}
                                <div className={`w-full h-full bg-gray-300 transition-transform duration-700 group-hover:scale-110 bg-cover bg-center`}
                                    style={{ backgroundImage: `url('https://source.unsplash.com/random/800x600/?${cat.toLowerCase()}')` }}>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                                    <div className="text-left">
                                        <h3 className="text-white text-2xl font-bold mb-1">{cat}</h3>
                                        <p className="text-gray-300 text-sm group-hover:text-primary transition-colors">Ver diseños →</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}