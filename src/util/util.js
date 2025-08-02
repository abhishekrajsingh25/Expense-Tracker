export const addThousandsSeperator = (num) => {
  if (num == null || isNaN(num)) return "";

  //convert number to string to handle decimals
  const numStr = num.toString();
  const parts = numStr.split(".");

  let integerPart = parts[0];
  let fractionalPart = parts[1];

  //regex for Indian numbering system
  //It handles the first three digits, then every two digits
  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== "") {
    const formattedOtherNumbers = otherNumbers.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ","
    );
    integerPart = formattedOtherNumbers + "," + lastThree;
  } else {
    integerPart = lastThree;
  }

  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};

const formatToOrdinalMonth = (dateStr) => {
  const dateObj = new Date(dateStr);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "short" });

  const ordinal =
    day +
    (day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th");

  return `${ordinal} ${month}`;
};

export const prepareIncomeLineChartData = (transactions) => {
  return transactions.map((tx, index) => {
    const formattedDate = new Date(tx.date).toISOString().split("T")[0];
    return {
      date: formattedDate, // yyyy-mm-dd
      income: tx.amount || 0, // total income from that source
      items: [{ name: tx.name }], // single item
      // month: formatToOrdinalMonth(tx.date), // e.g., 8th Jul
      month: `${formatToOrdinalMonth(tx.date)} #${index + 1}`, // Add sequence number
    };
  });
};

export const prepareExpenseLineChartData = (transactions) => {
  return transactions.map((tx, index) => {
    const formattedDate = new Date(tx.date).toISOString().split("T")[0];
    return {
      date: formattedDate,              // yyyy-mm-dd
      expense: tx.amount || 0,          // total expense from that item
      items: [{ name: tx.name }],       // single item
      month: `${formatToOrdinalMonth(tx.date)} #${index + 1}`, // e.g., 8th Jul #1
    };
  });
};