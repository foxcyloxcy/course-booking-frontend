let adminUser = localStorage.getItem("isAdmin")
let modalButton = document.querySelector("#adminButton")
let token = localStorage.getItem("token");
let cardFooter;
let courseData;
let courseData2;
let container = document.querySelector("#coursesContainer")
let container2 = document.querySelector("#coursesContainer2")




//conditional rendering
if(adminUser === "false" || !adminUser){
	modalButton.innerHTML = null
}else{
	modalButton.innerHTML = 
	`
	<div class="col-md-2 offset-md-10">
		<a href="./addCourse.html" class="button btn btn-block btn-primary"><i class="far fa-plus-square"></i> Add Course</a>
	</div>
	`
}

//Fetch the courses from our API


fetch('https://lucky-capstone-2.herokuapp.com/api/courses/active')
.then(res => res.json())
.then(data => {
	console.log(data)

	//if the number of courses fetched is less than 1, display no course available
	if(data.length === 0){
		courseData = "No courses available"
	}else{
		//iterate the courses collection display
		courseData = data.map(course => {
			console.log(course)
			if(adminUser === "false" || !adminUser){
				cardFooter = 
				`
				<a href="./course.html?courseId=${course._id}" class="btn btn-primary text-white btn-block editButton">Select Course</a>
				`
			}else{
				//check if the user is an admin, display the edit and delete button if they are
				cardFooter =
				`
				<a href="./studentsEnrolled.html?courseId=${course._id}" class="btn btn-primary text-white btn-block"><i class="far fa-eye"></i> View Enrolled Students</a>

				<a href="./editCourse.html?courseId=${course._id}" class="btn btn-primary text-white btn-block editButton"><i class="far fa-edit"></i> Edit</a>

				<a href="./deleteCourse.html?courseId=${course._id}" class="btn btn-danger text-white btn-block dangerButton"><i class="fas fa-ban"></i> Disable Course</a>
				`
			}

			return(
				`
				
				<div class="col-md-6 my-3">
					<div class="card">
						<div class="card-body">
						<h5 class="card-title">${course.name}</h5>
						<p class="card-text text-left">
						${course.description}
						</p>
						<p class="card-text text-right">
							${course.price}
						</p>
					</div>

					<div class="card-footer">
							${cardFooter}
							</div>
						</div>
					</div>
				`
			)

		}).join("")
	}

	container.innerHTML = courseData
})


if(token === null){
	container2 = ""
}else{
	fetch('https://lucky-capstone-2.herokuapp.com/api/courses/inActive')
	.then(res => res.json())
	.then(data2 =>{
	console.log(data2)


		if(data2.length === 0){
		container2 = null
		}else{
		courseData2 = data2.map(course2 =>{
			console.log(course2)
			if (adminUser === "false"){
			container2 = null
			}else{
			cardFooter =
			`

			<a href="./editCourse.html?courseId=${course2._id}" class="buttonInactive btn btn-primary text-white btn-block editButton"><i class="far fa-edit"></i> Edit</a>

			<a href="./enableCourse.html?courseId=${course2._id}" class="buttonInactive btn btn-danger text-white btn-block dangerButton"><i class="fas fa-sync-alt"></i> Enable Course</a>
			`
			}
			return(
			`

			<div class="col-md-6 my-3">
				<div class="card">
					<div id="inactive" class="card-body">
					<h5 class="card-title">${course2.name}</h5>
					<p class="card-text text-left">
					${course2.description}
					</p>
					<p class="card-text text-right">
						${course2.price}
					</p>
				</div>

				<div id="inactiveFooter"class="card-footer">
						${cardFooter}
						</div>
					</div>
				</div>
			`
		)

		}).join("")
	}
	container2.innerHTML = courseData2
})

}
