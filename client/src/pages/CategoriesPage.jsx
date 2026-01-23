import { useEffect, useState } from 'react';
import {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory,
    uploadFile
} from '../api/services.api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export function CategoriesPage() {
    const [categories, setCategories] = useState([]);

    // Crear
    const [newCatName, setNewCatName] = useState("");
    const [newCatImage, setNewCatImage] = useState("");
    const [uploading, setUploading] = useState(false);

    // Editar
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [editingImage, setEditingImage] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.data);
        } catch (error) {
            console.error("Error cargando categorías:", error);
            toast.error("Error cargando categorías");
        }
    };

    // Subir imagen genérico
    const handleUpload = async (e, setUrlState) => {
        const file = e.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append('file', file);
        setUploading(true);

        try {
            const res = await uploadFile(data);
            setUrlState(res.data.url);
            toast.success("Imagen cargada");
        } catch (error) {
            toast.error("Error al subir imagen");
        } finally {
            setUploading(false);
        }
    };

    // Crear categoría
    const handleCreate = async (e) => {
        e.preventDefault();

        if (!newCatImage) {
            return toast.error("La categoría necesita una imagen");
        }

        try {
            await createCategory({
                name: newCatName.toUpperCase(),
                image: newCatImage
            });

            setNewCatName("");
            setNewCatImage("");
            toast.success("Categoría creada");
            loadCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al crear categoría");
        }
    };

    // Actualizar categoría
    const handleUpdate = async (id) => {
        try {
            await updateCategory(id, {
                name: editingName.toUpperCase(),
                image: editingImage
            });

            setEditingId(null);
            setEditingName("");
            setEditingImage("");
            toast.success("Categoría actualizada");
            loadCategories();
        } catch (error) {
            toast.error("Error al actualizar categoría");
        }
    };

    // Activar / Desactivar
    const toggleStatus = async (cat) => {
        try {
            await updateCategory(cat._id, {
                isActive: !cat.isActive
            });
            toast.success("Estado actualizado");
            loadCategories();
        } catch (error) {
            toast.error("Error al cambiar estado");
        }
    };

    // Eliminar
    const handleDelete = async (id, name) => {
        if (!confirm(`¿Borrar categoría ${name}?`)) return;

        try {
            await deleteCategory(id);
            toast.success("Categoría eliminada");
            loadCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al eliminar");
        }
    };

    return (
        <div className="w-full pb-20 font-display">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
                    <p className="text-gray-500 mt-1">
                        Define las secciones de tu catálogo. Todo se guarda en MAYÚSCULAS.
                    </p>
                </div>
                <Link
                    to="/admin"
                    className="text-primary hover:underline font-bold"
                >
                    Volver al Dashboard
                </Link>
            </div>

            {/* FORMULARIO CREAR */}
            <form
                onSubmit={handleCreate}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-end"
            >
                <div className="flex-1 w-full">
                    <label className="text-xs font-bold text-gray-500 mb-1 block">
                        Nueva Categoría
                    </label>
                    <input
                        type="text"
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value.toUpperCase())}
                        placeholder="EJ: GRADUACIONES"
                        className="w-full p-3 border rounded-lg uppercase focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        required
                    />
                </div>

                {/* IMAGEN */}
                <div className="w-full md:w-auto">
                    <label className="text-xs font-bold text-gray-500 mb-1 block">
                        Imagen Portada
                    </label>
                    <div className="flex gap-2 items-center">
                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg border border-gray-300 flex items-center gap-2 text-sm font-bold text-gray-600">
                            <span className="material-symbols-outlined">upload</span>
                            {uploading ? '...' : 'Subir Foto'}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleUpload(e, setNewCatImage)}
                            />
                        </label>
                        {newCatImage && (
                            <img
                                src={newCatImage}
                                className="size-12 rounded object-cover border"
                            />
                        )}
                    </div>
                </div>

                <button
                    disabled={uploading}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-hover shadow-lg w-full md:w-auto disabled:opacity-50"
                >
                    Agregar
                </button>
            </form>

            {/* TABLA */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-bold text-gray-500 uppercase text-xs">
                                Categoría
                            </th>
                            <th className="p-4 font-bold text-gray-500 uppercase text-xs text-center">
                                Estado
                            </th>
                            <th className="p-4 font-bold text-gray-500 uppercase text-xs text-right">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {categories.map(cat => (
                            <tr key={cat._id} className="hover:bg-gray-50">

                                {/* Nombre + Imagen / Edición */}
                                <td className="p-4">
                                    {editingId === cat._id ? (
                                        <div className="flex flex-col gap-2">
                                            <input
                                                value={editingName}
                                                onChange={e => setEditingName(e.target.value.toUpperCase())}
                                                className="border p-2 rounded uppercase w-full"
                                            />

                                            <div className="flex gap-2 items-center">
                                                <label className="text-xs bg-gray-200 px-2 py-1 rounded cursor-pointer">
                                                    Cambiar Foto
                                                    <input
                                                        type="file"
                                                        hidden
                                                        accept="image/*"
                                                        onChange={(e) => handleUpload(e, setEditingImage)}
                                                    />
                                                </label>

                                                {editingImage && (
                                                    <img
                                                        src={editingImage}
                                                        className="size-8 rounded object-cover border"
                                                    />
                                                )}
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleUpdate(cat._id)}
                                                    className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold"
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setEditingName("");
                                                        setEditingImage("");
                                                    }}
                                                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={cat.image || 'https://via.placeholder.com/50'}
                                                className="size-12 rounded-lg object-cover bg-gray-100 border"
                                            />
                                            <span className="font-bold text-gray-700">
                                                {cat.name}
                                            </span>
                                        </div>
                                    )}
                                </td>

                                {/* Estado */}
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => toggleStatus(cat)}
                                        className={`text-xs font-bold px-2 py-1 rounded border transition-all ${cat.isActive
                                                ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'
                                                : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                                            }`}
                                    >
                                        {cat.isActive ? 'ACTIVO' : 'INACTIVO'}
                                    </button>
                                </td>

                                {/* Acciones */}
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => {
                                            setEditingId(cat._id);
                                            setEditingName(cat.name);
                                            setEditingImage(cat.image || "");
                                        }}
                                        className="text-blue-500 hover:text-blue-700 font-bold text-sm mr-4"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => handleDelete(cat._id, cat.name)}
                                        className="text-red-500 hover:text-red-700 font-bold text-sm"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {categories.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No hay categorías creadas aún.
                    </div>
                )}
            </div>
        </div>
    );
}
