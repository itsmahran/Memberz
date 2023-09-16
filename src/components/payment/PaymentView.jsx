import React from "react";
import { useDispatch } from "react-redux";
import { changePaymentActiveComponent } from "../../app/payment/paymentSlice";

const PaymentView = () => {
  const dispatch = useDispatch();
  const handleBackButton = () => {
    dispatch(changePaymentActiveComponent("list"));
  };
  return (
    <div>
      <button className="button" onClick={handleBackButton}>
        Back
      </button>
    </div>
  );
};

export default PaymentView;
