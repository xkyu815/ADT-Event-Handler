document.addEventListener('DOMContentLoaded', function() {
    const patientContainer = document.querySelector('#patient-container')
    const patientURL = 'http://localhost:3000/patient'
    const patientForm = document.querySelector('#patient-form')
    let allPatients = []

    fetch(`${patientURL}`)
    .then( response => response.json() )  
    .then( patientData => patientData.forEach(function(patient) {
      allPatients = patientData
      patientContainer.innerHTML += `
      <div id=${patient.id}>
        <h2>${patient.firstName}</h2>
        <h2>${patient.lastName}</h2>
        <h4>Date of Birth: ${patient.dob}</h4>
        <h4>Gender: ${patient.gender}</h4>
        <h4>Admission Date: ${patient.admissionDate}</h4>
        <h4>Discharge Date: ${patient.dischargeDate}</h4>
        <h4>Current Bed: ${patient.currentBed}</h4>
        <button data-id="${patient.id}" id="discharge-${patient.id}" data-action="discharge">Discharge</button>
        <button data-id="${patient.id}" id="transfer-${patient.id}" data-action="transfer">Transfer</button>
      </div>
      <div id=edit-patient-${patient.id}>
      </div>`
    }
    
)) // end of patient fetch

    patientForm.addEventListener('submit', (e) => {
    e.preventDefault();
//    const idInput = patientForm.querySelector('#id').value
    const firstNameInput = patientForm.querySelector('#firstName').value
    const lastNameInput = patientForm.querySelector('#lastName').value
    const dobInput = patientForm.querySelector('#dob').value
    const genderInput = patientForm.querySelector('#gender').value
    const admissionDateInput = patientForm.querySelector('#admissionDate').value
    const dischargeDateInput = patientForm.querySelector('#dischargeDate').value
    const currentBedInput = patientForm.querySelector('#currentBed').value

    fetch(`${patientURL}`, {
        method: 'POST',
        body: JSON.stringify({
            id: crypto.randomUUID(),
            firstName: firstNameInput,
            lastName: lastNameInput,
            dob: dobInput,
            gender: genderInput,
            admissionDate: admissionDateInput,
            dischargeDate: dischargeDateInput,
            currentBed: currentBedInput
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( response => response.json())
    .then( patient => {
        patientContainer.innerHTML += `
        <div id=${parent.id}>
        <h2>${patient.firstName}</h2>
        <h2>${patient.lastName}</h2>
        <h4>Date of Birth: ${patient.dob}</h4>
        <h4>Gender: ${patient.gender}</h4>
        <h4>Admission Date: ${patient.admissionDate}</h4>
        <h4>Discharge Date: ${patient.dischargeDate}</h4>
        <h4>Current Bed: ${patient.currentBed}</h4>
        <button data-id= ${patient.id} id="edit-${patient.id}" data-action="edit">Discharge</button>
        
      </div>
      <div id=edit-patient-${patient.id}>
      </div>`
    })
   })  // end of eventListener for adding a patient
   
   patientContainer.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'discharge') {
        const editButton = document.querySelector(`#edit-${e.target.dataset.id}`)   // add a edit button
        //editButton.disabled = true
        const patientData = allPatients.find((patient) => {
            return patient.id == e.target.dataset.id
          })
        const editForm = patientContainer.querySelector(`#edit-patient-${e.target.dataset.id}`)
        editForm.innerHTML = `
        <form class = 'form' id='edit-patient' action='index.html' method='post'>
          <form id="patient-form">
          <input id="edit-firstName" placeholder="${patientData.firstName}">
          <input id="edit-lastName" placeholder="${patientData.lastName}">
          <input id="edit-dateOfBirth" placeholder="${patientData.dob}">
          <p><input id="edit-gender" placeholder="${patientData.gender}">
          <input id="edit-admissionDate" placeholder="${patientData.admissionDate}">
          <input id="edit-dischargeDate" placeholder="${patientData.dischargeDate}">
          <input id="edit-currentBed" placeholder="${patientData.currentBed}"></p><br>
          <input type="submit" name="transfer">
          <input type="submit" name="discharge">
      </form>`

       editForm.addEventListener("submit",(e) =>{
        e.preventDefault()
         const dischargeDateInput = document.querySelector("#edit-dischargeDate").value
     //    const editedPatient = document.querySelector(`#patient-${patientData.id}`)
          fetch(`${patientURL}/${patientData.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                'dischargeDate': dischargeDateInput
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then( response => response.json() )
          .then( parent => {
            editedParent.innerHTML = `
              <h2>${parent.dischargeDateInput}</h2>
            </div>`
            editForm.innerHTML = ""
          })
      // end of this event Listener for edit submit
       })

        


    //     e.target.parentElement.innerHTML += `
    //   <div id='edit-patient'>
    //     <form id="patient-form">
    //       <input id="edit-dischargeDate" placeholder="${patientData.dischargeDate}">
    //     </div>`
    //     const dischargeButton = document.querySelector(`#edit-${e.target.dataset.id}`)
        // const dischargeDateInput = document.querySelector("#edit-dischargeDate").value
        //   fetch(`${patientURL}/${patientData.id}`, {
        //     method: 'PATCH',
        //     body: JSON.stringify({
        //         'dischargeDate': dischargeDateInput
        //     }),
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        //   }).then( response => response.json() )
        //   .then( parent => {
        //     editedParent.innerHTML = `
            
        //       <h2>${parent.dischargeDateInput}</h2>

        //     </div>`
        //     editForm.innerHTML = ""
        //   })
       // end of this event Listener for edit submit
    } else if (e.target.dataset.action === 'transfer') {
        console.log('you pressed transfer')
      }
  }) // end of eventListener for discharging and transferring a patient
})


