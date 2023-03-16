// set the dimensions and margins of the graph
const barswitch_margin_29 = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40,
},
barswitch_width_29 = window.innerWidth*0.5 - barswitch_margin_29.left - barswitch_margin_29.right,
barswitch_height_29 = window.innerHeight*0.5 - barswitch_margin_29.top - barswitch_margin_29.bottom;

// append the svg object to the body of the page
const barswitch_svg29 = d3.select("#lollipop")
.append("svg")
.attr("width", barswitch_width_29 + barswitch_margin_29.left + barswitch_margin_29.right)
.attr("height", barswitch_height_29 + barswitch_margin_29.top + barswitch_margin_29.bottom)
.append("g")
.attr("transform", `translate(${barswitch_margin_29.left},${barswitch_margin_29.top})`);
// X axis
const xbar19 = d3.scaleBand()
.range([0, barswitch_width_29])
.padding(0.2);
const xAxis19 = barswitch_svg29.append("g")
.attr("transform", `translate(0,${barswitch_height_29})`);

// Y axis
const ybar19 = d3.scaleLinear()
.range([barswitch_height_29, 0]);
const yAxis19 = barswitch_svg29.append("g")
.attr("class", "myYaxis");


// A function that create / update the plot for a given variable:

function drawpops(file_name_229) {
    d3.csv('https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/Pie%20Slices/'+file_name_229+'.csv').then(function (data101) {
      
    // X axis
    xbar19.domain(data101.map(d => d.Country));
    xAxis19.transition().duration(1000).call(d3.axisBottom(xbar19));

    // Add Y axis
    ybar19.domain([0, d3.max(data101, d => d.total_cases)]);
    yAxis19.transition().duration(1000).call(d3.axisLeft(ybar19));
    var u29 = barswitch_svg29.selectAll("rect")
        .data(data101)
    u29
        .join("rect")
        .transition()
        .duration(1000)
        .attr("x", d => xbar1(d.Country))
        .attr("y", d => ybar1(d.total_cases))
        .attr("width", xbar19.bandwidth())
        .attr("height", d => barswitch_height_2 - ybar19(d.total_cases))
        .attr("fill", "#69b3a2")
});
}
