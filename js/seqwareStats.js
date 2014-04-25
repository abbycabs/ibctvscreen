/*!
 * Displays GitHub stats of Seqware
 * Written by Joshua Ching and Raunaq Suri
*/
$(document).ready(function() {

//check when slide changes    
//Reveal.addEventListener( 'slidechanged', function( event ) {    

////SEQWARE////    
    
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
var CFwidth = 800;
var CFheight = 600;
var radius = Math.min(400) / 2;
var pie = d3.layout.pie()
			.sort(null);
var arc = d3.svg.arc()
	.innerRadius(radius-100)
	.outerRadius(radius-10);

//set up svg space
var CFvis = d3.select("#svg_codeFrequencyGraphSS")
	.style("width",CFwidth+"px")
	.style("height", CFheight+"px");

//draw initial donut path
var path = CFvis.selectAll("path")
			.data(pie(codeFrequency.dataset))
            .attr("class","slice")
			.enter()
			.append("path")
			.attr("d",arc)
			.attr("transform","translate(" + CFwidth/2 + "," + radius + ")")
			.style("fill", function(d, i){return codeFrequency.color[i];})
			.style("stroke","#ecf0f1")
			.style("stroke-width","3px")
			.each(function(d) { this._current = d; }); // store the initial angles;    

//draw center label
var labelAdd = CFvis.append("text")
    .attr("transform","translate("+CFwidth/2+","+((radius)-20)+")")
    .attr("text-anchor","middle")
    .text("+"+codeFrequency.dataset[0])
    .style("fill","#2ecc71");
var labelDelete = CFvis.append("text")
    .attr("transform","translate("+CFwidth/2+","+((radius)+20)+")")
    .attr("text-anchor","middle")
    .style("fill","#e74c3c")
    .text("+"+codeFrequency.dataset[1]);

//draw graph label descriptions    
var labelAddDescription = CFvis.append("text")
    .attr("transform","translate("+((CFwidth/2)+200)+","+((CFheight/2)+90)+")")
    .attr("text-anchor","middle")
    .text("Lines added")
    .style("fill","#2ecc71");
var labelDeleteDescription = CFvis.append("text")
    .attr("transform","translate("+(0+190)+","+((CFheight/2)+90)+")")
    .attr("text-anchor","middle")
    .text("Lines deleted")
    .style("fill","#e74c3c");
    
//draw title label
var labelTitle = CFvis.append("text")
    .attr("transform","translate("+CFwidth/2+","+((CFheight/2)+140)+")")
    .attr("text-anchor","middle")
    .style("fill","#ecf0f1")
    .style("font-weight","bold")
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

////WORMBASE////    

var codeFrequencyUrlWB = "https://api.github.com/repos/wormbase/website/stats/code_frequency"
var codeFrequencyWB = {
    dataset:[0,0,1],
    color:["#2ecc71","#e74c3c","#ecf0f1"],
    label:["+","-"]
};

//process code frequencyUrl
$.getJSON(codeFrequencyUrlWB,function(data){
    processCodeFrequencyWB(data);
    displayCodeFrequencyWB(codeFrequencyWB);
});
    
//process code frequency Url
function processCodeFrequencyWB (data){
    codeFrequencyWB.dataset[2]=0;
    for (var i=0; i<data.length; i++){
        codeFrequencyWB.dataset[0] += data[i][1];
        codeFrequencyWB.dataset[1] -= data[i][2];
    }
    console.log("add: "+codeFrequencyWB.dataset[0]);
    console.log("delete: "+codeFrequencyWB.dataset[1]);
}
 
//display code frequency graph
    
//set up svg space
var CFvisWB = d3.select("#svg_codeFrequencyGraphWB")
	.style("width",CFwidth+"px")
	.style("height", CFheight+"px");

//draw initial donut path
var pathWB = CFvisWB.selectAll("path")
			.data(pie(codeFrequencyWB.dataset))
            .attr("class","slice")
			.enter()
			.append("path")
			.attr("d",arc)
			.attr("transform","translate(" + CFwidth/2 + "," + radius + ")")
			.style("fill", function(d, i){return codeFrequencyWB.color[i];})
			.style("stroke","#ecf0f1")
			.style("stroke-width","3px")
			.each(function(d) { this._current = d; }); // store the initial angles;    

//draw center label
var labelAddWB = CFvisWB.append("text")
    .attr("transform","translate("+CFwidth/2+","+((radius)-20)+")")
    .attr("text-anchor","middle")
    .text("+"+codeFrequencyWB.dataset[0])
    .style("fill","#2ecc71");
var labelDeleteWB = CFvisWB.append("text")
    .attr("transform","translate("+CFwidth/2+","+((radius)+20)+")")
    .attr("text-anchor","middle")
    .style("fill","#e74c3c")
    .text("+"+codeFrequencyWB.dataset[1]);

//draw graph label descriptions    
var labelAddDescriptionWB = CFvisWB.append("text")
    .attr("transform","translate("+((CFwidth/2)+200)+","+((CFheight/2)+90)+")")
    .attr("text-anchor","middle")
    .text("Lines added")
    .style("fill","#2ecc71");
var labelDeleteDescriptionWB = CFvisWB.append("text")
    .attr("transform","translate("+(0+190)+","+((CFheight/2)+90)+")")
    .attr("text-anchor","middle")
    .text("Lines deleted")
    .style("fill","#e74c3c");
    
//draw title label
var labelTitleWB = CFvisWB.append("text")
    .attr("transform","translate("+CFwidth/2+","+((CFheight/2)+140)+")")
    .attr("text-anchor","middle")
    .style("fill","#ecf0f1")
    .style("font-weight","bold")
    .text("All Time Code Changes");
    
//update graph function
function updateGraphWB(dataObject){
	//update paths
	pathWB.data(pie(dataObject.dataset))
		.transition()
		.ease("bounce")
		.duration(900)
		.attrTween("d", arcTween);
    labelAddWB.text("+"+codeFrequencyWB.dataset[0]);
    labelDeleteWB.text("-"+codeFrequencyWB.dataset[1]);
}

    
function displayCodeFrequencyWB(data){
    updateGraphWB(data);
}    
    
//});
});