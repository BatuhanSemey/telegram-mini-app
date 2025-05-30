'use client';

import { useEffect, useState } from 'react';

export default function Main() {
    const [user, setUser] = useState<TelegramUser | null>(null);

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://telegram.org/js/telegram-web-app.js'
        script.async = true

        script.onload = () => {
            const tg = window.Telegram?.WebApp
            if (!tg) return

            tg.ready();

            const idUser = tg.initDataUnsafe?.user?.id;
            if (!idUser) return;
            
            fetch(`/api/accounts?id=${idUser}`)
                .then((res) => res.json())
                .then((data) => {
                    setUser(data);
                });
        };

        document.body.appendChild(script);
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
