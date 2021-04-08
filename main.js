
// flag to check if parental consent displayed
let ifParentalConsent = false;

// Create Form's basic elements
let sectionDiv = document.getElementById("form-section");

let insideSectionDiv = document.createElement("div");
insideSectionDiv.setAttribute("class", "wrapper");

let formDiv = document.createElement("div");
formDiv.setAttribute("class", "form-inner-cont");
 
let form = document.createElement("form");
form.id = "my-form";

let formElem = document.getElementById("my-form");
let divSubmit= document.createElement("div");

let submit = document.createElement("input");
submit.id = "submit";
submit.type = "submit";

divSubmit.appendChild(submit);

form.appendChild(divSubmit);

insideSectionDiv.appendChild(formDiv);
sectionDiv.appendChild(insideSectionDiv);
formDiv.appendChild(form);
const submitBtn = document.getElementById("submit");
// call setForm function to initialize empty form
setForm();

//Build the form structure
function setForm(){
  var formTitle = document.createElement("h3");
  formTitle.innerHTML = "Your Details";
  form.insertBefore(formTitle, divSubmit);
  
  //Build the form elements from given data
  for (let i =0 ; i< arrayOfObjects.length; i++){
    let object = arrayOfObjects[i];
    if (! ("conditional" in object)){
      createFormElements(object);
    }
    else{
      var conditionalObject = object;
      var checkField = object["conditional"]["name"]
    }
  }
  // Check for conditional field if any and form field conditionaaly
  document.getElementById(checkField).onchange = function(){  
  let value = document.getElementById(checkField).value
  let b = value.split(/\D/);
  let val = new Date(b[0], --b[1], b[2]);
  
  ifParentalConsent = conditionalObject["conditional"]["show_if"](val);

  if (ifParentalConsent){
    createFormElements(conditionalObject);
  }
};   
};

// create each form field and add to form
function createFormElements(object){
  var divField = document.createElement("div");
  divField.className = "form-field";

  var fieldLabel = document.createElement("label");
  fieldLabel.innerHTML = object["human_label"];
  
  var field = document.createElement(object["tag"]);
  field.type = object["type"];
  field.name = object["name"];
  field.id = object["name"];
  field.className = "form-"+ object["tag"];
          
  if(!("conditional" in object)){
    divField.appendChild(field);
    divField.insertBefore(fieldLabel, field);
    form.insertBefore(divField, divSubmit);
  }
       
  if("conditional" in object){
    fieldLabel.id ="consent";
    divField.appendChild(fieldLabel);
    divField.insertBefore(field,fieldLabel);
    form.insertBefore(divField, divSubmit);
  }
                 
};

//On submit, return the form details then refresh the page.
submitBtn.addEventListener('click', function (event) {
  let isFormValid = validateForm();
  if(isFormValid){
    alert("Submitting form...");
    formElem = document.getElementById("my-form");
    var finalObj = new Object();
    for(let i=0; i < formElem.length - 1; i++){
      finalObj[formElem[i].name] = formElem[i].value;
    };
    alert(prapareOutObj(finalObj));
  } 
  else{
    event.preventDefault();
    alert("Invalid details");
  }
});

//Iterate over the form object to display all values as a string
var prapareOutObj = function(obj) { 
  var string = ''; 

  for(let prop in obj) { 
      if(typeof obj[prop] == 'string') { 
          string+= prop + ': ' + obj[prop]+', \n'; 
      } 
      else { 
          string+= prop + ': { \n' + print(obj[prop]) + '}'; 
      } 
  } 
  return "{ \n"+ string +"\n }"; 
} 

//validate all fields in the form
function validateForm(){
  let isValid = false;
  let fname = document.getElementById("first_name");
  let lname = document.getElementById("last_name");
  let email = document.getElementById("email");
  let pnumber = document.getElementById("phone_number");
  let jobtitle = document.getElementById("job_title");
  let dob = document.getElementById("date_of_birth");

  let isValidFname = validateInput(fname);
  let isValidLname = validateInput(lname);
  let isValidEmail = validateInput(email);
  let isValidPnum = validateInput(pnumber);
  let isValidJobTitle = validateInput(jobtitle);
  let isValidDob = validateInput(dob);

  isValid = isValidFname && isValidLname && isValidEmail && isValidPnum && isValidJobTitle && isValidDob;
  isValid = isValid && email.checkValidity() && validatePnum(pnumber) && dob.checkValidity();
  if(ifParentalConsent && dob){
    let pconsent = document.getElementById("parental_consent");
    let isValidPconsent = pconsent.checked;
    if(!isValidPconsent){
      showError(pconsent)
    }
    isValid = isValid && isValidPconsent
  }
  return isValid;
};

// validate input field
function validateInput(input){
  let isAny = true;
  if(input.value === ''){
    isAny = false;
    showError(input);
  }
  return isAny;
};

function validatePnum(input) 
{
  let isVal = true;
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  isVal = re.test(input.value);
  if(!isVal){
    showError(input);
  }
  return isVal;
}

const showError = (input) => {
  // get the form-field element
  const p = input.parentElement;
  // add the error class
  p.classList.remove('success');
  p.classList.add('error');
};

const showSuccess = (input) => {
  // get the form-field element
  const p = input.parentElement;
  // remove the error class
  p.classList.remove('error');
  // add the success class
  p.classList.add('success');
}

  