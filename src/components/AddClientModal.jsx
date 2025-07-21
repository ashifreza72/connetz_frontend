// src/components/AddClientModal.jsx
import { useState } from "react";
import { FaUser, FaPhone, FaWhatsapp, FaEnvelope, FaTimes } from "react-icons/fa";

const AddClientModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    details: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClient = {
      ...formData,
      lastActivity: "-",
      dateAdded: new Date().toLocaleString(),
    };

    onSave(newClient);
    setFormData({ name: "", phone: "", whatsapp: "", email: "", details: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FaTimes size={16} />
        </button>

        <h2 className="text-xl font-semibold mb-6">Add New Client</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Client Name */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Client Name"
              className="w-full outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full outline-none"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          {/* WhatsApp */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaWhatsapp className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="WhatsApp"
              className="w-full outline-none"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Details */}
          <textarea
            placeholder="Details"
            className="w-full border rounded-md px-3 py-2"
            rows={3}
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
