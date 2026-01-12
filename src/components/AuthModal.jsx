import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, ArrowRight, User, Sparkles, Hexagon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotateX: 0,
    transition: { 
      type: "spring",
      damping: 25,
      stiffness: 300,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    rotateX: -10,
    transition: { duration: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function AuthModal({ isOpen, onClose, mode: initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, login, loginWithGoogle } = useAuth();
  const [hoveredInput, setHoveredInput] = useState(null);

  // Reset state when modal opens/closes or mode changes externally
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [isOpen, initialMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with Dynamic Blur */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-[#000000]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md bg-[#0A0A0A] rounded-[2rem] shadow-2xl overflow-hidden"
            style={{ perspective: '1000px' }}
          >
             {/* Animated Moving Border Gradient */}
             <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary opacity-20 animate-spin-slow blur-xl origin-center scale-150" />
             
             {/* Main Content Background */}
             <div className="absolute inset-[1px] bg-[#0A0A0A] rounded-[1.95rem] z-0" />
             
             {/* Decor Orbs */}
             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent z-0 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-all z-20"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative z-10 p-8">
                 
                 {/* Logo Animation */}
                 <div className="flex justify-center mb-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-primary blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
                        <div className="relative bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xl group-hover:border-primary/50 transition-colors duration-500">
                            <Hexagon className="w-8 h-8 text-primary fill-primary/10" />
                        </div>
                    </motion.div>
                 </div>

                 {/* Header & Toggle Switch */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <div className="inline-flex bg-black/20 p-1.5 rounded-2xl border border-white/5 relative mb-6 backdrop-blur-sm">
                        <motion.div 
                            className="absolute inset-y-1.5 rounded-xl bg-primary shadow-[0_0_15px_rgba(212,242,35,0.3)] z-0"
                            layoutId="activeTab"
                            initial={false}
                            animate={{
                                x: mode === 'login' ? 0 : '100%',
                                width: '50%'
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        <button
                            onClick={() => setMode('logi, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-3xl font-display font-bold text-white tracking-tight mb-2">
                                {mode === 'login' ? 'Welcome Back!' : 'Start Hiring'}
                            </h2>
                            <p className="text-gray-400 text-sm font-medium">
                                {mode === 'login' 
                                    ? 'Access your dashboard & manage candidates' 
                                    : 'Create an account to streamline recruitment'}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div variants={itemVariants} className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-widest mb-1 block">Email</label>
                        <div 
                            className={`relative group transition-all duration-300 rounded-xl border ${hoveredInput === 'email' ? 'border-primary shadow-[0_0_15px_-3px_rgba(212,242,35,0.2)] bg-white/5' : 'border-white/10 bg-white/[0.02]'}`}
                            onMouseEnter={() => setHoveredInput('email')}
                            onMouseLeave={() => setHoveredInput(null)}
                        >
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                                <Mail className="h-5 w-5" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@company.com"
                                className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-gray-600 focus:outline-none rounded-xl font-medium"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-widest mb-1 block">Password</label>
                        <div 
                            className={`relative group transition-all duration-300 rounded-xl border ${hoveredInput === 'password' ? 'border-primary shadow-[0_0_15px_-3px_rgba(212,242,35,0.2)] bg-white/5' : 'border-white/10 bg-white/[0.02]'}`}
                            onMouseEnter={() => setHoveredInput('password')}
                            onMouseLeave={() => setHoveredInput(null)}
                        >
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                                <Lock className="h-5 w-5" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Min. 8 characters"
                                className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-gray-600 focus:outline-none rounded-xl font-medium"
                            />
                        </div>
                    </motion.div>

                    <AnimatePresence>
                        {mode === 'signup' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                            className="overflow-hidden space-y-1"
                        >
                             <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-widest mb-1 block">Confirm Password</label>
                             <div 
                                className={`relative group mb-1 transition-all duration-300 rounded-xl border ${hoveredInput === 'confirm' ? 'border-primary shadow-[0_0_15px_-3px_rgba(212,242,35,0.2)] bg-white/5' : 'border-white/10 bg-white/[0.02]'}`}
                                onMouseEnter={() => setHoveredInput('confirm')}
                                onMouseLeave={() => setHoveredInput(null)}
                            >
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Re-enter password"
                                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-gray-600 focus:outline-none rounded-xl font-medium
                        >
                             <div 
                                className={`relative group mb-1 transition-all duration-300 rounded-xl border ${hoveredInput === 'confirm' ? 'border-primary/50 bg-white/5' : 'border-white/10 bg-white/[0.02]'}`}
                                onMouseEnter={() => setHoveredInput('confirm')}
                                onMouseLeave={() => setHoveredInput(null)}
                            >
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Confirm Password"
                                    className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-600 focus:outline-none rounded-xl"
                                />
                            </div>
                        </motion.div>
                        )}
                    </AnimatePresence>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20"
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-black font-bold rounded-xl shadow-[0_0_20px_rgba(212,242,35,0.3)] hover:shadow-[0_0_30px_rgba(212,242,35,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center gap-2">
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                {mode === 'login' ? 'Sign In' : 'Create Account'}
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                        </span>
                    </motion.button>
                </form>

                 {/* Divider */}
                <motion.div variants={itemVariants} className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wider">
                        <span className="px-3 bg-[#0A0A0A] text-gray-600">or</span>
                    </div>
                </motion.div>
                
                {/* Social Login */}
                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full py-3.5 bg-white/5 text-white font-medium rounded-xl border border-white/10 transition-all duration-200 flex items-center justify-center gap-3"
                >
                     <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
