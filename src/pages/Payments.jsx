import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PaymentList from "../components/payment/PaymentList";
import PaymentForm from "../components/payment/PaymentForm";
import PaymentView from "../components/payment/PaymentView";

const Members = () => {
  const activeComponent = useSelector((state) => state.payment.activeComponent);
  const subComponents = {
    list: <PaymentList />,
    form: <PaymentForm />,
    view: <PaymentView />,
  };
  return <div>{subComponents[activeComponent]}</div>;
};

export default Members;
