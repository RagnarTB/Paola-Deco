import { useEffect, useState } from 'react';
import { getConfig, updateConfig, uploadFile } from '../api/services.api';
import { Link } from 'react-router-dom';

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
        heroSlides: []
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

    // --- SLIDES ---

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

    // --- SUBIDA DE IMAGEN POR SLIDE ---
    const handleImageUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append('file', file);

        try {
            const res = await uploadFile(data);
            handleSlideChange(index, 'imageUrl', res.data.url);
        } catch (error) {
            console.error(error);
            alert("Error al subir imagen");
        }
    };

    // Guardar configuración
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateConfig(formData);
            alert('Configuración guardada exitosamente');
        } catch (error) {
            console.error(error);
            alert('Error al guardar');
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

                {/* SECCIÓN 1: INFO GENERAL */}
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
                                placeholder="51987654321"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                Email Contacto
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
                                Link Facebook
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

                {/* SECCIÓN 2: SLIDES */}
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
                                className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group"
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

                                    {/* SUBIDA DE IMAGEN */}
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
                                                onChange={(e) =>
                                                    handleSlideChange(index, 'imageUrl', e.target.value)
                                                }
                                                className="flex-1 p-2 border rounded text-xs text-gray-500"
                                                placeholder="URL generada automáticamente"
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-xs font-bold text-gray-500">
                                            Subtítulo / Descripción
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

                                {/* Previsualización */}
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
