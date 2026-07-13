import { pool } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET() {

    const result = await pool.query(`
        SELECT
            tp.id,
            p.name,
            t.title
        FROM tournament_players tp
        JOIN players p ON tp.player_id = p.id
        JOIN tournaments t ON tp.tournament_id = t.id
        ORDER BY tp.id
    `);

    return new Response(JSON.stringify(result.rows), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {

    const { player_id, tournament_id } = await request.json();

    await pool.query(
        `INSERT INTO tournament_players(player_id, tournament_id)
         VALUES($1, $2)`,
        [player_id, tournament_id]
    );

    return new Response(
        JSON.stringify({
            message: "Player Registered Successfully"
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}