import baseURL from "../baseURL/baseURL.js";
let formSubmit = document.querySelector('#createCourse')
let token = localStorage.getItem("token");
let adminUser = localStorage.getItem("isAdmin")

// console.log(formSubmit)

if (token === null) {

	swalContainer.innerHTML = Swal.fire({
		title: 'Ooops!',
		text: 'You cannot do that! \n You need to login first!',
		icon: 'error',
		confirmButtonText: 'Ok'
	})
	window.location.replace("./login.html")

} else {

	if (adminUser === "false") {

		swalContainer.innerHTML = Swal.fire({
			title: 'Ooops!',
			text: "You can't do that! You don't have access.",
			icon: 'error',
			confirmButtonText: 'Ok'
		})
		window.location.replace("./courses.html")

	} else {

		formSubmit.addEventListener("submit", (e) => {
			e.preventDefault()
			// console.log("You submitted a form!")
			let courseName = document.querySelector('#courseName').value
			let description = document.querySelector('#courseDescription').value
			let price = document.querySelector('#coursePrice').value
			let token = localStorage.getItem('token')

			// console.log(courseName, description, price)
			fetch(`${baseURL}api/courses`, {
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
					if (data === true) {
						swalContainer.innerHTML = Swal.fire({
							title: '',
							text: "Successfully added a course!",
							icon: 'success',
							confirmButtonText: 'Ok'
						})
						window.location.replace("./courses.html")
					} else {
						swalContainer.innerHTML = Swal.fire({
							title: 'Ooops!',
							text: "Course not added, Please try again.",
							icon: 'error',
							confirmButtonText: 'Ok'
						})
					}
					// console.log(data)
				})
		})
	}
}
