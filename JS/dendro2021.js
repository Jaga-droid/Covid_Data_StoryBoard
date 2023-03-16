
  
  // set the dimensions and margins of the diagram
  const tree_margin21 = {top: 20, right: 50, bottom: 20, left: 70},
        tree_width21  = window.innerWidth - tree_margin21.left - tree_margin21.right,
        tree_height21 = window.innerHeight - tree_margin21.top - tree_margin21.bottom;
  
  // declares a tree layout and assigns the size
  const treemap21= d3.tree().size([tree_height21, tree_width21]);

  
d3.json('https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/Clustering/d3-dendrogram_2021.json').then(function (treeData21) {

// Set the x and y scales for the chart
  
  //  assigns the data to a hierarchy using parent-child relationships
  let nodes21 = d3.hierarchy(treeData21, d => d.children);
  
  // maps the node data to the tree layout
  nodes21 = treemap2(nodes21);
  
  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  const tree_svg21 = d3.select("#tree2021").append("svg")
          .attr("width", tree_width21 + tree_margin21.left + tree_margin21.right)
          .attr("height", tree_height21 + tree_margin21.top + tree_margin21.bottom),
        g21 = tree_svg21.append("g")
          .attr("transform",
              "translate(" + tree_margin21.left + "," + tree_margin21.top + ")");
  
  // adds the links between the nodes
  const link1 = g21.selectAll(".link")
      .data( nodes21.descendants().slice(1))
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
  const node21 = g21.selectAll(".node")
      .data(nodes21.descendants())
      .enter().append("g")
      .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
      .attr("transform", d => "translate(" + d.y + "," + d.x + ")");
  
  // adds the circle to the node
  node21.append("circle")
    .attr("r", 2)
    .style("stroke",1)
    .style("fill", 'yellow');
    
  // adds the text to the node
  node21.append("text")
    .attr("dy", ".05em")
    .attr("x", d => d.children ? (5 + 5) * -1 : 10 + 5)
    .attr("y", d => d.children && d.depth !== 0 ? -(10 + 5) : d)
    .style("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);
});
      