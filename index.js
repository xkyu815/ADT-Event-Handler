document.addEventListener('DOMContentLoaded', function() {
    const patientContainer = document.querySelector('#patient-container')
    const patientURL = 'http://localhost:3000/patient'
    const patientForm = document.querySelector('#patient-form')
    let allPatients = []

    fetch(`${patientURL}`)
    .then( response => response.json() )  
    .then( patientData => patientData.forEach(function(patient) {
    const admitdate = new Date(patient.admissionDate);
    const utcDateStringAdmit = admitdate.toUTCString();
    const dischdate = new Date(patient.dischargeDate);
    const utcDateStringDischarge = dischdate.toUTCString();
      allPatients = patientData
      patientContainer.innerHTML += `
      <div id=${patient.id}>
        <h4>First Name: ${patient.firstName}</h4>
        <h4>Last Name: ${patient.lastName}</h4 >
        <h4>Date of Birth: ${patient.dob}</h4>
        <h4>Gender: ${patient.gender}</h4>
        <h4>Admission Date: ${utcDateStringAdmit}</h4>
        <h4>Discharge Date: ${utcDateStringDischarge}</h4>
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
        <h4>${parent.id}</h4>
        <h4>${patient.firstName}</h4>
        <h4>${patient.lastName}</h4>
        <h4>Date of Birth: ${patient.dob}</h4>
        <h4>Gender: ${patient.gender}</h4>
        <h4>Admission Date: ${parent.admissionDate}</h4>
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
        const patientData = allPatients.find((patient) => {
            return patient.id == e.target.dataset.id
          })
        const editForm = patientContainer.querySelector(`#edit-patient-${e.target.dataset.id}`)
        editForm.innerHTML = `
        <form class = 'form' id='edit-patient' action='index.html' method='post'>
          <form id="patient-form">
          <input id="edit-dischargeDate" placeholder="${patientData.dischargeDate}">
          <input id = "submit-discharge" type="submit" name="discharge">
          <span class="error" aria-live="polite"></span>
      </form>`
      editForm.addEventListener("submit",(e) =>{
        e.preventDefault()
    //    const errorMessage = document.getElementsByClassName("error")
        const dischargeDateInput = document.querySelector("#edit-dischargeDate").value
        const message = document.getElementById("edit-patient");
        message.innerHTML = "";
        var date1 = new Date(dischargeDateInput)
        var date2 = new Date(patientData.admissionDate)
        console.log(date1)
        if(date1.getTime() < date2.getTime()) {
        throw "Invalid discharge date!";
        // errorMessage.textContent = "Invalid discharge date!";
          } else { const editedPatient = document.querySelector(`#patient-${patientData.id}`)
          fetch(`${patientURL}/${patientData.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                'dischargeDate': dischargeDateInput
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then( response => response.json() )
          .then( patient => {
            editedPatient.innerHTML = `
              <h2>${patient.dischargeDateInput}</h2>
            </div>`
            editForm.innerHTML = ""
          })}
      // end of this event Listener for edit submit
       })
      
    } else if (e.target.dataset.action === 'transfer') {
        const editButton = document.querySelector(`#edit-${e.target.dataset.id}`)   // add a edit button
        const patientData = allPatients.find((patient) => {
            return patient.id == e.target.dataset.id
          })
        const editForm = patientContainer.querySelector(`#edit-patient-${e.target.dataset.id}`)
        editForm.innerHTML = `
        <form class = 'form' id='edit-patient' action='index.html' method='post'>
          <form id="patient-form">
          <input id="edit-currentBed" type = "number" placeholder="${patientData.currentBed}">
          <input type="submit" name="transfer">
      </form>`
      
       editForm.addEventListener("submit",(e) =>{
        e.preventDefault()
        const currentBedInput = document.querySelector("#edit-currentBed").value
        function validBed(){
          for (i=0;i<allPatients.length;i++){
            if (allPatients[i].currentBed === currentBedInput || currentBedInput < 0){
              return false
            }
          }
          return true
        }
          let x = validBed()
          if (x === false){
            throw "Invalid current bed"
          } else{
          fetch(`${patientURL}/${patientData.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                'currentBed': currentBedInput
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then( response => response.json() )
          .then( patient => {
            editedPatient.innerHTML = `
              <h2>${patient.currentBedInput}</h2>
            </div>`
            editForm.innerHTML = ""
          })}
    // end of this event Listener for edit submit
       })
      }
  }) // end of eventListener for discharging and transferring a patient
})


  


