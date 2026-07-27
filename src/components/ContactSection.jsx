import React, { useState } from 'react';
import { Send, CheckCircle, Mail, PhoneCall, MapPin, Clock3 } from 'lucide-react';
import { sendContactMessage } from '../firebase';

const PROJECT_TYPES = [
  'New product build',
  'Platform modernization',
  'Backend or API integration',
  'Internal tool or dashboard',
  'Mobile app delivery',
  'Ongoing support and maintenance',
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
    projectType: PROJECT_TYPES[0],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await sendContactMessage(formData);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact-grid">
          <div className="reveal-on-scroll">
            <span className="overline">Contact</span>
            <h2 className="heading-2" style={{ marginBottom: '18px' }}>
              Tell us what you are building.
            </h2>
            <p className="section-lead" style={{ marginBottom: '34px' }}>
              We work best when we understand the business outcome, the constraints, and the
              timeline. Send a brief overview and we will respond with a clear next step.
            </p>

            <div style={{ display: 'grid', gap: '18px', marginBottom: '28px' }}>
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">hello@vertexhand.dev</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon contact-icon-secondary">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">+1 (800) 287-8336</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon contact-icon-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">Remote-first delivery across North America and beyond</div>
                </div>
              </div>
            </div>

            <div className="card-accent" style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
              <div className="contact-item" style={{ alignItems: 'flex-start', marginBottom: 0 }}>
                <div className="contact-icon" style={{ background: 'var(--color-secondary)', color: '#0f172a' }}>
                  <Clock3 size={18} />
                </div>
                <div>
                  <div className="contact-label">Response window</div>
                  <div className="contact-value" style={{ fontSize: '18px', lineHeight: '28px' }}>
                    We usually reply within one business day with a suggested next step.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-on-scroll delay-2">
            {submitted ? (
              <div className="card-light" style={{ padding: '40px 32px', textAlign: 'center' }}>
                <CheckCircle size={44} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
                <h3 className="heading-3" style={{ marginBottom: '10px' }}>
                  Inquiry received
                </h3>
                <p className="body-compact" style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                  Thanks for reaching out. Your message has been recorded and someone from the team
                  will follow up shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      company: '',
                      email: '',
                      message: '',
                      projectType: PROJECT_TYPES[0],
                    });
                  }}
                  className="btn-secondary"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-light contact-form-card" style={{ padding: '32px' }}>
                <div style={{ display: 'grid', gap: '18px' }}>
                  <div className="contact-name-grid">
                    <div>
                      <label className="input-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Alex Morgan"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="input-label" htmlFor="company">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Northwind Systems"
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="input-label" htmlFor="email">
                      Work email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="input-label" htmlFor="projectType">
                      Project focus
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="input"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="input-label" htmlFor="message">
                      Project details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about the problem you need solved, your timeline, and any technical requirements."
                      className="input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%' }}>
                    <Send size={15} />
                    <span>{loading ? 'Sending…' : 'Send inquiry'}</span>
                  </button>

                  <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', textAlign: 'center', margin: 0 }}>
                    We only use your information to respond to your inquiry and manage the conversation.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
