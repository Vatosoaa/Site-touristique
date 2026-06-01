import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ContactHero } from "./components/ContactHero"
import { motion } from "framer-motion"
import { Phone, Mail, Send, Bell, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    try {
      await api.submitMessage(name, email, message)
      setStatus("success")
      setName("")
      setEmail("")
      setMessage("")
    } catch (err: any) {
      setStatus("error")
      setErrorMsg(err.message || "Failed to send message. Please try again.")
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <ContactHero />

      {/* Contact Form Section from Image */}
      <section className="bg-black py-24 px-12 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-5xl font-serif text-orange-yellow">We'd love to hear from you</h2>
            <h3 className="text-2xl font-bold text-white">Send us a message and we'll respond as soon as possible</h3>
            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
              If you have an inquiry or would like more information about any of our tours, 
              please use the contact form below! We will get back to you within 24 hours.
            </p>

            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-4 text-white">
                <Phone className="w-5 h-5 text-orange-yellow" />
                <span className="text-lg font-medium">+1234567890</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <Mail className="w-5 h-5 text-orange-yellow" />
                <span className="text-lg font-medium">contact@domain.com</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#121212] p-10 rounded-xl shadow-2xl border border-white/5"
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              {/* Success message */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl"
                >
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span className="font-semibold text-sm">Message sent successfully! We'll get back to you shortly.</span>
                </motion.div>
              )}

              {/* Error message */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="font-semibold text-sm">{errorMsg}</span>
                </motion.div>
              )}

              <div className="space-y-1">
                <input 
                  type="text" 
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-6 py-4 rounded-lg bg-white text-slate-900 outline-none focus:ring-2 focus:ring-orange-yellow transition-all" 
                />
              </div>
              <div className="space-y-1">
                <input 
                  type="email" 
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-6 py-4 rounded-lg bg-white text-slate-900 outline-none focus:ring-2 focus:ring-orange-yellow transition-all" 
                />
              </div>
              <div className="space-y-1">
                <textarea 
                  rows={4} 
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-6 py-4 rounded-lg bg-white text-slate-900 outline-none focus:ring-2 focus:ring-orange-yellow transition-all resize-none"
                ></textarea>
              </div>

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-8 rounded-lg bg-orange-yellow hover:bg-orange-yellow/90 text-white font-black text-xl tracking-widest uppercase transition-all flex justify-center items-center gap-3"
              >
                {status === "loading" ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                ) : "SUBMIT"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[450px] relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15091.123456789012!2d47.5255!3d-18.8792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07e0000000001%3A0x0!2zMTjCsDUyJzQ1LjEiUyA0N8KwMzEnMzEuOCJF!5e0!3m2!1sen!2smg!4v1234567890" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale"
        ></iframe>
        {/* Absolute positioned card like in the screenshot if needed, but the screenshot is just the native UI */}
      </section>

      {/* Newsletter Section */}
      <section className="relative py-24 w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/contact1.jpg" 
            alt="Newsletter Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <Send className="w-12 h-12 text-white -rotate-12" />
            
            <h2 className="text-5xl font-serif text-orange-yellow italic">Stay In Touch</h2>
            <p className="text-xl font-bold">Hot Deals. Awesome Chat. Straight to Your Inbox</p>

            <form className="w-full mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full px-8 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-orange-yellow transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full px-8 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-orange-yellow transition-all"
                />
              </div>
              
              <Button className="px-12 py-8 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-lg shadow-2xl flex items-center gap-2 mx-auto">
                SUBSCRIBE
                <Bell className="w-5 h-5 fill-slate-900" />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer hideQuestionSection={true} />
    </main>
  )
}
