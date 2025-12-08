"use client";
import React, { useState } from "react";
import Loader from "../components/Loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userData.name,
          username: userData.username,
          password: userData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      console.log(data);
      toast.success("Registration successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh-80px)]">
          <Loader />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-[calc(100vh-80px)]">
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
            <h1 className="text-3xl font-semibold text-gray-800 text-center">
              Register
            </h1>

            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 rounded-lg border placeholder:text-gray-600 text-black border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 rounded-lg border placeholder:text-gray-600 text-black border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg border placeholder:text-gray-600 text-black border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all"
              >
                Register
              </button>

                          <p className="text-center text-gray-600">or</p>
            <div className=" text-center text-blue-500">
            <Link href="/login">Login</Link>
            </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
