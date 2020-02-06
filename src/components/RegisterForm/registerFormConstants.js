const type_password = {type: "password"};

export const genderSelection = [
    {value      : "default",
     display    :  "Select your gender"},
    {value      : "male",
     display    :  "Male"},
    {value      : "female",
     display    :  "Female"},
    {value      : "notSay",
     display    :  "Prefer not to say"},
];

export const registerFormInputs = [
{
    placeholder: "Enter your first name",
    name: "firstName",
    type: "text"
},
{
    placeholder: "Enter your middle name", 
    name: "middleName",
    type: "text"
},
{
    placeholder: "Enter your last name",
    name: "lastName",
    type: "text"
},
{
    placeholder: "Enter your date of birth",
    name: "birthDate",
    type: "date",
},
{ //4
    name: "gender"
},
{
    placeholder: "Enter your email",
    name: "email",
    type: "email",
},
{
    placeholder: "Enter your phone number",
    name: "phoneNumber",
    type: "tel",
},
{
    placeholder: "Enter a password",
    name: "password",
    ...type_password
},
{
    placeholder: "Verify password",
    name: "confirm_password",
    ...type_password
},
{
    placeholder: "Enter your location",
    name: "location",
    type: "text"
},
];

/**
 * Missing
 */