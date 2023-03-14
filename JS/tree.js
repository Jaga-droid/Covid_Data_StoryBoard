const treeData = {
    "name": "China",
    "value": 30,
    "type": "black",
    "level": "yellow",
    "date": "Jan 2020",
    "children": [
      {
        "name": "USA",
        "value": 10,
        "type": "grey",
        "level": "pink",
        "date": "March 2020"
      },
      {
        "name": "Europe",
        "value": 40,
        "type": "grey",
        "level": "red",
        "date": "Jan 2020",
        "children": [
          {
            "name": "France",
            "value": 10,
            "type": "grey",
            "level": "purple",
            "date": "Jan 2020"
          },
          {
            "name": "Italy",
            "value": 20,
            "type": "grey",
            "level": "purple",
            "date": "Feb 2020"
          },
          {
            "name": "Russia",
            "value": 10,
            "type": "grey",
            "level": "purple",
            "date": "Feb 2020"
          }
        ]
      },
      {
        "name": "Thailand",
        "value": 10,
        "type": "grey",
        "level": "blue",
        "date": "Jan 2020"
      },
      {
        "name": "Japan",
        "value": 10,
        "type": "grey",
        "level": "blue",
        "date": "Jan 2020"
      },
      {
        "name": "South Korea",
        "value": 10,
        "type": "grey",
        "level": "blue",
        "date": "Jan 2020"
      },
      {
        "name": "India",
        "value": 20,
        "type": "grey",
        "level": "green",
        "date": "Jan 2020",
        "children": [
          {
            "name": "Singapore",
            "value": 8,
            "type": "grey",
            "level": "orange",
            "date": "Feb 2020"
          }
        ]
      }
    ]
  };
  
  // set the dimensions and margins of the diagram
  const tree_margin = {top: 20, right: 150, bottom: 20, left: 170},
        tree_width  = window.innerWidth*0.9 - tree_margin.left - tree_margin.right,
        tree_height = window.innerHeight - tree_margin.top - tree_margin.bottom;
  
  // declares a tree layout and assigns the size
  const treemap = d3.tree().size([tree_height, tree_width]);
  
  //  assigns the data to a hierarchy using parent-child relationships
  let nodes = d3.hierarchy(treeData, d => d.children);
  
  // maps the node data to the tree layout
  nodes = treemap(nodes);
  
  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  const tree_svg = d3.select("#treeid").append("svg")
          .attr("width", tree_width + tree_margin.left + tree_margin.right)
          .attr("height", tree_height + tree_margin.top + tree_margin.bottom),
        g = tree_svg.append("g")
          .attr("transform",
              "translate(" + tree_margin.left + "," + tree_margin.top + ")");
  
  // adds the links between the nodes
  const link = g.selectAll(".link")
      .data( nodes.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .style("stroke", d => d.data.level)
      .attr("d", d => {
         return "M" + d.y + "," + d.x
           + "C" + (d.y + d.parent.y) / 2 + "," + d.x
           + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
           + " " + d.parent.y + "," + d.parent.x;
         });
  
  // adds each node as a group
  const node = g.selectAll(".node")
      .data(nodes.descendants())
      .enter().append("g")
      .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
      .attr("transform", d => "translate(" + d.y + "," + d.x + ")");
  
  // adds the circle to the node
  node.append("circle")
    .attr("r", d => d.data.value)
    .style("stroke", d => d.data.type)
    .style("fill", d => d.data.level);
    
  // adds the text to the node
  node.append("text")
    .attr("dy", ".35em")
    .attr("x", d => d.children ? (d.data.value + 5) * -1 : d.data.value + 5)
    .attr("y", d => d.children && d.depth !== 0 ? -(d.data.value + 5) : d)
    .style("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name + "  ("+d.data.date + ")");
      