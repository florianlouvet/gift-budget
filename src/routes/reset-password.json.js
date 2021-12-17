import supabase from '$lib/supabase';

export const post = async (request) => {
    const password1 = request.body.get("password1");
    const password2 = request.body.get("password2");

    if (password1 == password2) {
        const { error } = await supabase.auth.update({
            password: password1
        });
        if (!error) {
            return {
                headers: { Location: '/' },
                status: 302,
            }
        } else {
            return {
                headers: { Location: `/reset-password?error=${encodeURIComponent(error.message)}` },
                status: 302,
            };
        }
    }
    return {
        headers: { Location: `/reset-password?error=${encodeURIComponent('Password are not identical')}` },
        status: 302,
    };
};
