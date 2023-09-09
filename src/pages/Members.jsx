import React, { useEffect, useState } from "react";
import MemberForm from "../components/member/MemberForm";
import MemberList from "../components/member/MemberList";
import { useSelector } from "react-redux";

const Members = () => {
  const activeComponent = useSelector((state) => state.member.activeComponent);
  return (
    <div>{activeComponent === "list" ? <MemberList /> : <MemberForm />}</div>
  );
};

export default Members;
