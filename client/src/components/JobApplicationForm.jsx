import React, { useState } from "react";

const JobApplicationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    resume: null,
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Замість реальної відправки даних, показуємо повідомлення про успіх
    setShowSuccessMessage(true);

    // Скидаємо форму
    setFormData({
      name: "",
      email: "",
      location: "",
      resume: null,
    });

    // Закриваємо форму після кількох секунд (опційно)
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick} // Закриття при кліку на фон
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Apply for Job</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className="border p-2"
            accept=".pdf,.doc,.docx"
          />
          <label className="text-sm text-gray-600">Upload CV</label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Submit Application
          </button>
        </form>
        {showSuccessMessage && (
          <div className="mt-4 text-green-500">
            Your application has been submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationForm;

