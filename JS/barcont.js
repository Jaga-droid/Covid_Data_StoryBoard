// Set the dimensions and margins of the chart
const bar_margin_20 = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40,
  };
  const bar_width_20 = window.innerWidth * 0.5 - bar_margin_20.left - bar_margin_20.right;
  const bar_height_20 = window.innerHeight * 0.5 - bar_margin_20.top - bar_margin_20.bottom;
  
  // Create the SVG container for the chart
  const bar_svg_25 = d3
    .select('#lollipop')
    .append('svg')
    .attr('width', bar_width_20 + bar_margin_20.left + bar_margin_20.right)
    .attr('height', bar_height_20 + bar_margin_20.top + bar_margin_20.bottom)
    .append('g')
    .attr('transform', `translate(${bar_margin_20.left}, ${bar_margin_20.top})`);
  
  // Load data from CSV file
  
  function drawpops(file_name_2){
  d3.csv('https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/Pie%20Slices/'+file_name_2+'.csv').then(function (bar_data_20) {
    
  // Set the x and y scales for the chart
    const x23 = d3
      .scaleBand()
      .range([0, bar_width_20])
      .domain(bar_data_20.map((d) => d.Country))
      .padding(0.3);
  
    const y23 = d3.scaleLinear().range([bar_height_20, 0]).domain([0, d3.max(bar_data_20, (d) => d.total_cases)]);
  
    // Add the x and y axis to the chart
    const xAxis_23 = d3.axisBottom(x23);
    const yAxis_23 = d3.axisLeft(y23);
  
    bar_svg_25
      .append('g')
      .attr('class', 'axis-x')
      .attr('transform', `translate(0, ${bar_height_20})`)
      .call(xAxis_23)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end');
  
    bar_svg_25.append('g').attr('class', 'axis-y').call(yAxis_23);
  
    // Add the bars to the chart
    bar_svg_25
      .selectAll('.bar')
      .data(bar_data_20)
      .enter()
      .append('rect')
      .transition()
      .duration(1000)
      .attr('class', 'bar')
      .attr('x', (d) => x23(d.Country))
      .attr('y', (d) => y23(d.total_cases))
      .attr('width', x23.bandwidth())
      .attr('height', (d) => bar_height_20 - y23(d.total_cases));
  });
}