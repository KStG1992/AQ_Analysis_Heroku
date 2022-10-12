//import data
d3.json("getPlotCSV").then(function(sqlaqiData) {
    console.log(sqlaqiData)
});

//selecting the section for the table
// let tbody = d3.select("tbody");
// let table = d3.select("#pollutant-table")



// d3.json("AQ_cenus_query").then(function(data) {
//     console.log(data)
    
//     tableData.forEach((record) => {
//         var row = tbody.append("tr");
//         Object.entries(record).forEach(([key, value]) => {
//             var cell = row.append("td");
//             cell.text(value);
//         });
//     });
// });
        
        // county_code
        // Date
        // Category
        // Defining_Parameter
        // AQI
    

//insert data into HTML for view upon opening page
aqiData.forEach(({site_no, end_date, city, county, pollutant, amount}) =>{
    let row = tbody.append("tr");
    row.append("td").text(start_date);
    row.append("td").text(end_date);
    row.append("td").text(city);
    row.append("td").text(county);
    row.append("td").text(Land_Use);
    row.append("td").text(Location_Setting);
    row.append("td").text(site_no);
    row.append("td").text(Elevation);
    row.append("td").text(pollutant);
    row.append("td").text(amount);
});

//set buttons and forms to correct fields
let button = d3.select("#filter-btn");
let form1 = d3.select("#start-date-form");
let form2 = d3.select("#end-date-form");
let form3 = d3.select("#city-form");
let form4 = d3.select("#county-form");
let form5 = d3.select("#pollutant-form");
//turn on events
button.on("click", filterdata);
form1.on("submit", filterdata);
form2.on("submit", filterdata);
form3.on("submit", filterdata);
form4.on("submit", filterdata);
form5.on("submit", filterdata);

//filterdata function
function filterdata(){
    d3.event.preventDefault();
    let inputElement1 = d3.select("#start-date");
    let inputElement2 = d3.select("#end-date");
    let inputElement3 = d3.select("#city");
    let inputElement4 = d3.select("#county");
    let inputElement5 = d3.select("#pollutant");
    let inputValue1 = inputElement1.property("value");
    let inputValue2 = inputElement2.property("value");
    let inputValue3 = inputElement3.property("value");
    let inputValue4 = inputElement4.property("value");
    let inputValue5 = inputElement5.property("value");
    //input value length = 0 means it is blank, and if all are blank forms, then this pull back all data
    if (inputValue1.length + inputValue2.length + inputValue3.length + inputValue4.length + inputValue5.length === 0){
        tbody.html("");
        console.log("no info given");
        console.log(tableData)
        tableData.forEach(({start_date, end_date, city, county, pollutant, amount}) =>{
            let row = tbody.append("tr");
            row.append("td").text(start_date);
            row.append("td").text(end_date);
            row.append("td").text(city);
            row.append("td").text(county);
            row.append("td").text(pollutant);
            row.append("td").text(amount);
        
    })}
    //filtering data for new table
    else {
    // emptying table
    tbody.html("");
    //console log input forms
    console.log(`${inputValue1}, ${inputValue2}, ${inputValue3}, ${inputValue4}, ${inputValue5}`);
    //set filteredData variable - Will not work without this if no date is entered due to the way the code is set to filter
    let filteredData = tableData
    
    //if the date form is blank, it will log it and move on to the next form
    if (inputValue1.length === 0) {inputvalue1 === "1/01/2010";}
    else { 
    filteredData = tableData.filter(tableData => tableData.datetime === inputValue1);
    }
    //repeats above for each form
    if (inputValue2.length === 0) {inputValue2 === "10/31/2020";}
    else {
    filteredData = filteredData.filter(filteredData => filteredData.city === inputValue2);
    }
    if (inputValue3.length === 0) {console.log("no input for city");}
    else {
    filteredData = filteredData.filter(filteredData => filteredData.state === inputValue3);
    }
    if (inputValue4.length === 0) {console.log("no input for county");}
    else {
    filteredData = filteredData.filter(filteredData => filteredData.country === inputValue4);
    }
    if (inputValue5.length === 0) {console.log("no input for pollutant");}
    else{
    filteredData = filteredData.filter(filteredData => filteredData.shape === inputValue5);
    }
    //console log results
    console.log(filteredData);
    //set up table for the filtered data
    filteredData.forEach(({start_date, end_date, city, county, pollutant, amount}) =>{
        let row = tbody.append("tr");
        row.append("td").text(start_date);
        row.append("td").text(end_date);
        row.append("td").text(city);
        row.append("td").text(county);
        row.append("td").text(pollutant);
        row.append("td").text(amount);

    });}
}