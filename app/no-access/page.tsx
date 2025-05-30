'use client';

import { useSearchParams } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

export default function NoAccess() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || 'Доступ запрещён';

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
            <div className="bg-gray-800 rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
                <div className="flex justify-center mb-4">
                    <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Доступ ограничен</h1>
                <p className="text-gray-300">{message}</p>
                <div className="mt-6">
                    <button
                        onClick={() => window.Telegram?.WebApp.close()}
                        className="bg-red-600 hover:bg-red-700 transition-colors px-6 py-2 rounded-lg text-white font-medium"
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
}
