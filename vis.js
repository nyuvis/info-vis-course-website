const visWidth = 75;
const visHeight = 75;

const margin = {
  top: 5,
  bottom: 5,
  left: 5,
  right: 5
};

const width = visWidth - margin.left - margin.right;
const height = visHeight - margin.top - margin.bottom;


function getSvg() {
  const div = d3.select('#vis');
  
  const svg = div.append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  return svg;
}


function barchart() {
  const svg = getSvg();

  const data = [5, 4, 3, 2, 1];

  const x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([0, width])
      .padding(0.2);

  const y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

  svg.selectAll('rect')
    .data(data)
    .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d))
      .attr('height', d => height - y(d))
      .attr('fill', d3.schemeCategory10[0]);
}


function areachart() {
  const svg = getSvg();

  const data = [3, 2, 3, 2, 1, 2, 3, 2, 3, 4, 5, 4, 3];

  const x = d3.scaleLinear()
      .domain([0, data.length])
      .range([0, width]);

  const y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

  const area = d3.area()
      .x((d, i) => x(i))
      .y1(d => y(d))
      .y0(y(0));

  svg.append('path')
      .datum(data)
      .attr('d', area)
      .attr('fill', d3.schemeCategory10[1]);
}


function scatterplot() {
  const svg = getSvg();

  const data = [
    {x: 1, y: 1},
    {x: 2, y: 2},
    {x: 2, y: 4},
    {x: 4, y: 4},
    {x: 5, y: 6},
    {x: 6, y: 3},
    {x: 7, y: 4},
    {x: 8, y: 6},
    {x: 8, y: 8},
    {x: 9, y: 8},
  ];

  const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([0, width]);

  const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([height, 0]);

  svg.selectAll('circle')
    .data(data)
    .join('circle')
      .attr('r', 2)
      .attr('cx', d => x(d.x))
      .attr('cy', d => y(d.y))
      .attr('fill', d3.schemeCategory10[2]);

  svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(0).tickSizeOuter(0));
  
  svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(0).tickSizeOuter(0));
}


function barchart100() {
  const svg = getSvg();

  const data = [.75, .6, .55, .35, .25];

  const x = d3.scaleLinear()
      .domain([0, 1])
      .range([0, width]);
 
  const y = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([0, height])
      .padding(0.2);

  svg.selectAll('.left')
    .data(data)
    .join('rect')
      .attr('class', 'left')
      .attr('x', 0)
      .attr('width', d => x(d))
      .attr('y', (d, i) => y(i))
      .attr('height', y.bandwidth())
      .attr('fill', d3.schemeCategory10[3]);
  
  svg.selectAll('.right')
    .data(data)
    .join('rect')
      .attr('class', 'right')
      .attr('x', d => x(d))
      .attr('width', d=> width - x(d))
      .attr('y', (d, i) => y(i))
      .attr('height', y.bandwidth())
      .attr('fill', d3.schemeCategory10[4]);
}


function map(nyc) {
  const svg = getSvg();
  const projection =  d3.geoAlbers()
      .fitSize([width, height], nyc)
  const path = d3.geoPath().projection(projection);

  svg.append('path')
      .datum(nyc)
      .attr('d', path)
      .attr('fill', d3.schemeCategory10[6]);
}


function matrix() {
  const svg = getSvg();

  const data = [
    [0.00, 0.14, 0.45, 0.27, 0.98],
    [0.60, 0.00, 0.40, 0.92, 0.87],
    [0.93, 0.70, 0.00, 0.12, 0.90],
    [0.42, 0.87, 0.19, 0.80, 1.00],
    [0.17, 0.74, 0.87, 0.20, 0.00],
  ];

  const x = d3.scaleBand()
      .domain(d3.range(data[0].length))
      .range([0, width])
      .padding(0.1);
  
  const y = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([0, height])
      .padding(0.1);

  const color = d3.scaleSequential(d3.interpolateBlues);

  svg.selectAll('g')
    .data(data)
    .join('g')
      .attr('transform', (d, i) => `translate(0, ${y(i)})`)
    .selectAll('rect')
    .data(d => d)
    .join('rect')
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('x', (d, i) => x(i))
      .attr('fill', d => color(d));
}


function nodelink() {
  const svg = getSvg();
  const points = [
    {x: width / 4, y: height / 4},
    {x: width / 4, y: 3 * height / 4},
    {x: 3 * width / 4, y: 3 * height / 4},
    {x: 3 * width / 4, y: height / 4},
    {x: width / 4, y: 3 * height / 4},
  ];

  const line = d3.line()
      .x(d => d.x)
      .y(d => d.y);

  svg.append('path')
      .datum(points)
      .attr('d', line)
      .attr('stroke-width', 2)
      .attr('stroke', '#ccc')
      .attr('fill', 'none');
  
  svg.selectAll('circle')
    .data(points.slice(0, points.length - 1))
    .join('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 4)
      .attr('fill', d3.schemeCategory10[9]);
}


d3.json('borough.geojson').then(nyc => {
  barchart();
  areachart();
  scatterplot();
  barchart100();
  map(nyc);
  matrix();
  nodelink();
});
