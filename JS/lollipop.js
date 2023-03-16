    // set the dimensions and margins of the graph
    const lolly_margin = {top: 30, right: 30, bottom: 70, left: 60},
        lolly_width = window.innerWidth - lolly_margin.left - lolly_margin.right,
        lolly_height = window.innerHeight - lolly_margin.top - lolly_margin.bottom;
    
    // append the svg object to the body of the page
    const lolly_svg = d3.select("#lollipop")
      .append("svg")
        .attr("width", lolly_width + lolly_margin.left + lolly_margin.right)
        .attr("height", lolly_height + lolly_margin.top + lolly_margin.bottom)
      .append("g")
        .attr("transform", `translate(${lolly_margin.left}, ${lolly_margin.top})`);
    
    // Initialize the X axis
    const xL = d3.scaleBand()
      .range([ 0, lolly_width ])
      .padding(1);
    const xAxisL = lolly_svg.append("g")
      .attr("transform", `translate(0, ${lolly_height})`)
    
    // Initialize the Y axis
    const yL = d3.scaleLinear()
      .range([ lolly_height, 0]);
    const yAxisL = lolly_svg.append("g")
      .attr("class", "myYaxis")
    
    
    // A function that create / update the plot for a given variable:
    function drawpops(file_name) {
    
      // Parse the Data
      d3.csv('https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/Pie%20Slices/'+file_name+'.csv').then( function(dataL) {
      
        // X axis
        xL.domain(dataL.map(function(d) { return d.Country; }))
        xAxisL.transition().duration(1000).call(d3.axisBottom(xL))
    
        // Add Y axis
        yL.domain([0, d3.max(dataL, function(d) { return +d.total_cases }) ]);
        yAxisL.transition().duration(1000).call(d3.axisLeft(yL));
    
        // variable u: map data to existing circle
        const jL = lolly_svg.selectAll(".myLine")
          .data(dataL)
        // update lines
        jL
          .join("line")
          .attr("class", "myLine")
          .transition()
          .duration(1000)
            .attr("x1", function(d) { return xL(d.Country); })
            .attr("x2", function(d) { return xL(d.Country); })
            .attr("y1", yL(0))
            .attr("y2", function(d) { return yL(d.total_cases); })
            .attr("stroke", "grey")
    
    
        // variable u: map data to existing circle
        const uL = lolly_svg.selectAll("circle")
          .data(dataL)
        // update bars
        uL
          .join("circle")
          .transition()
          .duration(1000)
            .attr("cx", function(d) { return xL(d.Country); })
            .attr("cy", function(d) { return yL(d.total_cases); })
            .attr("r", 8)
            .attr("fill", "#69b3a2");
    
    
      })
    
    }