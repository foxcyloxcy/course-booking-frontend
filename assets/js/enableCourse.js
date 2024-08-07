//instantiate a URLSearchParams object so we can access specific parts of the query string
let params = new URLSearchParams(window.location.search)
let swalContainer = document.querySelector("#swalContainer")

//get returns the value of the key passed as an argument, then we store it in a variable
let courseId = params.get('courseId')

// console.log(courseId)

let token = localStorage.getItem('token')
import baseURL from "../baseURL/baseURL.js";

fetch(`${baseURL}api/courses/${courseId}`, {
	method: "PUT",
	 headers: {
	'Authorization': `Bearer ${token}`
	}
})
.then(res => res.json())
.then(data => {
	if(data === true){
		window.location.replace('./courses.html')
	}else{
		swalContainer.innerHTML = Swal.fire({
			title: 'Ooops!',
			text: "Something went wrong. Please try again.",
			icon: 'error',
			confirmButtonText: 'Ok'
		  })
	}
})