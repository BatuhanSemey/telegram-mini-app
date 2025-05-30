'use client';

import { BurgerMenu } from './ui/burger-menu';
import { useDataStore } from '@/store/store';
import { LogOut } from 'lucide-react';


export default function Header() {
    const { userData } = useDataStore()
    return (
        <header className="flex items-center justify-between p-4 shadow bg-white border-b ">
            {/* Левая часть - бургер меню */}

            <BurgerMenu />

            {/* Центр - заголовок */}
            <div className="text-lg font-semibold text-center flex-1">
                <span className="text-gray-700">{userData?.username}</span>
            </div>

            {/* Правая часть - логин и кнопка выхода */}
            <div className="flex items-center space-x-2">
                <LogOut onClick={() => window.Telegram.WebApp?.close()} />
            </div>
        </header>
    );
}
