/*!
 * Finds the person of the week and displays their required data from OICR
 * Written by Joshua Ching and Raunaq Suri
*/

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
    console.log(data);
}