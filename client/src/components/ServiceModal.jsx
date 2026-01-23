import { useState, useEffect } from 'react';
import { getCategories, updateService, uploadFile } from '../api/services.api';
import toast from 'react-hot-toast';

export function ServiceModal({ service, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        title: '', category: '', price: '', description: '', isActive: true, images: []
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Cargar datos iniciales
    useEffect(() => {
        if (service) {
            setFormData(service);
        }
        loadCategories();
    }, [service]);

    const loadCategories = async () => {
        const res = await getCategories();
        // FILTRO: Solo mostrar categorías ACTIVAS en el select
        setCategories(res.data.filter(c => c.isActive));
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Subida de imagen individual para agregar al array
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const toastId = toast.loading('Subiendo imagen...');
            const res = await uploadFile(uploadData); // Usamos la ruta auxiliar que creamos antes
            setFormData(prev => ({ ...prev, images: [...prev.images, res.data.url] }));
            toast.success('Imagen agregada', { id: toastId });
        } catch (error) {
            toast.error('Error al subir imagen');
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Nota: Aquí mandamos JSON directo porque las imágenes ya son URLs
            await updateService(service._id, formData);
            toast.success('Servicio actualizado correctamente');
            onUpdate(); // Recargar tabla padre
            onClose();
        } catch (error) {
            toast.error('Error al actualizar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-800">Editar Servicio</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Título</label>
                            <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Precio</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-lg" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Categoría</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded-lg">
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Estado</label>
                            <select
                                value={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Descripción</label>
                        <textarea name="description" rows="3" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-lg"></textarea>
                    </div>

                    {/* Gestión de Imágenes */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2">Imágenes</label>
                        <div className="flex flex-wrap gap-3 mb-3">
                            {formData.images.map((img, idx) => (
                                <div key={idx} className="relative size-20 border rounded-lg overflow-hidden group">
                                    <img src={img} className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-lg opacity-0 group-hover:opacity-100">
                                        <span className="material-symbols-outlined text-[14px]">close</span>
                                    </button>
                                </div>
                            ))}
                            <label className="size-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-primary hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">add_photo_alternate</span>
                                <span className="text-[10px] font-bold">Agregar</span>
                                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">Cancelar</button>
                        <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover">
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}