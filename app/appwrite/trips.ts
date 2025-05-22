import { Query } from "appwrite"
import { appwriteConfig, database } from "~/appwrite/client"

export const getAllTrips = async (limit:number, offset:number) => {
    const allTrip = await database.listDocuments(
        appwriteConfig.databaseUrl,
        appwriteConfig.tripkeyUrl,
        [Query.limit(limit), Query.offset(offset), Query.orderDesc('createAt')]
    )
    if(allTrip.total === 0) {
        console.error('No Trips found')
        return {allTrips: [],total: 0}
    }

    return {
        allTrips: allTrip.documents,
        total: allTrip.total   
    }
}

export const getTripById = async (tripId:string) => {
    const trip = await  database.getDocument(
        appwriteConfig.databaseUrl,
        appwriteConfig.tripkeyUrl,
        tripId
    );
    if(!trip.$id){
        console.error('Trip Not found')
        return null;
    }
    return trip;
}