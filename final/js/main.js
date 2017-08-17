


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
d3.selectAll(".container").attr("transform", "translate(" + x/2 + "," + y/2 + ")")
	}

function hideW(){
		d3.select(".welcome-bg").style("visibility","hidden")
								.style("width","0")

}


// var stopTooltip = false;	
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
					//Radius of our Sun in these coordinates (taking into account size of circle inside image)
var ImageWidth = radiusSun/au * 3000 * (2.7/1.5);


//d3.json("exoplanets.json", function(error, planets) {
// var orbits =[

var orbits =[
			{name:"neptuneo",index:7,cx:0,cy:0,speed:0.009,major:350,minor:175,Radius:4},
			{name:"uranuso",index:6,cx:0,cy:0,speed:0.0177,major:292,minor:147.55,Radius:4},
			{name:"saturno",index:5,cx:0,cy:0,speed:0.05,major:132,minor:66,Radius:4},
			{name:"jupitero",index:4,cx:0,cy:0,speed:0.127,major:92,minor:46,Radius:4},
			{name:"marso",index:3,cx:0,cy:0,speed:0.8,major:58,minor:29,Radius:4},
			{name:"eartho",index:2,cx:0,cy:0,speed:1.5,major:52,minor:26,Radius:4},
			{name:"venuso",index:1,cx:0,cy:0,speed:2.43,major:48,minor:24,Radius:4},
			{name:"mercuryo",index:0,cx:0,cy:0,speed:6.2,major:45,minor:22.5,Radius:4}

			]

var planets =[  
				{name:"mercury",index:0,Radius:4,orbit:35,speed:6.2,x:-45,y:-22.5,href:"img/mercury.png"},
				{name:"venus",index:1,Radius:10,orbit:48,speed:2.43,x:48,y:24,href:"img/venus.png"},
				{name:"earth",index:2,Radius:10,orbit:52,speed:1.5,x:-52,y:-26,href:"img/earth.png"},
				{name:"mars",index:3,Radius:8,orbit:58,speed:0.8,x:-58,y:-29,href:"img/mars.png"},
				{name:"jupiter",index:4,Radius:50,orbit:92,speed:0.127,x:-92,y:-46,href:"img/jupiter.png"},
				{name:"saturn",index:5,Radius:80,orbit:132,speed:0.05,x:132,y:66,href:"img/saturn.png"},
				{name:"uranus",index:6,Radius:20,orbit:292,speed:0.0177,x:-292,y:-147.55,href:"img/uranus.png"},
				{name:"neptune",index:7,Radius:20,orbit:350,speed:0.009,x:350,y:175,href:"img/neptune.png"}
				];


var planetinfro =[  
			{name:"mercury",back:"the Messenger to the Gods",detail:"<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mercury is the smallest and innermost planet in the Solar System. Its orbital period around the Sun of 88 days is the shortest of all the planets in the Solar System.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; It is named after the Roman deity Mercury, the messenger to the gods. Mercury is a major Roman god, being one of the Dii Consentes within the ancient Roman pantheon.</p>",symbol:"☿",speed:"47.362 km/s",href:"img/mercury.jpeg"},
			{name:"venus",back:"Goddess of Love, Beauty and Victory",detail:"<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Venus is the second planet from the Sun, orbiting it every 224.7 Earth days.It has the longest rotation period (243 days) of any planet in the Solar System and rotates in the opposite direction to most other planets. It has no natural satellites.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is named after the Roman goddess of love and beauty. Venus, in Roman mythology, she was the mother of the Roman people through her son, Aeneas, who survived the fall of Troy and fled to Italy.</p>",symbol:"♀",speed:"35.02 km/s",href:"img/venus.jpg"},
			{name:"earth",back:"Primordial Deity of the Earth",detail:"<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Earth is the third planet from the Sun and the only object in the Universe known to harbor life.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In Greek mythology, Gaia is the ancestral mother of all life: the primal Mother Earth goddess.</p>",symbol:"⨁",speed:"29.78 km/s",href:"img/gaea.jpg"},
			{name:"mars",back:"Roman God of War",detail:"<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, after Mercury. Named after the Roman god of war.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In ancient Roman religion and myth, Mars was the god of war and also an agricultural guardian, a combination characteristic of early Rome. He was second in importance only to Jupiter and he was the most prominent of the military gods in the religion of the Roman army. </p>",symbol:"♂",speed:"24.077 km/s",href:"img/mars.jpg"},
			{name:"jupiter",back:"God of the Sky and Lightning",detail:"<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a giant planet with a massive one-thousandth that of the Sun, but two times of all the other planets in the Solar System combined.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Romans named it after their god Jupiter. Jupiter is the god of the sky and thunder and king of the gods in Ancient Roman religion and mythology. Jupiter was the chief deity of Roman state throughout the Republican and Imperial eras.</p>",symbol:"♃",speed:"13.07 km/s",href:"img/jupiter.jpg"},
			{name:"saturn",back:"Titan of Capitol, Wealth, Agriculture, Liberation, and Time",detail:"<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Saturn is the sixth planet from the Sun and the second largest in the Solar System, after Jupiter. Saturn is named after the Roman god of agriculture.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Saturn is a god in ancient, a religion, and a character in myth as a god of generation, dissolution, plenty, wealth, agriculture, periodic renewal and liberation. </p>",symbol:"♄",speed:"9.69 km/s ",href:"img/saturn.jpg"},
			{name:"uranus",back:"Primordial God of the Sky",detail:"<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth largest planetary mass in the Solar System.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Uranus was the primal Greek god personifying the sky. His name in Roman mythology was Caelus.</p>",symbol:"♅",speed:"6.81km/s",href:"img/uranus.jpg"},
			{name:"neptune",back:"God of Water and the Sea",detail:"<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Neptune is the eighth and farthest known planet from the Sun in the Solar System. </p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is named after the Roman god of the sea and has the astronomical symbol ♆, a stylised version of the god Neptune's trident. Neptune was the god of freshwater and the sea in Roman religion. He is the counterpart of the Greek god Poseidon.</p>",symbol:"♆",speed:"5.43 km/s",href:"img/neptune.jpg"}]

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
var orbitsall = orbitsContainer.selectAll("g.orbit")
				.data(orbits).enter().append("ellipse")
				.attr("class", "orbit")
				.attr("id", function(d) {return d.name;})
				.attr("index", function(d) {return d.index;})
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
				.attr("index", function(d) {return d.index;})
				.attr("class", "planet")
				.attr("x",function(d) {return d.x;})
				.attr("y", function(d) {return d.y;})
				// .attr("class", "earth")
				.attr("xlink:href", function(d) {return d.href;})
				.attr("width",  function(d) {return d.Radius} )
				.attr("height", function(d) {return d.Radius} )
				.attr("text-anchor", "middle")
				.on("click", pause)
			
			
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
	
};

 
	
var counter = 1;
Draw1();

var countstep= 0;

// console.log(isstart);
 function pause(d) {
 	var ind= Number(d3.select(this).attr("index"));
 	var x = (w.innerWidth || e.clientWidth || g.clientWidth)/2;
	var y = (w.innerHeight|| e.clientHeight|| g.clientHeight)/2;
	var pl = planets[ind];
	d3.select("#tooltip")
				.style("top", y +"px")
				.style("left", x +"px");
	var pinfo =planetinfro[ind];
	var newx = -pl.x*2.2 * Math.sin(counter*pl.speed*Math.PI/180)-pl.Radius/2;
	var newy = -pl.y*1.5* Math.cos(counter*pl.speed*Math.PI/180)-pl.Radius/2;
	// var orbitid = d3.selectAll(".orbit")[0][d];	
		if(isstart)
			{isstart = false;
				
				d3.select("#tooltip")
				.transition().duration(400)
				.style("visibility", "visible")
				.style("top", y + newy +"px")
				.style("left", x+ newx +"px");
				
		 	    d3.select(".tooltip-cancel").style("visibility", "hidden");

					      d3.selectAll(".orbit")
					      .filter(function (d, i){if(i==7-ind){return d}})
					      .style("stroke", "white")
					      .style("stroke-width", "2px");
					      // console.log(d3.selectAll(".orbit").filter(function (d, i) { return i === ind;}));
//intro of it.  
				d3.select(".tooltip-Container").attr("onclick", "detailInfo("+ind+")");
				d3.select("#tooltip .tooltip-planet").text(pinfo.name +"  " +pinfo.symbol);
				d3.select("#tooltip .tooltip-symbol").html();
				d3.select("#tooltip-radius").html(pinfo.speed);
				d3.select("#tooltip-back").html(pinfo.back);
				d3.select(".tooltip-intro").html(pinfo.detail);
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
            d3.selectAll(".orbit").style("stroke", "#bbb")
					.style("stroke-width", "0.5px")
			d3.select(".tooltip-cancel").style("visibility", "hidden");
			
			// d3.select(".moreInfo").attr("class","tooltip-Container");
		 } 
		};
		function cancel(){
			isstart = true;
		 	Draw1();
		 	d3.select(".tooltip-cancel").style("visibility", "hidden");
		 	d3.select("#tooltip")
		 	.transition().duration(400)
		 	.style("top", y  +"px")
			.style("left", x +"px")
			.style("visibility", "hidden");
            d3.selectAll(".orbit").style("stroke", "#bbb")
					.style("stroke-width", "0.5px");
			
			// d3.select(".tooltip-cancel").style("visibility","hidden");
		}

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


function Draw1() {
   
		
	d3.selectAll(".planet")
		// .transition().delay(700 * 2).duration(2000)
		.attr("x", function(d) {
			var newRadius = -d.x*2.2 * Math.sin(counter*d.speed*Math.PI/180)-d.Radius/2;
			
				return newRadius;
			// }
		})
		.attr("y", function(d) {
			var newRadius = -d.y*1.5* Math.cos(counter*d.speed*Math.PI/180)-d.Radius/2;
			
				return newRadius;
			
		});
		// console.log(isstart);
		if (isstart){
			counter = counter + 1;
		    t=setTimeout("Draw1()",50);}
	
       }


