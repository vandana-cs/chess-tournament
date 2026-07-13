import { pool } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET() {

    const result = await pool.query(`
       SELECT
    m.id,
    m.player1_id,
    m.player2_id,
    t.title,
    p1.name AS player1,
    p2.name AS player2,
    w.name AS winner,
    m.winner_id
FROM matches m
JOIN tournaments t ON m.tournament_id=t.id
JOIN players p1 ON m.player1_id=p1.id
JOIN players p2 ON m.player2_id=p2.id
LEFT JOIN players w ON m.winner_id=w.id
ORDER BY m.id
    `);

    return new Response(JSON.stringify(result.rows), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {

    const { tournament_id } = await request.json();

    const players = await pool.query(
        `SELECT player_id
         FROM tournament_players
         WHERE tournament_id=$1`,
        [tournament_id]
    );

    const list = players.rows;

    for (let i = 0; i < list.length - 1; i += 2) {

        await pool.query(
            `INSERT INTO matches
            (tournament_id, player1_id, player2_id)
            VALUES($1,$2,$3)`,
            [
                tournament_id,
                list[i].player_id,
                list[i + 1].player_id
            ]
        );

    }

    return new Response(
        JSON.stringify({
            message: "Matches Generated"
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}
/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {

    const { id, winner_id } = await request.json();

    await pool.query(
        `UPDATE matches
         SET winner_id=$1
         WHERE id=$2`,
        [winner_id, id]
    );

    return new Response(
        JSON.stringify({
            message: "Winner Updated"
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}