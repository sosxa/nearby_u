export async function POST(req: Request) {
    try {
        const data = await req.json(); // Parse the request body

        // Process the data (e.g., save to a database)
        console.log("Received data:", data);

        // Return a success response
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: "Error processing request" }), { status: 500 });
    }
}