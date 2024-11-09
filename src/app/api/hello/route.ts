export const GET = async (req: Request): Promise<Response> => {
	if (req.method !== "GET") {
		return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 })
	}

	const data = {
		message: "Hello from the test route!"
	}

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	})
}
