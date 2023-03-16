
  
  // set the dimensions and margins of the diagram
  const tree_margin2 = {top: 20, right: 50, bottom: 20, left: 70},
        tree_width2  = window.innerWidth - tree_margin2.left - tree_margin2.right,
        tree_height2 = window.innerHeight - tree_margin2.top - tree_margin2.bottom;
  
  // declares a tree layout and assigns the size
  const treemap2 = d3.tree().size([tree_height2, tree_width2]);

  
d3.json('https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/Clustering/d3-dendrogram_2020.json').then(function (treeData2) {

// Set the x and y scales for the chart
  
  //  assigns the data to a hierarchy using parent-child relationships
  let nodes2 = d3.hierarchy(treeData2, d => d.children);
  
  // maps the node data to the tree layout
  nodes2 = treemap2(nodes2);
  
  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  const tree_svg2 = d3.select("#tree2020").append("svg")
          .attr("width", tree_width2 + tree_margin2.left + tree_margin2.right)
          .attr("height", tree_height2 + tree_margin2.top + tree_margin2.bottom),
        g2 = tree_svg2.append("g")
          .attr("transform",
              "translate(" + tree_margin2.left + "," + tree_margin2.top + ")");
  
  // adds the links between the nodes
  const link = g2.selectAll(".link")
      .data( nodes2.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .style("stroke",1)
      .attr("d", d => {
         return "M" + d.y + "," + d.x
           + "C" + (d.y + d.parent.y) / 2 + "," + d.x
           + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
           + " " + d.parent.y + "," + d.parent.x;
         });
  
  // adds each node as a group
  const node2 = g2.selectAll(".node")
      .data(nodes2.descendants())
      .enter().append("g")
      .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
      .attr("transform", d => "translate(" + d.y + "," + d.x + ")");
  
  // adds the circle to the node
  node2.append("circle")
    .attr("r", 2)
    .style("stroke",1)
    .style("fill", 'yellow');
    
  // adds the text to the node
  node2.append("text")
    .attr("dy", ".05em")
    .attr("x", d => d.children ? (5 + 5) * -1 : 10 + 5)
    .attr("y", d => d.children && d.depth !== 0 ? -(10 + 5) : d)
    .style("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);
});
      