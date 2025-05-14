import { Header, StacksCard, TripCard } from "components"
import { getUser } from "~/appwrite/auth";
import { dashboardStats, user, allTrips  } from "~/constants";
import type { Route } from './+types/dashboard'; 

const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;
export const clientLoader = async () => await getUser(); 


const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData as User | null;
  console.log("dashboard user ",user)

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? 'Guest'}`}
        descriptiion="This is your dashboard, you can manage your travel app from here"
        />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <StacksCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={usersJoined.currentMonth}
            lastMonthCount={usersJoined.lastMonth}
          />
          <StacksCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthCount={tripsCreated.currentMonth}
            lastMonthCount={tripsCreated.lastMonth}
          />

          <StacksCard
            headerTitle="Active Users"
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonth}
          />

        </div>
      </section>

      <section className="flex flex-col gap-6">
        <section className="container">
          <h1 className="text-xl font-semibold text-dark-100">Created Trip</h1>

          <div className="trip-grid">
            {allTrips.slice(0, 4).map(({id , name, imageUrls, itinerary, tags, estimatedPrice}) => (
              <TripCard
                key={id}
                id={id.toString()}
                name={name}
                imageUrl={imageUrls[0]}
                location={itinerary?.[0]?.location}
                tags={tags}
                price={estimatedPrice} />
            ))}
          </div>
        </section>
      </section>

    </main>
  )
}

export default Dashboard
