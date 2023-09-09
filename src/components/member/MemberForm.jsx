import React, { useState } from "react";
import { changeActiveComponent } from "../../app/members/memberSlice";
import { useDispatch } from "react-redux";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const MemberForm = () => {
  const [isOutstanding, setIsOutstanding] = useState(false);

  const dispatch = useDispatch();

  const memberCollectionRef = collection(db, "members");

  const handleIsOutstanding = () => {
    setIsOutstanding((prev) => !prev);
    console.log(isOutstanding);
  };

  const handleSubmit = (e) => {
    const addMember = async () => {
      await addDoc(memberCollectionRef, {
        name: "Mahran",
        email: "mahran.996@gmail.com",
        active: false,
      });
    };
    addMember();
    dispatch(changeActiveComponent("list"));
    e.preventDefault();
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <span className="mb-5 block text-2xl">Personal details</span>
      <div className="flex gap-5 w-8/12">
        <div className="sm:col-span-3 flex-1">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="first-name"
              autoComplete="given-name"
              className="input-text"
            />
          </div>
        </div>
        <div className="sm:col-span-3 flex-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="name"
              id="email"
              autoComplete="given-name"
              className="input-text"
            />
          </div>
        </div>
      </div>

      <span className="mt-8 mb-5 block text-2xl">Payment details</span>
      <div className="flex gap-5 w-8/12 mt-4">
        <div className="sm:col-span-3 flex-1">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">
              Balance
            </legend>
            <div className="space-y-6">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    onChange={handleIsOutstanding}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="comments" className="text-gray-900">
                    Does the user have an outstanding balance?
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      {isOutstanding ? (
        <div className="flex gap-5 w-4/12 mt-4">
          <div className="sm:col-span-3 flex-1">
            <label
              htmlFor="outstanding-balance"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Outstanding balance
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="outstanding-balance"
                autoComplete="given-name"
                className="input-text"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-5 w-4/12 mt-4">
          <div className="sm:col-span-3 flex-1">
            <label
              htmlFor="opening-balance"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Opening balance
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="opening-balance"
                autoComplete="given-name"
                className="input-text"
              />
            </div>
          </div>
        </div>
      )}
      <div className="mt-8 flex gap-3">
        <button className="button bg-slate-600 text-white" type="submit">
          Add Member
        </button>
        <button
          className="button bg-slate-300 text-slate-700"
          onClick={() => {
            dispatch(changeActiveComponent("list"));
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MemberForm;
