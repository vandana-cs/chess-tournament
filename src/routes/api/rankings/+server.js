import { pool } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET() {

    const result = await pool.query(`
        SELECT
            p.name,
            COUNT(*) AS wins
        FROM matches m
        JOIN players p
        ON m.winner_id = p.id
        GROUP BY p.name
        ORDER BY wins DESC
    `);

    return new Response(JSON.stringify(result.rows), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}
