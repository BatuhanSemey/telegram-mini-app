'use client';

import { useEffect, useState } from 'react';

interface TelegramWebAppUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
}

interface TelegramWebAppInitData {
    user?: TelegramWebAppUser;
}

interface TelegramWebApp {
    initDataUnsafe: TelegramWebAppInitData;
    ready: () => void;
    sendData: (data: string) => void;
}

declare global {
    interface Window {
        Telegram?: {
            WebApp: TelegramWebApp;
        };
    }
}

export default function Home() {
    const [tg, setTg] = useState<TelegramWebApp | null>(null);

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            console.log('Telegram WebApp:', window.Telegram.WebApp);
            setTg(window.Telegram.WebApp);
            window.Telegram.WebApp.ready();
        } else {
            console.log('Telegram WebApp not found');
        }
    }, []);

    const user = tg?.initDataUnsafe.user;

    const sendData = () => {
        if (tg) tg.sendData(JSON.stringify({ action: 'test', message: 'Hello from MiniApp' }));
    };

    return (
        <div>
            <h1>Telegram Mini App</h1>
            {tg ? (
                <>
                    {tg.initDataUnsafe.user ? (
                        <p>Привет, {tg.initDataUnsafe.user.first_name}</p>
                    ) : (
                        <p>Пользователь не найден в initDataUnsafe</p>
                    )}
                    <button onClick={sendData}>Отправить данные боту</button>
                </>
            ) : (
                <p>Telegram WebApp не загружен</p>
            )}
        </div>
    );

}
