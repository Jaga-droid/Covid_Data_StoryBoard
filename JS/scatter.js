    // set the dimensions and margins of the graph
    const margin_scat = {top: 10, right: 30, bottom: 30, left: 60},
        width_scat = 460 - margin_scat.left - margin_scat.right,
        height_scat = 450 - margin_scat.top - margin_scat.bottom;
    
    // append the svg object to the body of the page
    const svg_scat = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width_scat + margin_scat.left + margin_scat.right)
        .attr("height", height_scat + margin_scat.top + margin_scat.bottom)
      .append("g")
        .attr("transform",
              `translate(${margin_scat.left}, ${margin_scat.top})`);
    
    //Read the data
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv").then( function(data) {
    
      // Add X axis
      const x = d3.scaleLinear()
        .domain([0, 3000])
        .range([ 0, width_scat ]);
      svg_scat.append("g")
        .attr("transform", `translate(0, ${height_scat})`)
        .call(d3.axisBottom(x));
    
      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, 400000])
        .range([ height_scat, 0]);
      svg_scat.append("g")
        .call(d3.axisLeft(y));
    

        // location,gdp_per_capita,reproduction_rate
      // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
      // Its opacity is set to 0: we don't see it by default.
      const tooltip_s = d3.select("#my_scatter")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
    
    
    
      // A function that change this tooltip when the user hover a point.
      // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
      const mouseover_1 = function(event, d) {
        tooltip_s
          .style("opacity", 1)
      }
    
      const mousemove_1 = function(event, d) {
        tooltip_s
          .html(`The exact value of<br>the Ground Living area is: ${d.GrLivArea}`)
          .style("left", (event.x)/2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
          .style("top", (event.y)/2 + "px")
      }
    
      // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
      const mouseleave_1 = function(event,d) {
        tooltip_s
          .transition()
          .duration(200)
          .style("opacity", 0)
      }
    
      // Add dots
      svg_scat.append('g')
        .selectAll("dot")
        .data(data.filter(function(d,i){return i<200})) // the .filter part is just to keep a few dots on the chart, not all of them
        .enter()
        .append("circle")
          .attr("cx", function (d) { return x(d.GrLivArea); } )
          .attr("cy", function (d) { return y(d.SalePrice); } )
          .attr("r", 7)
          .style("fill", "#69b3a2")
          .style("opacity", 0.3)
          .style("stroke", "white")
        .on("mouseover", mouseover_1 )
        .on("mousemove", mousemove_1)
        .on("mouseleave", mouseleave_1)
    
    })
  