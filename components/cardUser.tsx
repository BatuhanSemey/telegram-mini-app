"use client"

import { useDataStore } from "@/store/store"

export default function CardUser() {
    const { userData } = useDataStore()

    return (
        <div className="h-screen w-full rounded-2xl shadow-xl bg-white p-6 transition-transform transform ">
            <h1 className="text-center text-2xl font-semibold text-gray-900 mb-4">Личный кабинет</h1>

            {userData ? (
                <div className="space-y-3 text-gray-700">
                    <p>
                        <span className="font-medium text-gray-900">Имя:</span> {userData.first_name}
                    </p>
                    {userData.last_name && (
                        <p>
                            <span className="font-medium text-gray-900">Фамилия:</span> {userData.last_name}
                        </p>
                    )}
                    {userData.username && (
                        <p>
                            <span className="font-medium text-gray-900">Логин:</span> @{userData.username}
                        </p>
                    )}
                    <p>
                        <span className="font-medium text-gray-900">User ID:</span> {userData.id}
                    </p>
                </div>
            ) : (
                <p className="text-gray-400">Загрузка данных пользователя...</p>
            )}
        </div>
    )
}
