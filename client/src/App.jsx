import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CatalogPage } from './pages/CatalogPage';
import { ServiceFormPage } from './pages/ServiceFormPage'; // <--- IMPORTAR

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background-light">
        <Routes>
          <Route path="/" element={<Navigate to="/catalogo" />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/admin/crear" element={<ServiceFormPage />} /> {/* <--- NUEVA RUTA */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;