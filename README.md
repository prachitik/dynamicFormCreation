# DynamicFormCreation
A simple code to read array of objects and create form dynamically and conditionally.


### Introduction
The goal is to dynamically build a form from a given JSON Array of objects, each of which represents a form field. Once the form is built, a user should be able to submit the form, and return an object containing the data from the form.
Certain objects in the JSON Array will contain a conditional field, which contains a function show_if that evaluates to a boolean: if true, the form field should render, if false it should not.
For example:
The following object from the JSON array:
###### {
######   "tag": "input",
######    "name": "email",
######    "type": "email",
######    "human_label": "Email Address"
######  }
  
would turn into :
###### <label> Email Address </label>
###### <input type="email" name="email>

On form submit, this field would be represented like so:
###### {
######    "email" : "abc@gmail.com",
######    // along with any other fields in the form
###### }

Conditionality: The conditional field is only shown if the evaluative function provided for show_if returns true.
Validation: The form validation is applied to prevent form from submitting if any fields are empty or have invalid entries.

### Technologies: HTML, CSS, Javascript

The codebase contains 4 files :
1. index.html - HTML basic template to initialize the structure
2. main.js - Contains the logic and functions to create all the form fields and validate the form
3. style.css - Styling for HTML form 
4. data.js - Contains array of objects, from which fields are rendered.

### Run
1. Download a folder containing all 4 files or these 4 files separately( if so, keep these files in same path otherwise, it will not find the file).
2. Open index.html in browser.

To check the code, files can be opened in any editor like visual studio code, sublime text editor, simple text editor or even eclipse.



