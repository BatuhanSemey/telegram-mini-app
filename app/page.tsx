'use client';

import Script from 'next/script';
import Main from './main';


export default function Home() {

    return (
        <>
            <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

            <Main />

        </>

    );
}
