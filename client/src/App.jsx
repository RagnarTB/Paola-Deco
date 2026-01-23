// client/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicLayout } from './layouts/PublicLayout'; // <--- Importar

import { HomePage } from './pages/HomePage'; // <--- Importar
import { CatalogPage } from './pages/CatalogPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { LoginPage } from './pages/LoginPage';
import { ServiceFormPage } from './pages/ServiceFormPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CategoriesPage } from './pages/CategoriesPage'; // <--- IMPORTAR
import { AdminConfigPage } from './pages/AdminConfigPage'; // <--- IMPORTAR
import { AdminLayout } from './layouts/AdminLayout';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background-light font-display">
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>

            {/* --- ZONA PÚBLICA (Con Navbar y Footer) --- */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/servicio/:id" element={<ServiceDetailPage />} />
            </Route>

            {/* --- LOGIN (Sin Navbar pública) --- */}
            <Route path="/login" element={<LoginPage />} />

            {/* --- ZONA ADMIN (Protegida) --- */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/crear" element={<ServiceFormPage />} />
                <Route path="/admin/categorias" element={<CategoriesPage />} />  {/* <--- NUEVA */}
                <Route path="/admin/configuracion" element={<AdminConfigPage />} /> {/* <--- NUEVA */}
              </Route>
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;