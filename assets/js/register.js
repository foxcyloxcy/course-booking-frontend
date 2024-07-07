let registerForm = document.querySelector("#registerUser")
import baseURL from "../baseURL/baseURL.js";

registerForm.addEventListener("submit", (e) => {
	e.preventDefault()

	let firstName = document.querySelector("#firstName").value
	let lastName = document.querySelector("#lastName").value
	let mobileNo = document.querySelector("#mobileNumber").value
	let email = document.querySelector("#userEmail").value
	let password1 = document.querySelector("#password1").value
	let password2 = document.querySelector("#password2").value

//validate to enable submit button when all fields are populated and both passwords match
	if((password1 !== '' && password2 !== '') && (password1 === password2) && (mobileNo.length === 11)){

		//check if email exists
		fetch(`${baseURL}api/users/email-exists`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === false){
				fetch(`${baseURL}api/users`,{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password1,
						mobileNo: mobileNo
					})
				})
				.then(res => res.json())
				.then(data => {

					if(data === true){
						alert("Sucessfully registered")
						window.location.replace("./login.html")
					}else{
						alert("Registration failed")
					}

				})
			}
		})

	}else{
		alert("Something went wrong. Please re-enter your details.")
	}
})