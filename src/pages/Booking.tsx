import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Calendar, MapPin, Music, Phone, Mail, ChevronDown, CheckCircle, AlertCircle } from "lucide-react";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EVENT_TYPES = [
  "Resort Performance",
  "Hotel Event",
  "Cafe Performance",
  "Corporate Event",
  "Wedding Function",
  "Private Event",
  "Public Event",
  "Other",
];

const FAQS = [
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 2–4 weeks in advance for regular events, and 1–3 months for weddings and large corporate events to ensure availability.",
  },
  {
    q: "What areas does Abhinav perform in?",
    a: "Abhinav is based in Rishikesh, Uttarakhand and performs across India. Travel and accommodation for outstation events are arranged separately.",
  },
  {
    q: "What equipment does Abhinav bring?",
    a: "Abhinav brings his own guitar and in-ear monitors. A PA system, microphone, and basic stage setup are typically required from the venue side.",
  },
  {
    q: "How long is a typical performance set?",
    a: "A standard set runs 45–90 minutes. Extended sets and multiple sets across an evening can be arranged based on your event requirements.",
  },
  {
    q: "What genres does Abhinav perform?",
    a: "Abhinav performs Bollywood, Sufi, classical, and contemporary Hindi music. Custom setlists can be discussed based on your event theme.",
  },
];

interface FormData {
  from_name: string;
  from_email: string;
  phone: string;
  event_type: string;
  event_date: string;
  location: string;
  message: string;
}

const initialForm: FormData = {
  from_name: "",
  from_email: "",
  phone: "",
  event_type: "",
  event_date: "",
  location: "",
  message: "",
};

// FAQ ITEM
const FaqItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-b border-[#1a1a1a]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-manrope text-cream text-sm md:text-base font-medium group-hover:text-white transition-colors pr-4">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="font-manrope text-muted text-sm leading-relaxed pb-5">{a}</p>
      </motion.div>
    </motion.div>
  );
};

// MAIN BOOKING PAGE
const Booking = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: false });
  const formInView = useInView(formRef, { once: false, margin: "-5%" });
  const faqInView = useInView(faqRef, { once: false, margin: "-5%" });

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.from_name.trim()) e.from_name = "Name is required";
    if (!form.from_email.trim()) e.from_email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.from_email)) e.from_email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.event_type) e.event_type = "Please select an event type";
    if (!form.event_date) e.event_date = "Event date is required";
    if (!form.location.trim()) e.location = "Location is required";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...form }, PUBLIC_KEY);
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-secondary border ${
      errors[field] ? "border-red-500" : "border-[#1a1a1a]"
    } rounded-lg px-4 py-3.5 font-manrope text-cream text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200`;

  return (
    <div className="min-h-screen bg-primary pt-24 pb-20">

      {/* Page Header */}
      <div ref={headerRef} className="text-center mb-16 px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="font-manrope text-accent text-xs uppercase tracking-[0.3em] mb-4"
        >
          Let&apos;s Create Something Unforgettable
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-cinzel text-cream text-4xl md:text-6xl font-bold tracking-wide"
        >
          Book Abhinav
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-16 h-px bg-accent mx-auto mt-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-manrope text-muted text-sm md:text-base mt-6 max-w-xl mx-auto leading-relaxed"
        >
          Fill in your event details below and Abhinav will get back to you within 24 hours.
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT — Info Cards */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -30 }}
            animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 flex flex-col gap-6"
          >
            <div>
              <h2 className="font-cinzel text-cream text-xl mb-2">Get In Touch</h2>
              <p className="font-manrope text-muted text-sm leading-relaxed">
                Whether it&apos;s an intimate cafe evening or a grand wedding celebration — let&apos;s make it memorable.
              </p>
            </div>

            {/* Info Items */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-[#1a1a1a] bg-secondary">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-manrope text-xs uppercase tracking-widest text-muted mb-1">Email</p>
                  <a href="mailto:abhinavdhiman567@gmail.com" className="font-manrope text-cream text-sm hover:text-accent transition-colors">
                    abhinavdhiman567@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-[#1a1a1a] bg-secondary">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-manrope text-xs uppercase tracking-widest text-muted mb-1">Phone</p>
                  <p className="font-manrope text-cream text-sm">Available on request</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-[#1a1a1a] bg-secondary">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-manrope text-xs uppercase tracking-widest text-muted mb-1">Based In</p>
                  <p className="font-manrope text-cream text-sm">Rishikesh, Uttarakhand</p>
                  <p className="font-manrope text-muted text-xs mt-0.5">Available across India</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-[#1a1a1a] bg-secondary">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Music className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-manrope text-xs uppercase tracking-widest text-muted mb-1">Response Time</p>
                  <p className="font-manrope text-cream text-sm">Within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-[#1a1a1a] bg-secondary">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-manrope text-xs uppercase tracking-widest text-muted mb-1">Performs At</p>
                  <p className="font-manrope text-cream text-sm leading-relaxed">Resorts · Hotels · Cafes · Weddings · Corporate · Private Events</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-secondary rounded-2xl border border-[#1a1a1a] p-6 md:p-10">
              <h2 className="font-cinzel text-cream text-xl mb-8">Booking Inquiry</h2>

              {/* Success State */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="font-cinzel text-cream text-xl mb-3">Inquiry Sent!</p>
                  <p className="font-manrope text-muted text-sm max-w-sm leading-relaxed">
                    Thank you for reaching out. Abhinav will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 font-manrope text-xs uppercase tracking-widest text-accent hover:text-accent-light transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              )}

              {/* Form */}
              {status !== "success" && (
                <div className="flex flex-col gap-5">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-manrope text-xs uppercase tracking-widest text-muted mb-2">Full Name *</label>
                      <input
                        name="from_name"
                        value={form.from_name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass("from_name")}
                      />
                      {errors.from_name && <p className="text-red-500 text-xs mt-1.5 font-manrope">{errors.from_name}</p>}
                    </div>
                    <div>
                      <label className="block font-manrope text-xs uppercase tracking-widest text-muted mb-2">Email Address *</label>
                      <input
                        name="from_email"
                        value={form.from_email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClass("from_email")}
                      />
                      {errors.from_email && <p className="text-red-500 text-xs mt-1.5 font-manrope">{errors.from_email}</p>}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-manrope text-xs uppercase tracking-widest text-muted mb-2">Phone Number *</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className={inputClass("phone")}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-manrope">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block font-manrope text-xs uppercase tracking-widest text-muted mb-2">Event Type *</label>
                      <div className="relative">
                        <select
                          name="event_type"
                          value={form.event_type}
                          onChange={handleChange}
                          className={`${inputClass("event_type")} appearance-none cursor-pointer`}
                        >
                          <option value="" disabled>Select event type</option>
                          {EVENT_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                      </div>
                      {errors.event_type && <p className="text-red-500 text-xs mt-1.5 font-manrope">{errors.event_type}</p>}
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-manrope text-xs uppercase tracking-widest text-muted mb-2">Event Date *</label>
                      <input
                        type="date"
                        name="event_date"
                        value={form.event_date}
                        onChange={handleChange}
                        className={`${inputClass("event_date")} [color-scheme:dark]`}
                      />
                      {errors.event_date && <p className="text-red-500 text-xs mt-1.5 font-manrope">{errors.event_date}</p>}
                    </div>
                    <div>
                      <label className="block font-manrope text-xs uppercase tracking-widest text-muted mb-2">Event Location *</label>
                      <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="City, Venue"
                        className={inputClass("location")}
                      />
                      {errors.location && <p className="text-red-500 text-xs mt-1.5 font-manrope">{errors.location}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-manrope text-xs uppercase tracking-widest text-muted mb-2">Additional Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your event, expected audience size, special requirements..."
                      rows={4}
                      className={`${inputClass("message")} resize-none`}
                    />
                  </div>

                  {/* Error Banner */}
                  {status === "error" && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <p className="font-manrope text-red-400 text-sm">Something went wrong. Please try again or email directly.</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                    className="relative w-full overflow-hidden bg-accent hover:bg-accent-light text-white font-manrope text-sm font-semibold uppercase tracking-widest py-4 rounded-lg transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {status === "sending" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Booking Inquiry →"
                    )}
                  </button>

                  <p className="font-manrope text-muted text-xs text-center">
                    By submitting you agree to be contacted regarding your booking inquiry.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div ref={faqRef} className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="font-manrope text-accent text-xs uppercase tracking-[0.3em] mb-4">Common Questions</p>
            <h2 className="font-cinzel text-cream text-3xl md:text-4xl font-bold tracking-wide">FAQs</h2>
            <div className="w-16 h-px bg-accent mx-auto mt-6" />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
