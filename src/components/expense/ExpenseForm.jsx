import React from "react";
import { useDispatch } from "react-redux";
import { changePaymentActiveComponent } from "../../app/payment/paymentSlice";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(changePaymentActiveComponent("list"));
  };
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="mt-8 flex gap-3">
        <button
          type="submit"
          className="button bg-slate-600 text-white"
          onClick={handleSubmit}
        >
          Add Payment
        </button>
        <button
          className="button bg-slate-300 text-slate-700"
          onClick={() => {
            dispatch(changePaymentActiveComponent("list"));
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
