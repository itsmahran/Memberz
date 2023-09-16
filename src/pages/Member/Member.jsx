import React, { useEffect, useState } from "react";
import MemberForm from "../../components/member/MemberForm";
import MemberList from "../../components/member/MemberList";
import MemberView from "../../components/member/MemberView";
import { useSelector } from "react-redux";

const Member = () => {
  const {activeMainComponent} = useSelector((state) => state.app.navState);
  const activeMemberComponent = {
    list: <MemberList />,
    form: <MemberForm />,
    view: <MemberView />,
  };

  return <div>{activeMemberComponent[activeMainComponent]}</div>;
};

export default Member;
