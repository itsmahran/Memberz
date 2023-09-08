import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

const MemberForm = () => {
  const { name } = useSelector((state) => state.members);

  const [isOutstanding, setIsOutstanding] = useState(false);

  const handleIsOutstanding = () => {
    setIsOutstanding((prev) => !prev);
    console.log(isOutstanding);
  };

  return (
    <div>
      <span className="mb-6 block text-xl">Personal details</span>
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

      <span className="mt-8 mb-6 block text-xl">Payment details</span>
      <div className="flex gap-5 w-8/12 mt-4">
        <div className="sm:col-span-3 flex-1">
          <fieldset>
            <legend class="text-sm font-semibold leading-6 text-gray-900">
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
                  <label
                    htmlFor="comments"
                    className="text-gray-900"
                  >
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
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Outstanding balance
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
        </div>
      ) : (
        <div className="flex gap-5 w-4/12 mt-4">
          <div className="sm:col-span-3 flex-1">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Opening balance
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
        </div>
      )}
    </div>
  );
};

export default MemberForm;
