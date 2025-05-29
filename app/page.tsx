'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Telegram?: any;
  }
}

export default function Home() {
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    if (window.Telegram) {
      setTg(window.Telegram.WebApp);
      window.Telegram.WebApp.ready();
    }
  }, []);

  const user = tg?.initDataUnsafe?.user;

  return (
    <div>
      <h1>Telegram Mini App</h1>
      {user ? <p>Привет, {user.first_name}</p> : <p>Загрузка...</p>}
    </div>
  );
}
