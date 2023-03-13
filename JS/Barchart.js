// Set the dimensions and margins of the chart
const bar_margin = {
  top: 20,
  right: 20,
  bottom: 70,
  left: 40,
};
const bar_width = window.innerWidth * 0.5 - bar_margin.left - bar_margin.right;
const bar_height = window.innerHeight * 0.5 - bar_margin.top - bar_margin.bottom;

// Create the SVG container for the chart
const svg = d3
  .select('#Barchartid')
  .append('svg')
  .attr('width', bar_width + bar_margin.left + bar_margin.right)
  .attr('height', bar_height + bar_margin.top + bar_margin.bottom)
  .append('g')
  .attr('transform', `translate(${bar_margin.left}, ${bar_margin.top})`);

// Load data from CSV file
d3.csv('https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/data.csv').then(function (bar_data) {

  // Set the x and y scales for the chart
  const x = d3
    .scaleBand()
    .range([0, bar_width])
    .domain(bar_data.map((d) => d.name))
    .padding(0.1);

  const y = d3.scaleLinear().range([bar_height, 0]).domain([0, d3.max(bar_data, (d) => d.value)]);

  // Add the x and y axis to the chart
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  svg
    .append('g')
    .attr('class', 'axis-x')
    .attr('transform', `translate(0, ${bar_height})`)
    .call(xAxis)
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .attr('text-anchor', 'end');

  svg.append('g').attr('class', 'axis-y').call(yAxis);

  // Add the bars to the chart
  svg
    .selectAll('.bar')
    .data(bar_data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d.name))
    .attr('y', (d) => y(d.value))
    .attr('width', x.bandwidth())
    .attr('height', (d) => bar_height - y(d.value));
});
