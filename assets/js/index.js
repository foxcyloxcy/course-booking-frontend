let navItemsIndex = document.querySelector("#navSessionIndex")
let navItemsIndex2 = document.querySelector("#navSessionIndex2")


let userToken = localStorage.getItem("token")

if(!userToken){
	navItemsIndex.innerHTML =
	`
	<li class="nav-item">
	<a href="./pages/login.html" class="nav-link">Log In</a>
	</li>
	`
}else{
	navItemsIndex2.innerHTML =
	`
	<li class="nav-item">
	<a href="./pages/profile.html" class="nav-link">Profile</a>
	</li>

	`
	navItemsIndex.innerHTML =
	`
	<li class="nav-item">
	<a href="./pages/logout.html" class="nav-link">Log Out</a>
	</li>

	`
}