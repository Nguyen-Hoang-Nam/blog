import faunadb from "faunadb";

exports.handler = async (event) => {
    const q = faunadb.query;
    const client = new faunadb.Client({
        secret: process.env.FAUNA_API_KEY,
        domain: "db.us.fauna.com",
    });

    const index = "likes_by_slug";
    const db = "likes";

    const data = JSON.parse(event.body);
    const slug = data.slug;
    if (!slug) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Article slug not provided",
            }),
        };
    }

    const doesDocExist = await client.query(
        q.Exists(q.Match(q.Index(index), slug))
    );

    if (!doesDocExist) {
        await client.query(
            q.Create(q.Collection(db), {
                data: { slug: slug, likes: 1 },
            })
        );
    }

    const document = await client.query(q.Get(q.Match(q.Index(index), slug)));
    await client.query(
        q.Update(document.ref, {
            data: {
                likes: document.data.likes + 1,
            },
        })
    );

    const updatedDocument = await client.query(
        q.Get(q.Match(q.Index(index), slug))
    );

    return {
        statusCode: 200,
        body: JSON.stringify({
            likes: updatedDocument.data.likes,
        }),
    };
};
