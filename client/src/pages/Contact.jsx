import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import "../styles/contact.css";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setError("");
        setSuccess("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, subject, message } = formData;

        if (!name || !email || !subject || !message) {
            setError("Please fill in all fields.");
            setSuccess("");
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setError("Please enter a valid email address.");
            setSuccess("");
            return;
        }

        setSuccess(
            "Your message has been submitted successfully!"
        );

        setError("");

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    return (
        <MainLayout>
            {/* Contact Hero */}
            <section className="contact-hero">
                <div className="container text-center">
                    <span className="contact-badge">
                        📩 Contact AgriPredict AI
                    </span>

                    <h1 className="contact-hero-title">
                        Get In Touch With Us
                    </h1>

                    <p className="contact-hero-text">
                        Have a question, suggestion or feedback?
                        We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="container">
                    <div className="row g-4">

                        {/* Contact Information */}
                        <div className="col-12 col-lg-5">
                            <div className="contact-info-card">
                                <span className="section-label">
                                    CONTACT INFORMATION
                                </span>

                                <h2>
                                    Let's Connect
                                </h2>

                                <p>
                                    If you have questions about
                                    AgriPredict AI, suggestions for
                                    improvement or general feedback,
                                    feel free to reach out.
                                </p>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">
                                        📍
                                    </div>

                                    <div>
                                        <h3>Location</h3>
                                        <p>India</p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">
                                        📧
                                    </div>

                                    <div>
                                        <h3>Email</h3>
                                        <p>
                                            support@agripredict.ai
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">
                                        🌱
                                    </div>

                                    <div>
                                        <h3>Our Purpose</h3>
                                        <p>
                                            Helping farmers make
                                            smarter decisions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="col-12 col-lg-7">
                            <div className="contact-form-card">
                                <h2>
                                    Send Us a Message
                                </h2>

                                <p className="contact-form-description">
                                    Fill out the form below and
                                    submit your message.
                                </p>

                                {error && (
                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div
                                        className="alert alert-success"
                                        role="alert"
                                    >
                                        {success}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>

                                    {/* Name */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="name"
                                            className="form-label"
                                        >
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="email"
                                            className="form-label"
                                        >
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="subject"
                                            className="form-label"
                                        >
                                            Subject
                                        </label>

                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            className="form-control"
                                            placeholder="Enter subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="message"
                                            className="form-label"
                                        >
                                            Message
                                        </label>

                                        <textarea
                                            id="message"
                                            name="message"
                                            className="form-control"
                                            rows="6"
                                            placeholder="Write your message..."
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn contact-submit-btn w-100"
                                    >
                                        Send Message
                                    </button>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default Contact;