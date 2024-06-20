// form element and the input field for the prompt
let Prompt_form = document.querySelector('#Prompt_form')
let Prompt_data_input = document.querySelector('#Prompt_data_input')

//element where the weather data will be rendered
let render_data = document.querySelector('#render_data')

// array to store weather data
let weather_array = []

//form to handle the submit event
Prompt_form.addEventListener("submit", async (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    try {
        // Fetch the weather data from the API 
    
        const get_weather_data = await axios(`https://api.weatherapi.com/v1/current.json?key=7ae08629aaf54a1cacd151204242006&q=${Prompt_data_input.value}&aqi=no`)

        let location = get_weather_data.data.location
        let current = get_weather_data.data.current
        let condition = get_weather_data.data.current.condition

        // Create an object with the extracted data
        let obj = {
            name: location.name,
            country: location.country,
            region: location.region,
            tz_id: location.tz_id,
            localtime: location.localtime,
            last_updated: current.last_updated,
            temp_c: current.temp_c,
            temp_f: current.temp_f,
            text: condition.text,
            icon: condition.icon,
        }

        // add the object to the weather array
        weather_array.push(obj)

        // call the function to render the weather data
        weather_render()

    } catch (error) {
        // show error message in console if the request fails
        console.log(error);
    }
})

// Function to render the weather data on the page
function weather_render() {


    // Clear the existing content
    render_data.innerHTML = ''


    // Loop through the weather array in reverse order
    for (let i = weather_array.length - 1; i >= 0; i--) {
        const data = weather_array[i]



        // Append the weather data as HTML to the render_data element
        render_data.innerHTML += `
         <div class="col-md-4">
            <div class="weather-card text-center">
                <div class="weather-icon mb-3">
                    <img src=${data.icon} alt="Weather Icon">
                </div>
                <div class="weather-temp mb-3">
                    ${data.temp_c}°C
                </div>
                <div class="weather-info">
                    <p>${data.text}</p>
                    <p>${data.name}, ${data.country}</p>
                </div>
                <div class="weather-details text-left mt-3">
                    <p><strong>Location:</strong> ${data.region}</p>
                    <p><strong>Timezone:</strong> ${data.tz_id}</p>
                    <p><strong>Local Time:</strong> ${data.localtime}</p>
                    <p><strong>Last Updated:</strong> ${data.last_updated}</p>
                    <p><strong>Temperature:</strong> ${data.temp_c}°C / ${data.temp_f}°F</p>
                </div>
            </div>
        </div>
        `
    }
}
