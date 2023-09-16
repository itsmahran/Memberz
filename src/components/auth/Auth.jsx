import React, { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setIsAppLoading } from "../../app/appSlice";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const signIn = async () => {
    dispatch(setIsAppLoading(false));
    try {
      //   await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(setIsAppLoading(true));
    } catch (err) {
      console.log(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-[500px] text-center h-[50%]">
        <h1 className="text-4xl font-bold">Memberz</h1>
        <div className="p-5">
          <input
            className="input-text mb-3 "
            placeholder="Email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="input-text mb-3 "
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="button w-full bg-slate-500 text-white"
            onClick={signIn}
          >
            Sign In
          </button>
          <hr className="my-5" />
          <button
            className="button w-full bg-blue-700 text-white"
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
