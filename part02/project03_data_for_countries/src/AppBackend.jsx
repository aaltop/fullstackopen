import axios from "axios"



const countries_url = "https://studies.cs.helsinki.fi/restcountries/api/all"

/**
 * Get the list of countries. Returns a promise whose value will be the
 * response's data part.
 */
function get_all()
{
    return axios.get(countries_url).then(response => response.data)
}


let lastAccess = null
function getWeatherData(latitude, longitude)
{

    // limit call rate to once per second (technically it would take
    // longer anyway as the below stuff needs to then be run, but that
    // is just fine)
    const timeOut = (lastAccess === null) ?
        0 :
        Math.max(0, 1000-(new Date().getTime()-lastAccess))

    // setTimeOut with a Promise would also technically work, I think, but the issue
    // is that then there's a load of Promises hanging about waiting
    // for the timeout to finish (Or rather, if one writes the code wrongly
    // such that this function is called every tick, there's going to be
    // a lot of Promises). This way nothing unnecessary is created until
    // the timer is okay with it
    if (timeOut > 0)
    {
        return {
            success: false,
            timeOut: timeOut,
            promiseData: null
        }
    }

    // This API has a 10,000-per-day limit, does not require API key
    // for non-commercial uses
    const url = new URL("https://api.open-meteo.com/v1/forecast")
    const paramsObj = {
        latitude: latitude, 
        longitude: longitude, 
        current: ["temperature_2m", "wind_speed_10m", "cloud_cover"], 
        wind_speed_unit: "ms",
    }
    url.search = new URLSearchParams(paramsObj).toString()

    // A thing for testing purposes, in the same format as the
    // api call return
    // const testData = {
    //     "latitude": 52.52,
    //     "longitude": 13.419998,
    //     "generationtime_ms": 0.053048133850097656,
    //     "utc_offset_seconds": 0,
    //     "timezone": "GMT",
    //     "timezone_abbreviation": "GMT",
    //     "elevation": 38,
    //     "current_units": {
    //         "time": "iso8601",
    //         "interval": "seconds",
    //         "temperature_2m": "°C",
    //         "weather_code": "wmo code",
    //         "cloud_cover": "%",
    //         "wind_speed_10m": "m/s"
    //     },
    //     "current": {
    //         "time": "2024-06-22T07:45",
    //         "interval": 900,
    //         "temperature_2m": 16.3,
    //         "weather_code": 95,
    //         "cloud_cover": 100,
    //         "wind_speed_10m": 4.8
    //     }
    // }

    lastAccess = new Date().getTime()
    return {
        success: true,
        timeOut: timeOut,
        promiseData: axios.get(url.href).then(response => response.data)
    }
}


// I'll try and use camelCase as that's what's used otherwise,
// but my heart longs to use snake_case
export default {get_all, getWeatherData}