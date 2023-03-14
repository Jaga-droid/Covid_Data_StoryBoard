// Set the dimensions and margins of the chart
const bar_margin = {
  top: 20,
  right: 20,
  bottom: 70,
  left: 40,
};
const bar_width = window.innerWidth * 0.5 - bar_margin.left - bar_margin.right-50;
const bar_height = window.innerHeight * 0.5 - bar_margin.top - bar_margin.bottom;

// Create the SVG container for the chart
const bar_svg = d3
  .select('#Barchartid')
  .append('svg')
  .attr('width', bar_width + bar_margin.left + bar_margin.right)
  .attr('height', bar_height + bar_margin.top + bar_margin.bottom)
  .append('g')
  .attr('transform', `translate(${bar_margin.left}, ${bar_margin.top})`);

// Load data from CSV file
file_name='Countriestacklingcovid'
d3.csv('https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/Countriestacklingcovid/'+file_name+'.csv').then(function (bar_data) {

  // Set the x and y scales for the chart
  const x = d3
    .scaleBand()
    .range([0, bar_width])
    .domain(bar_data.map((d) => d.Country))
    .padding(0.3);

  const y = d3.scaleLinear().range([bar_height, 0]).domain([0, d3.max(bar_data, (d) => d.new_cases)]);

  // Add the x and y axis to the chart
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  bar_svg
    .append('g')
    .attr('class', 'axis-x')
    .attr('transform', `translate(0, ${bar_height})`)
    .call(xAxis)
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .attr('text-anchor', 'end');

  bar_svg.append('g').attr('class', 'axis-y').call(yAxis);

  // Add the bars to the chart
  bar_svg
    .selectAll('.bar')
    .data(bar_data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d.Country))
    .attr('y', (d) => y(d.new_cases))
    .attr('width', x.bandwidth())
    .attr('height', (d) => bar_height - y(d.new_cases));
});
