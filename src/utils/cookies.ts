"use server"

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const getDecodedTokens = async () => {
    const cookieStore = await cookies();
    
    // 1. Find the Supabase auth cookie (it starts with sb- and ends with -auth-token)
    const allCookies = await cookieStore.getAll();
    const supabaseCookie = await allCookies.find(c => c.value.startsWith('base64-'));

    if (!supabaseCookie || !supabaseCookie.value) {
        return null; // User is not logged in
    }

        const base64String = await supabaseCookie.value.split("base64-")[1]
        
        const decodedString = await Buffer.from(base64String, 'base64').toString('utf-8');
        // const sessionData = await JSON.parse(decodedString);

        // return sessionData
        return decodedString
    // try {

        
    // } catch (error) {
    //     return error;
    // }
}