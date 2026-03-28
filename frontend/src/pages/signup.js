import React, { useState } from "react";
import API from "../api";

export default function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const signup = async () => {
    await API.post("/auth/signup", data);
    alert("Signup successful");
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setData({ ...data, password: e.target.value })} />
      <button onClick={signup}>Signup</button>
    </div>
  );
}