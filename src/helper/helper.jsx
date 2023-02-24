export function isValidEmail(email) {
 
    let regEx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.\w{2,3})+$/;
  
    if (email === "") {
      return "Enter Email";
    } else if (regEx.test(email)) {
      return "Valid Email";
    } else if (!regEx.test(email)) {
      return "Invalid email";
    }
  }
  
  export function isValidPass(password) {
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,20}$/;
    if (password === "") {
      return "Enter Password";
    } else if (regExp.test(password)) {
      return "Valid Password";
    } else if (!regExp.test(password)) {
      return "Invalid Password";
    }
  }
  
  export function isValidphoneNumber(phoneNumber) {
    const regExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (phoneNumber === "") {
      return "Enter Phone Number";
    } else if (regExp.test(phoneNumber)) {
      return "Valid phoneNumber number";
    } else if (!regExp.test(phoneNumber)) {
      return "Invalid phoneNumber number";
    }
  }
//   export function usernameValidation(username) {
//     const reg = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
//     if (username === "") {
//       return "Enter Username";
//     } else if (reg.test(username)) {
//       return "Valid Username";
//     } else if (!reg.test(username)) {
//       return "Invalid Username";
//     }
//   }
  export function isValidFirstName(firstName){
    const reg = /^[A-Za-z]{1,20}$/;
    if (firstName === "") {
      return "Enter your first name";
    } else if (!reg.test(firstName)) {
      
       return "Invalid first name! Your first name must only contain alphabets and should be less than or equal to 20 characters."
    ;
    } else if(reg.test(firstName)) {
      return "Valid First Name";
    }
  };
  
  export function isValidLastName(lastName){
    const reg = /^[A-Za-z]{1,20}$/;
    if (lastName === "") {
      return "Enter your last name";
    } else if (!reg.test(lastName)) {
      
       return "Invalid last name! Your last name must only contain alphabets and should be less than or equal to 20 characters."
      ;
    } else if (reg.test(lastName)) {
      return "Valid Last Name";
    }
  };
  
  