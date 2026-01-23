import { useState, useEffect } from 'react';
import { updateUser } from '../api/services.api';
import toast from 'react-hot-toast';

export function UserModal({ user, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        username: '', email: '', role: 'editor', isActive: true, password: ''
    });

    useEffect(() => {
        if (user) {
            // Cargar datos (menos la password, esa empieza vacía)
            setFormData({
                username: user.username,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                password: ''
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(user._id, formData);
            toast.success("Usuario actualizado");
            onUpdate();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al actualizar");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden font-display">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-700">Editar Usuario</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Nombre</label>
                        <input value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                        <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Nueva Contraseña (Opcional)</label>
                        <input type="password" placeholder="Dejar en blanco para no cambiar" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full p-2 border rounded" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Rol</label>
                            <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full p-2 border rounded">
                                <option value="editor">Editor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Estado</label>
                            <select
                                value={formData.isActive}
                                onChange={e => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded font-bold">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}