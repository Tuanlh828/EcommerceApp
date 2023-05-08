var emailField = document.getElementById("email-field");
var emailLabel = document.getElementById("email-label");
var emailError = document.getElementById("email-error");

var passwordField = document.getElementById("password-field");
var passwordLabel = document.getElementById("password-label");
var passwordError = document.getElementById("password-error");

function validateEmail() {
   emailLabel.style.bottom = "45px";

   if (!emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
      emailError.innerHTML = "Vui lòng nhập email của bạn!"
      emailField.style.borderBottomColor = "red";
      emailError.style.top = "120%";
      return false;
   }

   emailError.innerHTML = "";
   emailField.style.borderBottomColor = "green";
   emailError.style.top = "100%"
   return true;
}

function validatePassword() {
   passwordLabel.style.bottom = "45px"

   if (passwordField.value.length < 6) {
      passwordError.innerHTML = "Mật khẩu phải trên 5 ký tự!"
      passwordField.style.borderBottomColor = "red"
      passwordError.style.top = "120%";
      return false;
   }

   passwordError.innerHTML = "";
   passwordField.style.borderBottomColor = "green";
   passwordError.style.top = "100%"
}