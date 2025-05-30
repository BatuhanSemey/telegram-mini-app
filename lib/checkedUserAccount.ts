export default async function CheckedUserAccount(id: number): Promise<number> {


    try {
        const response = await fetch(`/api/accounts?id=${id}`)

        return response.status
    }
    catch (e: unknown) {
        if (e instanceof Error) {
            console.error('Ошибка:', e.message);
        }
        return 500;
    }
}