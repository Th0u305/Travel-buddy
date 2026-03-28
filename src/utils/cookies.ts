"use server"

import { cookies } from "next/headers";


export const getDecodedTokens = async () => {
    const cookieStore = await cookies();
    
    // 1. Find the Supabase auth cookie (it starts with sb- and ends with -auth-token)
    const allCookies = cookieStore.getAll();
    const supabaseCookie = allCookies.find(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'));

    if (!supabaseCookie || !supabaseCookie.value) {
        return null; // User is not logged in
    }

    try {
        // 2. Remove the "base64-" prefix that Supabase adds
        const base64String = supabaseCookie.value.replace('base64-', '');
        
        // 3. Decode the base64 string to standard text
        const decodedString = Buffer.from(base64String, 'base64').toString('utf-8');
        
        // 4. Parse the JSON
        const sessionData = JSON.parse(decodedString);
        if(sessionData.access_token && sessionData.refresh_token && sessionData.user){
            return {
                success : true,
                status : 200,
            };
        }else{
            return null
        }
        
    } catch (error) {
        return error;
    }
}