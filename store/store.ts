
import { create } from 'zustand';

interface StoreType {
    userData: TelegramUser
    setUserData: (data: TelegramUser) => void
}

export const useDataStore = create<StoreType>((set) => ({
    userData: undefined!,
    setUserData: (data) => set({ userData: data })
}))