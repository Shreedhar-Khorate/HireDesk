import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, FileText } from 'lucide-react';
import api from '../utils/api';

export default function AddJobModal({ isOpen, onClose, onJobAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/recruitment/jobs/', {
        title,
        description,
        requirements
      });
      
      onJobAdded(response.data);
      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setRequirements('');
    } catch (err) {
      console.error("Job creation error:", err);
      console.error("Error response:", err.response);
      console.error("Error data:", err.response?.data);
      
      let errorMessage = 'Failed to create job';
      
      if (err.response?.data) {
        // Check for various error formats
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else {
          errorMessage = JSON.stringify(err.response.data);
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#000000]/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#0A0A0A]/90 border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                Post New Opportunity
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Job Title</label>
                <div className="relative group">
                  <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g. Senior React Developer"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/50 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Description</label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-4 h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={3}
                    placeholder="Brief description of the role..."
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Requirements</label>
                <div className="relative group">
                   <FileText className="absolute left-4 top-4 h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                  <textarea
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    required
                    rows={3}
                    placeholder="Skills and qualifications required..."
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium border border-transparent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 rounded-xl bg-primary text-black font-bold hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,242,35,0.15)] hover:shadow-[0_0_30px_rgba(212,242,35,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                >
                   {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Publishing...
                    </div>
                  ) : (
                    'Create Job Post'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
