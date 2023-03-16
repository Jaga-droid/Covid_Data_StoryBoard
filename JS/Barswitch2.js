// set the dimensions and margins of the graph
const barswitch_margin_2 = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40,
},
barswitch_width_2 = window.innerWidth*0.5 - barswitch_margin_2.left - barswitch_margin_2.right,
barswitch_height_2 = window.innerHeight*0.5 - barswitch_margin_2.top - barswitch_margin_2.bottom;

// append the svg object to the body of the page
const barswitch_svg2 = d3.select("#barswitch2")
.append("svg")
.attr("width", barswitch_width + barswitch_margin.left + barswitch_margin.right)
.attr("height", barswitch_height + barswitch_margin.top + barswitch_margin.bottom)
.append("g")
.attr("transform", `translate(${barswitch_margin.left},${barswitch_margin.top})`);
// X axis
const xbar1 = d3.scaleBand()
.range([0, barswitch_width])
.padding(0.2);
const xAxis1 = barswitch_svg2.append("g")
.attr("transform", `translate(0,${barswitch_height})`);

// Y axis
const ybar1 = d3.scaleLinear()
.range([barswitch_height, 0]);
const yAxis1 = barswitch_svg2.append("g")
.attr("class", "myYaxis");


// A function that create / update the plot for a given variable:

function update_bar_2(file_name_22) {
d3.csv('https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/Geography/' +
    file_name_22 + '.csv').then(function (data11) {
      
    // X axis
    xbar1.domain(data11.map(d => d.location));
    xAxis1.transition().duration(1000).call(d3.axisBottom(xbar1));

    // Add Y axis
    ybar1.domain([0, d3.max(data11, d => d.total_deaths)]);
    yAxis1.transition().duration(1000).call(d3.axisLeft(ybar1));
    var u2 = barswitch_svg2.selectAll("rect")
        .data(data11)
    u2
        .join("rect")
        .transition()
        .duration(1000)
        .attr("x", d => xbar1(d.location))
        .attr("y", d => ybar1(d.total_deaths))
        .attr("width", xbar1.bandwidth())
        .attr("height", d => barswitch_height_2 - ybar1(d.total_deaths))
        .attr("fill", "#69b3a2")
});
}

// Initialize the plot with the first dataset
update_bar_2('coastal_deaths')