import React, { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Contact Us</h2>
      {submitted ? (
        <p>Thank you for contacting us! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
};

export default Contact;