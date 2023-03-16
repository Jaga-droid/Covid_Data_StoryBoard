// Set the dimensions and margins of the chart
const bar_margin_990 = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40,
  };
  const bar_width_990 = window.innerWidth * 0.5 - bar_margin_990.left - bar_margin_990.right;
  const bar_height_990 = window.innerHeight * 0.5 - bar_margin_990.top - bar_margin_990.bottom;
  
  // Create the SVG container for the chart
  const bar_svg_903 = d3
    .select('#Barchartid20')
    .append('svg')
    .attr('width', bar_width_990 + bar_margin_990.left + bar_margin_990.right)
    .attr('height', bar_height_990 + bar_margin_990.top + bar_margin_990.bottom)
    .append('g')
    .attr('transform', `translate(${bar_margin_990.left}, ${bar_margin_990.top})`);
  
  // Load data from CSV file

  function drawpop2(file_name_292){
  d3.csv('https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/Vaccination_%26_Boosters/'+file_name_292+'.csv').then(function (bar_data_28) {
    
  // Set the x and y scales for the chart
    const x267 = d3
      .scaleBand()
      .range([0, bar_width_990])
      .domain(bar_data_28.map((d) => d.location))
      .padding(0.3);
  
    const y267 = d3.scaleLinear().range([bar_height_990, 0]).domain([0, d3.max(bar_data_28, (d) => d.new_cases)]);
  
    // Add the x and y axis to the chart
    const xAxis_909 = d3.axisBottom(x267);
    const yAxis_909 = d3.axisLeft(y267);
  
    bar_svg_903
      .append('g')
      .attr('class', 'axis-x')
      .attr('transform', `translate(0, ${bar_height_990})`)
      .call(xAxis_909)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end');
  
    bar_svg_903.append('g').attr('class', 'axis-y').call(yAxis_909);
  
    // Add the bars to the chart
    bar_svg_903
      .selectAll('.bar')
      .data(bar_data_28)
      .enter()
      .append('rect')
      .transition()
      .duration(1000)
      .attr('class', 'bar')
      .attr('x', (d) => x267(d.location))
      .attr('y', (d) => y267(d.new_cases))
      .attr('width', x267.bandwidth())
      .attr('height', (d) => bar_height_990 - y267(d.new_cases));
  });
}
drawpop2('VaccinationBoosterContinent')