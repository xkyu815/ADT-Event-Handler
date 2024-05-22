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
        <button data-id="${patient.id}" id="admission-${patient.id}" data-action="admission">Admission</button>
        <button data-id="${patient.id}" id="discharge-${patient.id}" data-action="discharge">Discharge</button>
        <button data-id="${patient.id}" id="transfer-${patient.id}" data-action="transfer">Transfer</button>
        <button data-id="${patient.id}" id="view-${patient.id}" data-action="view">View</button>
      </div>`
    }
    
)) // end of patient fetch

    patientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const idInput = patientForm.querySelector('#id').value
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
            id: idInput,
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
        <div id=${patient.id}>
        <h2>${patient.firstName}</h2>
        <h2>${patient.lastName}</h2>
        <h4>Date of Birth: ${patient.dob}</h4>
        <h4>Gender: ${patient.gender}</h4>
        <h4>Admission Date: ${patient.admissionDate}</h4>
        <h4>Discharge Date: ${patient.dischargeDate}</h4>
        <h4>Current Bed: ${patient.currentBed}</h4>
      </div>`
    })
   }) 
   
   patientContainer.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'admission') {
        const patientData = allPatients.find((patient) => {
            return patient.id == e.target.dataset.id
          })
          console.log(patientData)
    } else if (e.target.dataset.action === 'discharge') {
      console.log('you pressed discharge')
    } else if (e.target.dataset.action === 'transfer') {
        console.log('you pressed transfer')
      }
  }) // end of eventListener for editing and deleting a patient
})
