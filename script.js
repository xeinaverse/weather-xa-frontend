let x = document.getElementById("demo");
let lati, long;

const getLocation = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


const showPosition = async (position) => {

    lati = position.coords.latitude;
    long = position.coords.longitude;
    console.log('p', position)
    await sendDataToBackend('locationInfo', { lati, long });
}

const sendDataToBackend = async (endpointURL, data) => {
    return await fetch('http://localhost:4000/' + endpointURL, {
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
            document.getElementById('data').innerHTML = 'The current weather in ' + data.city + ' is ' + data.temperature +'.';
            return data; }
    )
}

