"use client";

import { Mail, Phone } from "lucide-react"; // Added Phone icon
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { useState, useRef } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

type FormState = {
  name: string;
  email: string;
  phone: string; // Added phone
  customization: string;
  message: string;
  file?: File | null;
  fileBase64?: string | null;
};

type FetchError = {
  message: string;
};

const Contact = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "", // Initialize phone
    customization: "",
    message: "",
    file: null,
    fileBase64: null,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    msg: string;
  }>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await fileToBase64(file);

      setForm((prev) => ({
        ...prev,
        file,
        fileBase64: base64,
      }));
    }
  };

  const removeFile = () => {
    setForm((prev) => ({
      ...prev,
      file: null,
      fileBase64: null,
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone, // Included in API call
          customization: form.customization,
          message: form.message,
          referenceImage: form.fileBase64
            ? {
                base64: form.fileBase64,
                filename: form.file!.name,
                mimeType: form.file!.type,
              }
            : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", msg: data.error || "Something went wrong" });
        toast.error(data.error || "Something went wrong");
        throw new Error(data.error);
      }

      setStatus({ type: "success", msg: "Message sent successfully!" });
      toast.success("Message sent successfully!");

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        customization: "",
        message: "",
        file: null,
        fileBase64: null,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      const error = err as FetchError;
      toast.error(error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh] flex flex-col md:flex-row gap-12 animate-fade-in">
      <Toaster />
      <div className="flex-1">
        <h1 className="text-4xl font-vogue text-stone-900 mb-6">
          Get in Touch
        </h1>
        <p className="text-stone-500 font-light mb-8 max-w-md">
          {`Questions about an order, collaboration inquiries, or just want to say hello? We're here.`}
        </p>

        <div className="space-y-4 mb-12">
          <Link
            href="mailto:junhaestudio@gmail.com"
            className="flex items-center gap-3 text-stone-800 hover:text-stone-500 transition-colors"
          >
            <Mail size={20} />
            <span>junhaestudio@gmail.com</span>
          </Link>

          {/* Added Phone display link */}
          <Link
            href="tel:+1234567890"
            className="flex items-center gap-3 text-stone-800 hover:text-stone-500 transition-colors"
          >
            <Phone size={20} />
            <span>+1 (234) 567-890</span>
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 text-stone-800 hover:text-stone-500 transition-colors"
          >
            <BsInstagram size={20} />
            <span>@junhaestudio</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 bg-white p-8 border border-stone-100 shadow-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent"
                placeholder="Jane Doe"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent"
              placeholder="jane@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
              Design Customization
            </label>
            <input
              type="text"
              value={form.customization}
              onChange={(e) =>
                setForm({ ...form, customization: e.target.value })
              }
              className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent"
              placeholder="Describe your custom design idea"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
              Message
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent resize-none"
              placeholder="How can we help?"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
              Upload Image (Optional)
            </label>

            <div
              className="relative flex flex-col items-center justify-center border-2 border-dashed border-stone-300 rounded-2xl p-6 cursor-pointer hover:border-stone-600 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {!form.file ? (
                <>
                  <p className="text-sm text-stone-500 text-center">
                    Drag & drop or click to upload a reference image
                  </p>
                  <p className="text-xs text-stone-400 mt-2">
                    JPG, PNG, WEBP (max 5MB)
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <Image
                    src={URL.createObjectURL(form.file)}
                    alt="Preview"
                    width={112}
                    height={112}
                    className="w-28 h-28 object-cover rounded-xl mb-3"
                  />
                  <p className="text-sm text-stone-700 font-medium text-center">
                    {form.file.name}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="mt-3 text-xs text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {status && (
            <p
              className={
                status.type === "success" ? "text-green-600" : "text-red-600"
              }
            >
              {status.msg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-stone-900 text-white px-12 py-4 text-sm font-medium tracking-widest uppercase hover:bg-stone-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
