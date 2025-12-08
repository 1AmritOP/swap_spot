"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import Loader from "../components/Loader";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const handleSingIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        username: userData.username,
        password: userData.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        router.push("/");
        setUserData({
          username: "",
          password: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, During User Login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" w-full h-[calc(100vh-80px)]  flex justify-center items-center" >
          <form
            onSubmit={handleSingIn}
            className="w-full py-10 max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md space-y-5"
          >
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Login
            </h2>

            <input
              required
              type="text"
              placeholder="Enter Your Username"
              className="w-full px-4 py-2 rounded-lg border placeholder:text-gray-500 text-black border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />

            <input
              required
              type="password"
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 rounded-lg border placeholder:text-gray-500 text-black border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />

            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white font-medium rounded-lg transition-all"
            >
              Login
            </button>

            <p className="text-center text-gray-600">or</p>
            <div className=" text-center text-blue-500">
            <Link href="/register">Create New Account</Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default page;
