
interface EnvConfig {
    NEXT_PUBLIC_BACKEND_URL: string;
    NEXT_PUBLIC_REGISTER: string;
    NEXT_PUBLIC_LOGIN: string;
    NEXT_PUBLIC_LOGOUT: string;
    NEXT_PUBLIC_GET_USER: string;
}


const loadEnvVariables = (): EnvConfig => {

    const requireEnvVariable = [
        "NEXT_PUBLIC_BACKEND_URL",
        "NEXT_PUBLIC_REGISTER",
        "NEXT_PUBLIC_LOGIN",
        "NEXT_PUBLIC_LOGOUT",
        "NEXT_PUBLIC_GET_USER",
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
    }
}

export const envVars = loadEnvVariables();