let params = new URLSearchParams(window.location.search);
let token = localStorage.getItem("token");
let courseId = params.get('courseId');
let adminUser = localStorage.getItem("isAdmin")
import baseURL from "../baseURL/baseURL.js";
let swalContainer = document.querySelector("#swalContainer")

if(token === null){
  alert("You cannot do that! \n Login first!")
  window.location.replace("./login.html")
}else{

  if(adminUser === "false"){
  alert("You cannot do that!")
  window.location.replace("./courses.html")
}else{
  
  fetch(`${baseURL}api/courses/${courseId}`)
.then(res => res.json())
.then(data => {
  console.log(data)

  let enrolleesData;


      // console.log(enrollees)
      if(data.enrollees.length === 0){
          alert("No enrolled student on this course! \n Return to courses.")
          window.location.replace('./courses.html')
      }else{
        data.enrollees.map(enrolled => {

        fetch(`${baseURL}api/users/all`,{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          enrolleesData = data.map(users => {
          // console.log(users)
          if(enrolled.userId !== users._id){
                enrolleesData = "No enrollees."
          }else{
            enrolleesContainer.innerHTML +=
          `
            <ul>
              <li>${users.firstName} ${users.lastName}</li>
            </ul>
         `
          }
          })

        })
      })
    }
  })
}
}

