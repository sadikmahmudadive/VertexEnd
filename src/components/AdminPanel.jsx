import React, { useState, useEffect } from 'react';
import { X, Save, Edit3, Trash2, Plus, Mail, MessageSquare, Briefcase, Layout, Terminal } from 'lucide-react';
import { 
  fetchContactMessages, 
  deleteContactMessage, 
  saveHomepageSettings, 
  saveServicesToFirestore,
  deleteProjectFromFirestore,
  saveProjectToFirestore
} from '../firebase';

export default function AdminPanel({ 
  isOpen, 
  onClose, 
  homepageSettings, 
  servicesList, 
  projectsList, 
  onUpdateHomepageSettings, 
  onUpdateServicesList,
  onUpdateProjectsList
}) {
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' | 'services' | 'portfolio' | 'messages'
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  
  // Hero settings form state
  const [heroForm, setHeroForm] = useState({
    titleLine1: homepageSettings?.titleLine1 || 'Software built for',
    titleLine2: homepageSettings?.titleLine2 || 'teams that need',
    titleLine3: homepageSettings?.titleLine3 || 'speed, reliability,',
    titleLine4: homepageSettings?.titleLine4 || 'and room to grow.',
    description: homepageSettings?.description || 'VertexEnd designs and delivers software systems, product platforms, and cloud workflows for growing companies.',
    ctaPrimaryText: homepageSettings?.ctaPrimaryText || 'Start a Project',
    ctaSecondaryText: homepageSettings?.ctaSecondaryText || 'View Capabilities',
    stat1Value: homepageSettings?.stat1Value || '12+',
    stat1Label: homepageSettings?.stat1Label || 'Years of combined delivery',
    stat2Value: homepageSettings?.stat2Value || '99.9%',
    stat2Label: homepageSettings?.stat2Label || 'Target uptime for systems we support',
    stat3Value: homepageSettings?.stat3Value || '24h',
    stat3Label: homepageSettings?.stat3Label || 'Typical response window',
  });

  // Services form state
  const [localServices, setLocalServices] = useState([]);
  // Portfolio form state
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Cloud Engineering',
    mediaType: 'image',
    url: '',
  });

  useEffect(() => {
    if (servicesList) {
      setLocalServices(servicesList);
    }
  }, [servicesList]);

  useEffect(() => {
    if (isOpen && activeTab === 'messages') {
      loadMessages();
    }
  }, [isOpen, activeTab]);

  const loadMessages = async () => {
    setLoadingMessages(true);
    const msgs = await fetchContactMessages();
    setMessages(msgs);
    setLoadingMessages(false);
  };

  const handleHeroSave = async () => {
    const result = await saveHomepageSettings(heroForm);
    if (result.success) {
      onUpdateHomepageSettings(heroForm);
      alert('Homepage content updated successfully!');
    } else {
      alert('Error updating homepage settings: ' + result.error);
    }
  };

  const handleServiceChange = (index, field, value) => {
    const updated = [...localServices];
    updated[index] = { ...updated[index], [field]: value };
    setLocalServices(updated);
  };

  const handleSaveServices = async () => {
    const result = await saveServicesToFirestore(localServices);
    if (result.success) {
      onUpdateServicesList(localServices);
      alert('Services updated successfully!');
    } else {
      alert('Error saving services: ' + result.error);
    }
  };

  const handleAddService = () => {
    setLocalServices([
      ...localServices,
      { title: 'New capability', tag: 'Product', description: 'Describe the capability, outcome, or business value here.' }
    ]);
  };

  const handleRemoveService = (index) => {
    if (window.confirm('Remove this service unit?')) {
      const updated = localServices.filter((_, idx) => idx !== index);
      setLocalServices(updated);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.url) {
      alert('Please fill in the project title and insert a media URL.');
      return;
    }
    const result = await saveProjectToFirestore(newProject);
    if (result.success) {
      const newListItem = { id: result.id || 'sim-' + Date.now(), ...newProject };
      onUpdateProjectsList([newListItem, ...projectsList]);
      setNewProject({ title: '', category: 'Cloud Engineering', mediaType: 'image', url: '' });
      alert('Project added successfully!');
    } else {
      alert('Error saving project: ' + result.error);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this work item?')) {
      const result = await deleteProjectFromFirestore(id);
      if (result.success) {
        onUpdateProjectsList(projectsList.filter(p => p.id !== id));
      } else {
        // Safe UI removal fallback for local simulation
        onUpdateProjectsList(projectsList.filter(p => p.id !== id));
      }
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Delete this message entry?')) {
      const result = await deleteContactMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2500,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: '#0d111a',
        width: '100%',
        maxWidth: '1000px',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
      }}>
        {/* Header bar */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'between',
          alignItems: 'center',
          background: '#0a0d14'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Terminal size={16} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>
                VertexEnd Content Studio
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: 0 }}>
                Brand, capabilities, work, and inbox management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Panel Main Area */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* Navigation Sidebar */}
          <div style={{
            width: '220px',
            background: '#0a0d14',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            padding: '20px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <button
              onClick={() => setActiveTab('hero')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '12px 14px',
                border: 'none',
                background: activeTab === 'hero' ? 'rgba(235, 64, 52, 0.15)' : 'transparent',
                color: activeTab === 'hero' ? 'var(--color-primary)' : 'rgba(255,255,255,0.6)',
                fontWeight: 600,
                fontSize: '13px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Layout size={16} />
              <span>Brand</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '12px 14px',
                border: 'none',
                background: activeTab === 'services' ? 'rgba(235, 64, 52, 0.15)' : 'transparent',
                color: activeTab === 'services' ? 'var(--color-primary)' : 'rgba(255,255,255,0.6)',
                fontWeight: 600,
                fontSize: '13px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <MessageSquare size={16} />
              <span>Capabilities</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '12px 14px',
                border: 'none',
                background: activeTab === 'portfolio' ? 'rgba(235, 64, 52, 0.15)' : 'transparent',
                color: activeTab === 'portfolio' ? 'var(--color-primary)' : 'rgba(255,255,255,0.6)',
                fontWeight: 600,
                fontSize: '13px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Briefcase size={16} />
              <span>Work</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '12px 14px',
                border: 'none',
                background: activeTab === 'messages' ? 'rgba(235, 64, 52, 0.15)' : 'transparent',
                color: activeTab === 'messages' ? 'var(--color-primary)' : 'rgba(255,255,255,0.6)',
                fontWeight: 600,
                fontSize: '13px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Mail size={16} />
              <span>Inbox</span>
            </button>
          </div>

          {/* Form Content Area */}
          <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
            
            {/* HERO TAB */}
            {activeTab === 'hero' && (
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '24px', fontWeight: 600 }}>Update Hero Text & Statistics</h3>
                <div style={{ display: 'grid', gap: '16px', marginBottom: '28px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>Headline Line 1</label>
                    <input
                      type="text"
                      value={heroForm.titleLine1}
                      onChange={e => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                      style={{ width: '100%', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>Headline Line 2 (Highlighted Line)</label>
                    <input
                      type="text"
                      value={heroForm.titleLine2}
                      onChange={e => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                      style={{ width: '100%', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>Headline Line 3</label>
                    <input
                      type="text"
                      value={heroForm.titleLine3}
                      onChange={e => setHeroForm({ ...heroForm, titleLine3: e.target.value })}
                      style={{ width: '100%', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>Headline Line 4</label>
                    <input
                      type="text"
                      value={heroForm.titleLine4}
                      onChange={e => setHeroForm({ ...heroForm, titleLine4: e.target.value })}
                      style={{ width: '100%', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>Brand Description Paragraph</label>
                    <textarea
                      value={heroForm.description}
                      onChange={e => setHeroForm({ ...heroForm, description: e.target.value })}
                      style={{ width: '100%', height: '80px', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none', resize: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>Primary Button Text</label>
                      <input
                        type="text"
                        value={heroForm.ctaPrimaryText}
                        onChange={e => setHeroForm({ ...heroForm, ctaPrimaryText: e.target.value })}
                        style={{ width: '100%', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>Secondary Button Text</label>
                      <input
                        type="text"
                        value={heroForm.ctaSecondaryText}
                        onChange={e => setHeroForm({ ...heroForm, ctaSecondaryText: e.target.value })}
                        style={{ width: '100%', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <h4 style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginTop: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>Metrics & Stats values</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Stat 1 Value</label>
                      <input
                        type="text"
                        value={heroForm.stat1Value}
                        onChange={e => setHeroForm({ ...heroForm, stat1Value: e.target.value })}
                        style={{ width: '100%', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                      />
                      <input
                        type="text"
                        value={heroForm.stat1Label}
                        onChange={e => setHeroForm({ ...heroForm, stat1Label: e.target.value })}
                        style={{ width: '100%', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', outline: 'none', marginTop: '4px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Stat 2 Value</label>
                      <input
                        type="text"
                        value={heroForm.stat2Value}
                        onChange={e => setHeroForm({ ...heroForm, stat2Value: e.target.value })}
                        style={{ width: '100%', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                      />
                      <input
                        type="text"
                        value={heroForm.stat2Label}
                        onChange={e => setHeroForm({ ...heroForm, stat2Label: e.target.value })}
                        style={{ width: '100%', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', outline: 'none', marginTop: '4px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Stat 3 Value</label>
                      <input
                        type="text"
                        value={heroForm.stat3Value}
                        onChange={e => setHeroForm({ ...heroForm, stat3Value: e.target.value })}
                        style={{ width: '100%', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                      />
                      <input
                        type="text"
                        value={heroForm.stat3Label}
                        onChange={e => setHeroForm({ ...heroForm, stat3Label: e.target.value })}
                        style={{ width: '100%', padding: '10px', background: '#131924', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', outline: 'none', marginTop: '4px' }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleHeroSave}
                  style={{
                    background: 'var(--color-primary)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 24px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Save size={16} />
                  <span>Save Brand Updates</span>
                </button>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600, margin: 0 }}>Configure Services Grid</h3>
                  <button
                    onClick={handleAddService}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.12)',
                      padding: '8px 14px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={14} />
                    <span>Add Service Card</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
                  {localServices.map((srv, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#131924',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '20px',
                        position: 'relative'
                      }}
                    >
                      <button
                        onClick={() => handleRemoveService(idx)}
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--color-primary)',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>

                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>Service Title</label>
                          <input
                            type="text"
                            value={srv.title}
                            onChange={e => handleServiceChange(idx, 'title', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', background: '#0a0d14', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>Tag Identifier</label>
                          <input
                            type="text"
                            value={srv.tag}
                            onChange={e => handleServiceChange(idx, 'tag', e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', background: '#0a0d14', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>Capability Description</label>
                        <textarea
                          value={srv.description}
                          onChange={e => handleServiceChange(idx, 'description', e.target.value)}
                          style={{ width: '100%', height: '56px', padding: '8px 10px', background: '#0a0d14', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none', resize: 'none' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSaveServices}
                  style={{
                    background: 'var(--color-primary)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 24px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Save size={16} />
                  <span>Save Services configuration</span>
                </button>
              </div>
            )}

            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Add Showcase Project</h3>
                
                <form
                  onSubmit={handleAddProject}
                  style={{
                    background: '#131924',
                    border: '1px solid rgba(255,255,255,0.06)',
                    padding: '24px',
                    marginBottom: '36px'
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Project Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Lambda Broker"
                        value={newProject.title}
                        onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                        style={{ width: '100%', padding: '10px', background: '#0a0d14', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Category Tag</label>
                      <select
                        value={newProject.category}
                        onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                        style={{ width: '100%', padding: '10px', background: '#0a0d14', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                      >
                        <option value="Cloud Engineering">Cloud Engineering</option>
                        <option value="Backend Systems">Backend Systems</option>
                        <option value="Security Auditing">Security Auditing</option>
                        <option value="Developer Tooling">Developer Tooling</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 1.5fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Asset Type</label>
                      <select
                        value={newProject.mediaType}
                        onChange={e => setNewProject({ ...newProject, mediaType: e.target.value })}
                        style={{ width: '100%', padding: '10px', background: '#0a0d14', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                      >
                        <option value="image">Image Asset</option>
                        <option value="video">Video Loop</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Cloudinary Media URL</label>
                      <input
                        type="url"
                        placeholder="https://res.cloudinary.com/..."
                        value={newProject.url}
                        onChange={e => setNewProject({ ...newProject, url: e.target.value })}
                        style={{ width: '100%', padding: '10px', background: '#0a0d14', border: '1px solid rgba(255,255,255,0.1)', color: '#ffffff', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: 'var(--color-primary)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 20px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Plus size={16} />
                    <span>Upload Project to Showcase</span>
                  </button>
                </form>

                <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Active Showcase Items</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {projectsList.map((proj) => (
                    <div
                      key={proj.id}
                      style={{
                        background: '#131924',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>{proj.title}</h4>
                        <span style={{ fontSize: '11px', color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: 700 }}>{proj.category}</span>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', wordBreak: 'break-all' }}>{proj.url}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'rgba(255,255,255,0.4)',
                          cursor: 'pointer',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Contact Form Inbox</h3>
                
                {loadingMessages ? (
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Loading inquiries...</p>
                ) : messages.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>No messages in the database yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        style={{
                          background: '#131924',
                          border: '1px solid rgba(255,255,255,0.06)',
                          padding: '24px',
                          position: 'relative'
                        }}
                      >
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            background: 'transparent',
                            border: 'none',
                            color: 'rgba(255,255,255,0.4)',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                        >
                          <Trash2 size={16} />
                        </button>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '14px' }}>
                          <div>
                            <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Client Name</span>
                            <span style={{ fontSize: '14px', color: '#ffffff', fontWeight: 600 }}>{msg.name}</span>
                          </div>
                          <div>
                            <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Email Address</span>
                            <span style={{ fontSize: '14px', color: 'var(--color-primary)' }}>{msg.email}</span>
                          </div>
                          <div>
                            <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Project Type Target</span>
                            <span style={{ fontSize: '14px', color: '#ffffff', fontWeight: 600 }}>{msg.projectType || 'Not specified'}</span>
                          </div>
                        </div>

                        <div style={{ background: '#0a0d14', padding: '14px', borderLeft: '3px solid var(--color-primary)' }}>
                          <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Message Body</span>
                          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: '22px', margin: 0, whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
