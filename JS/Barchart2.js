// Set the dimensions and margins of the chart
const bar_margin_2 = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40,
  };
  const bar_width_2 = window.innerWidth * 0.5 - bar_margin_2.left - bar_margin_2.right;
  const bar_height_2 = window.innerHeight * 0.5 - bar_margin_2.top - bar_margin_2.bottom;
  
  // Create the SVG container for the chart
  const bar_svg_2 = d3
    .select('#Barchartid2')
    .append('svg')
    .attr('width', bar_width_2 + bar_margin_2.left + bar_margin_2.right)
    .attr('height', bar_height_2 + bar_margin_2.top + bar_margin_2.bottom)
    .append('g')
    .attr('transform', `translate(${bar_margin_2.left}, ${bar_margin_2.top})`);
  
  // Load data from CSV file
  file_name_2='Countriestacklingcovid'
  d3.csv('https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/Countriestacklingcovid/'+file_name_2+'.csv').then(function (bar_data_2) {
  
    // Set the x and y scales for the chart
    const x2 = d3
      .scaleBand()
      .range([0, bar_width_2])
      .domain(bar_data_2.map((d) => d.Country))
      .padding(0.3);
  
    const y2 = d3.scaleLinear().range([bar_height_2, 0]).domain([0, d3.max(bar_data_2, (d) => d.new_deaths)]);
  
    // Add the x and y axis to the chart
    const xAxis_2 = d3.axisBottom(x2);
    const yAxis_2 = d3.axisLeft(y2);
  
    bar_svg_2
      .append('g')
      .attr('class', 'axis-x')
      .attr('transform', `translate(0, ${bar_height_2})`)
      .call(xAxis_2)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end');
  
    bar_svg_2.append('g').attr('class', 'axis-y').call(yAxis_2);
  
    // Add the bars to the chart
    bar_svg_2
      .selectAll('.bar')
      .data(bar_data_2)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x2(d.Country))
      .attr('y', (d) => y2(d.new_deaths))
      .attr('width', x2.bandwidth())
      .attr('height', (d) => bar_height_2 - y2(d.new_deaths));
  });
  