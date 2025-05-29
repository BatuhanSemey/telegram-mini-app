'use client';

import { useEffect, useState } from 'react';


export default function Main() {
    const [user, setUser] = useState<TelegramUser | null>(null);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp
            tg.ready();

            const getUser = async () => {
                const response = await fetch('/api/accounts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        initData: tg.initData,
                    }),
                });

                const data = await response.json();
                return data.result;
            };

            getUser().then(() => {
                setUser(tg.initDataUnsafe.user as TelegramUser);
                console.log('Пользователь Telegram:', tg.initDataUnsafe.user);
            });
        }
    }, []);

    return (
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
    );
}
