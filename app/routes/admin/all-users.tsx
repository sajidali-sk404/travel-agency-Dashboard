import { Header } from "components"
import {ColumnDirective, ColumnsDirective, GridComponent} from '@syncfusion/ej2-react-grids'
import { users } from "~/constants"
import { cn } from "~/libs/utility"

const AllUser = () => {
  return (
    <main className="all-users wrapper">
    <Header
    title="Manage Users"
    descriptiion="Filter, sort, And access detailed user profiles"
    />
  
    <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
            <ColumnDirective 
                field="name"
                headerText="Name"
                width="200"
                textAlign="left"
                template={(props: UseerData) =>(
                  <div className="flex items-center gap-1.5 px-4">
                    <img src={props.imageUrl} alt="user" className="rounded-full size-8 aspect-square" />
                        <span>{props.name}</span>
                  </div>
                )}
            />

            <ColumnDirective 
                field="email"
                headerText="Email"
                width="150"
                textAlign="left"
            />

            <ColumnDirective 
                field="dateJoined"
                headerText="DateJoined"
                width="120"
                textAlign="left"
            />

            
            <ColumnDirective 
                field="itineraryCreated"
                headerText="Trip Created"
                width="130"
                textAlign="left"
            /> 

            <ColumnDirective 
                field="status"
                headerText="Type"
                width="130"
                textAlign="left"
                template={({status}: UserData) => (
                  <article className={cn('status-column' , status === "user" ? 'bg-success-50' : 'bg-light-300')}>
                    <div className={cn("size-1.5 rounded-full", status === "user" ? 'bg-success-500' : 'bg-gray-500')}/>
                      <h3 className={cn("font-inter text-xs font-medium" , status === "user" ? 'text-success-700' : 'text-gray-500')}>{status}</h3>
                    
                  </article>
                )}
            />
        </ColumnsDirective>
    </GridComponent>

  </main>
  )
}

export default AllUser
