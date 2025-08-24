

const container = document.querySelector('.container')

const API_key = 'dc20c91e475317505095b9bfb188f357'
const citySearch = document.querySelector('.citySearch')
const error = document.createElement('p')
error.classList.add('error')

const cityStat = document.createElement('div')
cityStat.classList.add('cityStat')

citySearch.addEventListener('click', search)

async function search() {

    
        

        const cityName = document.getElementById('cityName');
        const city = cityName.value;

        const weather = await GetCityCord(city, API_key);
        if(!weather){
            cityStat.innerHTML = ''
            error.textContent  = "City is not found..."
            container.appendChild(error)
            return
        }
       
        if(container.lastChild == error) container.removeChild(error)
        const days = await GetDays(weather,API_key)
        DataHandler(days, city)
        
        
       
    
}
async function GetCityCord(city,API_Key) {
        try {
            
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`)
            

            if(!response.ok) throw new Error(`Hiba: ${response.status}`);
            
            const data = await response.json()
            console.log(data)
            return data

        } catch (error) {
            console.log('Fetch error', error)
        }
    }

async function GetDays(weather,API_Key){

    try {
            
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=${API_Key}`)
            

            if(!response.ok) throw new Error(`Hiba: ${response.status}`);
            
            const data = await response.json()
            
            return data

        } catch (error) {
            console.log('Fetch error', error)
    }

    


    
}

function DataHandler(data, city){

    
    cityStat.innerHTML = ''

    const Lists = data.list.filter(item => item.dt_txt.includes("21:00:00"));
    const nextThreeDays = Lists.slice(0, 5); 
    console.log(nextThreeDays)
    const cards = document.createElement('div')
    cards.classList.add("cards")

    

    for (let i = 0; i < nextThreeDays.length; i++) {

        const card = document.createElement('div')
        card.classList.add('card')

        const day = document.createElement('h2')
        day.classList.add('days')
        const fullDateDay = nextThreeDays[i].dt_txt.split(' ')[0]
        const splitDay = `${fullDateDay.split('-')[1]}.${fullDateDay.split('-')[2]}`
        day.textContent = splitDay

        const emoji = document.createElement('div')
        emoji.classList.add('emojis')
        const id = nextThreeDays[i].weather[0].id
            switch (true) {     
  
    case (id >= 200 && id < 300):
        emoji.innerHTML = `<i class="wi wi-thunderstorm" style="color:yellow"></i>`;
        break;


    case (id >= 300 && id < 400):
        emoji.innerHTML = `<i class="wi wi-sprinkle" style="color:lightblue"></i>`;
        break;

    
    case (id >= 500 && id < 600):
        emoji.innerHTML = `<i class="wi wi-rain" style="color:blue"></i>`;
        break;

 
    case (id >= 600 && id < 700):
        if (id === 611 || id === 612) {
            emoji.innerHTML = `<i class="wi wi-sleet" style="color:lightblue"></i>`;
        } else {
            emoji.innerHTML = `<i class="wi wi-snow" style="color:white"></i>`;
        }
        break;

   
    case (id === 701):
        emoji.innerHTML = `<i class="wi wi-fog" style="color:gray"></i>`;
        break;

    
    case (id === 800):
        emoji.innerHTML = `<i class="wi wi-day-sunny" style="color:gold"></i>`;
         card.classList.add('sunny');
        break;

 
    case (id === 801):
        emoji.innerHTML = `<i class="wi wi-day-cloudy" style="color:lightgray"></i>`;
        break;
    case (id === 802):
        emoji.innerHTML = `<i class="wi wi-day-cloudy-high" style="color:lightgray"></i>`;
        break;
    case (id === 803):
    case (id === 804):
        emoji.innerHTML = `<i class="wi wi-cloudy" style="color:gray"></i>`;
        break;

  
    default:
        emoji.innerHTML = `<i class="wi wi-na" style="color:gray"></i>`;
        }
        const desc = document.createElement('p')
        desc.classList.add('descs')
        desc.textContent = nextThreeDays[i].weather[0].description


        const temp = document.createElement('p')
        temp.classList.add('temps')
        tempInCel = (nextThreeDays[i].main.temp - 273.15).toFixed(1)

        if(tempInCel <= 0) temp.style.color = "#7ec8e3"
        else if(tempInCel <= 15) temp.style.color = "#5dade2"
        else if(tempInCel <= 25) temp.style.color = "#f7dc6f"
        else temp.style.color = "#f39c12"
        temp.textContent = `${tempInCel} °C`

        const otherInf = document.createElement('div')
        otherInf.classList.add('otherInf')

        const windspeed = document.createElement('div')
        windspeed.classList.add('windspeed') 
        windspeed.innerHTML = `
                <i class="wi wi-strong-wind" style="color:gray"></i>
                <div>
                    
                    <p>${nextThreeDays[i].wind.speed}  Km/h <span>Wind speed</span></p>
                    
                </div>

        `

        const humidity = document.createElement('div')
        humidity.classList.add('humidity') 
        humidity.innerHTML = `
                <i class="wi wi-humidity" style="color:gray"></i>
                <div>
                    
                    <p>${nextThreeDays[i].main.humidity}  % <span>Humidity</span></p>
                    
                </div>

        `


        

        console.log(day)
        console.log(emoji)
        console.log(desc)
        console.log(temp)

        otherInf.appendChild(windspeed)
        otherInf.appendChild(humidity)


        card.appendChild(day)
        card.appendChild(emoji)
        card.appendChild(temp)
        card.appendChild(desc)
        card.appendChild(otherInf)

        cards.appendChild(card)


        

        
    }

    Cname = document.createElement('h1')
    Cname.classList.add('name')
    Cname.textContent = city
    cityStat.appendChild(Cname)
    cityStat.appendChild(cards)
    container.appendChild(cityStat)

    

}





