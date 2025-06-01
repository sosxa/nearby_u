export default async function handler(req, res) {
    console.log("Hello World")
    if (req.method === 'POST') {
        const { name, email } = req.body;
        // Process data (e.g., save to database)
        res.status(200).json({ message: 'User created', name, email });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}