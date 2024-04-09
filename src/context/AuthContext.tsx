"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@prisma/client";
import axios from "axios";

interface State {
  isLoading: boolean;
  data: User | null | undefined;
  error: string | null;
}

interface AuthState extends State {
  setAuthState: Dispatch<SetStateAction<State>>;
}

const AuthContext = createContext<AuthState>({
  isLoading: false,
  data: undefined,
  error: null,
  setAuthState: () => {},
});

export const AuthProvider = ({
  children,
  jwt,
}: {
  children: ReactNode;
  jwt?: string;
}) => {
  const [authState, setAuthState] = useState<State>({
    isLoading: true,
    data: undefined,
    error: null,
  });

  const fetchInitialUser = useCallback(async () => {
    setAuthState({
      isLoading: true,
      data: null,
      error: null,
    });

    try {
      if (!jwt) {
        return setAuthState({
          isLoading: false,
          data: null,
          error: null,
        });
      }

      const response = await axios.post(
        "api/auth/me",
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setAuthState({
        isLoading: false,
        data: response.data,
        error: null,
      });
    } catch (error: any) {
      setAuthState({
        isLoading: false,
        data: null,
        error: error.response.data.error,
      });
    }
  }, [jwt]);

  useEffect(() => {
    fetchInitialUser();
  }, [fetchInitialUser]);

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
