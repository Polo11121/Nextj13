"use client";

import { AuthModal } from "components/Navbar/AuthModal/AuthModal";
import { useAuthContext } from "context/AuthContext";
import { useAuth } from "hooks";
import Link from "next/link";

export const Navbar = () => {
  const { data } = useAuthContext();
  const { logout } = useAuth();

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex">
          {data === undefined ? null : data ? (
            <button
              onClick={logout}
              className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
            >
              Logout
            </button>
          ) : (
            <>
              <AuthModal isSignIn />
              <AuthModal />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
