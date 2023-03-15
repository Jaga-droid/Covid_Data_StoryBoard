   // set the dimensions and margins of the graph
   const barswitch_margin = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40,
},
barswitch_width = window.innerWidth*0.5 - barswitch_margin.left - barswitch_margin.right,
barswitch_height = window.innerHeight*0.5 - barswitch_margin.top - barswitch_margin.bottom;

// append the svg object to the body of the page
const barswitch_svg = d3.select("#barswitch")
.append("svg")
.attr("width", barswitch_width + barswitch_margin.left + barswitch_margin.right)
.attr("height", barswitch_height + barswitch_margin.top + barswitch_margin.bottom)
.append("g")
.attr("transform", `translate(${barswitch_margin.left},${barswitch_margin.top})`);
// X axis
const xbar = d3.scaleBand()
.range([0, barswitch_width])
.padding(0.2);
const xAxis = barswitch_svg.append("g")
.attr("transform", `translate(0,${barswitch_height})`);

// Y axis
const ybar = d3.scaleLinear()
.range([barswitch_height, 0]);
const yAxis = barswitch_svg.append("g")
.attr("class", "myYaxis");


// A function that create / update the plot for a given variable:

function update_bar(file_name_2) {
d3.csv('https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/Countries_tackling_Covid/' +
    file_name_2 + '.csv').then(function (data1) {

    // X axis
    xbar.domain(data1.map(d => d.Country));
    xAxis.transition().duration(1000).call(d3.axisBottom(xbar));

    // Add Y axis
    ybar.domain([0, d3.max(data1, d => d.value)]);
    yAxis.transition().duration(1000).call(d3.axisLeft(ybar));
    var u = barswitch_svg.selectAll("rect")
        .data(data1)
    u
        .join("rect")
        .transition()
        .duration(1000)
        .attr("x", d => xbar(d.Country))
        .attr("y", d => ybar(d.value))
        .attr("width", xbar.bandwidth())
        .attr("height", d => barswitch_height - ybar(d.value))
        .attr("fill", "#69b3a2")
});
}

// Initialize the plot with the first dataset
update_bar('population_density')