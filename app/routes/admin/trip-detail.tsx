import { getTripById } from '~/appwrite/trips'
import type { LoaderFunctionArgs } from "react-router"
import type { Route } from './+types/trip-detail';
import { parseTripData } from '~/libs/utility';
import { Header, InfoPill } from 'components';

const loader = async ({ params }: LoaderFunctionArgs) => {
    const { tripId } = params;


    if (!tripId) throw new Error('Trip ID is required');

    return await getTripById(tripId)


}
const TripDetail = ({ loaderData }: Route.ComponentProps) => {
    const imageUrls = loaderData?.imageUrls || []
    const tripData = parseTripData(loaderData?.tripDetails)
    const { name, duration, itinerary, travelStyle, groupType, budget, interests, estimatedPrice, description, bestTimeToVisit, weatherInfo, country } = tripData || {};
    return (
        <main className='travel-detail wrapper'>
            <Header title='Trip Details' descriptiion='View and edit AI-generated Travel plans' />
            <section className='container wapper-md'>
                <header>
                    <h1 className='p-40-semibold text-dark-100'>{name}</h1>
                    <div className='flex items-center'>
                        <InfoPill
                            text={`${duration} day plan`}
                            image="/assets/icons/calendar.svg"
                        />

                        <InfoPill
                            text={itinerary?.slice(0, 2).map((item) => item.location).join(',') || ''}
                            image="/assets/icons/location-mark.svg"
                        />
                    </div>
                </header>

                <section className='gallery'>
                    {imageUrls}

                </section>

            </section>
        </main>
    )
}

export default TripDetail
