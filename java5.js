const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

async function fetchWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    if (!data) return;
    const weatherInfo = document.querySelector('.weather-info');
    document.getElementById('location').textContent = `Location: ${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('conditions').textContent = `Conditions: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind: ${data.wind.speed} m/s`;
    weatherInfo.style.display = 'block';
}

function getWeatherByLocation() {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeather(location)
            .then(data => displayWeather(data));
    }
}

function getWeatherByCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon)
                .then(data => displayWeather(data));
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

window.onload = getWeatherByCoords;
