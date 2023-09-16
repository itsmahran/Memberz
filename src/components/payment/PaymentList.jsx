import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { changePaymentActiveComponent } from "../../app/payment/paymentSlice";
import moment from "moment";

const PaymentList = () => {
  const [paymentList, setPaymentList] = useState("");
  const paymentCollectionRef = collection(db, "payments");
  const dispatch = useDispatch();
  useEffect(() => {
    const getPaymentList = async () => {
      try {
        // const data = await getDocs(paymentCollectionRef);
        const data = await getDocs(
          query(paymentCollectionRef, orderBy("dateTime", "desc"))
        );

        const filteredDataPromises = data.docs.map(async (paymentDoc) => {
          const docRef = doc(db, "members", paymentDoc.data().memberId);
          const docSnap = await getDoc(docRef);
          return {
            ...paymentDoc.data(),
            ...docSnap.data(),
            id: paymentDoc.id,
          };
        });

        const fiteredData = await Promise.all(filteredDataPromises);
        console.log(fiteredData);
        setPaymentList(fiteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getPaymentList();
  }, []);
  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => {
            dispatch(changePaymentActiveComponent("form"));
          }}
          className="button bg-primary text-white"
        >
          Add Payment
        </button>
      </div>
      {paymentList ? (
        <table className="w-full">
          <thead>
            <tr className="border-b-2 ">
              <th className="text-start px-6 py-3">Name</th>
              <th className="text-start px-6 py-3">Date</th>
              <th className="text-start px-6 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {paymentList.map((payment) => (
              <tr className="odd:bg-slate-100" key={payment.id}>
                <td className="px-6 py-3">{payment.name}</td>
                <td className="px-6 py-3">
                  {moment.unix(payment.dateTime.seconds).format("Do MMMM YYYY")}
                </td>
                <td className="px-6 py-3">{Number(payment.amount / 100)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No data"
      )}
    </>
  );
};

export default PaymentList;
