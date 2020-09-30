let lati, long;
let today = new Date();

const getLocation = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
}


const showPosition = async (position) => {

    lati = position.coords.latitude;
    long = position.coords.longitude;
    await sendDataToBackend('locationInfo', { lati, long });
}

const sendDataToBackend = async (endpointURL, data) => {
    return await fetch('https://weather-xa-backend.herokuapp.com/' + endpointURL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
    }
    ).then(
        (data) => { return data.json(); }
    ).then(
        (data) => {

            document.getElementById('city').innerHTML = data.city;
            document.getElementById('status').innerHTML = data.status;
            document.getElementById('temp').innerHTML = data.temperature + '&#8451;';
            return data;
        }
    )
}

const setTime = () => {
    document.getElementById('time').innerHTML =((today.getHours() < 10 ? '0' : '') + today.getHours()) + ":" + ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes());
    document.getElementById('date').innerHTML = today.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });
}
setTime();