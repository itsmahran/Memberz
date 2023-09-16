import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../config/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { setNavState } from "../../app/appSlice";
import moment from "moment";
import Constants from "../../utils/constants";
import { FaAngleLeft, FaArrowLeft, FaChevronLeft } from "react-icons/fa";
import { HiChevronLeft } from "react-icons/hi2";
import {
  fetchAMember,
  getMemberError,
  getMemberStatus,
  selectMemberPayments,
} from "../../app/members/memberSlice";
import { convertToCurrency, convertUnixToDateTime } from "../../utils/utils";

const PaymentView = () => {
  const { member, joinedDateTime } = useSelector(
    (state) => state.member.viewMember
  );
  const dispatch = useDispatch();
  const [totalPaymentToBePaid, setTotalPaymentToBePaid] = useState(0);

  const { payments, totalPaid } = useSelector(selectMemberPayments);
  const status = useSelector(getMemberStatus);
  const error = useSelector(getMemberError);

  const calculateTotalMonthsFromJoined = (joinedTimestamp) => {
    const currentUnixTimestamp = moment().unix();
    const joinedDate = moment.unix(joinedTimestamp);
    const currentDate = moment.unix(currentUnixTimestamp);
    joinedDate.startOf("month");
    const monthsDiff = currentDate.diff(joinedDate, "months") + 1;
    return monthsDiff;
  };

  useEffect(() => {
    dispatch(fetchAMember(member.memberId));

    setTotalPaymentToBePaid(
      calculateTotalMonthsFromJoined(joinedDateTime) *
        Constants.MonthlyMemberPayment * 100
    );
  }, [dispatch]);
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
          / <span className="text-gray-900">{member.name}</span>
        </h1>
      </div>
      <div className="mt-10">
        <div
          className={`p-3 px-5 text-md rounded-xl ${
            totalPaid - totalPaymentToBePaid > 0
              ? "bg-green-200 border-solid border-green-700"
              : "bg-yellow-200 border-solid border-yellow-700 text-yellow-700"
          }`}
        >
          {member.name} possesses an unpaid amount of{" "}
          <span className="font-bold">
            {convertToCurrency(Math.abs(totalPaid - totalPaymentToBePaid))}
          </span>
        </div>
        <h1 className="text-md font-bold mt-5">Payments</h1>
        <Table
          className="w-full mt-5"
          removeWrapper={true}
          isStriped={true}
          aria-label="Memebers table"
        >
          <TableHeader className="bg-gray-700">
            <TableColumn className="">Date</TableColumn>
            <TableColumn className="">Amount (Rs.)</TableColumn>
          </TableHeader>
          {status === "succeeded" ? (
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.paymentId}>
                  <TableCell>
                    {convertUnixToDateTime(payment.dateTime)}
                  </TableCell>
                  <TableCell>{convertToCurrency(payment.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          )}
        </Table>
      </div>
    </>
  );
};

export default PaymentView;
