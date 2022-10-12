//import data

//selecting the section for the table
let tbody = d3.select("tbody");
let table = d3.select("#pollutant-table")

//insert data into HTML for view upon opening page
tableData.forEach(({date, city, county, pollutant, amount}) =>{
    let row = tbody.append("tr");
    row.append("td").text(date);
    row.append("td").text(city);
    row.append("td").text(county);
    row.append("td").text(pollutant);
    row.append("td").text(amount);
});

//set buttons and forms to correct fields
let button = d3.select("#filter-btn");
let form1 = d3.select("#date-form");
let form2 = d3.select("#city-form");
let form3 = d3.select("#county-form");
let form4 = d3.select("#pollutant-form");
//turn on events
button.on("click", filterdata);
form1.on("submit", filterdata);
form2.on("submit", filterdata);
form3.on("submit", filterdata);
form4.on("submit", filterdata);

//filterdata function
function filterdata(){
    d3.event.preventDefault();
    let inputElement1 = d3.select("#date");
    let inputElement2 = d3.select("#city");
    let inputElement3 = d3.select("#county");
    let inputElement4 = d3.select("#pollutant");
    let inputValue1 = inputElement1.property("value");
    let inputValue2 = inputElement2.property("value");
    let inputValue3 = inputElement3.property("value");
    let inputValue4 = inputElement4.property("value");
    //input value length = 0 means it is blank, and if all are blank forms, then this pull back all data
    if (inputValue1.length + inputValue2.length + inputValue3.length + inputValue4.length === 0){
        tbody.html("");
        console.log("no info given");
        console.log(tableData)
        tableData.forEach(({date, city, county, pollutant, amount}) =>{
            let row = tbody.append("tr");
            row.append("td").text(date);
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
    console.log(`${inputValue1}, ${inputValue2}, ${inputValue3}, ${inputValue4}`);
    //set filteredData variable - Will not work without this if no date is entered due to the way the code is set to filter
    let filteredData = tableData
    
    //if the date form is blank, it will log it and move on to the next form
    if (inputValue1.length === 0) {inputvalue1 === "1/01/2010";}
    else { 
    filteredData = tableData.filter(tableData => tableData.datetime === inputValue1);
    }
    //repeats above for each form
    if (inputValue2.length === 0) {console.log("no input for city");}
    else {
    filteredData = filteredData.filter(filteredData => filteredData.state === inputValue2);
    }
    if (inputValue3.length === 0) {console.log("no input for county");}
    else {
    filteredData = filteredData.filter(filteredData => filteredData.country === inputValue3);
    }
    if (inputValue4.length === 0) {console.log("no input for pollutant");}
    else{
    filteredData = filteredData.filter(filteredData => filteredData.shape === inputValue4);
    }
    //console log results
    console.log(filteredData);


    //set up MAP for the filtered data
    

    }
}