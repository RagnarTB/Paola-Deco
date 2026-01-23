import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConfig, getCategories } from '../api/services.api';

export function HomePage() {
    const [config, setConfig] = useState(null);
    const [categories, setCategories] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentVideo, setCurrentVideo] = useState(0);

    // 1. Cargar Config + Categorías
    useEffect(() => {
        async function loadData() {
            try {
                const confRes = await getConfig();
                setConfig(confRes.data);

                const catRes = await getCategories();
                setCategories(catRes.data.filter(c => c.isActive));
            } catch (error) {
                console.error("Error cargando datos", error);
            }
        }
        loadData();
    }, []);

    // 2. Autoplay carrusel
    useEffect(() => {
        if (!config || !config.heroSlides || config.heroSlides.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev =>
                prev === config.heroSlides.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [config]);

    const nextSlide = () => {
        if (!config?.heroSlides) return;
        setCurrentSlide(prev =>
            prev === config.heroSlides.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        if (!config?.heroSlides) return;
        setCurrentSlide(prev =>
            prev === 0 ? config.heroSlides.length - 1 : prev - 1
        );
    };

    const nextVideo = () => {
        if (!config?.tiktokVideos) return;
        setCurrentVideo(prev =>
            prev === config.tiktokVideos.length - 1 ? 0 : prev + 1
        );
    };

    if (!config) {
        return <div className="h-screen flex items-center justify-center">Cargando...</div>;
    }

    const slides = config.heroSlides.length > 0 ? config.heroSlides : [{
        imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop',
        title: 'Bienvenido a Paola Deco',
        subtitle: 'Configura tus slides en el panel de admin',
        buttonText: 'Ir al Admin'
    }];

    return (
        <div className="font-display">

            {/* --- HERO --- */}
            <section className="relative h-[85vh] overflow-hidden bg-gray-900">

                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <div className="absolute inset-0 bg-black/40 z-10"></div>
                        <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="w-full h-full object-cover animate-pulse-slow"
                            style={{ animationDuration: '10s' }}
                        />

                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                            <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold mb-6 uppercase tracking-widest">
                                {config.siteName || 'Eventos Exclusivos'}
                            </span>

                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight max-w-4xl">
                                {slide.title}
                            </h1>

                            <p className="text-gray-200 text-lg md:text-2xl max-w-2xl mx-auto mb-10">
                                {slide.subtitle}
                            </p>

                            <div className="flex gap-4">
                                <Link
                                    to="/catalogo"
                                    className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-transform hover:scale-105"
                                >
                                    {slide.buttonText || 'Ver Catálogo'}
                                </Link>

                                {config.whatsapp && (
                                    <a
                                        href={`https://wa.me/${config.whatsapp}`}
                                        target="_blank"
                                        className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2"
                                    >
                                        Contáctanos
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white/50 hover:text-white p-2">
                    <span className="material-symbols-outlined text-5xl">chevron_left</span>
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white/50 hover:text-white p-2">
                    <span className="material-symbols-outlined text-5xl">chevron_right</span>
                </button>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-3 rounded-full transition-all ${idx === currentSlide ? 'w-10 bg-primary' : 'w-3 bg-white/50'}`}
                        />
                    ))}
                </div>
            </section>

            {/* --- POR QUÉ ELEGIRNOS --- */}
            {config.features && config.features.length > 0 && (
                <section className="py-16 border-b border-gray-100" style={{ backgroundColor: '#fdf2f7' }}>
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {config.features.map((feat, i) => (
                                <div key={i} className="text-center p-6 rounded-2xl hover:bg-white transition-colors group">
                                    <div className="size-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-3xl">
                                            {feat.icon || 'star'}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {feat.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        {feat.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- CATEGORÍAS REALES --- */}
            <section className="py-20" style={{ backgroundColor: '#fdf2f7' }}>
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Nuestras Especialidades
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {categories.map((cat) => (
                            <Link
                                to={`/catalogo?category=${encodeURIComponent(cat.name)}`}
                                key={cat._id}
                                className="group relative rounded-2xl overflow-hidden h-80 shadow-lg cursor-pointer"
                            >
                                <img
                                    src={cat.image || 'https://via.placeholder.com/400'}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 text-left">
                                    <h3 className="text-white text-2xl font-bold mb-1">
                                        {cat.name}
                                    </h3>
                                    <p className="text-primary font-bold text-sm translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                        Ver Servicios →
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TIKTOK HIGHLIGHTS --- */}
            {config.tiktokVideos && config.tiktokVideos.length > 0 && (
                <section className="py-20 bg-black text-white overflow-hidden">
                    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">

                        <div className="md:w-1/2 text-center md:text-left">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">
                                Síguenos en TikTok
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black mt-2 mb-6">
                                Momentos Mágicos en Video
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                Mira cómo transformamos espacios reales en sueños hechos realidad.
                            </p>
                            <button
                                onClick={nextVideo}
                                className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto md:mx-0"
                            >
                                Siguiente Video
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>

                        <div className="md:w-1/2 flex justify-center relative">
                            <div className="w-[325px] h-[570px] bg-gray-800 rounded-[2rem] overflow-hidden border-4 border-gray-700 shadow-2xl relative">
                                <iframe
                                    src={`https://www.tiktok.com/embed/v2/${config.tiktokVideos[currentVideo].embedId}`}
                                    className="w-full h-full"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="absolute -z-10 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
}
