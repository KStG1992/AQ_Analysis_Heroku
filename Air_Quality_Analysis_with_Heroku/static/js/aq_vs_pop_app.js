
// create svg container & set margins for graph
var svgWidth = 760;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#plotly")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "Ozone";

// function used for updating x-scale var upon click on axis label
function xScale(aqiData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(demoData, d => d[chosenXAxis]) * 0.9,
      d3.max(aqiData, d => d[chosenXAxis]) 
    ])
    .range([0, width]);

  return xLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))

  return circlesGroup;
}

function renderLabels(countyLabel, newXScale, chosenXAxis) {

  countyLabel.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]))
  return countyLabel;
}

// Retrieve data from the CSV file and execute everything below
d3.json("getcountyvpopCSV").then(function(error, aqiData) {
  if (error) throw error;
  
  console.log(aqiData)

// for (let [key, value] of Object.entries(data)) {
        
//   for (let index = 0; index < data.length; index++) {
//       const aqiData = data[index];

  // parse data
  aqiData.forEach(function(data) {
    data.Ozone = +data.Ozone;
    data.PM2_5 = +data.PM2_5;
    data.PM10 = +data.PM10;
    data.population = +data.population;
    data.county_code = data.county_code;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(aqiData, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(aqiData, d => d.population)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(aqiData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.population))
    .attr("r", 15)
    .classed("countyCircle", true)
    .attr("opacity", ".5");

  var countyLabel = chartGroup.append("g").selectAll(".countyText")
    .data(aqiData)
    .enter()
    .append("text")
    .classed("countyText", true)
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d.population * .985));

  // Create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var OzoneLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "Ozone") // value to grab for event listener
    .classed("active", true)
    .text("Ozone AQI");

  var pm2_5Label = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "pm2.5") // value to grab for event listener
    .classed("inactive", true)
    .text("PM2.5 AQI");

  var pm10Label = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "pm10") // value to grab for event listener
    .classed("inactive", true)
    .text("PM10 AQI");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height/1.5))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Population");

  // updateToolTip function above csv import
  // var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(demoData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        countyLabel = renderLabels(countyLabel, xLinearScale, chosenXAxis);

        // changes classes to change bold text
        if (chosenXAxis === "Ozone") {
          OzoneLabel
            .classed("active", true)
            .classed("inactive", false);
          pm2_5Label
            .classed("active", false)
            .classed("inactive", true);
          pm10Label
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "pm2_5") {
          OzoneLabel
            .classed("active", false)
            .classed("inactive", true);
          pm2_5Label
            .classed("active", true)
            .classed("inactive", false);
          pm10Label
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          OzoneLabel
            .classed("active", false)
            .classed("inactive", true);
          pm2_5Label
            .classed("active", false)
            .classed("inactive", true);
          pm10Label
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
}).catch(function(error) {
  console.log(error);
});
