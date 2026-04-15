app.get("/api/classify", async (req, res) => {
	const name = req.query.name;

	if (!name || typeof name !== "string") {
		return res.status(422).json({ status: "error", message: "Invalid name" });
	}

	const response = await fetch(`https://api.genderize.io/?name=${name}`);
	const data = await response.json();

	const gender = data.gender;
	const probability = data.probability;
	const sample_size = data.count;

	const is_confident = probability >= 0.7 && sample_size >= 100;

	const processed_at = new Date().toISOString();

	if (!gender || gender === "null" || sample_size === 0) {
		return res.status(200).json({
			status: "error",
			message: "No prediction available for the provided name",
		});
	}

	return res
		.status(200)
		.json({
			status: "success",
			data: {
				name,
				gender,
				probability,
				sample_size,
				is_confident,
				processed_at,
			},
		})
		.header("Access-Control-Allow-Origin", "*");
});
