import { useState, useEffect } from 'react'
import AppBackend from './AppBackend'



function Input({info, value, onChange})
{
    return (
        <>
        {info} <input 
            value={value}
            onChange={onChange}
        />
        </>
    )
}


function CountryInfo({countriesData, filteredCountries})
{
    if (filteredCountries.length > 10)
    {
        return "Too many matches, specify another filter."
    }

    if (filteredCountries.length > 1)
    {
        return (
            <div>
                {filteredCountries.map(([_name, idx]) => {
                    return <div key={idx}>{_name}</div>
                }
            )}
            </div>
        )
    }

    if (filteredCountries.length === 0)
    {
        return "No matches."
    }

    // TODO: In preparation for the next part, make another
    // component "CountryList", which has the countries and
    // the buttons that show the "CountryInfo" component
    const [_name, idx] = filteredCountries[0]
    const countryData = countriesData[idx]
    return (
        <div>
            {`Capital of ${_name}: ${countryData.capital}`}
        </div>
    )
}


const App = () => {
    const [countryFilter, setCountryFilter] = useState("")
    const [countriesData, setCountriesData] = useState(null)
    const [namesAndIdx, setNamesAndIdx] = useState(null)
    const [filteredCountries, setFilteredCountries] = useState(null)


    // get the country data, and also an array of the country
    // names and their index in the data array (needed for use
    // with filter)
    function initializeData()
    {
        AppBackend.get_all()
            .then(responseData => {
                setCountriesData(responseData)
                const names_and_idx = responseData.map( 
                        (countryData, idx) => {
                            return [countryData.name.common, idx]
                        }
                    )
                setNamesAndIdx(names_and_idx)
                // feels like I'm doing something un-reactic. Kind
                // of weird to have state but then never be able
                // to use that state (always having to use something
                // like "names_and_idx" here, rather than the actual
                // value namesAndIdx)
                setFilteredCountries(filterCountries(names_and_idx, countryFilter))
            }
        )
    }

    useEffect(initializeData, [])

    function filterCountries(namesAndIdx, countryFilter)
    {

        console.log("filtering with", countryFilter)
        if (countryFilter === "")
        {
            return namesAndIdx
        }

        return namesAndIdx.filter(nameAndIdx => {
                return nameAndIdx[0].toLowerCase().includes(countryFilter)
            }
        )
    }

    function updateFilter(newFilter)
    {
        setCountryFilter(newFilter)
        setFilteredCountries(filterCountries(namesAndIdx, newFilter))
    }

    if (countriesData === null || filteredCountries === null)
    {
        return null
    }

    // gdfogndfgn
    return (
        <div>
        <h1>Data for countries</h1>
        <div>
            <Input 
                info="find countries"
                value={countryFilter}
                onChange={ev => {
                    const newFilter = ev.target.value.toLowerCase()
                    updateFilter(newFilter)
                    }
                }
            />
        </div>

        <CountryInfo countriesData={countriesData} filteredCountries={filteredCountries} />

        </div>
    )
}

export default App
