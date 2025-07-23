import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
// import calendarIcon from "../assets/img/icons/calender.png";  

const AddActivityModal = ({ isOpen, onClose, onSave }) => {
  const [datetime, setDatetime] = useState("");
  const [details, setDetails] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (datetime) {
      onSave({ datetime, details });
      setDatetime("");
      setDetails("");
      onClose();
    } else {
      alert("Please select a date and time.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-5">
          <h3 className="text-xl font-semibold">Add Activity</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <IoClose size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="bg-blue-50 p-6">
          <form onSubmit={handleSave}>
            {/* Datetime */}
            <div className="mb-6 relative">
              <label
                htmlFor="datetime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select datetime to add activity
              </label>
              <input
                id="datetime"
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className="w-full border rounded px-3 py-2 pr-10 h-[45px] text-sm"
                required
              />
              {/* <img
                src={calendarIcon}
                alt="calendar"
                className="absolute right-3 top-[38px] w-4 h-4 pointer-events-none"
              /> */}
            </div>

            {/* Details */}
            <div className="mb-6">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Add optional details here
              </label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows="8"
                required
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Enter details..."
              />
            </div>

            {/* Save Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
