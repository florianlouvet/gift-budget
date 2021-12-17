import supabase from "$lib/supabase";

export const get = async () => {
    let { data: users, error } = await supabase
        .from('users')
        .select('*');
    if (error) {
        return { status: 400, body: error }
    }
    return {
        body: [
            ...users,
        ]
    };
};
