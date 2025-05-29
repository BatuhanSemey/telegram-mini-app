'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

type TelegramUser = {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
};

export default function Main() {
    const [user, setUser] = useState<TelegramUser | null>(null);

    useEffect(() => {
        
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
            const userData = tg.initDataUnsafe?.user;
            if (userData) {
                setUser(userData);
                console.log('Пользователь Telegram:', userData);
            }
        }

    }, []);

    return (
        <>
            <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

            <div className="p-6">
                <h1 className="text-xl font-bold">Главная страница</h1>
                {user ? (
                    <div className="mt-4">
                        <p><strong>Имя:</strong> {user.first_name}</p>
                        {user.last_name && <p><strong>Фамилия:</strong> {user.last_name}</p>}
                        {user.username && <p><strong>Username:</strong> @{user.username}</p>}
                        <p><strong>User ID:</strong> {user.id}</p>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">Загрузка данных пользователя...</p>
                )}
            </div>
        </>

    );
}
