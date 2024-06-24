let navItemsIndex = document.querySelector("#navSessionIndex")
let navItemsIndex2 = document.querySelector("#navSessionIndex2")
let displayFirstName = document.querySelector("#displayFirstName")
let displayWelcomeMessage = document.querySelector("#displayWelcomeMessage")


let userToken = localStorage.getItem("token")
let userFirstName = localStorage.getItem("firstName")

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


if(!userFirstName){
	displayFirstName.innerHTML = ""
	displayWelcomeMessage.innerHTML = "Welcome!"
}else{
	displayFirstName.innerHTML = "&nbsp;" + `${userFirstName}!`
	displayWelcomeMessage.innerHTML = "Hello"
}