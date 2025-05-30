import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

async function connectDB() {
    try {
        const client = await pool.connect();
        console.log('БД подключен.');
        client.release()
    } catch (error) {
        console.error('Ошибка подключения к БД:', error);
    }
}

connectDB()

export default pool