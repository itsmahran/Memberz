import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changePaymentActiveComponent } from "../../app/payment/paymentSlice";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import Select from "../common/Select";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { setNavState } from "../../app/appSlice";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [memberOptions, setMemberOptions] = useState("");
  const memberDropdownAction = () => {
    const navivateTo = async () => {
      await dispatch(
        setNavState({
          currentPageId: "member",
          activeMainComponent: "form",
          redirectBackToPageId: "payment",
          redirectBackToPageComponent: "form",
        })
      );
      navigate("/members");
    };
    navivateTo();
  };

  const [memberId, setMemberId] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const getMemberValue = (value) => {
    setMemberId(value);
  };

  const handleSubmit = () => {
    const paymentCollectionRef = collection(db, "payments");
    const addPayment = async () => {
      try {
        await addDoc(paymentCollectionRef, {
          amount: amount * 100,
          dateTime: Timestamp.fromDate(new Date(date)),
          memberId: memberId,
        });
      } catch (error) {
        console.log(error);
      }
    };
    addPayment();
    dispatch(changePaymentActiveComponent("list"));
  };

  const memberCollectionRef = collection(db, "members");

  useEffect(() => {
    const getMemberList = async () => {
      try {
        const memberData = await getDocs(memberCollectionRef);
        const filteredData = memberData.docs.map((memberDoc) => {
          return {
            text: memberDoc.data().name,
            value: memberDoc.id,
          };
        });
        setMemberOptions(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getMemberList();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="mt-8 flex gap-3">
        <div className="flex gap-5 w-8/12">
          <div className="sm:col-span-3 flex-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Member
            </label>
            <div className="mt-2">
              <Select
                selectOptions={memberOptions}
                getValue={getMemberValue}
                dropdownAction={memberDropdownAction}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-5 w-8/12">
          <div className="sm:col-span-3 flex-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Date
            </label>
            <div className="mt-2">
              <Input
                type="date"
                name="description"
                id="description"
                autoComplete="given-name"
                className="input-text"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-5 w-8/12">
          <div className="sm:col-span-3 flex-1">
            <label
              htmlFor="amount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Amount
            </label>
            <div className="mt-2">
              <Input
                type="number"
                name="amount"
                pattern="[0-9]+(\\.[0-9][0-9]?)?"
                id="amount"
                autoComplete="given-name"
                className="input-text"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <Button type="submit" color="primary" onClick={handleSubmit}>
          Add Payment
        </Button>
        <Button
          color="secondary"
          className=" text-slate-700"
          onClick={() => {
            dispatch(changePaymentActiveComponent("list"));
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
