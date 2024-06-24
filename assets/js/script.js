let navItems = document.querySelector("#navSession")
let navItems1 = document.querySelector("#navSession1")
let yearNow = document.querySelector("#year")

if(yearNow){
  yearNow.innerHTML = new Date().getFullYear();
}


let userToken = localStorage.getItem("token")
if (navItems && navItems1) {
	if (!userToken) {
		navItems.innerHTML =
			`
		<li class="nav-item">
		<a href="./login.html" class="nav-link active">Log In</a>
		</li>
		`
	} else {
		navItems1.innerHTML =
			`
		<li class="nav-item">
		<a href="./profile.html" class="nav-link active">Profile</a>
		</li>
	
		`
		navItems.innerHTML =
			`
		<li class="nav-item">
		<a href="./logout.html" class="nav-link active">Log Out</a>
		</li>
	
		`
	}
} 

// else {

// 	window.onscroll = function () { myFunction() };

// 	// Get the navbar
// 	var navbar = document.getElementById("navbar");

// 	// Get the offset position of the navbar
// 	var sticky = navbar.offsetTop;

// 	// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// 	function myFunction() {
// 		if (window.pageYOffset > sticky) {
// 			navbar.classList.add("sticky")
// 		} else {
// 			navbar.classList.remove("sticky");
// 		}
// 	}
// }