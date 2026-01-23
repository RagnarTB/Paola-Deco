import { useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from '../api/services.api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { UserModal } from '../components/UserModal'; // Importar Modal

export function UsersPage() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'editor' });
    const [editingUser, setEditingUser] = useState(null); // Estado para modal

    const ROOT_EMAIL = "admin@paoladeco.com"; // Debe coincidir con el backend

    useEffect(() => { loadUsers() }, []);

    const loadUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch (error) { console.error(error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(formData);
            toast.success("Usuario creado");
            setFormData({ username: '', email: '', password: '', role: 'editor' });
            loadUsers();
        } catch (error) {
            toast.error(error.response?.data?.[0] || "Error al crear");
        }
    };

    const handleDelete = async (user) => {
        if (user.email === ROOT_EMAIL) return toast.error("No se puede eliminar al Admin Principal");

        const result = await Swal.fire({
            title: '¿Eliminar usuario?',
            text: "Esta acción es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        });

        if (result.isConfirmed) {
            try {
                await deleteUser(user._id);
                toast.success("Eliminado");
                loadUsers();
            } catch (error) {
                toast.error("Error al eliminar");
            }
        }
    };

    const handleToggleStatus = async (user) => {
        if (user.email === ROOT_EMAIL) return toast.error("No se puede desactivar al Admin Principal");

        try {
            await updateUser(user._id, { isActive: !user.isActive });
            toast.success(`Usuario ${!user.isActive ? 'Activado' : 'Desactivado'}`);
            loadUsers();
        } catch (error) {
            toast.error("Error al cambiar estado");
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 font-display">
            <h1 className="text-2xl font-bold mb-6">Gestión de Personal</h1>

            {/* Formulario Crear (Igual que antes) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8 shadow-sm">
                <h3 className="font-bold mb-4">Registrar Nuevo Empleado</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Nombre" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} className="p-2 border rounded" required />
                    <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="p-2 border rounded" required />
                    <input type="password" placeholder="Contraseña" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="p-2 border rounded" required />
                    <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="p-2 border rounded">
                        <option value="editor">Editor (Acceso Limitado)</option>
                        <option value="admin">Administrador (Acceso Total)</option>
                    </select>
                    <button className="bg-primary text-white font-bold py-2 rounded md:col-span-2 hover:bg-primary-hover">Crear Usuario</button>
                </form>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-gray-50 border-b text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="p-4">Nombre</th>
                                <th className="p-4">Email</th>
                                <th className="p-4 text-center">Rol</th>
                                <th className="p-4 text-center">Estado</th>
                                <th className="p-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map(user => {
                                const isRoot = user.email === ROOT_EMAIL;
                                return (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-bold text-gray-800">{user.username}</td>
                                        <td className="p-4 text-gray-600 text-sm">{user.email}</td>
                                        <td className="p-4 text-center">
                                            <span className={`px-2 py-1 rounded text-xs font-bold border ${user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                                {user.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            {isRoot ? (
                                                <span className="text-xs font-bold text-gray-400">SIEMPRE ACTIVO</span>
                                            ) : (
                                                <button
                                                    onClick={() => handleToggleStatus(user)}
                                                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${user.isActive ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'}`}
                                                >
                                                    {user.isActive ? 'ACTIVO' : 'INACTIVO'}
                                                </button>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            {!isRoot && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => setEditingUser(user)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Editar">
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                    <button onClick={() => handleDelete(user)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Eliminar">
                                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                                    </button>
                                                </div>
                                            )}
                                            {isRoot && <span className="text-xs text-gray-300 font-bold italic pr-2">Protegido</span>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Edición */}
            {editingUser && (
                <UserModal
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onUpdate={loadUsers}
                />
            )}
        </div>
    );
}