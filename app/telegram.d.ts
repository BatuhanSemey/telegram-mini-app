// src/telegram.d.ts
export { };

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                initData: string;
                initDataUnsafe: {
                    user?: {
                        id: number;
                        first_name: string;
                        last_name?: string;
                        username?: string;
                        language_code?: string;
                    };
                    [key: string]: any;
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
                [key: string]: any;
            };
        };
    }
}
