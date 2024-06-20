let params = new URLSearchParams(window.location.search)

let token = localStorage.getItem("token");


let firstName = document.querySelector("#userName")
let lastName = document.querySelector("#lastName")
let email = document.querySelector("#userEmail")
let mobileNo = document.querySelector("#contactNumber")
let editProfile = document.querySelector("#editProfileButton")

  fetch('http://localhost:3000/api/users/details', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
  console.log(data)

      firstName.placeholder = data.firstName
      lastName.placeholder = data.lastName
      email.placeholder = data.email
      mobileNo.placeholder = data.mobileNo

    document.querySelector("#editProfile").addEventListener("submit", (e) => {
        e.preventDefault()

        let unoName = firstName.value
        let surName = lastName.value
        let elecMail = email.value
        let cpNo = mobileNo.value
        let userId = data._id


        fetch('http://localhost:3000/api/users/update', {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: userId,
            firstName: unoName,
            lastName: surName,
            email: elecMail,
            mobileNo: cpNo
          })
        })
        .then(res => res.json())
        .then(data => {
          if(data === true){
            window.location.replace('./profile.html')
          }else{
            alert("Something went wrong.")
          }
        })
      })
})



