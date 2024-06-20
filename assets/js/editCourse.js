let params = new URLSearchParams(window.location.search)

let courseId = params.get('courseId')
let adminUser = localStorage.getItem("isAdmin")
let token = localStorage.getItem("token");

// console.log(courseId)
if(token === null){

  alert("You cannot do that! \n Login first!")
  window.location.replace("./login.html")

}else{

  if(adminUser === "false"){

      alert("You cannot do that!")
      window.location.replace("./courses.html")

  }else{

let name = document.querySelector("#courseName")
let price = document.querySelector("#coursePrice")
let description = document.querySelector("#courseDescription")

fetch(`http://localhost:3000/api/courses/${courseId}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)

      name.placeholder = data.name
      price.placeholder = data.price
      description.placeholder = data.description
      

      document.querySelector("#editCourse").addEventListener("submit", (e) => {
        e.preventDefault()

        let courseName = name.value
        let desc = description.value
        let priceValue = price.value

        let token = localStorage.getItem('token')

        fetch('http://localhost:3000/api/courses', {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            courseId: courseId,
            name: courseName,
            description: desc,
            price: priceValue
          })
        })
        .then(res => res.json())
        .then(data => {
          if(data === true){
            window.location.replace('./courses.html')
          }else{
            alert("Something went wrong.")
          }
        })
      })
    });
  }
}
