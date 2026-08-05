import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';

const FAQS = [
  {
    question: 'Who owns the source code, intellectual property, and cloud assets?',
    answer:
      'You have 100% full intellectual property ownership from day one. All code is committed directly to your GitHub/GitLab organizations, and cloud resources (AWS, GCP, Firebase) are provisioned under your corporate billing accounts. There is zero vendor lock-in.',
  },
  {
    question: 'What is the team composition and who works on our codebase?',
    answer:
      'Every project is led and staffed by senior software architects with at least 8+ years of production experience. We do not use junior contractors or junior bait-and-switch models. You communicate directly with the engineers writing and architecting your systems.',
  },
  {
    question: 'How do you handle sprints, communication, and milestone progress?',
    answer:
      'We run on 2-week agile sprints. You receive weekly video walkthrough demos, live staging environment deploys, and real-time communication via your preferred workspace (Slack, Teams, or Linear). You test working software each sprint rather than waiting for big-bang handoffs.',
  },
  {
    question: 'How do you ensure security, compliance, and zero-trust data protection?',
    answer:
      'We build to SOC 2 Type II and HIPAA architectural standards: end-to-end TLS encryption, automated secrets management, role-based access control (RBAC), sanitized SQL/NoSQL query layers, and zero-trust cloud network rules with automated audit logging.',
  },
  {
    question: 'What happens after launch? Do you offer maintenance and SLA support?',
    answer:
      'Yes. Following initial deployment, we offer guaranteed SLA maintenance retainers covering 24/7 uptime monitoring, security patching, library upgrades, performance optimizations, and continuous sprint capacity for feature iteration.',
  },
  {
    question: 'Can you help transition the product to our internal team later?',
    answer:
      'Seamlessly. We provide complete technical architecture documentation, recorded code walkthroughs, deployment playbooks, and pairing sessions to onboard your internal hires with zero downtime or knowledge gaps.',
  },
];

export default function EnterpriseFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  };

  return (
    <section id="faq" className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal-on-scroll section-header">
          <span className="overline">Enterprise FAQ</span>
          <h2 className="heading-2" style={{ maxWidth: '780px' }}>
            Clear answers on engagement, architecture, and code ownership.
          </h2>
          <p className="section-lead" style={{ maxWidth: '720px' }}>
            Everything you need to know about partnering with VertexHand to build and scale your mission-critical software.
          </p>
        </div>

        <div className="faq-accordion" style={{ maxWidth: '920px', margin: '0 auto' }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`faq-item reveal-on-scroll${isOpen ? ' open' : ''}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      0{idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown size={20} />
                </button>

                {isOpen && (
                  <div className="faq-content">
                    <p style={{ margin: 0 }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
