/*!
 * Displays GitHub stats of Seqware
 * Written by Joshua Ching and Raunaq Suri
*/
$(document).ready(function() {

var codeFrequencyUrl = "https://api.github.com/repos/seqware/seqware/stats/code_frequency"
var totalAdditions = 0;
var totalDeletions = 0;

//process code frequencyUrl
$.getJSON(codeFrequencyUrl,function(data){
    processCodeFrequency(data);
});
    
//process code frequency Url
function processCodeFrequency (data){
    for (var i=0; i<data.length; i++){
        totalAdditions += data[i][1];
        totalDeletions += data[i][2];
    }
    console.log("add: "+totalAdditions);
    console.log("delete: "+totalDeletions);
}
    
});