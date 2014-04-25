/*!
 * Displays GitHub stats of Seqware
 * Written by Joshua Ching and Raunaq Suri
*/
$(document).ready(function() {

//check when slide changes    
//Reveal.addEventListener( 'slidechanged', function( event ) {    
    
var codeFrequencyUrl = "https://api.github.com/repos/seqware/seqware/stats/code_frequency"
var codeFrequency = {
    dataset:[0,0,1],
    color:["#2ecc71","#e74c3c","#ecf0f1"],
    label:["+","-"]
};
var latestDataChanges = [];
var latestData = { 
    "changes": ["Additions", "Deletions"],
    "values" : latestDataChanges
};
//process code frequencyUrl
$.getJSON(codeFrequencyUrl,function(data){
    processCodeFrequency(data);
    displayCodeFrequency(codeFrequency);
});
    
$.getJSON(codeFrequencyUrl, function(data){
    
    processLastData(data);

});
          
function processLastData (data){
    
    var lastWeek = data[data.length-1];
    latestDataChanges.push(lastWeek[1]);
    latestDataChanges.push(lastWeek[2] * -1); // bar graph values are positive
    
}
    
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
var CFwidth = 400;
var CFheight = 600;
var radius = Math.min(CFwidth, CFheight) / 2;
var pie = d3.layout.pie()
			.sort(null);
var arc = d3.svg.arc()
	.innerRadius(radius-100)
	.outerRadius(radius-10);

var color = d3.scale.category10();
    
//set up svg space
var CFvis = d3.select("#svg_codeFrequencyGraph")
	.style("width",CFwidth+"px")
	.style("height", CFheight+"px");

//draw initial donut path
var path = CFvis.selectAll("path")
			.data(pie(codeFrequency.dataset))
            .attr("class","slice")
			.enter()
			.append("path")
			.attr("d",arc)
			.attr("transform","translate(" + radius + "," + radius + ")")
			.style("fill", function(d, i){return codeFrequency.color[i];})
			.style("stroke","#ecf0f1")
			.style("stroke-width","3px")
			.each(function(d) { this._current = d; }); // store the initial angles;    

//draw center label
var labelAdd = CFvis.append("text")
    .attr("transform","translate("+radius+","+((radius)-20)+")")
    .attr("text-anchor","middle")
    .text("+"+codeFrequency.dataset[0])
    .style("fill","#2ecc71");
var labelDelete = CFvis.append("text")
    .attr("transform","translate("+radius+","+((radius)+20)+")")
    .attr("text-anchor","middle")
    .style("fill","#e74c3c")
    .text("+"+codeFrequency.dataset[1]);

//draw title label
var labelTitle = CFvis.append("text")
    .attr("transform","translate("+radius+","+((CFheight/2)+140)+")")
    .attr("text-anchor","middle")
    .style("fill","#ecf0f1")
    .text("All Time Code Changes");
    
//update graph function
function updateGraph(dataObject){
	//update paths
	path.data(pie(dataObject.dataset))
		.transition()
		.ease("bounce")
		.duration(900)
		.attrTween("d", arcTween);
    labelAdd.text("+"+codeFrequency.dataset[0]);
    labelDelete.text("-"+codeFrequency.dataset[1]);
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

//});
});