import { useEffect, useState } from 'react';
import { getConfig } from '../api/services.api';

export function Footer() {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        getConfig().then(res => setConfig(res.data)).catch(err => console.log(err));
    }, []);

    const year = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 py-12 mt-auto font-display">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">

                <div className="text-center md:text-left">
                    <h3 className="font-bold text-xl text-gray-800 flex items-center justify-center md:justify-start gap-2">
                        <span className="material-symbols-outlined text-primary">celebration</span>
                        {config?.siteName || 'Paola Deco'}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-xs">
                        {config?.address || 'Expertos en decoración de eventos inolvidables.'}
                    </p>
                </div>

                <div className="flex gap-4">
                    {config?.facebookUrl && (
                        <a href={config.facebookUrl} target="_blank" className="size-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                            <span className="font-bold">f</span> {/* O usa un icono SVG de FB */}
                        </a>
                    )}

                    {config?.instagramUrl && (
                        <a href={config.instagramUrl} target="_blank" className="size-12 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all transform hover:-translate-y-1">
                            <span className="font-bold">Ig</span> {/* O usa un icono SVG de IG */}
                        </a>
                    )}

                    {config?.whatsapp && (
                        <a href={`https://wa.me/${config.whatsapp}`} target="_blank" className="size-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all transform hover:-translate-y-1">
                            <span className="material-symbols-outlined">chat</span>
                        </a>
                    )}
                </div>

                <div className="text-center md:text-right">
                    <p className="text-sm text-gray-400">© {year} Todos los derechos reservados.</p>
                    {config?.email && <p className="text-xs text-gray-300 mt-1">{config.email}</p>}
                </div>
            </div>
        </footer>
    );
}