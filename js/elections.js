
function draw() {
    var sheet="https://docs.google.com/spreadsheet/pub?hl=en&hl=en&key=0Aq9agjil66PydHNLUkFaYXBUdWJrT1ZJRjBRbjJOMUE&single=true&gid=0&output=csv"
    d3.csv(sheet,function(data)
        {
        
        // visualization for ingresos
        var ingresos=_.filter(data, function(x) {
            return x.Tipo == "ingreso"; 
            });
        console.log(ingresos);
        


        // visualization for gastos
        var gastos=_.filter(data, function(x) {
            return x.Tipo == "gastos";
            });
        
        console.log(gastos);
        });
        }

document.body.onload=draw();        
