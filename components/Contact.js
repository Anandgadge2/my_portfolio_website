"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const contactLinks = [
  {
    href: "mailto:agadge797@gmail.com",
    label: "agadge797@gmail.com",
    icon: "✉",
  },
  { href: "https://wa.me/919356150561", label: "+91 9356150561", icon: "📱" },
  { href: "https://github.com/Anandgadge2", label: "GitHub", icon: "🐙" },
  {
    href: "https://www.linkedin.com/in/anand-gadge-9763b8228/",
    label: "LinkedIn",
    icon: "💼",
  },
  {
    href: "https://www.instagram.com/anand_g_0802/",
    label: "Instagram",
    icon: "📸",
  },
];

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-text-primary mb-4 text-center tracking-tighter uppercase"
        >
          <span className="gradient-text">Contact</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-text-muted text-center mb-10 max-w-2xl mx-auto font-mono text-xs uppercase tracking-[0.2em]"
        >
          // available_for_collaborations
        </motion.p>
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-text-secondary">
              Reach out via email, WhatsApp, or socials. I&apos;ll get back to
              you soon.
            </p>
            <div className="space-y-4">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  whileHover={{
                    x: 6,
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-surface-elevated border border-border hover:border-accent hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
                >
                  <motion.span
                    className="text-2xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {link.icon}
                  </motion.span>
                  <span className="text-text-primary font-medium">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-surface-elevated border border-border space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formState.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Subject (optional)
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formState.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                placeholder="Subject"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formState.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                placeholder="Your message..."
              />
            </div>
            {status === "success" && (
              <p className="text-green-500 text-sm">
                Message sent! I&apos;ll get back soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm">
                Something went wrong. Try emailing directly.
              </p>
            )}
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(34,197,94,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-muted disabled:opacity-50 transition-colors hover:shadow-lg hover:shadow-accent/30"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
