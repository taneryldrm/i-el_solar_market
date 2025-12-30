import { supabase } from './supabaseClient';

/**
 * Gets the existing active cart or creates a new one.
 * Uses a robust "Check -> Insert -> Catch Conflict" strategy to handle race conditions
 * and lack of unique constraints on profile_id.
 */
export const getOrCreateActiveCart = async (userId: string): Promise<string | null> => {
    try {
        // 1. Wait for Profile (Retry Mechanism)
        // Helps avoid "Foreign key violation" if trigger is slow
        let profileExists = false;
        for (let i = 0; i < 5; i++) {
            const { data } = await supabase.from('profiles').select('id').eq('id', userId).maybeSingle();
            if (data) {
                profileExists = true;
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        if (!profileExists) {
            console.warn("Profile check timed out, attempting cart creation anyway.");
        }

        // 2. Check for existing active cart
        const { data: existingCart } = await supabase
            .from('carts')
            .select('id')
            .eq('profile_id', userId)
            .eq('status', 'active')
            .maybeSingle();

        if (existingCart) {
            return existingCart.id;
        }

        // 3. Insert new cart
        const { data: newCart, error: insertError } = await supabase
            .from('carts')
            .insert({ profile_id: userId, status: 'active' })
            .select()
            .single();

        if (insertError) {
            // Handle Race Conditions (409 Conflict or Duplicate Key)
            if (insertError.code === '23505' || (insertError as any).status === 409) {
                // Retry fetch
                const { data: retryCart } = await supabase
                    .from('carts')
                    .select('id')
                    .eq('profile_id', userId)
                    .eq('status', 'active')
                    .maybeSingle();

                if (retryCart) return retryCart.id;
            }
            throw insertError;
        }

        return newCart.id;

    } catch (error) {
        console.error("Error in getOrCreateActiveCart:", error);
        return null;
    }
};
