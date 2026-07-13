import { pool } from '$lib/db';

export async function GET() {
    try {
        const result = await pool.query('SELECT NOW()');

        return new Response(JSON.stringify(result.rows), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error(error);

        return new Response(
            JSON.stringify({
                error: String(error)
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}