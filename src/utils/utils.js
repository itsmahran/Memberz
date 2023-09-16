import moment from "moment";
import Constants from "./constants";

export const convertToCurrency = (value, isSign = false) => {
  //   const sign = isSign ? Constants.CurrencySign : "";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  //   return sign + value / 100;
  return formatter.format(value / 100);
};

export const convertUnixToDateTime = (timestamp) => {
  return moment.unix(timestamp).format("Do MMMM YYYY");
};
