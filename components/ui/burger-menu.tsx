'use client';

import { useState } from 'react';
import { Menu, X, User, PictureInPicture } from 'lucide-react';
import Link from 'next/link';

export function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            {/* Иконка */}
            <button
                onClick={toggleMenu}
                className="text-gray-900 p-2 rounded hover:bg-gray-100 focus:outline-none transition-colors"
                aria-label="Открыть меню"
            >
                {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>

            {/* Меню */}
            <div
                className={`fixed inset-0 bg-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Верхняя панель */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <h2 className="text-lg font-semibold">Меню</h2>
                        <X
                            onClick={toggleMenu}
                            className="h-8 w-8 cursor-pointer hover:text-gray-400 transition-colors"
                        />
                    </div>

                    {/* Ссылки */}
                    <nav className="flex-1 p-4 flex flex-col gap-4">
                        <Link
                            href="/profile-user"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                        >
                            <User className="h-5 w-5" />
                            Личный кабинет
                        </Link>
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className=" flex items-center gap-2 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                        >   
                            <PictureInPicture />
                            Обработка заявок
                        </Link>


                    </nav>

                </div>
            </div>
        </div>
    );
}
