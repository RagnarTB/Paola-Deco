// client/src/pages/ServiceFormPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createService } from '../api/services.api';

export function ServiceFormPage() {
    const navigate = useNavigate(); // Para redirigir al usuario después de guardar

    // Estado para guardar los datos del formulario
    const [formData, setFormData] = useState({
        title: '',
        category: 'Bodas', // Valor por defecto
        price: '',
        description: ''
    });

    // Función que se ejecuta cuando escribes en los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        try {
            // 1. Enviamos los datos al backend
            await createService(formData);

            // 2. Si todo sale bien, avisamos y redirigimos al catálogo
            alert('¡Servicio creado exitosamente!');
            navigate('/catalogo');
        } catch (error) {
            console.error(error);
            alert('Error al crear el servicio');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Nuevo Servicio</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Título */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Título</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        placeholder="Ej: Decoración Boda Vintage"
                        required
                    />
                </div>

                {/* Categoría */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Categoría</label>
                    <select
                        name="category"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    >
                        <option value="Bodas">Bodas</option>
                        <option value="Infantiles">Infantiles</option>
                        <option value="Baby Shower">Baby Shower</option>
                        <option value="Corporativo">Corporativo</option>
                        <option value="Quinceañeros">Quinceañeros</option>
                    </select>
                </div>

                {/* Precio */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Precio Base (S/)</label>
                    <input
                        type="number"
                        name="price"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        placeholder="1500"
                        required
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Descripción</label>
                    <textarea
                        name="description"
                        rows="3"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        placeholder="Detalles del servicio..."
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-full mt-4 transition-colors"
                >
                    Guardar Servicio
                </button>

            </form>
        </div>
    );
}