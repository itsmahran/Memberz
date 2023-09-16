import {
  HiCreditCard,
  HiCurrencyDollar,
  HiHome,
  HiUser,
} from "react-icons/hi2";

const Constants = {
  NavMenu: [
    {
      label: "Home",
      link: "/",
      pageId: "home",
      icon: HiHome,
    },
    {
      label: "Members",
      link: "/member",
      pageId: "member",
      icon: HiUser,
    },
    {
      label: "Payments",
      link: "/payment",
      pageId: "payment",
      icon: HiCurrencyDollar,
    },
    {
      label: "Expenses",
      link: "/expense",
      pageId: "expense",
      icon: HiCreditCard,
    },
  ],

  MonthlyMemberPayment: 300,

  CurrencySign: 'Rs.'
};

export default Constants;
