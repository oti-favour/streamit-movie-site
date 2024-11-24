"use client";
import { useState } from "react";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";

interface FormData {
  name: string;
  address: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    email: "",
    phone: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submitted");

    try {
      setResponseMessage("");

      const emailMessage = {
        to: "favour.oti@codematic.io",
        subject: "New Form Submission",
        template: `
          <html>
            <body>
              <h1>New Submission</h1>
              <p>Name: ${formData.name}</p>
              <p>Address: ${formData.address}</p>
              <p>Email: ${formData.email}</p>
              <p>Phone: ${formData.phone}</p>
              <p>Message: ${formData.message}</p>
            </body>
          </html>`,
        fromEmail: "favour.oti@codematic.io",
        sendToUser: true,
        userSubject: "Your Form Submission",
        userEmailTemplate: `
          <html>
            <body>
              <h1>Your Submission</h1>
              <p>Hello ${formData.name},</p>
              <p>Here is a copy of your message:</p>
              <p>Name: ${formData.name}</p>
              <p>Address: ${formData.address}</p>
              <p>Email: ${formData.email}</p>
              <p>Phone: ${formData.phone}</p>
              <p>Message: ${formData.message}</p>
            </body>
          </html>`,
        userEmail: formData.email,
        cc: ["favourgraceoti@gmail.com"],
      };

      const apiKey = process.env.NEXT_PUBLIC_SENDGRID_API_KEY;

      const response = await fetch(
        `https://sendgrid-749119130796.europe-west1.run.app/api/v1/mail/send?sendGridApiKey=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailMessage),
        }
      );

      if (response.ok) {
        setResponseMessage("Form Submitted!");
        setFormData({
          name: "",
          address: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setResponseMessage("Failed to submit form");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setResponseMessage("Something went wrong!");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setResponseMessage("");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-5 lg:px-16 py-16">
      <div className="w-full lg:w-1/2 py-8 ">
        <h2 className="text-4xl font-bold text-[#DC2626] mb-6 ">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Submit"}
          </button>
        </form>
        {responseMessage && (
          <p className="mt-4 text-center text-white">{responseMessage}</p>
        )}
      </div>

      <div className="hidden lg:block lg:w-1/2 p-8">
        <Image
          src="/images/cinema.svg"
          alt="Person watching movie"
          width={500}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default ContactForm;
