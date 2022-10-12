function buildPlot() {

    // This will be the Default Map
    const street = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    // Second Map the User can Choose
    const dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    // Creating Basemaps
    const baseMaps = {
        Street: street,
        Dark: dark
    };
    
    // Seting Up Initial Map Center and Zoom Level
    const map = L.map('map', {
        center: [36.7378, -119.7871],
        zoom: 7, 
        layers: [street]
    });

    // Passing Maps to Layer Control
    L.control.layers(baseMaps).addTo(map);

    // Creating Layer Control for Legend
    const legend = L.control({position: 'topright'});
        // Adding Legend to Map
        legend.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'info legend'),
            categories = ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];
            div.innerHTML += "<strong>Air Quality Levels of Concern</strong><br>";
            // For Loop for Legend Colors and Labels
            for (let i = 0; i < categories.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(categories[i]) + '"></i>'
                    + categories[i] + (categories[i] ? '<br>':'+');
            }
            return div;
        };

        legend.addTo(map);

    // Function for Marker Color
    function markerColor(aqi) {
        if (aqi <= 50) {
            return "green"
        } else if (aqi <= 51 &&  aqi <= 100) {
            return "yellow"
        } else if (aqi <= 101 && aqi <= 150) {
            return "orange"
        } else if (aqi <= 151 && aqi <= 200) {
            return "red"
        } else if (aqi <= 201 && aqi <= 300) {
            return "purple"
        } else {
            return "maroon"
        }
    }

    // Function for Legend Color
    function getColor(d) {
        if (d == 'Good') {
            return 'green'
        } else if (d == 'Moderate') {
            return 'yellow'
        } else if (d == 'Unhealthy for Sensitive Groups') {
            return 'orange'
        } else if (d == 'Unhealthy') {
            return 'red'
        } else if (d == 'Very Unhealthy') {
            return 'purple'
        } else {
            return 'maroon'
        }
    }

    // Read markers data from currentAQIData.csv
    d3.json("currentAQIData").then(function(AQIData) {
        
        const data = AQIData.data;
        
        for (let [key, value] of Object.entries(data)) {
        
            for (let index = 0; index < data.length; index++) {
                const aqiData = data[index];

                const CurrentAQIValue = aqiData.CurrentAQIValue.toString()
                let marker = L.circle([aqiData.Latitude, aqiData.Longitude], {
                    radius: 7500,
                    fillColor: markerColor(aqiData.CurrentAQIValue),
                    fillOpacity: 0.25,
                    stroke: false
                }).bindPopup("<h3>" + "Pollutant Type: " + aqiData.CurrentPollutant + "</h3>" +
                    "<h3>" + "Pollutant Index: " + CurrentAQIValue + "</h3>" + 
                    "<h4>" + aqiData.Time + " " + aqiData.Date + "</h4>");
                // console.log(marker);
                marker.addTo(map);
            }
        }
    }
)};

buildPlot();