import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { 
  X, Sparkles, Send, LogOut, MessageSquare, Check, Plus, 
  Trash2, UserCheck, Globe, Folder, ArrowRight, Image, 
  Lock, Activity, MessageCircle, HelpCircle, Loader2, HelpCircle as HelpIcon
} from 'lucide-react';
import { db, auth, googleAuthProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import { Project } from '../types';
import { projectsData } from '../data';

interface ClientHubProps {
  onClose: () => void;
}

interface SavedBrief {
  id: string;
  userId: string;
  userEmail: string;
  brandName: string;
  brandDescription: string;
  creativeConcept: string;
  colors: string[];
  typography: string;
  strategy: string;
  createdAt: any;
}

interface FeedbackPin {
  id: string;
  projectId: string;
  userId: string;
  userEmail: string;
  x: number;
  y: number;
  text: string;
  createdAt: any;
}

interface ChatMessage {
  id: string;
  userId: string;
  userEmail: string;
  author: string;
  text: string;
  role: 'client' | 'agency';
  createdAt: any;
}

export default function ClientHub({ onClose }: ClientHubProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'brief' | 'feedback' | 'chats'>('brief');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Brief Generator states
  const [brandName, setBrandName] = useState('');
  const [brandDesc, setBrandDesc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentBrief, setCurrentBrief] = useState<Omit<SavedBrief, 'id' | 'userId' | 'userEmail' | 'createdAt'> | null>(null);
  const [isSavingBrief, setIsSavingBrief] = useState(false);
  const [savedBriefs, setSavedBriefs] = useState<SavedBrief[]>([]);
  const [selectedBrief, setSelectedBrief] = useState<SavedBrief | null>(null);

  // Pin Feedback states
  const [selectedProject, setSelectedProject] = useState<Project>(projectsData[0]);
  const [feedbackPins, setFeedbackPins] = useState<FeedbackPin[]>([]);
  const [tempPin, setTempPin] = useState<{ x: number; y: number } | null>(null);
  const [pinText, setPinText] = useState('');
  const [isSavingPin, setIsSavingPin] = useState(false);

  // Chat Feed states
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!isDemoMode) {
        setUser(currentUser);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [isDemoMode]);

  // Listen for saved briefs
  useEffect(() => {
    if (!user) {
      setSavedBriefs([]);
      return;
    }

    if (isDemoMode) {
      const loadLocalBriefs = () => {
        const local = localStorage.getItem('amtop_briefs');
        setSavedBriefs(local ? JSON.parse(local) : []);
      };
      loadLocalBriefs();
      window.addEventListener('storage', loadLocalBriefs);
      return () => window.removeEventListener('storage', loadLocalBriefs);
    }

    const path = 'briefs';
    const q = query(
      collection(db, path),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const briefs: SavedBrief[] = [];
      snapshot.forEach((docSnap) => {
        briefs.push({ id: docSnap.id, ...docSnap.data() } as SavedBrief);
      });
      setSavedBriefs(briefs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [user, isDemoMode]);

  // Listen for feedback pins on the current selected project
  useEffect(() => {
    if (!user) return;

    if (isDemoMode) {
      const loadLocalPins = () => {
        const local = localStorage.getItem('amtop_pins');
        const pins: FeedbackPin[] = local ? JSON.parse(local) : [];
        setFeedbackPins(pins.filter((p) => p.projectId === selectedProject.id));
      };
      loadLocalPins();
      window.addEventListener('storage', loadLocalPins);
      return () => window.removeEventListener('storage', loadLocalPins);
    }

    const path = 'feedbackPins';
    const q = query(
      collection(db, path),
      where('projectId', '==', selectedProject.id),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pins: FeedbackPin[] = [];
      snapshot.forEach((docSnap) => {
        pins.push({ id: docSnap.id, ...docSnap.data() } as FeedbackPin);
      });
      setFeedbackPins(pins);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [user, selectedProject, isDemoMode]);

  // Listen for team chat log
  useEffect(() => {
    if (!user) return;

    if (isDemoMode) {
      const loadLocalChats = () => {
        const local = localStorage.getItem('amtop_chats');
        const defaultChats: ChatMessage[] = [
          {
            id: 'demo-c1',
            userId: 'agency',
            userEmail: 'director@amtop.com',
            author: 'Creative Director',
            text: 'Welcome to your premium amTOP collaborative workspace! Placed pins will be reviewed by our designers.',
            role: 'agency',
            createdAt: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 'demo-c2',
            userId: 'agency',
            userEmail: 'developer@amtop.com',
            author: 'Lead Developer',
            text: 'All layout files and asset configurations have been updated. The background video runs seamlessly.',
            role: 'agency',
            createdAt: new Date(Date.now() - 1800000).toISOString()
          }
        ];
        const userChats: ChatMessage[] = local ? JSON.parse(local) : [];
        setChats([...defaultChats, ...userChats]);
        
        setTimeout(() => {
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      };
      loadLocalChats();
      window.addEventListener('storage', loadLocalChats);
      return () => window.removeEventListener('storage', loadLocalChats);
    }

    const path = 'chats';
    const q = query(
      collection(db, path),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((docSnap) => {
        messages.push({ id: docSnap.id, ...docSnap.data() } as ChatMessage);
      });
      setChats(messages);
      
      // Auto-scroll chat
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [user, isDemoMode]);

  // Authenticate Google Sign-in
  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err: any) {
      console.error('Google Auth Failed:', err);
      if (err?.code === 'auth/popup-closed-by-user') {
        setAuthError('The authentication popup was closed. Because the developer preview runs in an iframe, cross-origin communication can be blocked by browsers.');
      } else {
        setAuthError(err?.message || String(err));
      }
    }
  };

  // Sign in as guest (Demo Mode)
  const handleDemoSignIn = () => {
    setIsDemoMode(true);
    setAuthError(null);
    setUser({
      uid: 'demo-partner-id',
      email: 'partner@workspace.com',
      displayName: 'Aesthetic Partner (Demo)',
      photoURL: null,
      emailVerified: true
    } as any);
  };

  // Log out
  const handleSignOut = async () => {
    try {
      if (isDemoMode) {
        setIsDemoMode(false);
        setUser(null);
      } else {
        await signOut(auth);
      }
      // Reset local state
      setCurrentBrief(null);
      setSelectedBrief(null);
      setTempPin(null);
    } catch (err) {
      console.error('Sign Out Failed:', err);
    }
  };

  // Generate aesthetics brief via server proxy (Gemini API)
  const handleGenerateBrief = async (e: FormEvent) => {
    e.preventDefault();
    if (!brandName || !brandDesc) return;

    setIsGenerating(true);
    setCurrentBrief(null);
    setSelectedBrief(null);

    try {
      const res = await fetch('/api/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandName, brandDescription: brandDesc })
      });

      const data = await res.json();
      if (res.ok && data.brandBrief) {
        setCurrentBrief(data.brandBrief);
      } else {
        throw new Error(data.error || 'Server rejected request');
      }
    } catch (err) {
      console.error('Failed generating aesthetics brief:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Save generated brief to Firestore or LocalStorage
  const handleSaveBrief = async () => {
    if (!user || !currentBrief) return;
    setIsSavingBrief(true);

    if (isDemoMode) {
      try {
        const newBrief: SavedBrief = {
          id: 'local-brief-' + Date.now(),
          userId: user.uid,
          userEmail: user.email || 'partner@workspace.com',
          brandName: currentBrief.brandName,
          brandDescription: currentBrief.brandDescription,
          creativeConcept: currentBrief.creativeConcept,
          colors: currentBrief.colors,
          typography: currentBrief.typography,
          strategy: currentBrief.strategy,
          createdAt: new Date().toISOString()
        };
        const local = localStorage.getItem('amtop_briefs');
        const list = local ? JSON.parse(local) : [];
        list.unshift(newBrief);
        localStorage.setItem('amtop_briefs', JSON.stringify(list));
        window.dispatchEvent(new Event('storage'));
        setCurrentBrief(null);
      } catch (err) {
        console.error('Failed to save brief locally:', err);
      } finally {
        setIsSavingBrief(false);
      }
      return;
    }

    const path = 'briefs';
    try {
      const docPayload = {
        userId: user.uid,
        userEmail: user.email || 'partner@workspace.com',
        brandName: currentBrief.brandName,
        brandDescription: currentBrief.brandDescription,
        creativeConcept: currentBrief.creativeConcept,
        colors: currentBrief.colors,
        typography: currentBrief.typography,
        strategy: currentBrief.strategy,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, path), docPayload);
      setCurrentBrief(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    } finally {
      setIsSavingBrief(false);
    }
  };

  // Delete saved brief from Firestore or LocalStorage
  const handleDeleteBrief = async (briefId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (isDemoMode) {
      const local = localStorage.getItem('amtop_briefs');
      if (local) {
        const list: SavedBrief[] = JSON.parse(local);
        const filtered = list.filter((b) => b.id !== briefId);
        localStorage.setItem('amtop_briefs', JSON.stringify(filtered));
        window.dispatchEvent(new Event('storage'));
      }
      if (selectedBrief?.id === briefId) {
        setSelectedBrief(null);
      }
      return;
    }

    const path = `briefs/${briefId}`;
    try {
      await deleteDoc(doc(db, 'briefs', briefId));
      if (selectedBrief?.id === briefId) {
        setSelectedBrief(null);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  // Click on project image to prepare feedback pin
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10;
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10;
    setTempPin({ x, y });
  };

  // Save feedback pin to Firestore or LocalStorage
  const handleSavePin = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !tempPin || !pinText.trim()) return;

    setIsSavingPin(true);

    if (isDemoMode) {
      try {
        const newPin: FeedbackPin = {
          id: 'local-pin-' + Date.now(),
          projectId: selectedProject.id,
          userId: user.uid,
          userEmail: user.email || 'partner@workspace.com',
          x: tempPin.x,
          y: tempPin.y,
          text: pinText.trim(),
          createdAt: new Date().toISOString()
        };
        const local = localStorage.getItem('amtop_pins');
        const list = local ? JSON.parse(local) : [];
        list.push(newPin);
        localStorage.setItem('amtop_pins', JSON.stringify(list));
        window.dispatchEvent(new Event('storage'));
        
        setTempPin(null);
        setPinText('');
      } catch (err) {
        console.error('Failed to save pin locally:', err);
      } finally {
        setIsSavingPin(false);
      }
      return;
    }

    const path = 'feedbackPins';
    try {
      await addDoc(collection(db, path), {
        projectId: selectedProject.id,
        userId: user.uid,
        userEmail: user.email || 'partner@workspace.com',
        x: tempPin.x,
        y: tempPin.y,
        text: pinText.trim(),
        createdAt: serverTimestamp()
      });

      setTempPin(null);
      setPinText('');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    } finally {
      setIsSavingPin(false);
    }
  };

  // Delete feedback pin from Firestore or LocalStorage
  const handleDeletePin = async (pinId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (isDemoMode) {
      const local = localStorage.getItem('amtop_pins');
      if (local) {
        const list: FeedbackPin[] = JSON.parse(local);
        const filtered = list.filter((p) => p.id !== pinId);
        localStorage.setItem('amtop_pins', JSON.stringify(filtered));
        window.dispatchEvent(new Event('storage'));
      }
      return;
    }

    const path = `feedbackPins/${pinId}`;
    try {
      await deleteDoc(doc(db, 'feedbackPins', pinId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  // Send team stream chat
  const handleSendChat = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !chatInput.trim()) return;

    setIsSendingChat(true);

    if (isDemoMode) {
      try {
        const newMsg: ChatMessage = {
          id: 'local-chat-' + Date.now(),
          userId: user.uid,
          userEmail: user.email || 'partner@workspace.com',
          author: user.displayName || 'Client Partner',
          text: chatInput.trim(),
          role: 'client',
          createdAt: new Date().toISOString()
        };
        const local = localStorage.getItem('amtop_chats');
        const list = local ? JSON.parse(local) : [];
        list.push(newMsg);
        localStorage.setItem('amtop_chats', JSON.stringify(list));
        window.dispatchEvent(new Event('storage'));

        setChatInput('');
      } catch (err) {
        console.error('Failed to send local chat:', err);
      } finally {
        setIsSendingChat(false);
      }
      return;
    }

    const path = 'chats';
    try {
      await addDoc(collection(db, path), {
        userId: user.uid,
        userEmail: user.email || 'partner@workspace.com',
        author: user.displayName || user.email?.split('@')[0] || 'Client Partner',
        text: chatInput.trim(),
        role: 'client',
        createdAt: serverTimestamp()
      });

      setChatInput('');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    } finally {
      setIsSendingChat(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
      {/* Heavy obsidian frosted glass overlay */}
      <motion.div 
        id="client-hub-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Main Workspace Panel - Slide Out */}
      <motion.div 
        id="client-hub-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="relative w-full max-w-5xl h-full bg-[#0A0A0B] text-white border-l border-white/10 shadow-3xl flex flex-col z-10 font-sans"
      >
        {/* Workspace Top Header Bar */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-pulse"></div>
            <div>
              <h2 className="font-mono text-xs font-bold tracking-widest text-[#8E8E93] uppercase">
                amTOP Studio Cloud / Workspace
              </h2>
              {user && (
                <p className="text-[11px] text-[#00FF66] font-mono tracking-tight flex items-center gap-1 mt-0.5">
                  <UserCheck className="w-3 h-3" /> Secure session active: {user.email}
                </p>
              )}
            </div>
          </div>
          <button 
            id="client-hub-close"
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 hover:border-white/30 text-[#8E8E93] hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* LOADING GATE */}
        {authLoading ? (
          <div className="flex-grow flex flex-col items-center justify-center gap-3 text-[#8E8E93]">
            <Loader2 className="w-8 h-8 animate-spin text-[#00FF66]" />
            <p className="font-mono text-xs tracking-wider">SECURE CONNECTION RESOLVING...</p>
          </div>
        ) : !user ? (
          /* LOGIN ENTRANCE WALL - Extremely high design ($500k feel) */
          <div className="flex-grow flex flex-col lg:flex-row items-stretch">
            {/* Left Column: Atmospheric Studio Visual Brand */}
            <div className="hidden lg:flex lg:w-5/12 bg-cover bg-center relative flex-col justify-between p-10 border-r border-white/10" 
                 style={{ backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 11, 0.4), rgba(10, 10, 11, 0.9)), url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')` }}>
              <div className="space-y-2">
                <span className="font-mono text-[10px] bg-white/10 text-white/80 px-2 py-1 rounded-sm tracking-widest uppercase">
                  PRIVATE WORKSPACE
                </span>
                <p className="text-3xl font-display font-light tracking-tight text-white mt-4">
                  Where ideas crystallize into <span className="font-medium text-[#00FF66]">pure digital form</span>.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-xs text-white/50 leading-relaxed font-mono">
                  Enter your encrypted amTOP portal to align custom architectural specifications, pin structural feedback on design frames, and chat synchronously with our core engineering team.
                </p>
                <div className="flex items-center gap-4 text-[10px] text-white/40 font-mono">
                  <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-[#00FF66]" /> LATENCY ~14MS</span>
                  <span>•</span>
                  <span>SSL 256-BIT ENCRYPTION</span>
                </div>
              </div>
            </div>

            {/* Right Column: High contrast minimal sign-in form */}
            <div className="flex-grow flex flex-col justify-center items-center p-8 md:p-12">
              <div className="max-w-md w-full space-y-8 text-center lg:text-left">
                <div className="space-y-3">
                  <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10">
                    <Lock className="w-8 h-8 text-[#00FF66]" />
                  </div>
                  <h3 className="text-3xl font-display font-bold tracking-tight">
                    Partner Verification
                  </h3>
                  <p className="text-sm text-[#8E8E93] leading-relaxed">
                    Access is strictly restricted to active clients and studio directors. Log in via your registered Google Identity to activate the real-time collaboration engine.
                  </p>
                </div>

                {authError && (
                  <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-left space-y-3">
                    <div className="flex gap-2.5 items-start">
                      <span className="p-1 rounded bg-red-500/10 text-red-400 font-mono text-[9px] font-bold">SECURITY ALERT</span>
                      <p className="text-xs text-red-300 leading-relaxed font-mono">
                        {authError}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-red-500/10 space-y-2 text-[11px] text-[#8E8E93] leading-relaxed">
                      <p className="font-semibold text-white">To resolve this constraint:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>
                          <strong className="text-white">Open in New Tab</strong>: Look at the top-right header of this preview container and click the <strong className="text-[#00FF66]">"Open in a new tab"</strong> icon. Due to browser third-party cookie restrictions, Google Sign-In cannot open inside an embedded iframe.
                        </li>
                        <li>
                          <strong className="text-white">Allow Popups</strong>: Verify that your browser is not blocking popup windows for this application.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    id="client-hub-login-btn"
                    onClick={handleSignIn}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold rounded-xl px-6 py-4 transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 shadow-lg cursor-pointer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.98 1 12 1 7.35 1 3.37 3.75 1.58 7.72l3.82 2.96C6.35 7.42 8.97 5.04 12 5.04z"/>
                      <path fill="#4285F4" d="M23.45 12.3c0-.82-.07-1.6-.21-2.3H12v4.4h6.43c-.28 1.44-1.1 2.66-2.33 3.48l3.63 2.8c2.12-1.95 3.35-4.83 3.35-8.38z"/>
                      <path fill="#FBBC05" d="M5.4 14.68c-.24-.72-.38-1.49-.38-2.28 0-.79.14-1.56.38-2.28L1.58 7.16C.57 9.12 0 11.33 0 12.68c0 1.35.57 3.56 1.58 5.52l3.82-3.52z"/>
                      <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.63-2.8c-1.1.74-2.5 1.18-4.33 1.18-3.03 0-5.65-2.38-6.56-5.64l-3.82 2.96C3.37 20.25 7.35 23 12 23z"/>
                    </svg>
                    <span className="font-mono text-xs font-bold tracking-widest uppercase">VERIFY GOOGLE IDENTITY</span>
                  </button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink mx-4 text-[10px] font-mono text-white/20 uppercase tracking-widest">or bypass</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </div>

                  <button
                    id="client-hub-demo-btn"
                    onClick={handleDemoSignIn}
                    className="w-full flex items-center justify-center gap-2 bg-white/5 text-white/90 hover:text-white font-mono text-xs font-bold tracking-wider rounded-xl px-6 py-4 transition-all duration-300 border border-white/10 hover:border-[#00FF66]/30 hover:bg-[#00FF66]/5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#00FF66]" />
                    <span>ENTER LOCAL DEMO MODE</span>
                  </button>
                </div>

                <p className="text-[11px] text-white/30 text-center lg:text-left leading-relaxed">
                  By connecting, you authorize secure metadata logging under standard workspace permissions. If your email is not pre-registered, our staff will review your request in real-time.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* WORKSPACE INTERACTIVE DASHBOARD */
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            
            {/* LEFT NAVIGATION COLUMN: Workspace Streams */}
            <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 bg-black/20 flex flex-col">
              
              {/* User Bio and Logout */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-9 h-9 rounded-full border border-white/20" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#00FF66]/25 border border-[#00FF66]/50 flex items-center justify-center font-mono text-[#00FF66] font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate leading-tight">{user.displayName || 'Client Partner'}</p>
                    <span className="text-[10px] text-[#8E8E93] font-mono block tracking-tight uppercase">CLIENT ACCESS</span>
                  </div>
                </div>
                <button
                  id="client-hub-logout-btn"
                  onClick={handleSignOut}
                  title="Disconnect Workspace"
                  className="p-2 text-[#8E8E93] hover:text-white rounded-lg border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="p-4 space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-white/30 block px-3 mb-2 uppercase">CORE WORKSPACE LABS</span>
                
                <button
                  id="tab-brief-btn"
                  onClick={() => setActiveTab('brief')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'brief'
                      ? 'bg-white/10 text-white font-medium border border-white/10'
                      : 'text-[#8E8E93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className={`w-4 h-4 ${activeTab === 'brief' ? 'text-[#00FF66]' : 'text-[#8E8E93]'}`} />
                    <span className="text-xs font-mono tracking-wider uppercase">Brief Architect</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-white/10">AI</span>
                </button>

                <button
                  id="tab-feedback-btn"
                  onClick={() => setActiveTab('feedback')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'feedback'
                      ? 'bg-white/10 text-white font-medium border border-white/10'
                      : 'text-[#8E8E93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Image className={`w-4 h-4 ${activeTab === 'feedback' ? 'text-[#00FF66]' : 'text-[#8E8E93]'}`} />
                    <span className="text-xs font-mono tracking-wider uppercase">Interactive Markup</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-white/10">{feedbackPins.length}</span>
                </button>

                <button
                  id="tab-chats-btn"
                  onClick={() => setActiveTab('chats')}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left ${
                    activeTab === 'chats'
                      ? 'bg-white/10 text-white font-medium border border-white/10'
                      : 'text-[#8E8E93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className={`w-4 h-4 ${activeTab === 'chats' ? 'text-[#00FF66]' : 'text-[#8E8E93]'}`} />
                    <span className="text-xs font-mono tracking-wider uppercase">Team activity stream</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 font-bold">LIVE</span>
                </button>
              </div>

              {/* Status and Active Members */}
              <div className="mt-auto p-4 border-t border-white/10 text-[10px] font-mono text-[#8E8E93] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping"></span>
                  <span>FIRESTORE CLOUD INTEGRATION</span>
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <Globe className="w-3.5 h-3.5 text-[#00FF66]" />
                  <span>Syncing: asia-southeast1</span>
                </div>
              </div>
            </div>

            {/* RIGHT WORK AREA: Content based on Active Tab */}
            <div className="flex-grow flex flex-col overflow-y-auto bg-black/10">
              
              {/* TAB 1: BRIEF ARCHITECT (GEMINI API PROXIED BRIEF GENERATION) */}
              <AnimatePresence mode="wait">
                {activeTab === 'brief' && (
                  <motion.div
                    key="tab-brief"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-6 md:p-8 space-y-8"
                  >
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-bold tracking-tight text-white">
                        Gemini-Powered Aesthetic Studio
                      </h3>
                      <p className="text-sm text-[#8E8E93] max-w-2xl leading-relaxed">
                        Input your brand vision to command our integrated server-side Gemini Model. It returns a bespoke premium visual identity strategy, hex swatches, typography recommendations, and market positioning guidelines instantly, which you can save to Firestore.
                      </p>
                    </div>

                    <form id="brief-architect-form" onSubmit={handleGenerateBrief} className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="brief-brand-name" className="text-[10px] font-mono font-bold tracking-wider text-[#8E8E93] uppercase">
                          Brand Name / Product Concept
                        </label>
                        <input
                          id="brief-brand-name"
                          type="text"
                          placeholder="e.g. SORA SKINCARE"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          className="px-4 py-3 bg-black border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#00FF66] transition-colors"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="brief-brand-desc" className="text-[10px] font-mono font-bold tracking-wider text-[#8E8E93] uppercase">
                          Describe Brand Energy, Aesthetic Style, and Targets
                        </label>
                        <textarea
                          id="brief-brand-desc"
                          rows={3}
                          placeholder="e.g. A hyper-minimalist skincare brand catering to Tokyo urbanites. Focus on absolute black-and-white palettes, raw raw organic textures, and Swiss typography layouts. We target a 200% premium market elevation."
                          value={brandDesc}
                          onChange={(e) => setBrandDesc(e.target.value)}
                          className="px-4 py-3 bg-black border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#00FF66] transition-colors resize-none"
                          required
                        />
                      </div>

                      <button
                        id="brief-generate-btn"
                        type="submit"
                        disabled={isGenerating}
                        className="w-full py-3 px-5 bg-white text-black rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:bg-[#00FF66] hover:text-black flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                            GEMINI ALIGNING BRAND GEOMETRIES...
                          </>
                        ) : (
                          <>
                            ARCHITECT BRAND AESTHETIC
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>

                    {/* BRIEF RENDER BOX */}
                    <AnimatePresence>
                      {currentBrief && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-6 bg-gradient-to-br from-black to-neutral-900 border border-[#00FF66]/20 rounded-2xl space-y-6"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[#00FF66]">
                              <Sparkles className="w-5 h-5 animate-pulse" />
                              <span className="font-mono text-xs font-bold tracking-widest uppercase">GENERATED BRAND ARCHITECTURE</span>
                            </div>
                            <button
                              id="brief-save-btn"
                              onClick={handleSaveBrief}
                              disabled={isSavingBrief}
                              className="px-4 py-1.5 bg-[#00FF66] text-black font-mono text-[10px] font-bold rounded-lg uppercase tracking-wider hover:bg-[#00FF66]/95 transition-all cursor-pointer flex items-center gap-1"
                            >
                              {isSavingBrief ? 'Syncing...' : 'Save to Workspace'}
                            </button>
                          </div>

                          <div className="border-t border-white/10 pt-4 space-y-4">
                            <div>
                              <h4 className="font-display text-2xl font-black">{currentBrief.brandName}</h4>
                              <p className="text-xs text-[#8E8E93] mt-1 italic">{currentBrief.brandDescription}</p>
                            </div>

                            <div className="space-y-1.5">
                              <h5 className="text-[10px] font-mono font-bold text-[#8E8E93] tracking-widest uppercase">CREATIVE DIRECTION & MOOD</h5>
                              <p className="text-xs text-white/80 leading-relaxed font-sans">{currentBrief.creativeConcept}</p>
                            </div>

                            {/* Colors Swatch Grid */}
                            <div className="space-y-2">
                              <h5 className="text-[10px] font-mono font-bold text-[#8E8E93] tracking-widest uppercase">BESPOKE BRAND COLOR PALETTE</h5>
                              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {currentBrief.colors.map((hex, i) => (
                                  <div key={i} className="bg-white/5 p-2 rounded-xl border border-white/10 flex flex-col items-center gap-2">
                                    <div 
                                      className="w-full h-12 rounded-lg border border-white/10 shadow-inner" 
                                      style={{ backgroundColor: hex }}
                                    />
                                    <span className="font-mono text-[9px] font-bold tracking-wider uppercase text-white/80">{hex}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
                                <h5 className="text-[10px] font-mono font-bold text-[#8E8E93] tracking-widest uppercase">TYPOGRAPHIC SYSTEM</h5>
                                <p className="text-xs text-white/90 font-mono">{currentBrief.typography}</p>
                              </div>
                              <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
                                <h5 className="text-[10px] font-mono font-bold text-[#8E8E93] tracking-widest uppercase">PRODUCTION STRATEGY</h5>
                                <p className="text-xs text-white/90 leading-relaxed">{currentBrief.strategy}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* SAVED BRIEFS REAL-TIME LIBRARY */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-[#8E8E93]" />
                        <span className="text-[10px] font-mono font-bold tracking-wider text-[#8E8E93] uppercase">SAVED WORKSPACE BRIEFS ({savedBriefs.length})</span>
                      </div>

                      {savedBriefs.length === 0 ? (
                        <p className="text-xs text-white/30 font-mono">No briefs saved in your workspace cloud yet. Create one above.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {savedBriefs.map((brief) => (
                            <div
                              id={`saved-brief-${brief.id}`}
                              key={brief.id}
                              onClick={() => setSelectedBrief(selectedBrief?.id === brief.id ? null : brief)}
                              className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                                selectedBrief?.id === brief.id
                                  ? 'bg-[#151518] border-[#00FF66]/30'
                                  : 'bg-white/5 border-white/10 hover:border-white/20'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <h4 className="font-mono text-xs font-bold text-[#00FF66] uppercase tracking-wider truncate">{brief.brandName}</h4>
                                  <p className="text-[10px] text-white/50 truncate mt-0.5">{brief.brandDescription}</p>
                                </div>
                                <button
                                  id={`delete-brief-${brief.id}`}
                                  onClick={(e) => handleDeleteBrief(brief.id, e)}
                                  className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                                  title="Remove Saved Brief"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Brief details inside library card */}
                              <AnimatePresence>
                                {selectedBrief?.id === brief.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden border-t border-white/5 mt-4 pt-4 space-y-4 text-xs"
                                  >
                                    <div>
                                      <p className="text-[9px] font-mono text-[#8E8E93] tracking-widest uppercase">CREATIVE DIRECTION</p>
                                      <p className="text-white/80 leading-relaxed mt-1">{brief.creativeConcept}</p>
                                    </div>

                                    <div>
                                      <p className="text-[9px] font-mono text-[#8E8E93] tracking-widest uppercase mb-1.5">COLORS</p>
                                      <div className="flex flex-wrap gap-1.5">
                                        {brief.colors.map((hex, index) => (
                                          <div key={index} className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10">
                                            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: hex }} />
                                            <span className="font-mono text-[9px] text-white/70">{hex}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <p className="text-[9px] font-mono text-[#8E8E93] tracking-widest uppercase">TYPOGRAPHIC SYSTEM</p>
                                      <p className="text-white/80 font-mono mt-1">{brief.typography}</p>
                                    </div>

                                    <div>
                                      <p className="text-[9px] font-mono text-[#8E8E93] tracking-widest uppercase">PRODUCTION STRATEGY</p>
                                      <p className="text-white/80 leading-relaxed mt-1">{brief.strategy}</p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* TAB 2: INTERACTIVE MARKUP (PIN COMMET FEEDBACK ON PROJECTS) */}
              <AnimatePresence mode="wait">
                {activeTab === 'feedback' && (
                  <motion.div
                    key="tab-feedback"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-6 md:p-8 space-y-8"
                  >
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-bold tracking-tight text-white">
                        Interactive Collaboration Markup
                      </h3>
                      <p className="text-sm text-[#8E8E93] max-w-2xl leading-relaxed">
                        Choose an active agency design layout from the slider, click anywhere on the interface mockup to map a feedback annotation pin, and sync your thoughts instantly to our creative queue.
                      </p>
                    </div>

                    {/* Project Selector Horizontal Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/10">
                      {projectsData.map((project) => (
                        <button
                          id={`feedback-project-tab-${project.id}`}
                          key={project.id}
                          onClick={() => {
                            setSelectedProject(project);
                            setTempPin(null);
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold shrink-0 cursor-pointer border transition-all ${
                            selectedProject.id === project.id
                              ? 'bg-[#00FF66] text-black border-[#00FF66]'
                              : 'bg-white/5 text-[#8E8E93] border-white/10 hover:border-white/20'
                          }`}
                        >
                          {project.title}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Left: Project Image Stage with Feedback Pins Overlay */}
                      <div className="lg:col-span-8 space-y-3">
                        <span className="text-[10px] font-mono font-bold text-[#8E8E93] tracking-widest uppercase block">
                          COLLABORATION CANVAS (CLICK PORTFOLIO IMAGE TO DEPOSIT PINS)
                        </span>

                        <div 
                          id="feedback-image-stage"
                          onClick={handleImageClick}
                          className="relative overflow-hidden rounded-2xl border border-white/15 cursor-crosshair group shadow-xl bg-neutral-900"
                        >
                          <img 
                            src={selectedProject.imageSrc} 
                            alt={selectedProject.title} 
                            className="w-full h-auto object-cover select-none pointer-events-none"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors pointer-events-none" />

                          {/* Existing Placed Pins */}
                          {feedbackPins.map((pin) => (
                            <div
                              id={`feedback-pin-${pin.id}`}
                              key={pin.id}
                              className="absolute -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer"
                              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="absolute -inset-2 rounded-full bg-[#00FF66]/20 animate-ping" />
                              <div className="relative w-5 h-5 rounded-full bg-[#00FF66] text-black font-mono font-bold text-[9px] flex items-center justify-center border border-black shadow-lg">
                                •
                              </div>

                              {/* Hover Tooltip detailing comment */}
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 p-3 bg-black/95 text-white border border-white/20 rounded-xl shadow-2xl opacity-0 scale-95 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:scale-100 group-hover/pin:pointer-events-auto transition-all z-40">
                                <p className="text-[10px] text-white/95 leading-normal">{pin.text}</p>
                                <div className="border-t border-white/10 mt-2 pt-1 flex items-center justify-between text-[8px] font-mono text-white/50">
                                  <span className="truncate max-w-[120px]">{pin.userEmail}</span>
                                  {pin.userId === user.uid && (
                                    <button
                                      id={`delete-pin-hover-${pin.id}`}
                                      onClick={(e) => handleDeletePin(pin.id, e)}
                                      className="text-red-400 hover:text-red-300 font-bold uppercase transition-colors"
                                    >
                                      Resolve
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Placed Temporary Pending Pin */}
                          {tempPin && (
                            <div
                              id="feedback-temp-pin"
                              className="absolute -translate-x-1/2 -translate-y-1/2"
                              style={{ left: `${tempPin.x}%`, top: `${tempPin.y}%` }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="absolute -inset-3 rounded-full bg-white/30 animate-pulse" />
                              <div className="relative w-5.5 h-5.5 rounded-full bg-white text-black font-mono font-bold text-[10px] flex items-center justify-center border-2 border-[#00FF66] shadow-lg">
                                +
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Feedback input form / annotations index */}
                      <div className="lg:col-span-4 space-y-6">
                        
                        {/* Interactive Add Annotation Form */}
                        <AnimatePresence>
                          {tempPin ? (
                            <motion.form
                              id="feedback-pin-form"
                              onSubmit={handleSavePin}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="p-5 bg-white/5 border border-[#00FF66]/20 rounded-2xl space-y-4"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[9px] text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/20 px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                                  PLACEMENT PENDING ({tempPin.x}%, {tempPin.y}%)
                                </span>
                                <button
                                  id="feedback-cancel-pin"
                                  type="button"
                                  onClick={() => setTempPin(null)}
                                  className="text-xs text-white/40 hover:text-white"
                                >
                                  Cancel
                                </button>
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label htmlFor="pin-comment" className="text-[9px] font-mono font-bold text-[#8E8E93] uppercase tracking-widest">
                                  FEEDBACK COMMENT
                                </label>
                                <textarea
                                  id="pin-comment"
                                  rows={3}
                                  placeholder="Specify visual edit thoughts or copy adjustments..."
                                  value={pinText}
                                  onChange={(e) => setPinText(e.target.value)}
                                  className="px-3 py-2 bg-black border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00FF66] transition-colors resize-none"
                                  required
                                />
                              </div>

                              <button
                                id="feedback-pin-submit"
                                type="submit"
                                disabled={isSavingPin || !pinText.trim()}
                                className="w-full py-2.5 bg-white text-black rounded-lg text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#00FF66] flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                              >
                                {isSavingPin ? 'SYNCING PIN...' : 'PIN COMMENT'}
                              </button>
                            </motion.form>
                          ) : (
                            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl text-center space-y-2">
                              <HelpIcon className="w-5 h-5 text-white/30 mx-auto" />
                              <p className="text-xs font-mono font-semibold">NEED REVISIONS?</p>
                              <p className="text-[11px] text-white/40">Click anywhere on the image mockup to create a revision coordinate pin.</p>
                            </div>
                          )}
                        </AnimatePresence>

                        {/* Annotations List */}
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono font-bold text-[#8E8E93] tracking-widest uppercase block">
                            ACTIVE ANNOTATIONS ({feedbackPins.length})
                          </span>

                          {feedbackPins.length === 0 ? (
                            <p className="text-xs text-white/30 font-mono">No feedback pins mapped on this layout yet.</p>
                          ) : (
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                              {feedbackPins.map((pin) => (
                                <div
                                  id={`annotation-list-item-${pin.id}`}
                                  key={pin.id}
                                  className="p-3 bg-white/5 border border-white/10 rounded-xl text-[11px] space-y-1.5 flex flex-col justify-between"
                                >
                                  <p className="text-white/80 leading-relaxed font-sans">{pin.text}</p>
                                  <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-1.5 border-t border-white/5">
                                    <span className="truncate max-w-[130px]">{pin.userEmail}</span>
                                    {pin.userId === user.uid && (
                                      <button
                                        id={`delete-pin-list-${pin.id}`}
                                        onClick={(e) => handleDeletePin(pin.id, e)}
                                        className="text-red-400 hover:text-red-300 font-semibold"
                                      >
                                        Delete
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* TAB 3: REAL-TIME TEAM CHAT (SYNCED CHAT WITH SEEDED TEAM UPDATES) */}
              <AnimatePresence mode="wait">
                {activeTab === 'chats' && (
                  <motion.div
                    key="tab-chats"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col h-[calc(100vh-140px)]"
                  >
                    {/* Chat Hub Header */}
                    <div className="p-6 border-b border-white/10 bg-black/10">
                      <h3 className="text-2xl font-display font-bold tracking-tight text-white">
                        Creative Activity Stream
                      </h3>
                      <p className="text-sm text-[#8E8E93] leading-relaxed">
                        This real-time stream syncs your remarks instantly to our agency. Use this feed for general project updates, typography discussions, and coordinate adjustments.
                      </p>
                    </div>

                    {/* Chat Messages Log */}
                    <div className="flex-grow p-6 overflow-y-auto space-y-4 flex flex-col">
                      {chats.length === 0 && (
                        /* Default starting message from agency director */
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl max-w-md space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00FF66]" />
                            <span className="text-[10px] font-mono font-bold uppercase text-[#00FF66]">Hiroshi Tanaka • Principal Director</span>
                          </div>
                          <p className="text-xs text-white/90 leading-relaxed font-sans">
                            Welcome to your secure client workspace. Align your design philosophies above, drop feedback markers, or type standard questions here. We're actively reviewing the canvas in Tokyo/asia-southeast1.
                          </p>
                        </div>
                      )}

                      {chats.map((chat) => {
                        const isSelf = chat.userId === user.uid;
                        return (
                          <div
                            id={`chat-msg-${chat.id}`}
                            key={chat.id}
                            className={`flex flex-col max-w-lg p-4 rounded-2xl border ${
                              isSelf
                                ? 'bg-white/10 border-white/20 self-end'
                                : 'bg-neutral-900 border-white/10 self-start'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1.5 justify-between">
                              <span className={`text-[9px] font-mono font-bold uppercase ${isSelf ? 'text-[#00FF66]' : 'text-[#8E8E93]'}`}>
                                {isSelf ? 'You' : chat.author} ({chat.role})
                              </span>
                              {!isSelf && (
                                <span className="text-[8px] font-mono text-white/30 truncate max-w-[120px]">{chat.userEmail}</span>
                              )}
                            </div>
                            <p className="text-xs text-white/90 leading-relaxed font-sans select-text">{chat.text}</p>
                          </div>
                        );
                      })}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Chat input box */}
                    <form id="chats-input-form" onSubmit={handleSendChat} className="p-4 border-t border-white/10 bg-black/30 flex gap-3">
                      <input
                        id="chat-input-text"
                        type="text"
                        placeholder="Dispatch remark to the design stream..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="flex-grow px-4 py-3 bg-black border border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#00FF66] transition-colors"
                        required
                      />
                      <button
                        id="chat-send-btn"
                        type="submit"
                        disabled={isSendingChat || !chatInput.trim()}
                        className="px-5 bg-white text-black rounded-xl text-xs font-mono font-bold uppercase transition-all duration-300 hover:bg-[#00FF66] hover:text-black flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSendingChat ? (
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                        ) : (
                          <>
                            DISPATCH
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
