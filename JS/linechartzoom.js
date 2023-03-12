 // set the dimensions and margins of the graph
 const Line_zoom_margin = {top: 10, right: 30, bottom: 30, left: 60},
 Linezoom_width = window.innerWidth*0.9 - Line_zoom_margin.left - Line_zoom_margin.right,
 Linezoom_height = window.innerHeight*0.4 - Line_zoom_margin.top - Line_zoom_margin.bottom;

// append the svg object to the body of the page
const linezoom_svg = d3.select("#LineChartZoomid")
.append("svg")
 .attr("width", Linezoom_width + Line_zoom_margin.left + Line_zoom_margin.right)
 .attr("height", Linezoom_height + Line_zoom_margin.top + Line_zoom_margin.bottom)
.append("g")
 .attr("transform",
       `translate(${Line_zoom_margin.left}, ${Line_zoom_margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

// When reading the csv, I must format variables:
function(d){
 return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
}).then(

// Now I can use this dataset:
function(data) {

 // Add X axis --> it is a date format
 const linezoom_x = d3.scaleTime()
   .domain(d3.extent(data, function(d) { return d.date; }))
   .range([ 0, Linezoom_width ]);
 xAxis_linezoom = linezoom_svg.append("g")
   .attr("transform", `translate(0, ${Linezoom_height})`)
   .call(d3.axisBottom(linezoom_x));

 // Add Y axis
 const linezoom_y = d3.scaleLinear()
   .domain([0, d3.max(data, function(d) { return +d.value; })])
   .range([ Linezoom_height, 0 ]);
 yAxis_linezoom = linezoom_svg.append("g")
   .call(d3.axisLeft(linezoom_y));

 // Add a clipPath: everything out of this area won't be drawn.
 const clip = linezoom_svg.append("defs").append("svg:clipPath")
     .attr("id", "clip")
     .append("svg:rect")
     .attr("width", Linezoom_width )
     .attr("height", Linezoom_height )
     .attr("x", 0)
     .attr("y", 0);

 // Add brushing
 const brush = d3.brushX()                   // Add the brush feature using the d3.brush function
     .extent( [ [0,0], [Linezoom_width,Linezoom_height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
     .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function

 // Create the line variable: where both the line and the brush take place
 const line = linezoom_svg.append('g')
   .attr("clip-path", "url(#clip)")

 // Add the line
 line.append("path")
   .datum(data)
   .attr("class", "line")  // I add the class line to be able to modify this line later on.
   .attr("fill", "none")
   .attr("stroke", "red")
   .attr("stroke-width", 1.5)
   .attr("d", d3.line()
     .x(function(d) { return linezoom_x(d.date) })
     .y(function(d) { return linezoom_y(d.value) })
     )

 // Add the brushing
 line
   .append("g")
     .attr("class", "brush")
     .call(brush);

 // A function that set idleTimeOut to null
 let idleTimeout
 function idled() { idleTimeout = null; }

 // A function that update the chart for given boundaries
 function updateChart(event,d) {

   // What are the selected boundaries?
   extent = event.selection

   // If no selection, back to initial coordinate. Otherwise, update X axis domain
   if(!extent){
     if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
     linezoom_x.domain([ 4,8])
   }else{
    linezoom_x.domain([ linezoom_x.invert(extent[0]), linezoom_x.invert(extent[1]) ])
     line.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
   }

   // Update axis and line position
   xAxis_linezoom.transition().duration(1000).call(d3.axisBottom(linezoom_x))
   line
       .select('.line')
       .transition()
       .duration(1000)
       .attr("d", d3.line()
         .x(function(d) { return linezoom_x(d.date) })
         .y(function(d) { return linezoom_y(d.value) })
       )
 }

 // If user double click, reinitialize the chart
 linezoom_svg.on("dblclick",function(){
   linezoom_x.domain(d3.extent(data, function(d) { return d.date; }))
   xAxis_linezoom.transition().call(d3.axisBottom(linezoom_x))
   line
     .select('.line')
     .transition()
     .attr("d", d3.line()
       .x(function(d) { return linezoom_x(d.date) })
       .y(function(d) { return linezoom_y(d.value) })
   )
 });

})