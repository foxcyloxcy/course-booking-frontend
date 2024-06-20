let token = localStorage.getItem("token");

let loginForm = document.querySelector("#logInUser")


	if(token !== null){
		alert("You are already logged in!\n Redirecting to courses.")
		window.location.replace("./courses.html")
		loginForm.innerHTML =
		`
		<h1> You are already logged in! </h1>
		`
	}else{

		loginForm.addEventListener("submit", (e) => {
	e.preventDefault()

	let email = document.querySelector("#userEmail").value
	let password = document.querySelector("#password").value

	// console.log(email)
	// console.log(password)

	if(email === "" || password === ""){
		alert("Please input your email and/or password.")
	}else{
		fetch('http://localhost:3000/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.access){
				//store JWT in local storage
				localStorage.setItem('token', data.access)
				//send a fetch request to decode JWT and obtain user's ID and role
				fetch('http://localhost:3000/api/users/details', {
					headers: {
						'Authorization': `Bearer ${data.access}`
					}
				})
				.then(res => res.json())
				.then(data => {
					// console.log(data)
					localStorage.setItem('id', data._id)
					localStorage.setItem('isAdmin', data.isAdmin)
					window.location.replace("./courses.html")
				})
			}else{
				//authentication failure
				alert("Login failed.")
			}
		})
	}
})
}
