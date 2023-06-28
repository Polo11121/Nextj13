"use client";

import { useAuthContext } from "context/AuthContext";
import axios from "axios";

export const useAuth = () => {
  const { setAuthState } = useAuthContext();

  const signIn = async (
    email: string,
    password: string,
    closeModal: () => void
  ) => {
    setAuthState({ data: null, error: null, isLoading: true });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );

      setAuthState({ data: response.data, error: null, isLoading: false });
      closeModal();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.error,
        isLoading: false,
      });
    }
  };

  const signUp = async ({
    email,
    password,
    firstName,
    lastName,
    city,
    phone,
    closeModal,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
    closeModal: () => void;
  }) => {
    setAuthState({ data: null, error: null, isLoading: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
          firstName,
          lastName,
          city,
          phone,
        }
      );

      setAuthState({ data: response.data, error: null, isLoading: false });
      closeModal();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.error,
        isLoading: false,
      });
    }
  };

  const logout = async () => {
    await axios.post("http://localhost:3000/api/auth/logout", {});

    setAuthState({ data: null, error: null, isLoading: false });
  };

  return {
    signIn,
    signUp,
    logout,
  };
};
