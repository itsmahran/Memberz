import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import moment from "moment";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { setNavState } from "../../app/appSlice";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

const MemberForm = () => {
  const [isOutstanding, setIsOutstanding] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [openingBalance, setOpeingBalance] = useState("");
  const [outstandingBalance, setIsOutstandingBalance] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const memberCollectionRef = collection(db, "members");

  const { redirectBackToPageId } = useSelector((state) => state.app.navState);
  const { redirectBackToPageComponent } = useSelector(
    (state) => state.app.navState
  );

  const handleIsOutstanding = () => {
    setIsOutstanding((prev) => !prev);
    console.log(isOutstanding);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      isOutstanding: isOutstanding,
      openingBalance: isOutstanding
        ? Number(outstandingBalance) * 100
        : Number(openingBalance) * 100,
      active: true,
      joinedDateTime: Timestamp.fromMillis(new Date(moment().unix())),
    };

    const addMember = async () => {
      try {
        await addDoc(memberCollectionRef, data);
      } catch (err) {
        console.error(err);
      }
    };
    addMember();
    dispatch(
      setNavState({
        currentPageId:
          redirectBackToPageId !== null ? redirectBackToPageId : "member",
        activeMainComponent:
          redirectBackToPageComponent !== null
            ? redirectBackToPageComponent
            : "list",
        redirectBackToPageId: null,
        redirectBackToPageComponent: null,
      })
    );

    if (redirectBackToPageId !== null) {
      navigate("/payment");
    }
    e.preventDefault();
  };

  const handleBackButton = () => {
    dispatch(setNavState({ activeMainComponent: "list" }));
  };

  return (
    <>
      <div className="flex justify-start items-center gap-3">
        <Button
          color="secondary"
          isIconOnly
          className="text-gray-600"
          onClick={handleBackButton}
        >
          <FaChevronLeft />
        </Button>
        <h1 className="text-xl font-bold text-secondary">
          <Link color="secondary" className="text-xl" href="#">
            Members
          </Link>{" "}
          / <span className="text-gray-900">Add Member</span>
        </h1>
      </div>
      <form
        className="mt-10"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <span className="mb-5 block text-md text-gray-500 font-bold">Personal details</span>
        <div className="flex gap-5 w-8/12">
          <div className="sm:col-span-3 flex-1">
            <div className="">
              <Input
                type="text"
                name="name"
                label="Name"
                id="name"
                autoComplete="given-name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="sm:col-span-3 flex-1">
            <div className="mt-2">
              <Input
                type="email"
                name="name"
                id="email"
                label="Email"
                autoComplete="given-name"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <span className="mt-8 mb-5 block text-md text-gray-500 font-bold">Payment details</span>
        <div className="flex gap-5 w-8/12 mt-4">
          <div className="sm:col-span-3 flex-1">
            <fieldset>
              <div className="space-y-6">
                <div className="relative flex gap-x-1">
                  <div className="flex h-6 items-center">
                    <Checkbox
                      id="comments"
                      name="comments"
                      type="checkbox"
                      onChange={handleIsOutstanding}
                    >
                      Does the user have an outstanding balance?
                    </Checkbox>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        {isOutstanding ? (
          <div className="flex gap-5 w-4/12 mt-4">
            <div className="sm:col-span-3 flex-1">
              <div className="mt-2">
                <Input
                  type="number"
                  pattern="[0-9]+(\\.[0-9][0-9]?)?"
                  name="name"
                  label="Outstanding balance"
                  id="outstanding-balance"
                  autoComplete="given-name"
                  className="input-text"
                  onChange={(e) => {
                    setIsOutstandingBalance(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-5 w-4/12 mt-4">
            <div className="sm:col-span-3 flex-1">
              <div className="mt-2">
                <Input
                  type="number"
                  pattern="[0-9]+(\\.[0-9][0-9]?)?"
                  name="name"
                  label="Opening balance"
                  id="opening-balance"
                  autoComplete="given-name"
                  className="input-text"
                  onChange={(e) => {
                    setOpeingBalance(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <div className="mt-8 flex gap-3">
          <Button color="primary" type="submit">
            Add Member
          </Button>
          <Button
            onClick={() => {
              dispatch(setNavState({ activeMainComponent: "list" }));
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default MemberForm;
