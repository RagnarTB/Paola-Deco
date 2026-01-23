import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function PublicLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <Outlet /> {/* Aquí se renderizará Home, Catalogo, etc. */}
            </div>
            <Footer />
        </div>
    );
}