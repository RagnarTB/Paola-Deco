import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createService, getCategories } from '../api/services.api';

export function ServiceFormPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    // CATEGORÍAS DINÁMICAS
    const [categoriesList, setCategoriesList] = useState([]);

    // ESTADO DE IMÁGENES
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. CARGAR CATEGORÍAS AL INICIO
    useEffect(() => {
        async function loadCats() {
            try {
                const res = await getCategories();
                setCategoriesList(res.data);

                // Si hay categorías, usar la primera como default
                if (res.data.length > 0) {
                    setCategory(res.data[0].name);
                }
            } catch (error) {
                console.error('Error cargando categorías', error);
            }
        }

        loadCats();
    }, []);

    // 2. AGREGAR IMÁGENES (ACUMULATIVO + LÍMITE 5)
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (files.length + selectedFiles.length > 5) {
            return alert("Solo puedes subir un máximo de 5 fotos por servicio");
        }

        setFiles(prev => [...prev, ...selectedFiles]);

        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    // 3. QUITAR UNA IMAGEN
    const removeImage = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('description', description);

            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }

            await createService(formData);
            alert('¡Servicio creado exitosamente!');
            navigate('/admin');
        } catch (error) {
            console.error(error);
            alert('Error al crear el servicio');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-xl shadow-lg font-display">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                Nuevo Servicio
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Zona de Carga de Imágenes */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">
                        Fotos del Servicio (Máx 5)
                    </label>

                    <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300 text-center hover:bg-gray-100 transition-colors relative">
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                        />
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                            <span className="material-symbols-outlined text-4xl">
                                add_photo_alternate
                            </span>
                            <span className="text-sm font-medium">
                                Arrastra tus fotos aquí o haz clic
                            </span>
                        </div>
                    </div>

                    {/* Previsualización con borrar */}
                    {previews.length > 0 && (
                        <div className="flex gap-4 overflow-x-auto py-4">
                            {previews.map((src, index) => (
                                <div
                                    key={index}
                                    className="relative size-24 min-w-24 rounded-xl overflow-hidden border border-gray-200 shadow-sm group"
                                >
                                    <img
                                        src={src}
                                        className="w-full h-full object-cover"
                                        alt={`preview-${index}`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <span className="material-symbols-outlined text-[16px] block">
                                            close
                                        </span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Título
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Precio Base (S/)
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                </div>

                {/* SELECT DINÁMICO DE CATEGORÍAS */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Categoría
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                        {categoriesList.map(cat => (
                            <option key={cat._id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`font-bold py-3 rounded-full mt-2 transition-colors text-white ${loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary-hover'
                        }`}
                >
                    {loading ? 'Subiendo imágenes...' : 'Guardar Servicio'}
                </button>
            </form>
        </div>
    );
}
