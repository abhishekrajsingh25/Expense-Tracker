import { Download, LoaderCircle, Mail } from "lucide-react";
import React, { useState } from "react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const handleEmail = async () => {
    setEmailLoading(true);
    try {
      await onEmail();
    } finally {
      setEmailLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      await onDownload();
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleEmail}
            disabled={emailLoading}
            className="flex items-center justify-center bg-gray-100 px-5 py-2 gap-2 rounded hover:bg-purple-100 hover:text-purple-900 cursor-pointer"
          >
            {emailLoading ? (
              <div className="flex items-center justify-center">
                <LoaderCircle className="w-4 h-4 animate-spin" /> Emailing...
              </div>
            ) : (
              <>
                <Mail size={15} className="text-base" /> Email
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloadLoading}
            className="flex items-center justify-center bg-gray-100 px-5 py-2 gap-2 rounded hover:bg-purple-100 hover:text-purple-900 cursor-pointer"
          >
            {downloadLoading ? (
              <div className="flex items-center justify-center">
                <LoaderCircle className="w-4 h-4 animate-spin" /> Downloading...
              </div>
            ) : (
              <>
                <Download size={15} className="text-base" /> Download
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* display the incomes */}
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
