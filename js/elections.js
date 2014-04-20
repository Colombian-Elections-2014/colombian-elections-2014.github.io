
// show a specific section
function select(n) {
    var sections=d3.selectAll("section")
    sections.data(_.map(_.range(sections.data().length),function(d) {
        if (d==n) { return 1; }
        else { return 0; }}));
        
    sections.attr("class",function(d) { 
        if (d) { 
            var iurl=this.getAttribute("data-iframe");
            d3.select("iframe")
                .attr("src",iurl);
            return "active" 
            }
        else { return "inactive" } });
    d3.select("#selector svg").selectAll("circle")
        .data(sections.data())
        .attr("class",function(d) {
            if (d) { return "active"}
            else { return "inactive" } });
    }

function setup_selects() {
    var radius=4;
    var sections=_.range(d3.selectAll("section").data().length);
    var svg=d3.select("#selector").append("svg")
        .attr("width", sections.length*(radius*2+4))
        .attr("height", radius*2+4);

    svg.selectAll("circle")
        .data(sections)
        .enter()
        .append("circle")
        .attr("cx",function(d,i) {
            return 5+i*(radius*2+4);
            })
        .attr("cy",radius+2)
        .attr("r",radius)
        .on("click",function(d,i) {
                select(i); 
            });
    
    var getCurrent=function() {
        var s=d3.selectAll("section").data();
        return s.indexOf(1);
        }

    d3.select(".arrow-left")
        .on("click",function() {
            var c=getCurrent()
            if (c>0) {
                select(c-1);
                }
            else {
                select(0);
                }
            });

    d3.select(".arrow-right")
        .on("click",function() {
            var c=getCurrent();
            if (c+1<sections.length) {
                select(c+1) }
            });

    select(0);
    }

document.body.onload=function() { 
    setup_selects();
    draw();      
    }
