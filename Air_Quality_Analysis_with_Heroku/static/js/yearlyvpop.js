var tbody = d3.select("tbody");

function getData(selOption) {
    console.log("I am in new getData()")
    var value = selOption;  
    console.log("My value is: " + value);

    d3.csv("getPlotCSV").then(function(saqiData) {

        const data = saqiData;
        console.log(data[0]);
        // Filter the data to only those equaling the input field value
        var filteredData = data.filter(aqiData => aqiData.Date.substring(0,4) == value);
        console.log(filteredData);
        // Need to empty the table data before appending those meeting criteria
        tbody = d3.select("tbody")
        tbody.html("")

        filteredData.forEach((AQIRecord) => {
            var row = tbody.append("tr");
            Object.entries(AQIRecord).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            })
        })
    })
}
