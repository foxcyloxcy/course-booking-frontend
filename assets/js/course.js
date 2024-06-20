//this returns the query string part of the URL
// console.log(window.location.search)

//instantiate a URLSearchParams object so we can acess specifics parts of the query string
let params = new URLSearchParams(window.location.search)
import baseURL from "../baseURL/baseURL";

//get returns the value of the key passed as an argument, then we store it in a variable
let token = localStorage.getItem("token");

let courseId = params.get('courseId');
let adminUser = localStorage.getItem("isAdmin")

let courseName = document.querySelector("#courseName");
let courseDesc = document.querySelector("#courseDesc");
let coursePrice = document.querySelector("#coursePrice");
let enrollContainer = document.querySelector("#enrollContainer");


if(token === null){
	alert("You need to log in first!")
	window.location.replace('./login.html')
}else{

	if(adminUser === "false"){
	fetch(`${baseURL}api/courses/${courseId}`)
	.then(res => res.json())
	.then(data => {
		console.log(data)
	courseName.innerHTML = data.name;
	courseDesc.innerHTML = data.description;
	coursePrice.innerHTML = data.price;

	if(data.enrollees.length === 0){

		 enrollContainer.innerHTML = `<button id="enrollButton" class="btn btn-primary">Enroll</button>`
		 document.querySelector('#enrollButton').
		 addEventListener("click", ()=> {

		 fetch(`${baseURL}api/users/enroll/`, {
            method: "PUT",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    courseId: courseId,
              	  }),
         	   })
                .then((res) => {
                    return res.json()
                })
                .then((data) =>{
                    console.log(data)
                if (data === true){
                    alert("Thank you for enrolling!")
                    window.location.replace("./courses.html")
                }else{
                    alert("Oops.. Something went wrong!")
                }
            })
		 })
	}else{

	fetch(`${baseURL}api/users/details`,{
		headers:{
			'Authorization': `Bearer ${token}`
		}
	})
	.then(res => res.json())
	.then(data2 =>{
		// console.log(data2)

		data.enrollees.map(enrollee => {
			// console.log(enrollee)

			if(data2._id !== enrollee.userId){

		enrollContainer.innerHTML = `<button id="enrollButton" class="btn btn-primary">Enroll</button>`

		 document.querySelector('#enrollButton').
		 addEventListener("click", ()=> {

		 fetch(`${baseURL}api/users/enroll/`, {
            method: "PUT",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    courseId: courseId,
              	  }),
         	   })
                .then((res) => {
                    return res.json()
                })
                .then((data) =>{
                    console.log(data)
                if (data === true){
                    alert("Thank you for enrolling!")
                    window.location.replace("./courses.html")
                }else{
                    alert("Oops.. Something went wrong!")
                }
            })
		 })

			}else{

			enrollContainer.innerHTML = `<button id="enrollButton" class="btn btn-primary">Enroll</button>`

			 document.querySelector('#enrollButton').
			 addEventListener("click", ()=> {

				alert("You are already enrolled")
				window.location.replace('./courses.html')

				 	})
				}

				})
			})
		}
	})
	
	}else{
		alert("You cannot enroll!")
		window.location.replace("./courses.html")
	}
}