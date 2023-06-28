"use client";

import { ChangeEvent, useState } from "react";
import { AuthInputs } from "components/Navbar/AuthModal/AuthInputs/AuthInputs";
import { Alert, CircularProgress } from "@mui/material";
import { useAuthContext } from "context";
import { useAuth } from "hooks";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  password: "",
};

export const AuthModal = ({ isSignIn }: { isSignIn?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [inputsValues, setInputsValues] = useState(initialState);
  const { isLoading, error } = useAuthContext();
  const { signIn, signUp } = useAuth();

  const toggleModalVisibilityHandler = () => {
    setOpen((prevState) => !prevState);
    setInputsValues(initialState);
  };

  const conditionallyRenderContent = (
    singInContent: string,
    signUpContent: string
  ) => (isSignIn ? singInContent : signUpContent);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputsValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const isButtonDisabled = isSignIn
    ? Boolean(!inputsValues.email || !inputsValues.password)
    : !Object.values(inputsValues).every(Boolean);

  const submitHandler = () =>
    isSignIn
      ? signIn(
          inputsValues.email,
          inputsValues.password,
          toggleModalVisibilityHandler
        )
      : signUp({ ...inputsValues, closeModal: toggleModalVisibilityHandler });

  return (
    <div>
      <button
        onClick={toggleModalVisibilityHandler}
        className={conditionallyRenderContent(
          "bg-blue-400 text-white border p-1 px-4 rounded mr-3",
          "border p-1 px-4 rounded"
        )}
      >
        {conditionallyRenderContent("Sign In", "Sign Up")}
      </button>
      <Modal
        open={open}
        onClose={toggleModalVisibilityHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2 h-[600px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <CircularProgress />
              </div>
            ) : (
              <>
                {error && <Alert severity="error">{error}</Alert>}
                <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                  <p className="text-sm">
                    {conditionallyRenderContent("Sign In", "Create Account")}
                  </p>
                </div>
                <div className="m-auto">
                  <div className="h2 text-2xl font-light text-center">
                    {conditionallyRenderContent(
                      "Login Into Your Account",
                      "Create Your OpenTable account"
                    )}
                    <AuthInputs
                      inputsValues={inputsValues}
                      onValueChange={inputChangeHandler}
                      isSignIn={isSignIn}
                    />
                    <button
                      onClick={submitHandler}
                      disabled={isButtonDisabled}
                      className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                    >
                      {conditionallyRenderContent("Sign In", "Sign Up")}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};
