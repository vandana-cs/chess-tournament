import { pool } from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET() {

    const result = await pool.query(
        "SELECT * FROM players ORDER BY id"
    );

    return new Response(
        JSON.stringify(result.rows),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {

    const { name, age, rating } = await request.json();

    await pool.query(
        `INSERT INTO players(name, age, rating)
         VALUES($1,$2,$3)`,
        [name, age, rating]
    );

    return new Response(
        JSON.stringify({
            message: "Player Added"
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

    const { id, name, age, rating } = await request.json();

    await pool.query(
        `UPDATE players
         SET name=$1,
             age=$2,
             rating=$3
         WHERE id=$4`,
        [name, age, rating, id]
    );

    return new Response(
        JSON.stringify({
            message: "Player Updated"
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
        "DELETE FROM players WHERE id=$1",
        [id]
    );

    return new Response(
        JSON.stringify({
            message: "Player Deleted"
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}