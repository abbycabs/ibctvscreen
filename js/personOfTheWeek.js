/*!
 * Finds the person of the week and displays their required data from OICR
 * Written by Joshua Ching and Raunaq Suri
*/

var person="Stein"; //insert name of the person of the week here

//IBC LIST
$.ajax({
        type: "GET",
        url: "files/IBC List_2014_v1.csv",
        dataType: "text",
        success: function(data) {
            processIBClist(data);
        }
});

function processIBClist(data){
    console.log("process IBC list works");
    //console.log(data);
}

//PUB MED
var person="Stein"; //insert name of the person of the week here

var pubMedUrl = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&term=+ontario+AND+institute+AND+cancer+AND+research +AND+" + person;

$.getJSON(pubMedUrl,function(data){
    var eSearchResult = data.esearchresult; //search result data object
    var pubCount = parseInt(eSearchResult.count); //number of publications
    var pubList = eSearchResult.idlist; //array of publication IDs
    
    //if pub count is less than or equal to 0
    if (pubCount <= 0){
        console.log("No publications");
    }
    //if pub count is less than or equal to 1
    else if(pubCount <= 1){
        console.log(pubList[0]);    
    }
    //if pub count is greater than 1
    else{
        console.log(pubList[0]);
        console.log(pubList[1]);
    }
});
