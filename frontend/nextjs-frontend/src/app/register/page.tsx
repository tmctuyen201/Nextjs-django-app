"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function register() {
    axios.post("http://127.0.0.1:8000/auth/register/", {
      username,
      email,
      password,
    });
    router.push("/verify-email");
  }
  const handleRegister = async () => {
    try {
      register();
    } catch (error) {
      console.error("Login failed: ", error.message);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };
  return (
    <div className="container">
      <h1>Register new account</h1>
      <div className="formContainer">
        <input
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="inputField"
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputField"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputField"
          onKeyDown={handleKeyDown}
        />
        <br />
        <button type="button" onClick={handleRegister} className="loginButton">
          {" "}
          Register
        </button>
        <p>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;
