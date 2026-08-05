import React, { useState } from 'react';
import { Send, CheckCircle, Mail, PhoneCall, MapPin, Clock3, ShieldCheck, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { sendContactMessage } from '../firebase';

const PROJECT_TYPES = [
  'New Product Build',
  'Platform Modernization',
  'Cloud & API Integration',
  'Mobile App Engineering',
  'Dedicated Engineering SLA',
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

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, projectType: type }));
  };

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
            <span className="overline">Initiate Engagement</span>
            <h2 className="heading-2" style={{ marginBottom: '18px' }}>
              Let's engineer something exceptional together.
            </h2>
            <p className="section-lead" style={{ marginBottom: '34px' }}>
              Whether you need to architect a new platform from scratch, modernize legacy workflows, or scale production reliability, our senior team is ready to execute.
            </p>

            <div style={{ display: 'grid', gap: '16px', marginBottom: '28px' }}>
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="contact-label">Direct Engineering Channel</div>
                  <div className="contact-value">hello@vertexhand.dev</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon contact-icon-secondary">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <div className="contact-label">Direct Line</div>
                  <div className="contact-value">+1 (800) 287-8336</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon contact-icon-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="contact-label">Global Engineering Delivery</div>
                  <div className="contact-value">Distributed across North America, Europe & APAC</div>
                </div>
              </div>
            </div>

            <div className="card-accent" style={{ marginBottom: '24px' }}>
              <div className="contact-item" style={{ alignItems: 'flex-start', marginBottom: 0 }}>
                <div className="contact-icon" style={{ background: 'var(--color-secondary)', color: '#0f172a' }}>
                  <Clock3 size={18} />
                </div>
                <div>
                  <div className="contact-label">Executive Response SLA</div>
                  <div className="contact-value" style={{ fontSize: '15px', lineHeight: '24px', fontWeight: 500 }}>
                    Senior engineering feedback & technical scoping estimate provided within 24 business hours.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'rgba(255, 255, 255, 0.65)', fontSize: '12.5px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={13} color="#10b981" /> Strict NDA Standard
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={13} color="#10b981" /> 100% Code IP Transfer
              </span>
            </div>
          </div>

          <div className="reveal-on-scroll delay-2">
            {submitted ? (
              <div className="card-light" style={{ padding: '48px 36px', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle size={32} color="#10b981" />
                </div>
                <h3 className="heading-3" style={{ marginBottom: '12px', color: '#ffffff' }}>
                  Inquiry Received & Logged
                </h3>
                <p className="body-compact" style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '28px', maxWidth: '420px', margin: '0 auto 28px' }}>
                  Thank you for connecting with VertexHand. A senior engineering director has received your project briefing and will follow up with a technical roadmap within 24 hours.
                </p>
                <button
                  type="button"
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
                  className="btn-outline"
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
                        Your Name *
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
                        Organization
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Technologies"
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="input-label" htmlFor="email">
                      Work Email *
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
                    <label className="input-label" style={{ marginBottom: '10px' }}>
                      Primary Project Focus
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {PROJECT_TYPES.map((type) => {
                        const isSelected = formData.projectType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => handleTypeSelect(type)}
                            style={{
                              padding: '7px 13px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              border: isSelected
                                ? '1px solid var(--color-secondary)'
                                : '1px solid rgba(255, 255, 255, 0.12)',
                              background: isSelected
                                ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.08))'
                                : 'rgba(255, 255, 255, 0.04)',
                              color: isSelected ? 'var(--color-secondary-light)' : 'rgba(255, 255, 255, 0.75)',
                              transition: 'all var(--transition)',
                            }}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="input-label" htmlFor="message">
                      Project Goals & Constraints *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your system requirements, target launch timeline, existing tech stack, and key deliverables..."
                      className="input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: '4px' }}>
                    <Send size={15} />
                    <span>{loading ? 'Submitting Specification…' : 'Submit Project Briefing'}</span>
                  </button>

                  <p style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center', margin: 0 }}>
                    Protected by enterprise confidentiality. Your details will never be shared or marketed to third parties.
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
