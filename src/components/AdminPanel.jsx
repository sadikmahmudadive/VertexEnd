import React, { useEffect, useState } from 'react';
import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Film,
  Image as ImageIcon,
  Inbox,
  LayoutTemplate,
  Plus,
  Save,
  Settings2,
  Trash2,
  UploadCloud,
  X,
} from 'lucide-react';
import { openCloudinaryWidget } from '../cloudinary';
import {
  deleteContactMessage,
  deleteProjectFromFirestore,
  fetchContactMessages,
  saveHomepageSettings,
  saveProjectToFirestore,
  saveServicesToFirestore,
} from '../firebase';

const DEFAULT_SERVICES = [
  { title: 'Product Engineering', tag: 'Product', description: 'Web products and internal tools designed for dependable growth.' },
  { title: 'Cloud Architecture', tag: 'Platform', description: 'Cloud foundations and workflows that remain reliable as demand grows.' },
  { title: 'API and Integration Work', tag: 'API', description: 'APIs and automation that connect products with business systems.' },
];

const EMPTY_PROJECT = {
  title: '',
  category: 'Platform',
  mediaType: 'image',
  url: '',
  description: '',
  outcome: '',
  tags: '',
};

const TABS = [
  { id: 'brand', label: 'Homepage', icon: LayoutTemplate },
  { id: 'capabilities', label: 'Capabilities', icon: Settings2 },
  { id: 'work', label: 'Case studies', icon: BriefcaseBusiness },
  { id: 'assets', label: 'Media library', icon: UploadCloud },
  { id: 'inbox', label: 'Inbox', icon: Inbox },
];

function Field({ label, children, hint }) {
  return (
    <label className="studio-field">
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}

function formatDate(value) {
  if (!value) return 'Date unavailable';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Date unavailable'
    : new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export default function AdminPanel({
  isOpen,
  onClose,
  homepageSettings,
  servicesList,
  projectsList = [],
  onUpdateHomepageSettings,
  onUpdateServicesList,
  onUpdateProjectsList,
  onUploadComplete,
}) {
  const [activeTab, setActiveTab] = useState('brand');
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [heroForm, setHeroForm] = useState({
    titleLine1: homepageSettings?.titleLine1 || 'Software built for',
    titleLine2: homepageSettings?.titleLine2 || 'teams that need',
    titleLine3: homepageSettings?.titleLine3 || 'speed, reliability,',
    titleLine4: homepageSettings?.titleLine4 || 'and room to grow.',
    description: homepageSettings?.description || 'VertexEnd designs and delivers modern software systems, product platforms, and cloud workflows for growing companies.',
    ctaPrimaryText: homepageSettings?.ctaPrimaryText || 'Start a Project',
    ctaSecondaryText: homepageSettings?.ctaSecondaryText || 'View Capabilities',
    stat1Value: homepageSettings?.stat1Value || '12+',
    stat1Label: homepageSettings?.stat1Label || 'Years of combined delivery',
    stat2Value: homepageSettings?.stat2Value || '99.9%',
    stat2Label: homepageSettings?.stat2Label || 'Target platform uptime',
    stat3Value: homepageSettings?.stat3Value || '24h',
    stat3Label: homepageSettings?.stat3Label || 'Typical response window',
  });
  const [localServices, setLocalServices] = useState(DEFAULT_SERVICES);
  const [newProject, setNewProject] = useState(EMPTY_PROJECT);
  const [lastUploaded, setLastUploaded] = useState(null);
  const [assetSaving, setAssetSaving] = useState(false);

  useEffect(() => {
    if (servicesList?.length) setLocalServices(servicesList);
  }, [servicesList]);

  useEffect(() => {
    if (!isOpen || activeTab !== 'inbox') return;
    let active = true;
    setLoadingMessages(true);
    fetchContactMessages().then((items) => {
      if (active) {
        setMessages(items || []);
        setLoadingMessages(false);
      }
    });
    return () => { active = false; };
  }, [isOpen, activeTab]);

  useEffect(() => {
    if (!isOpen) setNotice(null);
  }, [isOpen]);

  const showResult = (type, message) => setNotice({ type, message });

  const saveBrand = async () => {
    setSaving(true);
    const result = await saveHomepageSettings(heroForm);
    setSaving(false);
    if (result.success) {
      onUpdateHomepageSettings(heroForm);
      showResult('success', 'Homepage content saved.');
    } else {
      showResult('error', result.error || 'Homepage content could not be saved.');
    }
  };

  const saveCapabilities = async () => {
    setSaving(true);
    const result = await saveServicesToFirestore(localServices);
    setSaving(false);
    if (result.success) {
      onUpdateServicesList(localServices);
      showResult('success', 'Capabilities saved.');
    } else {
      showResult('error', result.error || 'Capabilities could not be saved.');
    }
  };

  const addProject = async (event) => {
    event.preventDefault();
    if (!newProject.title.trim() || !newProject.url.trim()) {
      showResult('error', 'Add a project title and media URL before publishing.');
      return;
    }

    const projectData = {
      ...newProject,
      tags: newProject.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    };
    setSaving(true);
    const result = await saveProjectToFirestore(projectData);
    setSaving(false);
    if (result.success) {
      onUpdateProjectsList([{ id: result.id || `local-${Date.now()}`, ...projectData }, ...projectsList]);
      setNewProject(EMPTY_PROJECT);
      showResult('success', 'Case study published.');
    } else {
      showResult('error', result.error || 'The case study could not be published.');
    }
  };

  const removeProject = async (projectId) => {
    const target = projectsList.find((project) => project.id === projectId);
    const itemType = target?.category === 'Uploaded Asset' ? 'asset' : 'case study';
    if (!window.confirm(`Remove this ${itemType} from the website?`)) return;
    const result = await deleteProjectFromFirestore(projectId);
    if (result.success || projectId.startsWith('sim-') || projectId.startsWith('local-')) {
      onUpdateProjectsList(projectsList.filter((project) => project.id !== projectId));
      showResult('success', `${itemType === 'asset' ? 'Asset' : 'Case study'} removed.`);
    } else {
      showResult('error', result.error || 'The case study could not be removed.');
    }
  };

  const removeMessage = async (messageId) => {
    if (!window.confirm('Delete this inquiry?')) return;
    const result = await deleteContactMessage(messageId);
    if (result.success) {
      setMessages((current) => current.filter((message) => message.id !== messageId));
    } else {
      showResult('error', result.error || 'The inquiry could not be deleted.');
    }
  };

  const updateService = (index, field, value) => {
    setLocalServices((current) => current.map((service, serviceIndex) => (
      serviceIndex === index ? { ...service, [field]: value } : service
    )));
  };

  const uploadAsset = () => {
    if (!window.cloudinary) {
      showResult('error', 'The upload service is still loading. Please try again in a moment.');
      return;
    }

    setNotice(null);
    openCloudinaryWidget(async (mediaData) => {
      setAssetSaving(true);
      try {
        await onUploadComplete(mediaData);
        setLastUploaded(mediaData);
        showResult('success', 'Asset uploaded and added to the media library.');
      } catch (error) {
        showResult('error', error.message || 'The asset could not be saved.');
      } finally {
        setAssetSaving(false);
      }
    });
  };

  const uploadedAssets = projectsList.filter((project) => project.category === 'Uploaded Asset');

  if (!isOpen) return null;

  return (
    <div className="studio-overlay" role="dialog" aria-modal="true" aria-labelledby="studio-title">
      <div className="studio-shell">
        <header className="studio-header">
          <div className="studio-brand">
            <span className="studio-logo"><Building2 size={20} /></span>
            <div>
              <h2 id="studio-title">VertexEnd Content Studio</h2>
              <p>Manage the public website and incoming project inquiries.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="studio-close" aria-label="Close content studio">
            <X size={21} />
          </button>
        </header>

        <div className="studio-layout">
          <nav className="studio-nav" aria-label="Content studio sections">
            <p>Website</p>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className={activeTab === id ? 'active' : ''}
                onClick={() => { setActiveTab(id); setNotice(null); }}
              >
                <Icon size={18} />
                <span>{label}</span>
                {id === 'inbox' && messages.length > 0 && <b>{messages.length}</b>}
              </button>
            ))}
            <div className="studio-nav-note">
              <strong>Changes are live</strong>
              <span>Saved content is published through Firestore.</span>
            </div>
          </nav>

          <main className="studio-content">
            {notice && <div className={`studio-notice ${notice.type}`}>{notice.message}</div>}

            {activeTab === 'brand' && (
              <section className="studio-section">
                <div className="studio-section-heading">
                  <div>
                    <span>Homepage</span>
                    <h3>Hero content</h3>
                    <p>Keep the opening message concise and focused on client outcomes.</p>
                  </div>
                  <button type="button" className="btn-primary" onClick={saveBrand} disabled={saving}>
                    <Save size={16} /> {saving ? 'Saving...' : 'Save changes'}
                  </button>
                </div>

                <div className="studio-card">
                  <h4>Headline</h4>
                  <div className="studio-form-grid two-column">
                    {['titleLine1', 'titleLine2', 'titleLine3', 'titleLine4'].map((field, index) => (
                      <Field key={field} label={`Line ${index + 1}`}>
                        <input className="studio-input" value={heroForm[field]} onChange={(e) => setHeroForm({ ...heroForm, [field]: e.target.value })} />
                      </Field>
                    ))}
                  </div>
                  <Field label="Supporting paragraph" hint="Aim for one or two clear sentences.">
                    <textarea className="studio-input studio-textarea" value={heroForm.description} onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })} />
                  </Field>
                </div>

                <div className="studio-card">
                  <h4>Calls to action</h4>
                  <div className="studio-form-grid two-column">
                    <Field label="Primary button">
                      <input className="studio-input" value={heroForm.ctaPrimaryText} onChange={(e) => setHeroForm({ ...heroForm, ctaPrimaryText: e.target.value })} />
                    </Field>
                    <Field label="Secondary button">
                      <input className="studio-input" value={heroForm.ctaSecondaryText} onChange={(e) => setHeroForm({ ...heroForm, ctaSecondaryText: e.target.value })} />
                    </Field>
                  </div>
                </div>

                <div className="studio-card">
                  <h4>Proof points</h4>
                  <div className="studio-form-grid three-column">
                    {[1, 2, 3].map((number) => (
                      <div key={number} className="studio-metric-editor">
                        <Field label={`Metric ${number}`}>
                          <input className="studio-input" value={heroForm[`stat${number}Value`]} onChange={(e) => setHeroForm({ ...heroForm, [`stat${number}Value`]: e.target.value })} />
                        </Field>
                        <Field label="Description">
                          <input className="studio-input" value={heroForm[`stat${number}Label`]} onChange={(e) => setHeroForm({ ...heroForm, [`stat${number}Label`]: e.target.value })} />
                        </Field>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'capabilities' && (
              <section className="studio-section">
                <div className="studio-section-heading">
                  <div>
                    <span>Capabilities</span>
                    <h3>Services shown on the website</h3>
                    <p>Describe the work clients can engage VertexEnd to deliver.</p>
                  </div>
                  <div className="studio-heading-actions">
                    <button type="button" className="studio-secondary-button" onClick={() => setLocalServices([...localServices, { title: '', tag: 'Product', description: '' }])}>
                      <Plus size={16} /> Add capability
                    </button>
                    <button type="button" className="btn-primary" onClick={saveCapabilities} disabled={saving}>
                      <Save size={16} /> {saving ? 'Saving...' : 'Save changes'}
                    </button>
                  </div>
                </div>

                <div className="studio-stack">
                  {localServices.map((service, index) => (
                    <div className="studio-card studio-list-card" key={`${service.title}-${index}`}>
                      <div className="studio-list-card-heading">
                        <span>Capability {String(index + 1).padStart(2, '0')}</span>
                        <button type="button" className="studio-delete-button" onClick={() => setLocalServices(localServices.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${service.title || 'capability'}`}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="studio-form-grid service-grid">
                        <Field label="Title">
                          <input className="studio-input" value={service.title || ''} onChange={(e) => updateService(index, 'title', e.target.value)} />
                        </Field>
                        <Field label="Category">
                          <select className="studio-input" value={service.tag || 'Product'} onChange={(e) => updateService(index, 'tag', e.target.value)}>
                            {['Product', 'Platform', 'API', 'Mobile', 'Security', 'Data', 'Strategy'].map((tag) => <option key={tag}>{tag}</option>)}
                          </select>
                        </Field>
                      </div>
                      <Field label="Description">
                        <textarea className="studio-input studio-textarea compact" value={service.description || ''} onChange={(e) => updateService(index, 'description', e.target.value)} />
                      </Field>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'work' && (
              <section className="studio-section">
                <div className="studio-section-heading">
                  <div>
                    <span>Case studies</span>
                    <h3>Selected client work</h3>
                    <p>Publish credible examples with a clear result and supporting media.</p>
                  </div>
                </div>

                <form className="studio-card" onSubmit={addProject}>
                  <h4>Publish a case study</h4>
                  <div className="studio-form-grid two-column">
                    <Field label="Project title">
                      <input className="studio-input" placeholder="Operations dashboard" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
                    </Field>
                    <Field label="Category">
                      <select className="studio-input" value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}>
                        {['Platform', 'Data', 'Mobile', 'Media', 'Uploaded Asset'].map((category) => <option key={category}>{category}</option>)}
                      </select>
                    </Field>
                    <Field label="Media type">
                      <select className="studio-input" value={newProject.mediaType} onChange={(e) => setNewProject({ ...newProject, mediaType: e.target.value })}>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                    </Field>
                    <Field label="Media URL">
                      <input type="url" className="studio-input" placeholder="https://..." value={newProject.url} onChange={(e) => setNewProject({ ...newProject, url: e.target.value })} />
                    </Field>
                  </div>
                  <Field label="Project summary">
                    <textarea className="studio-input studio-textarea compact" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
                  </Field>
                  <Field label="Outcome">
                    <input className="studio-input" placeholder="Reduced reporting time by 40%" value={newProject.outcome} onChange={(e) => setNewProject({ ...newProject, outcome: e.target.value })} />
                  </Field>
                  <Field label="Technologies" hint="Separate tags with commas.">
                    <input className="studio-input" placeholder="React, Firebase, Analytics" value={newProject.tags} onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })} />
                  </Field>
                  <button type="submit" className="btn-primary" disabled={saving}>
                    <Plus size={16} /> {saving ? 'Publishing...' : 'Publish case study'}
                  </button>
                </form>

                <div className="studio-card">
                  <div className="studio-collection-heading">
                    <h4>Published case studies</h4>
                    <span>{projectsList.length} items</span>
                  </div>
                  {projectsList.length === 0 ? (
                    <p className="studio-empty">No custom case studies have been published yet.</p>
                  ) : (
                    <div className="studio-project-list">
                      {projectsList.map((project) => (
                        <div key={project.id} className="studio-project-row">
                          <div>
                            <strong>{project.title}</strong>
                            <span>{project.category || 'Uncategorized'}</span>
                          </div>
                          <button type="button" className="studio-delete-button" onClick={() => removeProject(project.id)} aria-label={`Remove ${project.title}`}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeTab === 'assets' && (
              <section className="studio-section">
                <div className="studio-section-heading">
                  <div>
                    <span>Media library</span>
                    <h3>Upload website content</h3>
                    <p>Upload approved images and videos to Cloudinary, then manage them from this admin workspace.</p>
                  </div>
                </div>

                <div className="studio-card studio-upload-card">
                  <button type="button" className="studio-upload-zone" onClick={uploadAsset} disabled={assetSaving}>
                    <span className="studio-upload-icon"><UploadCloud size={26} /></span>
                    <strong>{assetSaving ? 'Saving asset...' : 'Upload an image or video'}</strong>
                    <span>Choose a local file, paste a URL, or use your camera.</span>
                    <small>PNG, JPG, WEBP, MP4, MOV, or WEBM up to 25 MB</small>
                  </button>

                  <div className="studio-upload-types" aria-label="Supported media types">
                    <span><ImageIcon size={16} /> Images</span>
                    <span><Film size={16} /> Videos</span>
                    <span><CheckCircle2 size={16} /> Stored securely in Cloudinary</span>
                  </div>
                </div>

                {lastUploaded && (
                  <div className="studio-upload-success">
                    <CheckCircle2 size={18} />
                    <div>
                      <strong>Latest upload is ready</strong>
                      <span>{lastUploaded.publicId} · {lastUploaded.format?.toUpperCase()}</span>
                    </div>
                  </div>
                )}

                <div className="studio-card">
                  <div className="studio-collection-heading">
                    <h4>Uploaded assets</h4>
                    <span>{uploadedAssets.length} items</span>
                  </div>

                  {uploadedAssets.length === 0 ? (
                    <div className="studio-empty studio-assets-empty">
                      <ImageIcon size={24} />
                      <span>No media has been uploaded yet.</span>
                    </div>
                  ) : (
                    <div className="studio-asset-grid">
                      {uploadedAssets.map((asset) => (
                        <article key={asset.id || asset.publicId} className="studio-asset-card">
                          <div className="studio-asset-preview">
                            {asset.mediaType === 'video' ? (
                              <div className="studio-video-placeholder"><Film size={24} /><span>Video</span></div>
                            ) : (
                              <img src={asset.url || asset.mediaUrl} alt={asset.title || 'Uploaded asset'} />
                            )}
                          </div>
                          <div className="studio-asset-details">
                            <div>
                              <strong>{asset.title || 'Uploaded media asset'}</strong>
                              <span>{asset.format?.toUpperCase() || asset.mediaType || 'Media'}</span>
                            </div>
                            <button type="button" className="studio-delete-button" onClick={() => removeProject(asset.id)} aria-label={`Remove ${asset.title || 'asset'}`}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeTab === 'inbox' && (
              <section className="studio-section">
                <div className="studio-section-heading">
                  <div>
                    <span>Inbox</span>
                    <h3>Project inquiries</h3>
                    <p>Messages submitted through the website contact form.</p>
                  </div>
                </div>

                {loadingMessages ? (
                  <div className="studio-empty-state">Loading inquiries...</div>
                ) : messages.length === 0 ? (
                  <div className="studio-empty-state">
                    <Inbox size={28} />
                    <strong>No inquiries yet</strong>
                    <span>New contact form messages will appear here.</span>
                  </div>
                ) : (
                  <div className="studio-stack">
                    {messages.map((message) => (
                      <article key={message.id} className="studio-card studio-message">
                        <div className="studio-message-heading">
                          <div>
                            <strong>{message.name}</strong>
                            <a href={`mailto:${message.email}`}>{message.email}</a>
                          </div>
                          <button type="button" className="studio-delete-button" onClick={() => removeMessage(message.id)} aria-label="Delete inquiry">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="studio-message-meta">
                          <span>{message.company || 'Company not provided'}</span>
                          <span>{message.projectType || 'Project type not specified'}</span>
                          <span>{formatDate(message.createdAt)}</span>
                        </div>
                        <p>{message.message}</p>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
