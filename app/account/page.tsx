"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const AccountPage: React.FC = () => {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSessionId =
      typeof window !== "undefined" && localStorage.getItem("session_id");

    if (!storedSessionId) {
      router.push("/login");
    } else {
      setSessionId(storedSessionId);
      setLoading(false);
    }
  }, [router]);

  if (loading)
    return (
      <p>
        <FaSpinner className="animate" />
      </p>
    );

  return (
    <div className="container gap-5 mx-auto px-4 py-20 items-center lg:pt-32 text-white  min-h-screen">
      <h1 className="text-3xl font-bold mb-4">My Account</h1>
      <hr className="mb-4 " />
      <p>
        Welcome! <br /> Here’s your TMDB session ID: {sessionId}
      </p>
      <button
        onClick={() => {
          localStorage.removeItem("session_id");
          router.push("/login");
        }}
        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default AccountPage;
