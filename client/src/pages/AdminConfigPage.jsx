import { useEffect, useState } from 'react';
import { getConfig, updateConfig, uploadFile } from '../api/services.api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export function AdminConfigPage() {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        siteName: '',
        whatsapp: '',
        phone: '',
        email: '',
        address: '',
        facebookUrl: '',
        instagramUrl: '',
        heroSlides: [],
        tiktokVideos: [],   // NUEVO
        features: []        // NUEVO
    });

    // Cargar datos iniciales
    useEffect(() => {
        async function load() {
            const res = await getConfig();
            setFormData(res.data);
        }
        load();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // =====================================================
    // SLIDES
    // =====================================================

    const addSlide = () => {
        setFormData({
            ...formData,
            heroSlides: [
                ...formData.heroSlides,
                { title: 'Nuevo Slide', subtitle: '', imageUrl: '', buttonText: 'Ver más' }
            ]
        });
    };

    const removeSlide = (index) => {
        const newSlides = [...formData.heroSlides];
        newSlides.splice(index, 1);
        setFormData({ ...formData, heroSlides: newSlides });
    };

    const handleSlideChange = (index, field, value) => {
        const newSlides = [...formData.heroSlides];
        newSlides[index][field] = value;
        setFormData({ ...formData, heroSlides: newSlides });
    };

    const handleImageUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append('file', file);

        try {
            const res = await uploadFile(data);
            handleSlideChange(index, 'imageUrl', res.data.url);
            toast.success("Imagen subida");
        } catch (error) {
            console.error(error);
            toast.error("Error al subir imagen");
        }
    };

    // =====================================================
    // TIKTOK
    // =====================================================

    const addTikTok = () => {
        if (formData.tiktokVideos.length >= 5) {
            return toast.error("Máximo 5 videos");
        }

        setFormData({
            ...formData,
            tiktokVideos: [
                ...formData.tiktokVideos,
                { url: '', embedId: '' }
            ]
        });
    };

    const updateTikTok = (index, url) => {
        const newVideos = [...formData.tiktokVideos];
        newVideos[index].url = url;

        // Extraer ID del link
        const regex = /\/video\/(\d+)/;
        const match = url.match(regex);
        newVideos[index].embedId = match ? match[1] : '';

        setFormData({ ...formData, tiktokVideos: newVideos });
    };

    const removeTikTok = (index) => {
        const newVideos = formData.tiktokVideos.filter((_, i) => i !== index);
        setFormData({ ...formData, tiktokVideos: newVideos });
    };

    // =====================================================
    // FEATURES
    // =====================================================

    const addFeature = () => {
        setFormData({
            ...formData,
            features: [
                ...formData.features,
                { icon: 'star', title: '', description: '' }
            ]
        });
    };

    const updateFeature = (index, field, val) => {
        const newFeats = [...formData.features];
        newFeats[index][field] = val;
        setFormData({ ...formData, features: newFeats });
    };

    const removeFeature = (index) => {
        const newFeats = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeats });
    };

    // =====================================================
    // GUARDAR
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateConfig(formData);
            toast.success('Configuración guardada');
        } catch (error) {
            console.error(error);
            toast.error('Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8 font-display pb-20">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Configuración del Sitio</h1>
                <Link to="/admin" className="text-primary hover:underline">
                    Volver al Dashboard
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* ===================================================== */}
                {/* INFO GENERAL */}
                {/* ===================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                        Información General
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                Nombre del Sitio
                            </label>
                            <input
                                name="siteName"
                                value={formData.siteName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                WhatsApp
                            </label>
                            <input
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                Email
                            </label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                Facebook
                            </label>
                            <input
                                name="facebookUrl"
                                value={formData.facebookUrl}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* ===================================================== */}
                {/* SLIDES */}
                {/* ===================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                            Carrusel de Portada
                        </h3>

                        <button
                            type="button"
                            onClick={addSlide}
                            className="text-sm bg-green-50 text-green-600 px-3 py-1 rounded-lg font-bold hover:bg-green-100"
                        >
                            + Agregar Slide
                        </button>
                    </div>

                    <div className="space-y-6">
                        {formData.heroSlides.map((slide, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative"
                            >
                                <button
                                    type="button"
                                    onClick={() => removeSlide(index)}
                                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold text-sm"
                                >
                                    Eliminar
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div>
                                        <label className="text-xs font-bold text-gray-500">
                                            Título
                                        </label>
                                        <input
                                            value={slide.title}
                                            onChange={(e) =>
                                                handleSlideChange(index, 'title', e.target.value)
                                            }
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1 block">
                                            Imagen de Fondo
                                        </label>

                                        <div className="flex gap-2 items-center">
                                            <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                                <span className="material-symbols-outlined text-lg">
                                                    upload
                                                </span>
                                                Subir Foto
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, index)}
                                                />
                                            </label>

                                            <input
                                                value={slide.imageUrl}
                                                readOnly
                                                className="flex-1 p-2 border rounded text-xs text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-xs font-bold text-gray-500">
                                            Subtítulo
                                        </label>
                                        <input
                                            value={slide.subtitle}
                                            onChange={(e) =>
                                                handleSlideChange(index, 'subtitle', e.target.value)
                                            }
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                </div>

                                {slide.imageUrl && (
                                    <img
                                        src={slide.imageUrl}
                                        className="h-24 mt-3 rounded object-cover border"
                                        alt="preview"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===================================================== */}
                {/* TIKTOK */}
                {/* ===================================================== */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                        <h3 className="font-bold">Videos Destacados (TikTok)</h3>
                        <button
                            type="button"
                            onClick={addTikTok}
                            className="text-sm bg-black text-white px-3 py-1 rounded font-bold"
                        >
                            + Video
                        </button>
                    </div>

                    <div className="space-y-4">
                        {formData.tiktokVideos.map((video, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <span className="font-bold text-gray-400">
                                    #{idx + 1}
                                </span>

                                <input
                                    value={video.url}
                                    onChange={(e) => updateTikTok(idx, e.target.value)}
                                    placeholder="Pega el link de TikTok aquí..."
                                    className="flex-1 p-2 border rounded"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeTikTok(idx)}
                                    className="text-red-500 font-bold"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===================================================== */}
                {/* FEATURES */}
                {/* ===================================================== */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                        <h3 className="font-bold">¿Por qué elegirnos?</h3>
                        <button
                            type="button"
                            onClick={addFeature}
                            className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded font-bold"
                        >
                            + Característica
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.features.map((feat, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded border relative">
                                <button
                                    type="button"
                                    onClick={() => removeFeature(idx)}
                                    className="absolute top-2 right-2 text-red-500 font-bold text-xs"
                                >
                                    X
                                </button>

                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            value={feat.icon}
                                            onChange={e => updateFeature(idx, 'icon', e.target.value)}
                                            placeholder="Icono (ej: star)"
                                            className="w-1/3 p-1 border text-xs"
                                        />
                                        <a
                                            href="https://fonts.google.com/icons"
                                            target="_blank"
                                            className="text-[10px] text-blue-500 underline flex items-center"
                                        >
                                            Ver Iconos
                                        </a>
                                    </div>

                                    <input
                                        value={feat.title}
                                        onChange={e => updateFeature(idx, 'title', e.target.value)}
                                        placeholder="Título"
                                        className="w-full p-1 border font-bold"
                                    />

                                    <textarea
                                        value={feat.description}
                                        onChange={e => updateFeature(idx, 'description', e.target.value)}
                                        placeholder="Descripción breve"
                                        className="w-full p-1 border text-sm"
                                        rows="2"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTÓN GUARDAR */}
                <button
                    type="submit"
                    disabled={loading}
                    className="fixed bottom-6 right-6 bg-primary text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-primary-hover transition-transform hover:scale-105 disabled:opacity-60"
                >
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </form>
        </div>
    );
}
