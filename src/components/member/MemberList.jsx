import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { changeActiveComponent } from "../../app/members/memberSlice";
import { useDispatch } from "react-redux";

const MemberList = () => {
  const [memberList, setMemberList] = useState("");
  const memberCollectionRef = collection(db, "members");

  const dispatch = useDispatch();

  useEffect(() => {
    const getMemberList = async () => {
      try {
        const data = await getDocs(memberCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMemberList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getMemberList();
  }, []);
  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => {
            dispatch(changeActiveComponent("form"));
          }}
          className="button bg-slate-600 text-white"
        >
          Add Member
        </button>
      </div>
      {memberList &&
        memberList.map((member) => <div key={member.id}>{member.name}</div>)}
    </>
  );
};

export default MemberList;
