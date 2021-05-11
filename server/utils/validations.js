const validateUsername = (username)=>
{
 return username !== null && username.length > 4;
}


const validatePassword = (password)=>
{
    return password !== null && password.length > 6;
}
const validateEmail = (email)=>
{
    if(email !== "")
    {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    return false;
}

export {validatePassword,validateUsername,validateEmail};