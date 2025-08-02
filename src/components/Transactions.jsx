import { ArrowRight } from "lucide-react";
import React from "react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const Transactions = ({ transactions, onMore, type, title }) => {
  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg p-8 mt-4">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
        <button
          className="bg-gray-200 flex items-center justify-center py-1.5 px-4 gap-2 rounded cursor-pointer"
          onClick={onMore}
        >
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item.id}
            icon={item.icon}
            title={item.name}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={type}
            hideDeleteBtn={true} // Hide delete button for recent transactions
          />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
