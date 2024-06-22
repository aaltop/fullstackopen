import { useState, useEffect } from 'react'
import AppBackend from './AppBackend'


// Generic input line
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

function WeatherInfo({latitude, longitude})
{

    const [weatherData, setWeatherData] = useState(null)

    function init()
    {

        let ret = AppBackend.getWeatherData(latitude, longitude)

        // some recursive shenanigans
        if (!ret.success)
        {
            setTimeout(init, ret.timeOut)
            return
        }

        ret.promiseData.then(data => {
                console.log("Weather data got")
                setWeatherData(data)
            }
        )
    }

    // should realistically also have the time when this was
    // initialised as a dependency (but then that depends on
    // how often the weather data gets updated)
    useEffect(init, [latitude, longitude])

    if (weatherData === null)
    {
        return null
    }

    const temp = weatherData.current.temperature_2m
    const temp_units = weatherData.current_units.temperature_2m

    const wind = weatherData.current.wind_speed_10m
    const wind_units = weatherData.current_units.wind_speed_10m

    const cloud_cover = weatherData.current.cloud_cover
    const cloud_cover_units = weatherData.current_units.cloud_cover

    return (
        <div>
            <div>
                {`Temperature: ${temp}${temp_units}`}
            </div>
            <div>
                {`Cloud Cover: ${cloud_cover}${cloud_cover_units}`}
            </div>
            <div>
                {`Wind speed: ${wind} ${wind_units}`}
            </div>
        </div>
    )

}

// Shows the info panel for a country
function CountryInfo({countryData})
{

    const [latitude, longitude] = countryData.capitalInfo.latlng

    return (
        <div>
            <h2>{countryData.name.common}</h2>
            <div>{`Capital ${countryData.capital}`}</div>
            <div>{`area ${countryData.area}`}</div>
            <br></br>
            <div><b>{"languages:"}</b></div>
            <ul>
                {Object.values(countryData.languages).map( lang => {
                            return <li key={lang}>{lang}</li>
                        }
                    )
                }
            </ul>
            <div>
                <img src={countryData.flags.png}></img>
            </div>
            <h3>{`Weather in ${countryData.name.common}`}</h3>
            <WeatherInfo latitude={latitude} longitude={longitude} />

        </div>
    )
}


// shows the name of a country and a button (which is currently
// used to show the info for that country)
function CountryListItem({countryName, onButtonPress})
{

    const margin = 10
    const buttonStyle = {
        marginLeft: margin,
        marginRight: margin
    }

    return (
        <div>
            {countryName}
            <button 
                type="button" 
                onClick={onButtonPress}
                style={buttonStyle}
            >
                {"Show"}
            </button>
        </div>
    )
}

// Lists the countries that match the filter, also handles setting
// the correct country idx that is used for showing the info for that
// country
function CountryList({countriesData, filteredCountries, setShownCountryIdx})
{

    const matches = filteredCountries.length

    if(matches > 10)
    {
        return "Too many matches, specify another filter"
    }

    if (matches > 0)
    {
        return (
            <div>
                {filteredCountries.map(([_name, idx]) => {
                    return <CountryListItem 
                        key={idx} 
                        countryName={_name}
                        onButtonPress={() => setShownCountryIdx(idx)}
                    />
                }
            )}
            </div>
        )
    }

    return "No matches."
}

const App = () => {
    const [countryFilter, setCountryFilter] = useState("")
    const [countriesData, setCountriesData] = useState(null)
    const [namesAndIdx, setNamesAndIdx] = useState(null)
    const [filteredCountries, setFilteredCountries] = useState(null)
    const [shownCountryIdx, setShownCountryIdx] = useState(null)


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



    // if not initialised properly, show nothing
    if (countriesData === null || filteredCountries === null)
    {
        return null
    }

    let countryInfo = null
    if (shownCountryIdx !== null)
    {
        countryInfo = <CountryInfo
            countryData={countriesData[shownCountryIdx]}
        />
    }

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

        <CountryList
            countriesData={countriesData}
            filteredCountries={filteredCountries}
            setShownCountryIdx={setShownCountryIdx}
        />
        {countryInfo}

        </div>
    )
}

export default App
