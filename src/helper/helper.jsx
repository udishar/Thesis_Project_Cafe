
export const isValidEmail = function (email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.\w{2,3})+$/;
  return re.test(email);
};
  
  export function isValidPass(password) {
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,20}$/;
    return regExp.test(password)
    
  }
  
  export function isValidphoneNumber(phoneNumber) {
    const regExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regExp.test(phoneNumber)
  }

  export function isValidFirstName(firstName){
    const reg = /^[A-Za-z]{1,20}$/;
    return reg.test(firstName)
  };
  
  export function isValidLastName(lastName){
    const reg = /^[A-Za-z]{1,20}$/;
    return reg.test(lastName)
  };
  
  
  