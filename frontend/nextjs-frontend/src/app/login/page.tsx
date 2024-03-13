"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        username,
        password,
      });
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/homepage");
    } catch (error) {
      console.error("Login failed: ", error.message);
    }
  };
  return (
    <div>
      <h2>Login</h2>
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
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          {" "}
          Login
        </button>
        <p>
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;
