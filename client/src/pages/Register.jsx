import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../layouts/Navbar";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      console.log("New User:", data);
      
      //Clearing the form 
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
  <div>
    <NavBar />
    <main className="register">
      <h2>Create an account</h2>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        </div>
        <div> 
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        </div>
        <div>
        <label className="InputFont">Email Address:</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div> 
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        </div> 
        <div> 
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div> 
        <div> 
        <button className="registerBtn" type="submit">
          REGISTER
        </button>
        </div> 
        <p>
          Have an account? <Link to="/">Sign in</Link>
        </p>
      </form>
    </main>
  </div>
  );
};

export default Register;
