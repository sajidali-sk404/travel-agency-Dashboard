import { Account, Client, Databases, Storage } from 'appwrite'

export const appwriteConfig = {
    endpointUrl: import.meta.env.VITE_APPWRITE_ENDPOINT,
    projectIdUrl: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteApiUrl: import.meta.env.VITE_APPWRITE_API_KEY,
    databaseUrl: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    userkeyUrl: import.meta.env.VITE_APPWRITE_USERS_KEY,
    tripkeyUrl: import.meta.env.VITE_APPWRITE_TRIPS_KEY,
}

const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl) // Your API Endpoint
    .setProject(appwriteConfig.projectIdUrl) // Your project ID
    

    const account = new Account(client);
    const database = new Databases(client);
    const storage = new Storage(client);

export { client, account, database, storage };