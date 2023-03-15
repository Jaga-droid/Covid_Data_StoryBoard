var width_2="960";
var height_2="2000";
var svg_2021 = d3.select("svg"),
    width_2 = +svg_2021.attr("width"),
    height_2 = +svg_2021.attr("height"),
    g2 = svg_2021.append("g").attr("transform", "translate(40,0)");

var tree_2 = d3.cluster()
    .size([height_2, width_2 - 160]);

var stratify = d3.stratify()
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

d3.json("https://raw.githubusercontent.com/Jaga-droid/Covid_Data_StoryBoard/main/Resources/DataSet/Clustering/d3-dendrogram_2021.json", function(error, data_2) {
  if (error) throw error;

  var root_2= stratify(data_2)
      .sort(function(a, b) { return (a.height_2 - b.height_2) || a.id.localeCompare(b.id); });

  tree_2(root_2);

  var link_2 = g.selectAll(".link")
      .data(root_2.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", function(d) {
        return "M" + d.y + "," + d.x
            + "C" + (d.parent.y + 100) + "," + d.x
            + " " + (d.parent.y + 100) + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
      });

  var node_2= g2.selectAll(".node")
      .data(root_2.descendants())
    .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  node_2.append("circle")
      .attr("r", 2.5);

  node_2.append("text")
      .attr("dy", 3)
      .attr("x", function(d) { return d.children ? -8 : 8; })
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
});