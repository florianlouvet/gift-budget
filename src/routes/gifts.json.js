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
