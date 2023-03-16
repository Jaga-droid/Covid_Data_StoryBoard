// Set the dimensions and margins of the chart
const bar_margin9 = {
    top: 30,
    right: 20,
    bottom: 70,
    left: 40,
  };
  const bar_width9 = window.innerWidth * 0.6 - bar_margin9.left - bar_margin9.right-50;
  const bar_height9 = window.innerHeight * 0.6 - bar_margin9.top - bar_margin9.bottom;
  
  // Create the SVG container for the chart
  const bar_svg9 = d3
    .select('#Barchartid9')
    .append('svg')
    .attr('width', bar_width9 + bar_margin9.left + bar_margin9.right)
    .attr('height', bar_height9 + bar_margin9.top + bar_margin9.bottom)
    .append('g')
    .attr('transform', `translate(${bar_margin9.left}, ${bar_margin9.top})`);
  
  // Load data from CSV file

  
  d3.csv('https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/Vaccination_&_Boosters/topfivevaccines.csv').then(function (bar_data9) {
  
    // Set the x and y scales for the chart
    const x9 = d3
      .scaleBand()
      .range([0, bar_width9])
      .domain(bar_data9.map((d) => d.Company))
      .padding(0.3);
  
    const y9 = d3.scaleLinear().range([bar_height9, 0]).domain([0,200]);
  
    // Add the x and y axis to the chart
    const xAxis9 = d3.axisBottom(x9);
    const yAxis9 = d3.axisLeft(y9);
  
    bar_svg9
      .append('g')
      .attr('class', 'axis-x')
      .attr('transform', `translate(0, ${bar_height9})`)
      .call(xAxis9)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end');
  
    bar_svg9.append('g').attr('class', 'axis-y').call(yAxis9);
  
    // Add the bars to the chart
    bar_svg9
      .selectAll('.bar')
      .data(bar_data9)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x9(d.Company))
      .attr('y', (d) => y9(d.value))
      .attr('width', x9.bandwidth())
      .attr('height', (d) => bar_height9 - y9(d.value));
  });
  