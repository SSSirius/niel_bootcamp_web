var istoggle = false;
// document.addEventListener('DOMContentLoaded',function () {

// 	function addLinks(parent){
// 	parent.innerHTML += "<a href='project1.html'>Touch</a>";
// 	parent.innerHTML += "<a href='project2.html'>SHOE • S</a>";
// 	parent.innerHTML += "<a href='project3.html'>Rollin'</a>";
// 	parent.innerHTML += "<a href='project4.html'>Ceramic</a>";
// 	parent.innerHTML += "<a href='project5.html'>Graphics</a>";
// 	parent.innerHTML += "<a href='project6.html'>Coding</a>";}


// 	addLinks(document.getElementById("sm-subnav"));
// };))
document.addEventListener('DOMContentLoaded',function () {

	function addLinks(parent){
	 	parent.innerHTML += "<a href='project1.html'>Touch</a>";
	parent.innerHTML += "<a href='project2.html'>SHOE • S</a>";
	parent.innerHTML += "<a href='project3.html'>Rollin'</a>";
	parent.innerHTML += "<a href='project4.html'>Ceramic</a>";
	parent.innerHTML += "<a href='project5.html'>Graphics</a>";
	parent.innerHTML += "<a href='project6.html'>Coding</a>";

	}

	addLinks(document.getElementById("sm-subnav"));

	// addLinks(sidenav);

	// topnav.innerHTML += "<a href = 'home.html'>Home</a>";
	// topnav.innerHTML += "<a href = 'home.html'>About</a>";
	// topnav.innerHTML += "<a href = 'home.html'>Project</a>";
	// topnav.innerHTML += "<a href = 'home.html'>Contact</a>";

	// sidenav.innerHTML += "<a href = 'home.html'>Home</a>";
	// sidenav.innerHTML += "<a href = 'home.html'>About</a>";
	// sidenav.innerHTML += "<a href = 'home.html'>Project</a>";
	// sidenav.innerHTML += "<a href = 'home.html'>Contact</a>";
});
	

	

	// addLinks(sidenav);


// function expandMenu(){
//   // $(".sm-subnav").addClass("active");
//   var menu=document.getElementById("sm-subnav").style.height
//       if (menu=="40%"){
// 	document.getElementById("sm-subnav").style.height="0"

//       } else{
// 	document.getElementById("sm-subnav").style.height="40%"

//       }
  

//   // $(".collapsible").collapsible({accordion: false});
// }

// function openNav(){
//   // $(".sm-subnav").addClass("active");
//  document.getElementById("covermenu").style.height ="100%";
  
// document.getElementById("closeIcon").style.visibility= 'visible';
// }

// function closeNav(){
// 	document.getElementById("covermenu").style.height ="0%";
// 	document.getElementById("closeIcon").style.visibility= 'hidden';

//   // $(".collapsible").collapsible({accordion: false});
// }


function openHNav(){
	if (istoggle){
document.getElementById("hamburger").classList.remove("is-opened");
document.getElementById("covermenu").style.height ="0%";
istoggle=false;
	}
	else {
		document.getElementById("hamburger").classList.add("is-opened");
		document.getElementById("covermenu").style.height ="100%";
		istoggle = true;
	}};

// classVal = classVal.concat(" someClassName");


// function collapseAll(){
//   $(".collapsible-header").removeClass(function(){
//     return "active";
//   });
//   $(".collapsible").collapsible({accordion: true});
//   $(".collapsible").collapsible({accordion: false});
// }