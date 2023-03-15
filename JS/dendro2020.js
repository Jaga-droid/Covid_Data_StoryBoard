var width_1="960";
var height_1="2000";
var svg_2020 = d3.select("svg"),
    width_1 = +svg_2020.attr("width"),
    height_1 = +svg_2020.attr("height"),
    g1 = svg_2020.append("g").attr("transform", "translate(40,0)");

var tree_1 = d3.cluster()
    .size([height_1, width_1 - 160]);

var stratify = d3.stratify()
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

d3.json("flare.csv", function(error, data_1) {
  if (error) throw error;

  var root_1 = stratify(data_1)
      .sort(function(a, b) { return (a.height_1 - b.height_1) || a.id.localeCompare(b.id); });

  tree_1(root_1);

  var link_1 = g.selectAll(".link")
      .data(root_1.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", function(d) {
        return "M" + d.y + "," + d.x
            + "C" + (d.parent.y + 100) + "," + d.x
            + " " + (d.parent.y + 100) + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
      });

  var node_1 = g1.selectAll(".node")
      .data(root_1.descendants())
    .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  node_1.append("circle")
      .attr("r", 2.5);

  node_1.append("text")
      .attr("dy", 3)
      .attr("x", function(d) { return d.children ? -8 : 8; })
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
});