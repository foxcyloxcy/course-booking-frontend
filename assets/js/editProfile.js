let params = new URLSearchParams(window.location.search)

let token = localStorage.getItem("token");


let firstName = document.querySelector("#userName")
let lastName = document.querySelector("#lastName")
let email = document.querySelector("#userEmail")
let mobileNo = document.querySelector("#contactNumber")

let firstNameInput = document.getElementById("userName")
let lastNameInput = document.getElementById("lastName")
let emailInput = document.getElementById("userEmail")
let mobileNoInput = document.getElementById("contactNumber")


let editProfile = document.querySelector("#editProfileButton")
let cancelButton = document.querySelector("#cancelButton")
let saveButton = document.getElementById("saveButton")
let swalContainer = document.querySelector("#swalContainer")

import baseURL from "../baseURL/baseURL.js";

firstNameInput.addEventListener("input", () => {
  if(firstName.placeholder === firstName.value){
    saveButton.disabled = true
  }else{
    saveButton.disabled = false
  }
})

lastNameInput.addEventListener("input", () => {
  if(lastName.placeholder === lastName.value){
    saveButton.disabled = true
  }else{
    saveButton.disabled = false
  }
})

emailInput.addEventListener("input", () => {
  if(email.placeholder === email.value){
    saveButton.disabled = true
  }else{
    saveButton.disabled = false
  }
})

mobileNoInput.addEventListener("input", () => {
  if(mobileNo.placeholder === mobileNo.value){
    saveButton.disabled = true
  }else{
    saveButton.disabled = false
  }
})

fetch(`${baseURL}api/users/details`, {
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
      
      let unoName = ""
      let surName = ""
      let elecMail = ""
      let cpNo = ""
      let userId = data._id

      if(firstName.value){
        unoName = firstName.value
      }else{
        unoName = data.firstName
      }

      if(lastName.value){
        surName = lastName.value
      }else{
        surName = data.lastName
      }

      if(email.value){
        elecMail = email.value
      }else{
        elecMail = data.email
      }

      if(mobileNo.value){
        cpNo = mobileNo.value
      }else{
        cpNo = data.mobileNo
      }



      fetch(`${baseURL}api/users/update`, {
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
          if (data === true) {
            swalContainer.innerHTML = Swal.fire({
              title: 'Sucess',
              text: "Profile details changed successfully.",
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          } else {
            swalContainer.innerHTML = Swal.fire({
              title: 'Ooops!',
              text: "Something went wrong. Please try again.",
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        })
    })
  })

  cancelButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.replace('./profile.html')
  })



