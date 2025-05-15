import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns"
import { Header } from "components"
import type { Route } from "./+types/create-trip";


export const loader = async () => {
   const response = await fetch('https://restcountries.com/v3.1/all');
   const data = await response.json();

   return data.map((country:any) => ({
    name: country.flag + country.name.common,
    Coordinate: country.latlng,
    value: country.name.common,
    openStreetMap: country.map?.openStreetMap,
   }))
}

const createTrip = ({loaderData}:Route.ComponentProps) => {
  const countries = loaderData as Country[];
  
  const countryData = countries.map((country) => ({
      text: country.name,
      value: country.value

    }
  ))
 
  const handleSubmit = async () => {} 
  const handelChange = (key: keyof TripFormData, value:string | number) => {

  }

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
         <Header
    title="Create A Trip"
    descriptiion="View and edit AI-genereted travel plans"
    />

    <section className="mt-2.5 wrapper-md">
      <form action="" className="trip-form" onSubmit={handleSubmit}>
        <label htmlFor="country">
          Country
        </label>
        <ComboBoxComponent 
          id="country"
          dataSource={countryData}
          fields={{text: 'text', value: 'value'}}
          placeholder="Select a Country"
          className="combo-box"
          change={(e:{value:string | undefined}) => {
                       if(e.value){
                        handelChange('country', e.value);
                       }}
                      }
                      allowFiltering
                      filtering={(e) => {
                        const query = e.text.toLowerCase();

                        e.updateData(
                          countries.filter((country) => country.name.toLowerCase().includes(query)).map((country) =>({
                            text:country.name,
                            value: country.value,
                          }))
                        )
                      }}
        />
      </form>

    </section>
    </main>
  )
}

export default createTrip
