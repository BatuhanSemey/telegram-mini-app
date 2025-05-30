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

        const tg = await loadTelegramWebApp() /* Инициализация WebApp */
        const idUser = tg.initDataUnsafe?.user?.id
        console.log(idUser);
        
        if (idUser) {

            const statusResponse = await CheckedUserAccount(idUser) /* Проверка аккаунта */

            console.log(statusResponse);
            
            if (statusResponse !== 200) {
                router.replace(`/no-access`);
                return
            }

            setUserData(tg.initDataUnsafe.user!)
            return setUser(tg.initDataUnsafe.user!)
        }
        else {
            router.replace(`/no-access`);
        }
    }, [router])


    useEffect(() => {
        console.log('useEffect');
        
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
