import { useEffect, useState } from 'react';
import { getCategories, createCategory, deleteCategory } from '../api/services.api';
import { Link } from 'react-router-dom';

export function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [newCatName, setNewCatName] = useState("");

    useEffect(() => { loadCategories() }, []);

    const loadCategories = async () => {
        const res = await getCategories();
        setCategories(res.data);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createCategory({ name: newCatName });
            setNewCatName("");
            loadCategories(); // Recargar lista
        } catch (error) {
            alert("Error al crear (quizás ya existe)");
        }
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`¿Borrar categoría ${name}?`)) return;
        try {
            await deleteCategory(id);
            loadCategories();
        } catch (error) {
            // Aquí mostramos el mensaje de seguridad del backend
            alert(error.response?.data?.message || "Error al eliminar");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 font-display">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
                <Link to="/admin" className="text-primary hover:underline">Volver al Dashboard</Link>
            </div>

            {/* Formulario Crear */}
            <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 flex gap-4">
                <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Nueva categoría (ej: Graduaciones)"
                    className="flex-1 p-3 border rounded-lg"
                    required
                />
                <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-hover">
                    Agregar
                </button>
            </form>

            {/* Lista */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-bold text-gray-500">Nombre</th>
                            <th className="p-4 font-bold text-gray-500 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat._id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-medium">{cat.name}</td>
                                <td className="p-4 text-right">
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
            </div>
        </div>
    );
}