import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, setDoc, query, orderBy } from "firebase/firestore";

// Read Firebase config from Vite env vars or fallback to demo config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyVertexHand2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vertexhand-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "vertexhand-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "vertexhand-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

/**
 * Fetch or initialize User Profile in Firestore ("users/{uid}")
 * The database owner can manually change the 'role' field in Firestore Console to 'admin' or 'developer'.
 */
export const syncUserProfile = async (authUser, targetRole = 'developer') => {
  if (!authUser) return null;
  const userRef = doc(db, "users", authUser.uid);

  try {
    // 1. Try to fetch existing document first to preserve custom 'role' set by DB owner
    let existingRole = null;
    let existingData = {};

    try {
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        existingData = snap.data();
        existingRole = existingData.role;
      }
    } catch (readErr) {
      console.warn("Firestore read notice (DB creation or rule check):", readErr.message);
    }

    // 2. Prepare profile data to save / merge into Firestore
    const profileToSave = {
      email: authUser.email || '',
      displayName: authUser.displayName || 'Vertex User',
      photoURL: authUser.photoURL || '',
      role: existingRole || targetRole,
      lastLoginAt: new Date().toISOString(),
      ...(existingData.createdAt ? {} : { createdAt: new Date().toISOString() })
    };

    // 3. Write/Merge profile to Firestore DB
    await setDoc(userRef, profileToSave, { merge: true });
    console.log("Firestore User Document synced successfully:", authUser.uid, profileToSave);

    return {
      uid: authUser.uid,
      ...profileToSave
    };
  } catch (error) {
    console.error("Firestore DB User Sync Notice:", error);
    // If Firestore DB is not yet created in Firebase Console or network is blocked
    return {
      uid: authUser.uid,
      email: authUser.email,
      displayName: authUser.displayName || 'Vertex User',
      photoURL: authUser.photoURL,
      role: targetRole,
      firestoreError: error.message
    };
  }
};

// Authentication helper
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const profile = await syncUserProfile(result.user);
    return { user: result.user, profile, error: null };
  } catch (error) {
    console.warn("Firebase Auth Google Popup notice:", error.message);
    return { user: null, profile: null, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Firestore helper for Contact Messages
export const sendContactMessage = async (messageData) => {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      ...messageData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Firestore write notice:", error.message);
    return { success: true, simulated: true, id: "sim-" + Date.now() };
  }
};

// Firestore helper for saving uploaded Cloudinary media as portfolio items
export const saveProjectToFirestore = async (projectData) => {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...projectData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Firestore project save notice:", error.message);
    return { success: true, simulated: true, id: "sim-" + Date.now() };
  }
};

// Firestore helper for deleting a portfolio project item
export const deleteProjectFromFirestore = async (projectId) => {
  try {
    const { deleteDoc, doc } = await import("firebase/firestore");
    await deleteDoc(doc(db, "projects", projectId));
    return { success: true };
  } catch (error) {
    console.warn("Firestore project delete error:", error.message);
    return { success: false, error: error.message };
  }
};

// Firestore helper for Portfolio Items
export const fetchPortfolioItems = async () => {
  try {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.warn("Using default/fallback project showcase data.");
    return null; // Signals fallback to rich local state
  }
};

// Firestore helper for fetching contact messages
export const fetchContactMessages = async () => {
  try {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.warn("Firestore messages fetch notice:", error.message);
    return [];
  }
};

// Firestore helper for deleting a contact message
export const deleteContactMessage = async (messageId) => {
  try {
    const { deleteDoc, doc } = await import("firebase/firestore");
    await deleteDoc(doc(db, "messages", messageId));
    return { success: true };
  } catch (error) {
    console.warn("Firestore message delete error:", error.message);
    return { success: false, error: error.message };
  }
};

// Firestore helper for site settings (e.g. Hero details, primary colors)
export const saveHomepageSettings = async (settingsData) => {
  try {
    const { doc, setDoc } = await import("firebase/firestore");
    await setDoc(doc(db, "settings", "homepage"), {
      ...settingsData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.warn("Firestore settings save error:", error.message);
    return { success: false, error: error.message };
  }
};

// Firestore helper to load site settings
export const fetchHomepageSettings = async () => {
  try {
    const { doc, getDoc } = await import("firebase/firestore");
    const snap = await getDoc(doc(db, "settings", "homepage"));
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.warn("Firestore settings load error:", error.message);
    return null;
  }
};

// Firestore helper to save services
export const saveServicesToFirestore = async (servicesArray) => {
  try {
    const { doc, setDoc } = await import("firebase/firestore");
    // Store as a single document to preserve grid positions easily
    await setDoc(doc(db, "settings", "services"), {
      list: servicesArray,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.warn("Firestore services save error:", error.message);
    return { success: false, error: error.message };
  }
};

// Firestore helper to load services
export const fetchServicesFromFirestore = async () => {
  try {
    const { doc, getDoc } = await import("firebase/firestore");
    const snap = await getDoc(doc(db, "settings", "services"));
    if (snap.exists()) {
      return snap.data().list;
    }
    return null;
  } catch (error) {
    console.warn("Firestore services load error:", error.message);
    return null;
  }
};
