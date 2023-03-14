    // set the dimensions and margins of the graph
    const line_margin = {top: 10, right: 30, bottom: 30, left: 60},
        line_width = window.innerWidth*0.9 - line_margin.left - line_margin.right,
        line_height = window.innerHeight*0.4 - line_margin.top - line_margin.bottom;
    
    // append the line_svg object to the body of the page
    const line_svg = d3.select("#LineChartid")
      .append("svg")
        .attr("width", line_width + line_margin.left + line_margin.right)
        .attr("height", line_height + line_margin.top + line_margin.bottom)
      .append("g")
        .attr("transform", `translate(${line_margin.left},${line_margin.top})`);
    
    //Read the data
    d3.csv("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/cases_deaths/new_cases.csv",
    
      // When reading the csv, I must format variables:
      function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.date), World : d.World }
      }).then(
    
      // Now I can use this dataset:
      function(data) {
    
        // Add X axis --> it is a date format
        const line_x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { return d.date; }))
          .range([ 0, line_width ]);
        line_svg.append("g")
          .attr("transform", `translate(0, ${line_height})`)
          .call(d3.axisBottom(line_x));
    
        // Add Y axis
        const line_y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return +d.World; })])
          .range([ line_height, 0 ]);
        line_svg.append("g")
          .call(d3.axisLeft(line_y));
    
        // Add the line
        line_svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return line_x(d.date) })
            .y(function(d) { return line_y(d.World) })
            )
    
    })