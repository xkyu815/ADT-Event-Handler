# ADT Event Handler

The goal of this project is to create a simplified ADT (Admission, Discharge, Transfer) event
handling system using JavaScript. This system will simulate the processing of patient admission,
discharge, and transfer events in a healthcare setting. 

## Setup instructions
Use JSON to store patients information. Download and run our JSON server.

From your terminal, type npm install -g json-server and once that’s done installing, type json-server patientsInfo.json to run your JSON server.
```bash
npm install -g json-server 
json-server patientsInfo.json
```
In the broswer, type http://localhost:3000

## Instructions on how to use the system

#### Add a new patient:
Click on admission button and enter following information:
- Patient ID (unique identifier)
- First Name
- Last Name
- Date of Birth
- Gender
- Admission Date
- Discharge Date (nullable)
- Current Bed

#### Discharge a patient:
Click on discharge button and enter a discharge date

#### Transfer a patient:
Click on transfer button and enter a new current bed number
