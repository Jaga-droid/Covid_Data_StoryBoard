    // set the dimensions and margins of the graph
    const margin_scat = {top: 10, right: 30, bottom: 30, left: 60},
        width_scat = 460 - margin_scat.left - margin_scat.right,
        height_scat = 450 - margin_scat.top - margin_scat.bottom;
    
    // append the svg object to the body of the page
    const svg_scat = d3.select("#my_scatter")
      .append("svg")
        .attr("width", width_scat + margin_scat.left + margin_scat.right)
        .attr("height", height_scat + margin_scat.top + margin_scat.bottom)
      .append("g")
        .attr("transform",
              `translate(${margin_scat.left}, ${margin_scat.top})`);
    
    //Read the data
    d3.csv("https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/GDP/gdp_vs_virus_spread.csv").then( function(data_scat) {
    
      // Add X axis
      const x_ax = d3.scaleLinear()
        .domain([0, d3.max(data_scat, (d) => d.gdp_per_capita)])
        .range([ 0, width_scat ]);
      svg_scat.append("g")
        .attr("transform", `translate(0, ${height_scat})`)
        .call(d3.axisBottom(x_ax));
    
      // Add Y axis
      const y_ax = d3.scaleLinear()
        .domain([0, d3.max(data_scat, (d) => d.reproduction_rate)])
        .range([ height_scat, 0]);
      svg_scat.append("g")
        .call(d3.axisLeft(y_ax));
    

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
          .html(`The GDP of ${d.location} is: ${d.gdp_per_capita}<br> and reproduction rate is : ${d.reproduction_rate}`)
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
        .data(data_scat.filter(function(d,i){return i<200})) 
        .enter()
        .append("circle")
          .attr("cx", function (d) { return x_ax(d.gdp_per_capita); } )
          .attr("cy", function (d) { return y_ax(d.reproduction_rate); } )
          .attr("r", 7)
          .style("fill", "#fa0db7")
          .style("opacity", 0.3)
          .style("stroke", "white")
        .on("mouseover", mouseover_1 )
        .on("mousemove", mousemove_1)
        .on("mouseleave", mouseleave_1)

        svg_scat.append('line')
        .attr('x1',x_ax(0))
        .attr('x2',x_ax(8000))
        .attr('y1',y_ax(0))
        .attr('y2',y_ax(1.1))
    
    })

  