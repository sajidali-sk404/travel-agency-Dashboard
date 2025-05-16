import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns"
import { Header } from "components"
import type { Route } from "./+types/create-trip";
import { comboBoxItems, selectItems } from "~/constants";
import { cn, formatKey } from "~/libs/utility";
import { Coordinate, LayerDirective, LayersDirective, MapsComponent } from "@syncfusion/ej2-react-maps";
import { useState } from "react";
import { world_map } from "~/constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "~/appwrite/client";



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

  const [formData, setFormData] = useState<TripFormData>({
      country: countries[0]?.name || '',
      travelStyle: '',
      interest:'',
      budget: '',
      duration:0,
      groupType: ''    
    })
  
  const [error, seterror] = useState<string | null>(null)
  const [loading, setloading] = useState(false)

  const countryData = countries.map((country) => ({
      text: country.name,
      value: country.value

    }
  ))

  const mapData = [
    {
      country: formData.country,
      color: 'EA382E',
      Coordinate: countries.find((c: Country) => c.name === formData.country)?.coordinates || []
    }
  ]
 
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true)

    if(
      !formData.country ||
      !formData.travelStyle ||
      !formData.interest ||
      !formData.budget ||
      !formData.groupType 
      )
      {
      seterror('Plaese provide values for all fields')
      setloading(false)
      return;
    }
    if(formData.duration > 0 && formData.duration <= 10 ){
      seterror('Duration must be between 1 and 10 Days')
      setloading(false)
      return;
    }

    const user = await account.get();
    if(!user.$id) {
      console.error('User not authenticated')
      setloading(false)
      return;
    }

    try {
      
    } catch (error) {
      console.error('Generating error Trip', error)
    } finally {
      setloading(false)
    }

  };
  const handelChange = (key: keyof TripFormData, value:string | number) => {
    setFormData({ ...formData, [key]:value})
  }

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
         <Header
    title="Create A Trip"
    descriptiion="View and edit AI-genereted travel plans"
    />

    <section className="mt-2.5 wrapper-md">
      <form action="" className="trip-form" onSubmit={handleSubmit}>
          <div>
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
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <input 
              id="duration"
              name="duration"
              type="number"
              placeholder="Enter A number of days (5,12...)"
              className="form-input placeholder:text-gray-100" 
              onChange={(e) => {handelChange('duration', Number(e.target.value ))}}           
            />
          </div>

          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>
              <ComboBoxComponent 
                  id={key}
                  dataSource={comboBoxItems[key].map((item) => ({
                    text: item,
                    value:item,
                  }))}
                  fields={{text: 'text', value:'value'}}
                  placeholder={`Select ${formatKey(key)}`}
                   change={(e:{value:string | undefined}) => {
                       if(e.value){
                        handelChange(key, e.value);
                       }}
                      }
                      allowFiltering
                      filtering={(e) => {
                        const query = e.text.toLowerCase();

                        e.updateData(
                          comboBoxItems[key].filter((item) => item.toLowerCase().includes(query)).map((item) =>({
                            text:item,
                            value: item,
                          }))
                        )}}
                        className="combo-box"
              />
            </div>
          ))}

          <div>
            <label htmlFor="location">Location on the World map</label>

            <MapsComponent>
              <LayersDirective>
                <LayerDirective 
                  shapeData={world_map}
                  dataSource={mapData}
                  shapePropertyPath="name"
                  shapeDataPath="country"
                  shapeSettings={{colorValuePath:'color', fill: '#e5e5e5'}}
                />
              </LayersDirective>
            </MapsComponent>
          </div>

          <div className="bg-gray-200 h-px w-full"/>

          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}

          <footer className="px-6 w-full">
            <ButtonComponent 
              type="submit"
              className="button-class !h-12 !w-full"
              disabled={loading}
            >
              <img src={`/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`} alt="" className={cn("size-5", {'animate-spin':loading})} />
              <span className="p-16-semibold text-white">
                {loading ? 'Generating...' : 'Generate Trip'}
              </span>
            </ButtonComponent>
          </footer>
      </form>

    </section>
    </main>
  )
}

export default createTrip
