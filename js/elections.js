
function draw() {
    var sheet="https://docs.google.com/spreadsheet/pub?hl=en&hl=en&key=0Aq9agjil66PydHNLUkFaYXBUdWJrT1ZJRjBRbjJOMUE&single=true&gid=0&output=csv"
    d3.csv(sheet,function(data)
        {
        console.log(data) 
        }
