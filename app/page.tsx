'use client';

import { useEffect, useState } from 'react';

type TelegramUser = {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
};

export default function Home() {
    const [user, setUser] = useState<TelegramUser>();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
            const userData: unknown = tg.initDataUnsafe?.user;
            setUser(userData as TelegramUser);
            console.log('Пользователь Telegram:', userData);
        }
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Главная страница</h1>
            {user ? (
                <div className="mt-4">
                    <p><strong>Имя:</strong> {user.first_name}</p>
                    <p><strong>Фамилия:</strong> {user.last_name}</p>
                    <p><strong>Username:</strong> @{user.username}</p>
                    <p><strong>User ID:</strong> {user.id}</p>
                </div>
            ) : (
                <p className="text-gray-500 mt-4">Загрузка данных пользователя...</p>
            )}
        </div>
    );
}
