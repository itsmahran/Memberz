import { useEffect } from "react";
import {
  fetchMemebers,
  getMembersError,
  getMembersStatus,
  selectAllMembers,
  updateViewMember,
} from "../../app/members/memberSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaAddressBook } from "react-icons/fa";
import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Checkbox,
} from "@nextui-org/react";
import { setNavState } from "../../app/appSlice";

const MemberList = () => {
  const dispatch = useDispatch();
  const members = useSelector(selectAllMembers);
  const status = useSelector(getMembersStatus);
  const error = useSelector(getMembersError);

  useEffect(() => {
    dispatch(fetchMemebers());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Members</h1>
        <Button
          color="primary"
          onClick={() => {
            dispatch(setNavState({ activeMainComponent: "form" }));
          }}
        >
          Add Member
        </Button>
      </div>
      <div className="mt-5">
        <Table
          className="w-full"
          removeWrapper={true}
          isStriped={true}
          aria-label="Memebers table"
        >
          <TableHeader className="bg-gray-700">
            <TableColumn className="">
              <Checkbox></Checkbox>
            </TableColumn>
            <TableColumn className="">Name</TableColumn>
            <TableColumn className="">Email</TableColumn>
            <TableColumn className="">Balance</TableColumn>
            <TableColumn className="">Action</TableColumn>
          </TableHeader>
          {status === "succeeded" ? (
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.memberId}>
                  <TableCell>
                    <Checkbox></Checkbox>
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell
                    className={`font-bold ${
                      member.isOutstanding ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {member.isOutstanding
                      ? "(" + member.openingBalance / 100 + ")"
                      : member.openingBalance / 100}
                  </TableCell>
                  <TableCell className="">
                    <Button
                      size="sm"
                      variant="flat"
                      onClick={() => {
                        dispatch(
                          updateViewMember({
                            member: member,
                            joinedDateTime: member.joinedDateTime,
                          })
                        );
                        dispatch(setNavState({ activeMainComponent: "view" }));
                      }}
                      startContent={<FaAddressBook />}
                    >
                      View
                    </Button>
                  </TableCell>
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

export default MemberList;
