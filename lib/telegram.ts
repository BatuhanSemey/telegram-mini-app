export default async function loadTelegramWebApp(): Promise<TelegramWebApp> {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            reject('window is undefined')
            return
        }

        const script = document.createElement('script')
        script.src = 'https://telegram.org/js/telegram-web-app.js'
        script.async = true;

        script.onload = () => {
            const tg = window.Telegram?.WebApp;
            if (!tg) {
                reject('Ошибка загрузки WebApp')
                return
            }
            tg.ready()
            resolve(tg)
        };

        script.onerror = () => reject('Telegram WebApp загружен');

        document.body.appendChild(script);
    })
}
