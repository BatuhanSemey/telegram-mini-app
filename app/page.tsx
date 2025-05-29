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
  // можно добавить другие поля из Telegram WebApp, если нужно
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
    if (window.Telegram) {
      setTg(window.Telegram.WebApp);
      window.Telegram.WebApp.ready();
    }
  }, []);

  const user = tg?.initDataUnsafe.user;

  const sendData = () => {
    if (tg) tg.sendData(JSON.stringify({ action: 'test', message: 'Hello from MiniApp' }));
  };

  return (
    <div>
      <h1>Telegram Mini App</h1>
      {user ? <p>Привет, {user.first_name}</p> : <p>Загрузка...</p>}
      <button onClick={sendData}>Отправить данные боту</button>
    </div>
  );
}
