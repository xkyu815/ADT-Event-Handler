document.addEventListener('DOMContentLoaded', function() {
    const patientContainer = document.querySelector('#patient-container')
    const patientURL = 'http://localhost:3000/patient'

    fetch(`${patientURL}`)
    .then( response => response.json() )  
    .then( patientData => patientData.forEach(function(patient) {
      patientContainer.innerHTML += `
      <div id=${patient.id}>
        <h2>${patient.firstName}</h2>
        <h2>${patient.lastName}</h2>
        <h4>Date of Birth: ${patient.dob}</h4>
        <h4>Gender: ${patient.gender}</h4>
        <h4>Admission Date: ${patient.admissionDate}</h4>
        <h4>Discharge Date: ${patient.dischargeDate}</h4>
        <h4>Current Bed: ${patient.currentBed}</h4>
        <button data-id="${patient.id}" id="admission-${patient.id}" data-action="Admission">Admission</button>
        <button data-id="${patient.id}" id="discharge-${patient.id}" data-action="Discharge">Discharge</button>
        <button data-id="${patient.id}" id="transfer-${patient.id}" data-action="Transfer">Transfer</button>
      </div>`
    })) // end of book fetch
 })