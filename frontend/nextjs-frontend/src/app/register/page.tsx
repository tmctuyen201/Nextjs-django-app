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
  return (
    <div>
      <h2>Register new account</h2>
      <form>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          {" "}
          Register
        </button>
        <p>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};
export default RegisterPage;
