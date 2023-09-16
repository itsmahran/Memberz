import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const fetchStatuses = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  failed: "failed",
};

export const fetchMemebers = createAsyncThunk(
  "members/fetchMembers",
  async () => {
    const memberCollectionRef = collection(db, "members");
    const data = await getDocs(memberCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      joinedDateTime: doc.data().joinedDateTime.seconds,
      memberId: doc.id,
    }));
    return filteredData;
  }
);

export const fetchAMember = createAsyncThunk(
  "members/fetchAMember",
  async (memberId) => {
    try {
      const paymentCollectionRef = collection(db, "payments");
      const data = await getDocs(
        query(
          paymentCollectionRef,
          where("memberId", "==", memberId),
          orderBy("dateTime", "desc")
        )
      );

      const totalPaid = data.docs.reduce((accumulator, payment) => {
        return accumulator + payment.data().amount;
      }, 0);

      const filteredPaymentsData = data.docs.map((payment) => {
        return {
          ...payment.data(),
          dateTime: payment.data().dateTime.seconds,
          paymentId: payment.id,
        };
      });
      return { payments: filteredPaymentsData, totalPaid: totalPaid };
    } catch (error) {
      console.error(error);
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState: {
    activeComponent: "list",
    viewMember: {
      member: null,
      joinedDateTime: null,
    },
    viewMemberPayments: {
      status: fetchStatuses.idle,
      payments: null,
      error: null,
    },
    listMember: {
      status: fetchStatuses.idle,
      members: [],
      error: null,
    },
  },
  reducers: {
    changeActiveComponent(state, action) {
      state.activeComponent = action.payload;
    },
    updateViewMember(state, action) {
      state.viewMember = { ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMemebers.pending, (state, action) => {
        state.listMember.status = fetchStatuses.loading;
      })
      .addCase(fetchMemebers.fulfilled, (state, action) => {
        state.listMember.status = "succeeded";
        state.listMember.members = action.payload;
      })
      .addCase(fetchMemebers.rejected, (state, action) => {
        state.listMember.status = "failed";
        state.listMember.error = action.error.message;
      });

    builder
      .addCase(fetchAMember.pending, (state, action) => {
        state.viewMemberPayments.status = fetchStatuses.loading;
      })
      .addCase(fetchAMember.fulfilled, (state, action) => {
        state.viewMemberPayments.status = "succeeded";
        console.log(action.payload);
        state.viewMemberPayments.payments = action.payload;
      })
      .addCase(fetchAMember.rejected, (state, action) => {
        state.viewMemberPayments.status = "failed";
        state.viewMemberPayments.error = action.error.message;
      });
  },
});

export const selectAllMembers = (state) => state.member.listMember.members;
export const getMembersError = (state) => state.member.listMember.error;
export const getMembersStatus = (state) => state.member.listMember.status;

export const selectMemberPayments = (state) =>
  state.member.viewMemberPayments.payments;
export const getMemberError = (state) => state.member.viewMemberPayments.error;
export const getMemberStatus = (state) =>
  state.member.viewMemberPayments.status;

export const { changeActiveComponent, updateViewMember } = memberSlice.actions;
export default memberSlice.reducer;
