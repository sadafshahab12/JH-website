"use client";

import { Mail, Phone, BsInstagram } from "../exports/homeExports";
import { CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";
import Script from "next/script";
import { BsFacebook, BsLinkedin, BsYoutube } from "react-icons/bs";

type FormState = {
  name: string;
  email: string;
  phone: string;
  customization: string;
  message: string;
  file?: File | null;
  fileBase64?: string | null;
};

type FetchError = {
  message: string;
};

const ContactPage = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    customization: "",
    message: "",
    file: null,
    fileBase64: null,
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
          phone: form.phone,
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

      setShowSuccess(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#B32A36", "#000000", "#ffffff"],
      });

      setStatus({ type: "success", msg: "Message sent successfully!" });
      toast.success("Message sent successfully!");

      setTimeout(() => setShowSuccess(false), 4000);

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
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Junhae Studio",
    url: "https://junhaestudio.com",
    logo: "https://junhaestudio.com/logo.png",
    image: "https://junhaestudio.com/og-image.jpg",
    description: "Premium minimalist apparel and sustainable fashion.",
    telephone: "+92-340-2195735",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Karachi, Pakistan",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      postalCode: "75500",
      addressCountry: "PK",
    },
    sameAs: [
      "https://www.instagram.com/junhaestudio",
      "https://www.facebook.com/junhaestudioco",
      "https://www.linkedin.com/company/junhaestudio",
      "https://www.youtube.com/@junhaestudio",
    ],
  };
  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="relative pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[70vh] flex flex-col lg:flex-row gap-12 lg:gap-20 animate-fade-in">
        <Toaster />

        {/* SUCCESS OVERLAY */}
        {showSuccess && (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-white/95 backdrop-blur-md p-4 transition-all duration-500">
            <div className="text-center animate-bounce-slow max-w-sm">
              <div className="relative inline-block">
                <CheckCircle2
                  size={60}
                  className="text-[#B32A36] mb-4 animate-scale-up md:w-20 md:h-20"
                />
                <div className="absolute inset-0 bg-[#B32A36]/20 rounded-full animate-ping"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-vogue tracking-tighter text-stone-900">
                Message Received
              </h2>
              <p className="text-stone-500 font-light mt-2 italic text-sm md:text-base">
                We will get back to you shortly.
              </p>
            </div>
          </div>
        )}

        {/* SIDEBAR INFO */}
        <div className="w-full lg:w-1/3 space-y-8 lg:sticky lg:top-32 h-fit">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-vogue text-stone-900 tracking-tighter leading-[0.9]">
              Let&apos;s Start <br />
              <span className="text-[#B32A36] italic">A Rebellion.</span>
            </h1>
            <p className="text-stone-500 font-light text-base md:text-lg leading-relaxed max-w-md">
              Questions about an order, custom inquiries, or just a quiet
              hello—we are always listening.
            </p>
          </div>

          <div className="space-y-5 pt-6 border-t border-stone-100">
            <Link
              href="mailto:junhaestudio@gmail.com"
              className="flex items-center gap-4 group"
            >
              <div className="p-2.5 border border-stone-100 rounded-full group-hover:bg-stone-50 transition-all">
                <Mail size={18} />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-stone-600  group-hover:text-[#B32A36]">
                junhaestudio@gmail.com
              </span>
            </Link>

            <Link
              href="tel:+923402195735"
              className="flex items-center gap-4 group"
            >
              <div className="p-2.5 border border-stone-100 rounded-full group-hover:bg-stone-50 transition-all">
                <Phone size={18} />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-stone-600 group-hover:text-[#B32A36]">
                +92 340 2195735
              </span>
            </Link>
            <div className="flex items-start gap-4 group cursor-default">
              <div className="p-2.5 border border-stone-100 rounded-full">
                <MapPin size={18} className="text-stone-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  Location
                </span>
                <span className="text-xs font-bold tracking-widest uppercase text-stone-600">
                  Karachi, Pakistan
                </span>
              </div>
            </div>

            {/* SOCIAL MEDIA GRID */}
            <div className="pt-4 grid grid-cols-2 gap-4">
              {/* Instagram */}
              <Link
                href="https://www.instagram.com/junhaestudio"
                className="flex items-center gap-3 group"
              >
                <div className="p-2 border border-stone-100 rounded-full group-hover:text-crimson group-hover:border-crimson/30 transition-all">
                  <BsInstagram size={16} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-stone-500 group-hover:text-stone-900">
                  Instagram
                </span>
              </Link>

              {/* Facebook */}
              <Link
                href="https://www.facebook.com/junhaestudioco"
                className="flex items-center gap-3 group"
              >
                <div className="p-2 border border-stone-100 rounded-full group-hover:text-[#1877F2] group-hover:border-[#1877F2]/30 transition-all">
                  <BsFacebook size={16} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-stone-500 group-hover:text-stone-900">
                  Facebook
                </span>
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/company/junhaestudio"
                className="flex items-center gap-3 group"
              >
                <div className="p-2 border border-stone-100 rounded-full group-hover:text-[#0A66C2] group-hover:border-[#0A66C2]/30 transition-all">
                  <BsLinkedin size={16} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-stone-500 group-hover:text-stone-900">
                  LinkedIn
                </span>
              </Link>

              {/* YouTube */}
              <Link
                href="https://www.youtube.com/@junhaestudio"
                className="flex items-center gap-3 group"
              >
                <div className="p-2 border border-stone-100 rounded-full group-hover:text-[#FF0000] group-hover:border-[#FF0000]/30 transition-all">
  
                  <BsYoutube size={16} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-stone-500 group-hover:text-stone-900">
                  YouTube
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* FORM CONTAINER */}
        <div className="w-full lg:flex-1 bg-white p-6 md:p-10 lg:p-12 border border-stone-100 shadow-sm rounded-xl">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-[#B32A36] transition-colors bg-transparent placeholder:text-stone-300"
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-[#B32A36] transition-colors bg-transparent placeholder:text-stone-300"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-[#B32A36] transition-colors bg-transparent placeholder:text-stone-300"
                  placeholder="jane@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                  Customization
                </label>
                <input
                  type="text"
                  value={form.customization}
                  onChange={(e) =>
                    setForm({ ...form, customization: e.target.value })
                  }
                  className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-[#B32A36] transition-colors bg-transparent placeholder:text-stone-300"
                  placeholder="Design concept"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                Message
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border-b border-stone-200 py-2 focus:outline-none focus:border-[#B32A36] transition-colors bg-transparent resize-none placeholder:text-stone-300"
                placeholder="How can we help?"
                required
              ></textarea>
            </div>

            {/* UPLOAD BOX */}
            <div className="space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                Reference Image
              </label>
              <div
                className="relative flex flex-col items-center justify-center border-2 border-dashed border-stone-200 rounded-xl p-6 md:p-10 cursor-pointer hover:border-[#B32A36] hover:bg-stone-50/50 transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                {!form.file ? (
                  <div className="text-center">
                    <p className="text-sm text-stone-500 font-light">
                      Click or drag to upload
                    </p>
                    <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest">
                      Max 5MB
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Image
                      src={URL.createObjectURL(form.file)}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-lg mb-3 shadow-md border-2 border-white"
                    />
                    <span className="text-xs text-stone-600 font-medium  max-w-37.5">
                      {form.file.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#B32A36] hover:underline"
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
                className={`text-xs font-bold uppercase tracking-widest ${status.type === "success" ? "text-green-600" : "text-[#B32A36]"}`}
              >
                {status.msg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full lg:w-auto bg-stone-900 text-white px-10 py-4 text-[11px] font-bold tracking-[0.3em] uppercase overflow-hidden transition-all active:scale-95 disabled:opacity-60"
            >
              <div className="absolute inset-0 bg-[#B32A36] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <span className="flex items-center gap-2 animate-pulse">
                    Establishing Connection...
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="transform -translate-x-1.25 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      →
                    </span>
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default ContactPage;
