/*!
 * Finds the person of the week and displays their required data from OICR
 * Written by Joshua Ching and Raunaq Suri
*/
/*alert*/
$(document).ready(function() {

var csvList;
var DEFAULT_DATE = new Date("April 20, 2014");
var date = new Date();
var timeDiff = Math.abs(date.getTime() - DEFAULT_DATE.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;

var indexOfNames = parseInt(diffDays / 7);
console.log("Index of Names: "+indexOfNames);

console.log("Day offset:" + diffDays);


$.ajax({
        type: "GET",
        url: "files/IBC List_2014_v1.csv",
        dataType: "text",
        async: false,
        success: function(data) {
            processIBClist(data);
        }
});
    
//Parses the xml by first turning it into a json then going through it to return the title
function parsePaper(id){
    var articleUrl = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id="+ id;
    
    console.log(articleUrl);
    var title; 
    getTitle();
    
    function getTitle(){
        $.ajax({
            
            url : articleUrl,
            type: 'get',
            dataType : 'json',
            async : false,
            success : function(data){
                processTitle(data);
            }
        });
    }
    return title;
}

var title;
function processTitle(json){
    var data = json;
    var result = data["result"]; //search result data object
    console.log(result);
    var pubid = result["uids"][0];
    console.log("PUB ID " + pubid);
    title = result[pubid]["title"];
    console.log(title);
}
function processIBClist(data){
    "use strict";
    csvList = data;
}

//Gets all the names of the people
var names = [];
var positions = [];
var csvLines = csvList.split("\n");

for( var i = 0; i < csvLines.length; i++){
    var csvData = csvLines[i].split(",");
    names.push(csvData[1].trim()); 
    //console.log(names[i]);
    positions.push(csvData[3].trim());
    //console.log(positions[i]);
}

//console.log(names);

if (indexOfNames >= names.length){
    indexOfNames = indexOfNames % names.length;
}

//get person of the week name and display it
function getNameOfWeek(name){
    var nameSplit = name.split(" ");
    return nameSplit[1];
}
    
//Sets the default image
function getImgUrl(name){
    var lastName = getNameOfWeek(name);
    var nameSplit = name.split(" ");
    console.log(nameSplit[0]);
    var firstName = nameSplit[0];
    var firstLetter = firstName.charAt(0);
    var imgUrl = "http://interoicr/directory/photos/"+lastName+firstLetter+".jpg";
    return imgUrl;
}

//PUB MED
var person=getNameOfWeek(names[indexOfNames]); //insert name of the person of the week here
var imgUrl = getImgUrl(names[indexOfNames]);
console.log("IMG SRC " + getImgUrl(names[indexOfNames]));
    
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
        parsePaper(pubList[0]);
        console.log("Pub med: ");    
    }
    //if pub count is greater than 1
    else{
        parsePaper(pubList[0]);
        console.log("Pub med #1: "+pubList[0] + "parsed "+title);
        parsePaper(pubList[1]);
        console.log("Pub med #2: "+pubList[1] + "parsed "+ title);
    }
});
    
$("#name").text(names[indexOfNames]);
$("#position").text(positions[indexOfNames]);
$('#potwProfileImg').attr('src', imgUrl).load(function(){
    this.width;   // Note: $(this).width() will not work for in memory images

});    
});
                      
