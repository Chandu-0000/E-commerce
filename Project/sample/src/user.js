// UserLogin.js

import React, { useState, useEffect } from 'react';
import logo from './images/ecommerce.jpg'; // Update the image source for the user logo
import { callApi, errorResponse, setSession } from './main';

const popupwindowstyle = {
  width: '300px',
  height: '300px',
  background: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  textAlign: 'center',
};

const logostyle = {
  width: '75px',
  height: '75px',
};

const space = {
  height: '10px',
};

function UserLogin() {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const loginElement = document.getElementById('user-login');
    const registrationElement = document.getElementById('user-registration');
  
    // Use optional chaining to check if the element exists before accessing its style property
    loginElement?.style?.display = showLogin ? 'block' : 'none';
    registrationElement?.style?.display = showLogin ? 'none' : 'block';
  }, [showLogin]);
  

  function validate() {
    var T1 = document.getElementById('UT1');
    var T2 = document.getElementById('UT2');

    var url = "http://localhost:4000/user/login/signin"; // Update the user login endpoint
    var data = JSON.stringify({
      emailid: T1.value,
      pwd: T2.value
    });
    callApi("POST", url, data, loginSuccess, errorResponse);
  }

  function loginSuccess(res) {
    var data = JSON.parse(res);
    if (data === 1) {
      var T1 = document.getElementById('UT1');
      setSession("sid", T1.value, (24 * 60));
      window.location.replace("/user-home"); // Update the redirection path for the user
    } else {
      alert("Invalid Credentials!");
    }
  }

  function registration() {
    var T1 = document.getElementById('UT1');
    var T2 = document.getElementById('UT2');
    T1.value = "";
    T2.value = "";
  
    var reg = document.getElementById('user-registration');
    var login = document.getElementById('user-login');
  
    // Check if the elements exist before trying to access their style properties
    if (login && reg) {
      login.style.display = "none";
      reg.style.display = "block";
    } else {
      console.error("Elements not found");
    }
  }
  

  function register(){
    var RT1 = document.getElementById('RT1');
    var RT2 = document.getElementById('RT2');
    var RT3 = document.getElementById('RT3');
    var RT4 = document.getElementById('RT4');
    var RT5 = document.getElementById('RT5');
    var RT6 = document.getElementById('RT6');
    RT1.style.border="";
    RT2.style.border="";
    RT3.style.border="";
    RT4.style.border="";
    RT5.style.border="";
    RT6.style.border="";
    if(RT1.value==="")
    {
        RT1.style.border = "1px solid red";
        RT1.focus();
        return;
    }
    if(RT2.value==="")
    {
        RT2.style.border = "1px solid red";
        RT2.focus();
        return;
    }
    if(RT3.value==="")
    {
        RT3.style.border = "1px solid red";
        RT3.focus();
        return;
    }
    if(RT4.value==="")
    {
        RT4.style.border = "1px solid red";
        RT4.focus();
        return;
    }
    if(RT5.value==="")
    {
        RT5.style.border = "1px solid red";
        RT5.focus();
        return;
    }
    if(RT6.value==="")
    {
        RT6.style.border = "1px solid red";
        RT6.focus();
        return;
    }
    if(RT5.value!==RT6.value)
    {
        alert("Password and Re-type Password must be same");
        RT5.style.border="1px solid red";
        RT5.focus();
        return;
    }

    var url = "http://localhost:4000/user-registration/signup";
    var data = JSON.stringify({
        firstname : RT1.value,
        lastname : RT2.value,
        contactno : RT3.value,
        emailid : RT4.value,
        pwd : RT5.value
    });
    callApi("POST", url,  data, registeredSuccess, errorResponse);
    //alert("Registered successfullty...");

    RT1.value="";
    RT2.value="";
    RT3.value="";
    RT4.value="";
    RT5.value="";
    RT6.value="";

    var login = document.getElementById('user-login');
    var registration = document.getElementById('user-registration');
    registration.style.display = 'none';
    login.style.display = 'block';
  }

  function registeredSuccess(res)
{
    var data = JSON.parse(res);
    alert(data);
}

  return (
    <div>
      <div id='user-login' className='popup' style={popupwindowstyle}>
        <div className='loginstyle1'>User Login</div>
        <div>
          <img src={logo} alt='' style={logostyle} />
        </div>
        <div>Username*</div>
        <div><input type='text' id='UT1' className='txtbox' /></div>
        <div style={space}></div>
        <div>Password*</div>
        <div><input type='password' id='UT2' className='txtbox' /></div>
        <div style={space}></div>
        <div><button className='btn' onClick={validate}>Sign In</button></div>
        <div style={space}></div>
        <div>New user? <label className='linklabel' onClick={registration}>Register here</label></div>
      </div>
      <div id='user-registration' className='popup'>
        <div id='user-registration-window' className='popupwindow' style={popupwindowstyle}>
        <div className='loginstyle1'>New Registration</div>
                        <div className='loginstyle2'>
                            <div>First Name*</div>
                            <div><input type='text' id='RT1' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Last Name*</div>
                            <div><input type='text' id='RT2' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Contact Number*</div>
                            <div><input type='text' id='RT3' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Email ID*</div>
                            <div><input type='text' id='RT4' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div><input type='password' id='RT5' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Re-type Password*</div>
                            <div><input type='password' id='RT6' className='txtbox' /></div>
                            <div style={space}></div>
                            <div><button className='btn' onClick={register}>Register</button></div>
                        </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
