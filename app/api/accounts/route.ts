import { DbUserDataType } from "@/types/types";
import { Telegraf } from "telegraf";
import pool from '@/lib/db'

/* Обработка запросов */
async function getStatus(status: number, message: string) {
    return new Response(JSON.stringify({ message }), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    })
}


export async function GET(request: Request) {
    const bot = new Telegraf(process.env.BOT_TOKEN as string)

    try {
        const url = new URL(request.url)

        const idUser = url.searchParams.get("id")!

        /* Запрос в БД */
        const { rows: data }: { rows: DbUserDataType } = await pool.query(`SELECT * FROM users WHERE telegram_id = $1`, [idUser])

        if (data) {
            console.log(data);
            bot.telegram.sendMessage(idUser, JSON.stringify(data))
            return getStatus(200, 'Доступ валиден');
        }

        return getStatus(403, 'Доступ запрещен');

    } catch (error) {
        console.error('Ошибка при обработке POST:', error);
        return getStatus(500, 'Ошибка сервера');
    }
}