let registerForm = document.querySelector("#registerUser")
import baseURL from "../baseURL/baseURL.js";
let swalContainer = document.querySelector("#swalContainer")

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
						swalContainer.innerHTML = Swal.fire({
							title: 'Sucess',
							text: "Profile details changed successfully.",
							icon: 'success',
							confirmButtonText: 'Ok'
						  })
						  .then((result) => {
							if (result.isConfirmed) {
								window.location.replace("./login.html")
							}
						  })
					}else{
						swalContainer.innerHTML = Swal.fire({
							title: 'Registration failed.',
							text: 'Registration unsuccessful, please try again.',
							icon: 'error',
							confirmButtonText: 'Ok'
						  })
					}

				})
			}
		})

	}else{
		swalContainer.innerHTML = Swal.fire({
			title: 'Ooops!',
			text: 'Something went wrong. Please re-enter your details.',
			icon: 'error',
			confirmButtonText: 'Ok'
		  })
	}
})