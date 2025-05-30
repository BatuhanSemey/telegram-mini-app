'use client';

import CheckedUserAccount from '@/lib/checkedUserAccount';
import loadTelegramWebApp from '@/lib/telegram';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { useDataStore } from '@/store/store';


export default function Home() {
    const router = useRouter()
    const [user, setUser] = useState<TelegramUser | null>(null);
    const { userData, setUserData } = useDataStore()

    const initTelegram = useCallback(async () => {
        console.log('Запускаю initTelegram...');
        
        const tg = await loadTelegramWebApp() /* Инициализация WebApp */
        const idUser = tg.initDataUnsafe?.user?.id

        if (idUser) {

            const statusResponse = await CheckedUserAccount(idUser) /* Проверка аккаунта */

            if (statusResponse === 403) {

                const message = encodeURIComponent('Пользователь не найден или доступ запрещён');
                router.replace(`/no-access?message=${message}`);

                return
            }
            else if (statusResponse === 500) {

                const message = encodeURIComponent('Ошибка сервера');
                router.replace(`/no-access?message=${message}`);

                return
            }

            setUserData(tg.initDataUnsafe.user!)
            return setUser(tg.initDataUnsafe.user!)
        }
        else {
            const message = encodeURIComponent('Доступ запрещён');
            router.replace(`/no-access?message=${message}`);
        }
    }, [router])


    useEffect(() => {
        console.log('Проверка userData:', userData);

        if (userData) {
            setUser(userData)
            return
        }

        initTelegram();
    }, [userData, initTelegram]);

    return (
        <div className='h-screen w-full'>
            {user && <Header />}
        </div>

    );
}
