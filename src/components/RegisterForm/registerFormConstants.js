const type_password = {type: "password"};

export const registerFormInputs = [
{
    placeholder: "Enter your first name",
    name: "firstName",
    type: "text"
},
{
    placeholder: "Enter your last name",
    name: "lastName",
    type: "text"
},
{
    placeholder: "Enter your email",
    name: "email",
    type: "email",
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
}
];
