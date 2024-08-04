const input = document.querySelector("#phone");
// initialise plugin  to auto detect country
const iti = window.intlTelInput(input, {
  initialCountry: "auto",
  nationalMode: true,
  strictMode: true,
  showSelectedDialCode: true,
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@20.3.0/build/js/utils.js",
  geoIpLookup: function (callback) {
    fetch("https://ipapi.co/json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        callback(data.country_code);
      })
      .catch(function (data) {
        callback(data.country_code);
      });
  },
});
input.addEventListener("input", function (e) {
  const val = e.target.value;
  if (val.length === 1) {
    if (val.charAt(0) !== "+") {
      const code = iti.getSelectedCountryData().dialCode;
      e.target.value = `+${code}${val}`;
    }
    iti.setCountry("auto");
  }
  input.focus();
});
// before sumbmit form check if passwords matches and have a length in 6 and 8 chars
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }
  // if (password.length > 8) {
  //  alert("Password must be at most 8 characters");
  //   return;
  // }
  // submit form by waiting 50s and show success message
  setTimeout(function () {
    alert("User Created  successfully . let we check your email !");
  }, 5000);
  document.getElementById("form").submit();
});
