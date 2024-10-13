export const emailValidation =(email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regex.test(email)
}


export const getInitials = (name) => {
    const nameArray = name.split(' ');
    const initials = nameArray.map(part => part[0].toUpperCase()).join('');
    return initials;
  };
  