


/* Обработка запросов */
async function getStatus(status: number, message: string, data: TelegramUser | undefined) {
    return new Response(JSON.stringify({ message: message, data }), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    })
}

export async function POST(request: Request) {

    const responseData = await request.body

    console.log(responseData);

    await getStatus(200, 'Доступ валиден', undefined)


}
