import baseURL from "../baseURL/baseURL";
let formSubmit = document.querySelector('#createCourse')
let token = localStorage.getItem("token");
let adminUser = localStorage.getItem("isAdmin")

// console.log(formSubmit)

if(token === null){
	
	alert("You cannot do that! \n Login first!")
	 window.location.replace("./login.html")
}else{

	if(adminUser === "false"){

 		 alert("You cannot do that!")
 		 window.location.replace("./courses.html")

	}else{

	formSubmit.addEventListener("submit", (e) => {
	e.preventDefault()
	// console.log("You submitted a form!")
	let courseName = document.querySelector('#courseName').value
	let description = document.querySelector('#courseDescription').value
	let price = document.querySelector('#coursePrice').value
	let token = localStorage.getItem('token')

	// console.log(courseName, description, price)
	fetch(`${baseURL}api/courses`,{ 
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			name: courseName,
			description: description,
			price: price
		})
	})
	.then(res => {
		return res.json()
	})
	.then(data => {
		if (data === true){
			alert("Successfully added a course!")
			window.location.replace("./courses.html")
		}else {
			alert("Oops.. Something went wrong!")
		}
		// console.log(data)
			})
		})
	}
}
