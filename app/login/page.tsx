/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const tokenResponse = await fetch(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const tokenData = await tokenResponse.json();
      const requestToken = tokenData.request_token;

      const validateResponse = await fetch(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            request_token: requestToken,
          }),
        }
      );
      const validateData = await validateResponse.json();

      if (!validateData.success) {
        throw new Error("Invalid username or password.");
      }

      const sessionResponse = await fetch(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ request_token: requestToken }),
        }
      );
      const sessionData = await sessionResponse.json();

      localStorage.setItem("session_id", sessionData.session_id);
      router.push("/account");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#191919] p-6 rounded-lg space-y-4 w-full max-w-md"
      >
        <h1 className="text-2xl text-center font-bold">
          Login To Access Account{" "}
        </h1>
        <h3>
          Don&apos;t have an account?{" "}
          <a
            href="https://www.themoviedb.org/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Sign Up
          </a>
        </h3>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="TMDB Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="TMDB Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
