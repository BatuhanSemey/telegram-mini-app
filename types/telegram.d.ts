// src/telegram.d.ts

export { };

declare global {
    interface TelegramUser {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
        photo_url?: string;
    }

    interface TelegramWebApp {
        initData: string;
        initDataUnsafe: {
            user?: TelegramUser;
            [key: string]: unknown;
        };
        ready: () => void;
        close: () => void;
        sendData: (data: string) => void;
        MainButton: {
            text: string;
            setText: (text: string) => void;
            show: () => void;
            hide: () => void;
            onClick: (callback: () => void) => void;
        };
        BackButton: {
            show: () => void;
            hide: () => void;
            onClick: (callback: () => void) => void;
        };
        [key: string]: unknown;
    }

    interface Window {
        Telegram: {
            WebApp: TelegramWebApp;
        };
    }
}
