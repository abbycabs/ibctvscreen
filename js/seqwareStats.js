/*!
 * Displays GitHub stats of Seqware
 * Written by Joshua Ching and Raunaq Suri
*/
$(document).ready(function() {
    
var codeFrequencyUrl = "https://api.github.com/repos/seqware/seqware/stats/code_frequency"
var codeFrequency = {
    dataset:[0,0,1],
    color:["#27ae60","#c0392b","#ecf0f1"]
};
var totalAdditions;
var totalDeletions;

//process code frequencyUrl
$.getJSON(codeFrequencyUrl,function(data){
    processCodeFrequency(data);
    displayCodeFrequency(codeFrequency);
});
    
//process code frequency Url
function processCodeFrequency (data){
    codeFrequency.dataset[2]=0;
    for (var i=0; i<data.length; i++){
        codeFrequency.dataset[0] += data[i][1];
        codeFrequency.dataset[1] -= data[i][2];
    }
    console.log("add: "+codeFrequency.dataset[0]);
    console.log("delete: "+codeFrequency.dataset[1]);
}
 
//display code frequency graph
var CFwidth = 500;
var CFheight = 500;
var radius = Math.min(CFwidth, CFheight) / 2;;
var pie = d3.layout.pie()
			.sort(null);
var arc = d3.svg.arc()
	.innerRadius(radius-140)
	.outerRadius(radius-10);

var color = d3.scale.category10();
    
//set up svg space
var CFvis = d3.select("#svg_codeFrequencyGraph")
	.style("width",CFwidth+"px")
	.style("height", CFheight+"px");

//draw initial donut path
var path = CFvis.selectAll("path")
			.data(pie(codeFrequency.dataset))
			.enter()
			.append("path")
			.attr("d",arc)
			.attr("transform","translate(" + CFwidth/2 + "," + CFheight/2 + ")")
			.style("fill", function(d, i){return codeFrequency.color[i];})
			.style("stroke","#ecf0f1")
			.style("stroke-width","3px")
			.each(function(d) { this._current = d; }); // store the initial angles;    

//update graph function
function updateGraph(dataObject){
	//update paths
	path.data(pie(dataObject.dataset))
		.transition()
		.ease("bounce")
		.duration(900)
		.attrTween("d", arcTween);
}

// Store the currently-displayed angles in this._current.
// Then, interpolate from this._current to the new angles.
function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}    
    
function displayCodeFrequency(data){
    updateGraph(data);
}  
    
//check when slide changes    
Reveal.addEventListener( 'slidechanged', function( event ) {

});
});