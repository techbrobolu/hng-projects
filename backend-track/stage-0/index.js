const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Allow simple CORS for local testing
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
});
app.get("/api/classify", async (req, res) => {
	const name = req.query.name;

	if (!name || typeof name !== "string" || name.trim() === "") {
		return res.status(422).json({ status: "error", message: "Invalid name" });
	}

	try {
		const response = await fetch(`https://api.genderize.io/?name=${encodeURIComponent(name)}`);

		if (!response || !response.ok) {
			return res.status(502).json({ status: "error", message: "Upstream API error" });
		}

		const data = await response.json();

		const gender = data.gender;
		const probability = Number(data.probability) || 0;
		const sample_size = Number(data.count) || 0;

		const is_confident = probability >= 0.7 && sample_size >= 100;

		const processed_at = new Date().toISOString();

		if (gender == null || sample_size === 0) {
			return res.status(200).json({
				status: "error",
				message: "No prediction available for the provided name",
			});
		}

		return res.status(200).json({
			status: "success",
			data: {
				name,
				gender,
				probability,
				sample_size,
				is_confident,
				processed_at,
			},
		});
	} catch (err) {
		return res
			.status(500)
			.json({ status: "error", message: "Internal server error", detail: err.message });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
