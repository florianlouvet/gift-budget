import supabase from "$lib/supabase";

export const get = async () => {
    let { data: gifts, error } = await supabase
        .from('gifts')
        .select('*');
    if (error) {
        return { status: 400, body: error }
    }
    return {
        body: [
            ...gifts,
        ]
    };
};

export const post = async (request) => {
	const description = request.body.get('description');
	const family_user_id = request.body.get('family_user_id');
	const price = request.body.get('price');
	const { error } = await supabase
		.from('gifts')
		.insert(
			{ family_user_id, description, price },
		)
	if (error) {
		return {
			headers: { Location: `/add?error=${encodeURIComponent(error.message)}` },
			status: 302,
		};
	}
	return {
		headers: { Location: "/" },
		status: 302,
	};
};
