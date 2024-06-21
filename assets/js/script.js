let navItems = document.querySelector("#navSession")
let navItems1 = document.querySelector("#navSession1")

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