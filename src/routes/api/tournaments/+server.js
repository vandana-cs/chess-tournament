import { pool } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const result = await pool.query(
        "SELECT * FROM tournaments ORDER BY id"
    );

    return new Response(JSON.stringify(result.rows), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {

    const { title, location, tournament_date } = await request.json();

    await pool.query(
        `INSERT INTO tournaments(title, location, tournament_date)
         VALUES($1,$2,$3)`,
        [title, location, tournament_date]
    );

    return new Response(
        JSON.stringify({
            message: "Tournament Added"
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

    const { id, title, location, tournament_date } = await request.json();

    await pool.query(
        `UPDATE tournaments
         SET title=$1,
             location=$2,
             tournament_date=$3
         WHERE id=$4`,
        [title, location, tournament_date, id]
    );

    return new Response(
        JSON.stringify({
            message: "Tournament Updated"
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}
/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {

    const { id } = await request.json();

    await pool.query(
        "DELETE FROM tournaments WHERE id=$1",
        [id]
    );

    return new Response(
        JSON.stringify({
            message: "Tournament Deleted"
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}