import React, { useState } from "react";
import bg from "./assets/bg.jpg"; 

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email)) e.email = "Enter a valid email";
    }
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSuccess("");
    const payload = { ...form };
    try {
      const res = await fetch("https://vernanbackend.ezlab.in/api/contact-us/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("✅ API Response:", data);
        setSuccess("Form Submitted");
        setForm({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        setSuccess(`Error: ${res.status}`);
      }
    } catch (err) {
      setSuccess("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-6 sm:px-8 md:px-10"
      style={{
        backgroundImage: `url(${bg})`,
        fontFamily: "Poppins, system-ui, sans-serif",
      }}
    >
      {/* Background overlay */}
      <div className="inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Centered form box */}
      <div className="relative z-10 w-[60%] max-w-2xl mx-auto bg-white/95 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl p-8 sm:p-10 flex justify-center">
        <div className="w-full max-w-md">

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Reach out to EZ Labs — we’ll get back to you soon!
        </p>

        {success && (
          <div
            role="status"
            aria-live="polite"
            className={`mb-4 p-3 w-full text-center rounded text-sm font-medium ${
              success === "Form Submitted"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="w-full space-y-5">
          {/* Name */}
          <div>
            <label className="mx-[1%] block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-[97%] mx-[1%] rounded-lg border border-gray-300 p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mx-[1%] block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="w-[97%] mx-[1%] rounded-lg border border-gray-300 p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your Email id"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="mx-[1%] block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              className="w-[97%] mx-[1%] rounded-lg border border-gray-300 p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="mx-[1%] block text-sm font-medium text-gray-700 mb-2">
            Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-[97%] mx-[1%] rounded-lg border border-gray-300 p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Write your message here..."
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-[97%] mx-[1%] mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 rounded-lg shadow-md hover:opacity-90 disabled:opacity-60 transition-all duration-300"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
