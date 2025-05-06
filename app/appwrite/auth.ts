import { ID, OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, database } from "~/appwrite/client";
import { redirect } from "react-router";



export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(OAuthProvider.Google);
    } catch (error) {
        console.log("loginWithGoogle",error);
    }
}
export const logOutUser = async () => {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.log(error);
    }
}
export const getUser = async () => {
    try {
        const user = await account.get();
        if(!user)
            return redirect('/sign-in')

        const {documents} = await database.listDocuments(appwriteConfig.databaseUrl, appwriteConfig.userkeyUrl, [
            Query.equal('accountId', user.$id),
            Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId'])
        ])
        if(documents.length === 0) return await storeUserData();

    } catch (error) {
        console.log(error);
    }
}
export const getGooglePicture = async () => {
    try {
        const session = await account.getSession('current');
        const oAuthToken =  session.providerAccessToken;

        if(!oAuthToken){
            console.log('No token found');
            return null;
        }
        const response = await fetch(`https://people.googleapis.com/v1/people/me?personFields=photos`,{
            headers: {
                Authorization: `Bearer ${oAuthToken}`
            }
        });

        if(!response.ok){
            console.log('Error fetching Google profile picture', response.statusText);
            return null;
        }

        const data = await response.json();
        const photoUrl = data.photos && data.photos.length > 0 ? data.photos[0].url : null;
        return photoUrl;


    } catch (error) {
        console.log(error);
    }
}
export const storeUserData = async () => {
    try {
        const user = await account.get();

        if(!user) return null;

        const {documents} = await database.listDocuments(appwriteConfig.databaseUrl, appwriteConfig.userkeyUrl, [Query.equal('accountId', user.$id)]);
        if(documents.length > 0) return documents[0];

        const imageUrl = await getGooglePicture();
        const newUser = await database.createDocument(appwriteConfig.databaseUrl, appwriteConfig.userkeyUrl, 
         ID.unique(),
        {
            accountId: user.$id,
            email: user.email,
            name: user.name,
            imageUrl: imageUrl || ' ',
            joinedAt: new Date().toISOString(),

        } )
        return newUser;
    } catch (error) {
        console.log(error);
    }
}
export const getExistingUser = async () => {
    try {
        const user = await account.get();
        if(!user) return null;
        const {documents} = await database.listDocuments(appwriteConfig.databaseUrl, appwriteConfig.userkeyUrl, [Query.equal('accountId', user.$id)]); 
        if(documents.length === 0) return null;
        return documents[0];
    } catch (error) {
        console.log(error);
    }
}