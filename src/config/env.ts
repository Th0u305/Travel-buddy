
interface EnvConfig {
    NEXT_PUBLIC_BACKEND_URL: string;
    NEXT_PUBLIC_REGISTER: string;
    NEXT_PUBLIC_LOGIN: string;
    NEXT_PUBLIC_LOGOUT: string;
    NEXT_PUBLIC_GET_USER: string;
    NEXT_PUBLIC_GOOGLE_LOGIN : string
    NEXT_PUBLIC_SUPABASE_URL : string;
    NEXT_PUBLIC_ANON_KEY : string;
    NEXT_PUBLIC_FORGOT_PASSWORD : string;
    NEXT_PUBLIC_HCAPTCHA_SITE_KEY : string;
    NEXT_PUBLIC_UPLOADIMAGE : string;
    NEXT_PUBLIC_IMAGE_CLOUD_NAME : string;
    NEXT_PUBLIC_CREATE_TRAVEL_PLAN : string;
    NEXT_PUBLIC_GET_COUNTRY_LISTS : string;
    NEXT_PUBLIC_GET_TRAVEL_LISTS : string;
    NEXT_PUBLIC_GET_TRAVEL_LISTS_BY_ID : string;
    NEXT_PUBLIC_GET_TRAVEL_FIND_BUDDIES : string;
    NEXT_PUBLIC_GET_USER_FULL_PROFILE : string;
}


const loadEnvVariables = (): EnvConfig => {

    const requireEnvVariable = [
        "NEXT_PUBLIC_BACKEND_URL",
        "NEXT_PUBLIC_REGISTER",
        "NEXT_PUBLIC_LOGIN",
        "NEXT_PUBLIC_LOGOUT",
        "NEXT_PUBLIC_GET_USER",
        "NEXT_PUBLIC_GOOGLE_LOGIN",
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_ANON_KEY",
        "NEXT_PUBLIC_FORGOT_PASSWORD",
        "NEXT_PUBLIC_HCAPTCHA_SITE_KEY",
        "NEXT_PUBLIC_UPLOADIMAGE",
        "NEXT_PUBLIC_IMAGE_CLOUD_NAME",
        "NEXT_PUBLIC_CREATE_TRAVEL_PLAN",
        "NEXT_PUBLIC_GET_COUNTRY_LISTS",
        "NEXT_PUBLIC_GET_TRAVEL_LISTS",
        "NEXT_PUBLIC_GET_TRAVEL_LISTS_BY_ID",
        "NEXT_PUBLIC_GET_TRAVEL_FIND_BUDDIES",
        "NEXT_PUBLIC_GET_USER_FULL_PROFILE"
    ]

    requireEnvVariable.forEach((variable) => {
        if (!process.env[variable]) {
            return {
                error: `Environment variable ${variable} is required but not set in .env file.`
            }
        }
    })

    return {
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
        NEXT_PUBLIC_REGISTER: process.env.NEXT_PUBLIC_REGISTER as string,
        NEXT_PUBLIC_LOGIN: process.env.NEXT_PUBLIC_LOGIN as string,
        NEXT_PUBLIC_LOGOUT: process.env.NEXT_PUBLIC_LOGOUT as string,
        NEXT_PUBLIC_GET_USER: process.env.NEXT_PUBLIC_GET_USER as string,
        NEXT_PUBLIC_GOOGLE_LOGIN: process.env.NEXT_PUBLIC_GOOGLE_LOGIN as string,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        NEXT_PUBLIC_ANON_KEY: process.env.NEXT_PUBLIC_ANON_KEY as string,
        NEXT_PUBLIC_FORGOT_PASSWORD: process.env.NEXT_PUBLIC_FORGOT_PASSWORD as string,
        NEXT_PUBLIC_HCAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string,
        NEXT_PUBLIC_UPLOADIMAGE: process.env.NEXT_PUBLIC_UPLOADIMAGE as string,
        NEXT_PUBLIC_IMAGE_CLOUD_NAME: process.env.NEXT_PUBLIC_IMAGE_CLOUD_NAME as string,
        NEXT_PUBLIC_CREATE_TRAVEL_PLAN: process.env.NEXT_PUBLIC_CREATE_TRAVEL_PLAN as string,
        NEXT_PUBLIC_GET_COUNTRY_LISTS: process.env.NEXT_PUBLIC_GET_COUNTRY_LISTS as string,
        NEXT_PUBLIC_GET_TRAVEL_LISTS: process.env.NEXT_PUBLIC_GET_TRAVEL_LISTS as string,
        NEXT_PUBLIC_GET_TRAVEL_LISTS_BY_ID: process.env.NEXT_PUBLIC_GET_TRAVEL_LISTS_BY_ID as string,
        NEXT_PUBLIC_GET_TRAVEL_FIND_BUDDIES: process.env.NEXT_PUBLIC_GET_TRAVEL_FIND_BUDDIES as string,
        NEXT_PUBLIC_GET_USER_FULL_PROFILE: process.env.NEXT_PUBLIC_GET_USER_FULL_PROFILE as string,
    }
}

export const envVars = loadEnvVariables();