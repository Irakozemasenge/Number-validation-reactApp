import React, { useEffect, useRef, useState } from "react";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = () => {
  const [phone, setPhone] = useState("");
  const [isPhoneFieldDisabled, setIsPhoneFieldDisabled] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  useEffect(() => {
    if (phoneInputRef.current) {
      itiRef.current = intlTelInput(phoneInputRef.current, {
        initialCountry: "auto",
        nationalMode: false, // Allow full international numbers
        strictMode: true,
        showSelectedDialCode: true,
        utilsScript:
          "https://cdn.jsdelivr.net/npm/intl-tel-input@20.3.0/build/js/utils.js",
        geoIpLookup: function (callback) {
          fetch("https://ipapi.co/json")
            .then((res) => res.json())
            .then((data) => {
              callback(data.country_code);
              setIsPhoneFieldDisabled(false); // Enable the phone field
            })
            .catch(() => {
              callback("bi"); // Fallback to Burundi if fetch fails
              setIsPhoneFieldDisabled(false); // Enable the phone field
            });
        },
      });

      return () => {
        // Clean up the intl-tel-input instance and event listener when the component is unmounted
        itiRef.current.destroy();
      };
    }
  }, []);

  const handleChange = (e) => {
    const inputVal = e.target.value;
    setPhone(inputVal);

    if (itiRef.current.isValidNumber()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      toast.success("User Created successfully. Check your email!");
    } else {
      toast.error("Please enter a valid phone number.");
    }
  };

  return (
    <div className="container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="title">
        <p>Submit your Phone Number</p>
      </div>

      <form id="form" onSubmit={handleSubmit}>
        <div className="user_details">
          <div className="input_box">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              ref={phoneInputRef}
              value={phone}
              onChange={handleChange}
              disabled={isPhoneFieldDisabled} // Disable the phone field initially or when number is valid
              required
            />
          </div>
        </div>

        <div className="reg_btn">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
