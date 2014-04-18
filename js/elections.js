
function draw() {
    var sheet="https://docs.google.com/spreadsheet/pub?hl=en&hl=en&key=0Aq9agjil66PydGdjQlBUZ0FLR0hqZHMzM1BIbUJnYlE&single=true&gid=0&output=csv"
    d3.csv(sheet,function(data)
        {
        
        // general config

        var width=400;
        var height=600;
        var margin=[0,0,0,0]; // margin top right bottom left

        // helper functions

        var slugify=function(s) {
            return s.toLowerCase().replace(/[^a-z0-9-]/g,"-");
            }

        var aggregate=function(d) {
            return _.values(_.reduce(d, function(x,y) {
                x[y.Name] = x[y.Name] || [];
                x[y.Name].push(y);
                return x;
                },{}));
            }
        
        // general data conversions
        data=_.map(data, function(d) {
            d.Valor = parseInt(d.Valor);
            return d;
            });
        // general visualization

        var stackedbar=function(svg,data) {

            data=_.map(data, function(d) {
                var last=0;
                _.each(d,function(x) {
                    x.last=last;
                    last=x.last+x.Valor;
                    });
                return d;
                });

            data=_.sortBy(data,function(d) {
                return -1*_.reduce(_.pluck(d,"Valor"),
                    function(x,y) {
                        return x+y;
                        },0)});

            var max=_.max(_.map(data,function(d) {
                return _.reduce(_.pluck(d,"Valor"),
                    function(x,y) {
                        return x+y; },0)
                }));

            var bw=width/data.length*0.8;
            var bs=width/data.length*0.2;

            var xscale=d3.scale.linear()
                .domain([0,max])
                .range([margin[3],width-margin[1]]);
            
            console.log(data);
            var bars=svg.selectAll("g.bars")
                .data(data)
                .enter()
                .append("g")
                .attr("class",function(d) { console.log(d); 
                return slugify(d[0].Name)
                })
                .attr("transform",function(d,i) {
                    return "translate(0,"+(margin[0]+i*(bw+bs))+")"; });

            bars.selectAll("rect")
                .data(function(d) { return d; })
                .enter()
                .append("rect")
                .attr("x",function(d) {
                    return xscale(d.last);
                    })
                .attr("y",0)
                .attr("height",bw)
                .attr("width",function(d) { return xscale(d.Valor); })
                .attr("class",function(d) { return d.Codigo })



            }
        // visualization for ingresos
        var ingresos=aggregate(_.filter(data, function(x) {
            return x.Tipo == "ingreso"; 
            }))
       
        var svg=d3.select("#ingreso").append("svg")
            .attr("viewport","0 0 "+[width,height].join(" ") )
            .attr("perserveAspectRatio","xMidYMid");

        stackedbar(svg,ingresos);


        // visualization for gastos
        var gastos=aggregate(_.filter(data, function(x) {
            return x.Tipo == "gastos";
            }));
        
        console.log(gastos);
        });
        }

document.body.onload=draw();        
