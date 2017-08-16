


//Width and Height of the SVG
var isstart = true;
var 
	w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	x = (w.innerWidth || e.clientWidth || g.clientWidth) - 10,
	y = (w.innerHeight|| e.clientHeight|| g.clientHeight)-10;


window.onresize = updateWindow;	
function updateWindow(){
	x = (w.innerWidth || e.clientWidth || g.clientWidth) - 10;
	y = (w.innerHeight|| e.clientHeight|| g.clientHeight)-10;

	svg.attr("width", x).attr("height", y);
	// d3.selectAll(".container").attr("transform", "translate3d(2,2,0)");

	d3.selectAll(".container").attr("transform", "translate(" + x/2 + "," + y/2 + ")")
					// .attr("transform", "rotateX(-90deg)");
	// d3.selectAll(".legendContainer").attr("transform", "translate(" + 30 + "," + (y - 90) + ")");
	// d3.select("#crazy").style("left", (x/2 - 112/2 + 6) + "px").style("top", (y/2 - 100) + "px");
	//d3.selectAll(".introWrapper").attr("transform", "translate(" + -x/2 + "," + -y/2 + ")");
}


///////////////////////////////////////////////////////////////////////////
///////////////////////// Initiate elements ///////////////////////////////
///////////////////////////////////////////////////////////////////////////

var stopTooltip = false;	
//Planet orbit variables
//The larger this is the more accurate the speed is
var resolution = 1, //perhaps make slider?
	speedUp = 400,
	au = 149597871, //km
	radiusSun = 695800, //km
	radiusJupiter = 69911, //km
	phi = 0, //rotation of ellipses
	radiusSizer = 6, //Size increaser of radii of planets
	planetOpacity = 0.6;

//Create SVG
var svg = d3.select("body")
	.append("svg")
	.attr("width", x)
	.attr("height", y);


//Create a container for everything with the centre in the middle
var container = svg.append("g").attr("class","container")
					.attr("transform", "translate( " + x/2 + "," + y/2 + ")")
					// .attr("transform", "rotateX(-90deg)");
					// .attr("transform", "translate3d(" + x/2 "," + y/2 + ","+ 0 + " )");
					// .attr("transform", "translateY(" + y/2 + ")");
  
//Create star in the Middle - scaled to the orbits
//Radius of our Sun in these coordinates (taking into account size of circle inside image)
var ImageWidth = radiusSun/au * 3000 * (2.7/1.5);


//d3.json("exoplanets.json", function(error, planets) {
// var orbits =[
			
			
// 			{name:"saturnO",cx:0,cy:0,major:475,minor:475,Radius:4},
// 			{name:"jupiterO",cx:0,cy:0,major:260,minor:260,Radius:4},
// 			{name:"marsO",cx:0,cy:0,major:75,minor:75,Radius:4},
// 			{name:"earthO",cx:0,cy:0,major:50,minor:50,Radius:4},
// 			{name:"venusO",cx:0,cy:0,major:35,minor:35,Radius:4},
// 			{name:"mercuryO",cx:0,cy:0,major:20,minor:20,Radius:4}


// 			]
var orbits =[
			{name:"7",cx:0,cy:0,speed:0.009,major:350,minor:175,Radius:4},
			{name:"6",cx:0,cy:0,speed:0.0177,major:292,minor:147.55,Radius:4},
			{name:"5",cx:0,cy:0,speed:0.05,major:132,minor:66,Radius:4},
			{name:"4",cx:0,cy:0,speed:0.127,major:92,minor:46,Radius:4},
			{name:"3",cx:0,cy:0,speed:0.8,major:58,minor:29,Radius:4},
			{name:"2",cx:0,cy:0,speed:1.5,major:52,minor:26,Radius:4},
			{name:"1",cx:0,cy:0,speed:2.43,major:48,minor:24,Radius:4},
			{name:"0",cx:0,cy:0,speed:6.2,major:45,minor:22.5,Radius:4}

			]

var planets =[  
				{name:"mercury",Radius:10,orbit:35,speed:6.2,x:-45,y:-22.5,href:"img/mercury.png"},
				{name:"venus",Radius:10,orbit:48,speed:2.43,x:48,y:24,href:"img/venus.png"},
				{name:"earth",Radius:10,orbit:52,speed:1.5,x:-52,y:-26,href:"img/earth.png"},
				{name:"mars",Radius:10,orbit:58,speed:0.8,x:-58,y:-29,href:"img/mars.png"},
				{name:"jupiter",Radius:50,orbit:92,speed:0.127,x:-92,y:-46,href:"img/jupiter.png"},
				{name:"saturn",Radius:80,orbit:132,speed:0.05,x:132,y:66,href:"img/saturn.png"},
				{name:"uranus",Radius:10,orbit:292,speed:0.0177,x:-292,y:-147.55,href:"img/uranus.png"},
				{name:"neptune",Radius:8,orbit:350,speed:0.009,x:350,y:175,href:"img/neptune.png"}
				// {name:"saturn",Radius:60,orbit:300,speed:0.05,x:-300,y:-300,href:"img/saturn.png"},
				// {name:"jupiter",Radius:28,orbit:174.7,speed:0.127,x:-174.7,y:-174.7,href:"img/jupiter.png"},
				// {name:"mars",Radius:15,orbit:67,speed:0.8,x:-67,y:-67,href:"img/mars.png"},
				// {name:"earth",Radius:15,orbit:52.4,speed:1.5,x:-52.4,y:-52.4,href:"img/earth.png"},
				// {name:"venus",Radius:15,orbit:43.7,speed:2.43,x:-43.7,y:-43.7,href:"img/venus.png"},
				// {name:"mercury",Radius:15,orbit:35,speed:6.2,x:-35,y:-35,href:"img/mercury.png"}
				];


var planetinfro =[  
			{name:"mercury",back:"God of financial gain, commerce and luck",symbol:"☿",speed:"47.362 km/s",href:"img/mercury.jpeg"},
			{name:"venus",back:"Goddess of love, beauty, desire, sex, fertility, prosperity and victory",symbol:"♀",speed:"35.02 km/s",href:"img/venus.jpg"},
			{name:"earth",back:"Primordial Deity of the Earth",symbol:"⨁",speed:"29.78 km/s",href:"img/gaea.jpg"},
			{name:"mars",back:"Roman god of war",symbol:"♂",speed:"24.077 km/s",href:"img/mars.jpg"},
			{name:"jupiter",back:"God of the sky and lightning",symbol:"♃",speed:"13.07 km/s",href:"img/jupiter.jpg"},
			{name:"saturn",back:"Titan of Capitol, wealth, agriculture, liberation, and time",symbol:"♄",speed:"9.69 km/s ",href:"img/saturn.jpg"},
			{name:"uranus",back:"Primordial god of the sky",symbol:"♅",speed:"6.81km/s",href:"img/uranus.jpg"},
			{name:"neptune",back:"god of freshwater and the sea",symbol:"♆",speed:"5.43 km/s",href:"img/neptune.jpg"}]

//Create color gradient for planets based on the temperature of the star that they orbit
var colors = ["#FB1108","#FD150B","#FA7806","#FBE426","#FCFB8F","#F3F5E7","#C7E4EA","#ABD6E6","#9AD2E1","#42A1C1","#1C5FA5", "#172484"];
var colorScale = d3.scale.linear()
	  .domain([2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 14000, 20000, 30000]) // Temperatures
// 	  .range(colors);
	
//Set scale for radius of circles
var rScale = d3.scale.linear()
	.range([1, 20])
	.domain([0, d3.max(planets, function(d) { return d.Radius; })]);	

// //Format with 2 decimals
var formatSI = d3.format(".2f");


//Drawing a line for the orbit

var orbitsContainer = container.append("g").attr("class","orbitsContainer");
var orbits = orbitsContainer.selectAll("g.orbit")
				.data(orbits).enter().append("ellipse")
				.attr("class", "orbit")
				.attr("id", function(d) {return d.name;})
				.attr("cx", function(d) {return d.cx;})
				.attr("cy", function(d) {return d.cy;})
				.attr("rx", function(d) {return d.major*2.2;})
				.attr("ry", function(d) {return d.minor*1.5;})
				.style("fill", "#3E5968")
				.style("fill-opacity", 0)
				.style("stroke", "#bbb")
				.style("stroke-opacity", 0.3)
				.style("stroke-width", "0.5px")
				// .on("mouseover", planetOver)
				.on("click", pause);
				// .on("mouseover", pause);
				// .on("mouseout", planetOut);

//Drawing the planets			
var planetContainer = container.append("g").attr("class","planetContainer");

				var ifscale = false;
				allplanets = planetContainer.selectAll("image")
				.data(planets).enter().append("image")
				.attr("class", "planet")
				.attr("x",function(d) {return d.x;})
				.attr("y", function(d) {return d.y;})
				// .attr("class", "earth")
				.attr("xlink:href", function(d) {return d.href;})
				.attr("width",  function(d) {return d.Radius} )
				.attr("height", function(d) {return d.Radius} )
				.attr("text-anchor", "middle")
				.on("click", pause)
				function scaleLarge(d){
		
				}
				function planetOver(d){
					// orbit.stop();
					// d3.select(this).style("fill-opacity", 0.1);
					d3.select(this).style("stroke", "white")
					.style("stroke-width", "2px")
					// d3.selectAll(".container").attr("transform", "translate(" + this.cx + "," + this.cy+ ")");
				}
				function planetOut(){
					d3.select(this).style("stroke", "#bbb")
					.style("stroke-width", "0.5px")
					// d3.select(this).style("fill-opacity", 0);
					// Draw1();
					// d3.select(this).style("background","#fff");
				}
				planetContainer.append("g:image")
	.attr("x", -ImageWidth*1.2)
	.attr("y", -ImageWidth*1.2)
	.attr("class", "sun")
	.attr("xlink:href", "img/sun.png")
	.attr("width", ImageWidth*2.4)
	.attr("height", ImageWidth*2.4)
	.attr("text-anchor", "middle");	

    
	var text = container.append("text").attr("class","text");
	

function startCircle(time) {

	//Stop click event
	// d3.select(".progressWrapper")
	// 	.style("pointer-events", "none");
		
	//Dim the play button
	d3.selectAll(".play")
		.transition().delay(0).duration(500)
		.style("opacity", 1)
		.style("fill","#3B3B3B")
		.transition().delay(700 * time)
		.style("fill","white")
		;

	//Run the circle and at the end 
	d3.selectAll(".playCircle")
		.style("opacity", 1)
		.transition().duration(700 * time).ease("linear")
		.attrTween("d", function(d) {
		   var i = d3.interpolate(d.startAngle, d.endAngle);
		   return function(t) {
				d.endAngle = i(t);
				return arc(d);
		   }//return
		})
		// .call(endall, function() {
		// 	d3.select(".progressWrapper")
		// 		.style("pointer-events", "auto");
		// });
};

 
	
var counter = 1;
Draw1();

var countstep= 0;

// console.log(isstart);
 function pause(d) {
 	var d= Number(d3.select(this).attr("id"));
 	var x = (w.innerWidth || e.clientWidth || g.clientWidth)/2;
	var y = (w.innerHeight|| e.clientHeight|| g.clientHeight)/2;
	var pl = planets[d];
	var pinfo =planetinfro[d];
	var newx = -pl.x*2.2 * Math.sin(counter*pl.speed*Math.PI/180)-pl.Radius/2;
	var newy = -pl.y*1.5* Math.cos(counter*pl.speed*Math.PI/180)-pl.Radius/2;
								
		if(isstart)
			{isstart = false;
				// var x1= Number(d3.select(this).attr("x"));
				// var y1=Number(d3.select(this).attr("y"));
				d3.select("#tooltip")
				.transition().duration(400)
				.style("visibility", "visible")
				.style("top", y + newy +"px")
				.style("left", x+ newx +"px");
				 console.log(y + newx);
				 console.log(pl);

             // d3.select(this).style("fill-opacity", 0.1);
				d3.select(this).style("stroke", "white")
					.style("stroke-width", "2px");
//intro of it.  
				d3.select(".tooltip-Container").attr("onclick", "detailInfo("+d+")");
				d3.select("#tooltip .tooltip-planet").text(pinfo.name +"  " +pinfo.symbol);
				d3.select("#tooltip .tooltip-symbol").html();
				d3.select("#tooltip-radius").html(pinfo.speed);
				d3.select("#tooltip-back").html(pinfo.back);
				d3.select(".moreInfo").attr("class","tooltip-Container");
				d3.select("#tooltip-more").style("height","0px");
                d3.select("#detail-img").attr("src",pinfo.href);
				}
		else {
		 	isstart = true;
		 	Draw1();
		 	d3.select("#tooltip")
		 	.transition().duration(400)
		 	.style("top", y  +"px")
			.style("left", x +"px")
			.style("visibility", "hidden");
            d3.select(this).style("stroke", "#bbb")
					.style("stroke-width", "0.5px")
			d3.select(".tooltip-cancel").style("visibility", "hidden");
			
			// d3.select(".moreInfo").attr("class","tooltip-Container");
		 } 
		};


		function detailInfo(d){
			var pl = planets[d];
	var pinfo =planetinfro[d];
			console.log(d);
			d3.select(".tooltip-Container").attr("class","moreInfo");
			d3.select("#tooltip").style("top","20%");
			d3.select("#tooltip").style("left","20%");
			
			d3.select("#tooltip-more").style("height","97%");
			d3.select(".tooltip-cancel").style("visibility", "visible");
			

		}

// console.log(countstep);
//Scaling radii	
function Draw1() {
   
	startCircle(time = 5);
   
		
	d3.selectAll(".planet")
		// .transition().delay(700 * 2).duration(2000)
		.attr("x", function(d) {
			var newRadius = -d.x*2.2 * Math.sin(counter*d.speed*Math.PI/180)-d.Radius/2;
			// console.log(countstep);
			// if  (newRadius > 500) {return 0;}
			// else {
				return newRadius;
			// }
		})
		.attr("y", function(d) {
			var newRadius = -d.y*1.5* Math.cos(counter*d.speed*Math.PI/180)-d.Radius/2;
			// console.log(d3.select(".progressWrapper"));
			// if  (newRadius > 500) {return 0;}
			// else {
				return newRadius;
			// }
		});
		// console.log(isstart);
		if (isstart){
			counter = counter + 1;
		    t=setTimeout("Draw1()",50);}
	
       }


		//Show the tooltip on hover
		function showTooltip(d) {	
			//Show how to close tooltip
			d3.select("#tooltipInfo").style("visibility", "visible");
			
			//Make a different offset for really small planets
			//var Offset = (rScale(d.Radius)/2 < 2) ? 3 : rScale(d.Radius)/2;
			var xOffset = ((10*d.Radius)/2 < 3) ? 6 : (10*d.Radius)/2;
			var yOffset = ((10*d.Radius)/2 < 3) ? 0 : (10*d.Radius)/2;

			//Set first location of tooltip and change opacity
			var xpos = d.x + x/2 - xOffset + 3;
			var ypos = d.y + y/2 - yOffset - 5;
			  
			d3.select("#tooltip")
				.style('top',ypos+"px")
				.style('left',xpos+"px")
				.transition().duration(500)
				.style('opacity',1);
				
			//Keep the tooltip moving with the planet, until stopTooltip 
			//returns true (when the user clicks)
			d3.timer(function() { 
			  xpos = d.x + x/2 - xOffset + 3;
			  ypos = d.y + y/2 - yOffset - 5;
			  
			 //Keep changing the location of the tooltip
			 d3.select("#tooltip")
				.style('top',ypos+"px")
				.style('left',xpos+"px");
			
				//Breaks from the timer function when stopTooltip is changed to true
				//by another function
				if (stopTooltip == true) { 
					//Hide tooltip info again
					d3.select("#tooltipInfo").style("visibility", "hidden");
					//Hide tooltip
					d3.select("#tooltip").transition().duration(300)
						.style('opacity',0)
						.call(endall, function() { //Move tooltip out of the way
							d3.select("#tooltip")
								.style('top',0+"px")
								.style('left',0+"px");
						});	
					//Remove show how to close
					return stopTooltip;
				}
			});
		
			//Change the texts inside the tooltip
			d3.select("#tooltip .tooltip-planet").text(d.name);
			d3.select("#tooltip .tooltip-year").html("Discovered in: " + d.discovered);
			//d3.select("#tooltip-class").html("Temperature of star: " + d.temp + " Kelvin");
			d3.select("#tooltip-period").html("Orbital period: " + formatSI(d.period) + " days");
			d3.select("#tooltip-eccen").html("Eccentricity of orbit: " + d.e);
			d3.select("#tooltip-radius").html("Radius of planet: " + formatSI(d.Radius * 11.209 ) + " Earth radii");
			d3.select("#tooltip-dist").html("Approx. distance to its Star: " + formatSI(d.major/3000) + " au");
		}//showTooltip	
