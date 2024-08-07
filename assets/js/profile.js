let token = localStorage.getItem("token");

let profileContainer = document.querySelector('#profileContainer');
let swalContainer = document.querySelector("#swalContainer")
import baseURL from "../baseURL/baseURL.js";


if(!token || token === null){
	swalContainer.innerHTML = Swal.fire({
		title: 'Ooops!',
		text: 'You must log in first.',
		icon: 'warning',
		confirmButtonText: 'Ok'
	  }).then((result) => {
		if (result.isConfirmed) {
			window.location.replace('./login.html')
		}
	  })
}else{
	fetch(`${baseURL}api/users/details`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
	.then(res => res.json())
	.then(data => {
		// console.log(data)
		profileContainer.innerHTML = 
		`
		<div class="col-md-12">

			<section class="jumbotron my-5">
		
				<h3 class="text-center">First Name: ${data.firstName}</h3>
				<h3 class="text-center">Last Name: ${data.lastName}</h3>
				<h3 class="text-center">Email: ${data.email}</h3>
				<h3 class="text-center">Contact Number: ${data.mobileNo}</h3>
  				<div class="col-md-2 offset-md-10">
   				 <a href="./editProfile.html?${data._id}" class="button btn btn-block btn-primary"><i class="fas fa-user-edit"></i> Edit Profile</a>
 			 </div>
				<h3 class="mt-5">Class History</h3>
				<table class="table">
					<thead>
						<tr>
							<th> Course Name </th>
							<th> Enrolled On </th>
							<th> Status </th>
						</tr>
					</thead>
					<tbody id="coursesContainer"></tbody>
					</table> 
				</section>
			</div>
		`

let coursesContainer = document.querySelector("#coursesContainer");

		data.enrollments.map(course => {
			// console.log()
			fetch(`${baseURL}api/courses/${course.courseId}`)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				coursesContainer.innerHTML +=
				`
				<tr>
					<td>${data.name}</td>
					<td>${course.enrolledOn}</td>
					<td>${course.status}</td>
				</tr>
				`

			})
		})
	})
}