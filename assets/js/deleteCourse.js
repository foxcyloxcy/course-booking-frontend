//instantiate a URLSearchParams object so we can access specific parts of the query string
let params = new URLSearchParams(window.location.search)

//get returns the value of the key passed as an argument, then we store it in a variable
let courseId = params.get('courseId')

// console.log(courseId)

let token = localStorage.getItem('token')

fetch(`http://localhost:3000/api/courses/${courseId}`, {
	method: "DELETE",
	headers:{
		'Authorization': `Bearer ${token}`
	}
})
.then(res => res.json())
.then(data => {
	if(data === true){
		window.location.replace('./courses.html')
	}else{
		alert("Something went wrong.")
	}
})