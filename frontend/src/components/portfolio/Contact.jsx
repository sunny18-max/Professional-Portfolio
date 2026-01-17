import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import { personalInfo } from '../../data/mock';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_rqkh5ys';
const EMAILJS_TEMPLATE_ID = 'template_qzgttb8';
const EMAILJS_TEMPLATE_AUTO = 'template_2tzr8pi';
const EMAILJS_PUBLIC_KEY = 'M7Wb9judvJuQ2cZRn';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // initialize EmailJS on mount using hardcoded public key
    try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch (e) { console.warn('emailjs.init failed on mount:', e); }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const serviceID = EMAILJS_SERVICE_ID;
    const templateID = EMAILJS_TEMPLATE_ID;
    const templateAuto = EMAILJS_TEMPLATE_AUTO;
    const publicKey = EMAILJS_PUBLIC_KEY;

    // Mirror the template variable names used in your EmailJS templates so placeholders like {{user_name}} work
    const templateParams = {
      // emailjs conventional keys
      from_name: formData.name,
      from_email: formData.email,
      // your template keys (from screenshots): user_name, user_email, subject
      user_name: formData.name,
      user_email: formData.email,
      subject: formData.subject || `Website contact from ${formData.name}`,
      // message body
      message: formData.message,
      // compatibility aliases
      user_subject: formData.subject || `Website contact from ${formData.name}`
    };

    if (serviceID && templateID && !publicKey) {
      setStatus({ type: 'error', message: 'EmailJS is not configured in the code. Please contact the developer.' });
      setIsSubmitting(false);
      return;
    }

    // Try EmailJS first (contact + optional auto-reply)
    if (serviceID && templateID && publicKey) {
      try {
        // initialize EmailJS (init is safe to call multiple times)
        try { emailjs.init(publicKey); } catch (initErr) { console.warn('emailjs.init warning:', initErr); }

        await emailjs.send(serviceID, templateID, templateParams, publicKey);

        // Send auto-reply if template configured
        if (templateAuto) {
          try {
            // send auto-reply with multiple possible keys expected by templates
            const autoParams = {
              to_name: formData.name,
              user_name: formData.name,
              to_email: formData.email,
              user_email: formData.email,
              message: formData.message
            };
            await emailjs.send(serviceID, templateAuto, autoParams, publicKey);
          } catch (autoErr) {
            // Auto-reply failed — log but do not block success path
            console.warn('EmailJS auto-reply failed', autoErr);
          }
        }

        setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
        return;
      } catch (err) {
        console.error('EmailJS send failed:', err);
        const emsg = (err && (err.text || err.statusText || err.message)) || 'Unknown EmailJS error';
        const allowServerFallback = process.env.REACT_APP_ALLOW_SERVER_FALLBACK === 'true';

        if (!allowServerFallback) {
          setStatus({ type: 'error', message: `EmailJS send failed: ${emsg}. Server fallback is disabled. If you want automatic server fallback set REACT_APP_ALLOW_SERVER_FALLBACK=true in your frontend .env, or configure EMAILJS_* on the server to accept fallbacks.` });
          setIsSubmitting(false);
          return;
        }

        setStatus({ type: 'error', message: `EmailJS send failed: ${emsg}. Attempting server fallback (if configured).` });
        // fall through to backend fallback
      }
    }

    // Fallback to backend email endpoint (server proxies to EmailJS when configured)
    const envUrl = process.env.REACT_APP_EMAIL_SERVICE_URL;
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    // Ignore third-party preview hosts (example: emergentagent preview) unless explicitly set in REACT_APP_EMAIL_SERVICE_URL
    const emailServiceUrl = envUrl ? envUrl : (backendUrl && !/emergentagent\.com/.test(backendUrl) ? `${backendUrl.replace(/\/$/, '')}/api/email/send` : 'http://localhost:5001/api/email/send')

    try {
      const res = await fetch(emailServiceUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      let data = null;
      try { data = await res.json() } catch (e) { /* ignore parse errors */ }

      if (res.ok && data && data.success) {
        setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
      } else if (res.status === 501 && data && data.error === 'emailjs_not_configured') {
        setStatus({ type: 'error', message: 'Server fallback not configured (EmailJS not set on server). Add REACT_APP_EMAILJS_PUBLIC_KEY to the frontend and restart the dev server, or configure EMAILJS_SERVICE_ID/TEMPLATE_ID/PUBLIC_KEY on the server.' });
      } else {
        const errMsg = (data && (data.error || data.message)) || `HTTP ${res.status}`
        setStatus({ type: 'error', message: `Failed to send message via server: ${errMsg}` });
      }
    } catch (err) {
      console.error('Backend email send failed', err);
      setStatus({ type: 'error', message: `Network error. Could not reach ${emailServiceUrl}.` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: MapPin, label: 'Location', value: personalInfo.location, href: '#' }
  ];

  const socialLinks = [
    { icon: Github, href: personalInfo.socials.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: personalInfo.socials.twitter, label: 'Twitter' },
    { icon: Instagram, href: personalInfo.socials.instagram, label: 'Instagram' },
    { icon: SiLeetcode, href: personalInfo.socials.leetcode, label: 'LeetCode' }
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 text-sm tracking-widest mb-4">CONTACT</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Open to internships, full-time roles, and serious collaborations. Let's create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                    <info.icon size={20} className="text-white/60 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <p className="text-white/40 text-sm">{info.label}</p>
                    <p className="text-white/90">{info.value}</p>
                  </div>
                  <ArrowUpRight size={16} className="ml-auto text-white/20 group-hover:text-white/60 transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <p className="text-white/40 text-sm mb-4">Follow Me</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:scale-105 transition-all duration-200"
                  >
                    <social.icon size={18} className="text-white/60" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-white/40 text-sm block mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="text-white/40 text-sm block mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="text-white/40 text-sm block mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief subject (e.g. Hiring, Collaboration)"
                  className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-white/40 text-sm block mb-2">Your Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl ${
                    status.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
