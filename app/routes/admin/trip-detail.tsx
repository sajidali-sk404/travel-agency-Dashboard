import { getTripById } from '~/appwrite/trips'
import type { LoaderFunctionArgs } from "react-router"
import type { Route } from './+types/trip-detail';
import { parseTripData } from '~/libs/utility';
import { Header } from 'components';

const loader = async ({ params }: LoaderFunctionArgs) => {
    const { tripId } = params;

    if (!tripId) throw new Error('Trip ID is required');

    return await getTripById(tripId)


}
const TripDetail = ({ loaderData }: Route.ComponentProps) => {
    const tripData = parseTripData(loaderData?.tripDetail)
    const { name } = tripData || {}; 
    return (
        <main className='travel-detail wrapper'>
            <Header title='Trip Details'  descriptiion='View and edit AI-generated Travel plans'/>
                <section className='container wapper-md'>
                    <header>
                        <h1 className='p-40-semibold text-dark-100'>{name}</h1>
                    </header>

                </section>
        </main>
    )
}

export default TripDetail
