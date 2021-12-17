import supabase from "$lib/supabase";

export const post = async (request) => {
	var collection = [];
	for (const [key, value] of request.body) {
		collection.push({ id: key, weight: value })
	}
	const { data, error } = await supabase
		.from('weight-settings')
		.upsert(collection, { onConflict: 'id' });
	if (error) {
		return {
			headers: { Location: `/settings?error=${encodeURIComponent(error.message)}` },
			status: 302,
		};
	}
	return {
		headers: { Location: "/" },
		status: 302,
	};
};


export const get = async () => {
	let { data: settings, error } = await supabase
		.from('weight-settings')
		.select('*');
	if (error) {
		return { status: 400, body: error }
	}
	return {
		body: [
			...settings,
		]
	};
};

