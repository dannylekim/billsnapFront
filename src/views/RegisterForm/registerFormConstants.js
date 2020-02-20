const type_password = {type: "password"};

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
    name: "confirmPassword",
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