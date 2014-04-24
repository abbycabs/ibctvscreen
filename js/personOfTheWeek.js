/*!
 * Finds the person of the week and displays their required data from OICR
 * Written by Joshua Ching and Raunaq Suri
*/
/*alert*/

var csvList;
$.ajax({
        type: "GET",
        url: "files/IBC List_2014_v1.csv",
        dataType: "text",
        async: false,
        success: function(data) {
            processIBClist(data);
        }
});

function processIBClist(data){
    "use strict";
    csvList = data;
    
    
}

//Gets all the names of the people
var names = [];
var csvLines = csvList.split("\n");

for( var i = 0; i < csvLines.length; i++){
    var csvData = csvLines[i].split(",");
    names.push(csvData[1].trim()); 
    //console.log(names[i]);
}

console.log(names);

var person; //insert name of the person of the week here


var pubMedUrl = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=+ontario+AND+institute+AND+cancer+AND+research" + person;
