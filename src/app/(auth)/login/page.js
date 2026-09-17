"use client";

import { useState } from "react";
import { LoginForm } from "./_features/login-form";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      token={token}
      onTokenChange={setToken}
    />
  );
}
