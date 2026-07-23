import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import MediaUploader from './components/MediaUploader';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { 
  auth, 
  logoutUser, 
  fetchPortfolioItems, 
  saveProjectToFirestore, 
  syncUserProfile,
  fetchHomepageSettings,
  fetchServicesFromFirestore
} from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [customMediaList, setCustomMediaList] = useState([]);
  
  // Custom homepage and services state
  const [homepageSettings, setHomepageSettings] = useState(null);
  const [servicesList, setServicesList] = useState([]);

  // Load items from Firestore & monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Sync Firestore user profile to read the 'role' field set manually by database owner
        const profile = await syncUserProfile(currentUser);
        setUser({ ...currentUser, role: profile?.role || 'developer' });
      } else {
        setUser(null);
      }
    });

    // Load projects from Firestore
    fetchPortfolioItems().then((items) => {
      if (items && items.length > 0) {
        setCustomMediaList(items);
      }
    });

    // Load custom homepage settings from Firestore
    fetchHomepageSettings().then((settings) => {
      if (settings) {
        setHomepageSettings(settings);
      }
    });

    // Load custom services configurations from Firestore
    fetchServicesFromFirestore().then((srvs) => {
      if (srvs) {
        setServicesList(srvs);
      }
    });

    return () => unsubscribe();
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    // Give it a brief delay to ensure DOM has rendered
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      clearTimeout(timer);
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [servicesList, customMediaList]);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setIsAdminOpen(false);
  };

  const handleUploadComplete = async (mediaItem) => {
    const newMedia = {
      title: 'Uploaded Media Asset',
      category: 'Uploaded Asset',
      mediaType: mediaItem.mediaType,
      url: mediaItem.url,
      publicId: mediaItem.publicId || String(Date.now()),
      format: mediaItem.format
    };
    setCustomMediaList((prev) => [newMedia, ...prev]);
    // Save uploaded Cloudinary media info to Firestore
    await saveProjectToFirestore(newMedia);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <Navbar 
        user={user} 
        onOpenAuth={() => setIsAuthOpen(true)} 
        onLogout={handleLogout}
        onOpenUploader={() => setIsUploaderOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Sections */}
      <main style={{ flex: 1 }}>
        <Hero 
          onOpenAuth={() => setIsAuthOpen(true)}
          settings={homepageSettings}
        />
        <Services servicesList={servicesList} />
        <Process />
        <Portfolio customMediaList={customMediaList} />
        <ContactSection />
      </main>

      {/* Modals & Dialogs */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(authUser) => setUser(authUser)}
      />

      <MediaUploader 
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      <AdminPanel 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        homepageSettings={homepageSettings}
        servicesList={servicesList}
        projectsList={customMediaList}
        onUpdateHomepageSettings={(updated) => setHomepageSettings(updated)}
        onUpdateServicesList={(updated) => setServicesList(updated)}
        onUpdateProjectsList={(updated) => setCustomMediaList(updated)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
