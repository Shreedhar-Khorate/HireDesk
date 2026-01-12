import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, Briefcase, X, Loader2 } from 'lucide-react';
import api from '../utils/api';

export default function UploadResume() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/recruitment/jobs/');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
      setUploadStatus(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setUploadedFile(null);
    setUploadStatus(null);
  };

  const handleUpload = async () => {
    if (!uploadedFile || !selectedJob) {
      setUploadStatus({ type: 'error', message: 'Please select a file and job role' });
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('job_id', selectedJob);

    try {
      const response = await api.post('/recruitment/upload-resume/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus({
        type: 'success',
        message: 'Resume uploaded and processed successfully!'
      });
      setUploadedFile(null);
      setSelectedJob('');
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: error.response?.data?.message || 'Upload failed. Please try again.'
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
                <div className="p-2 bg-primary/10 rounded-xl mr-3">
                    <Upload className="w-6 h-6 text-primary" />
                </div>
                <span className="text-gray-300 font-medium">Resume Parser</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
              Upload Candidate <span className="text-primary">Resume</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
              Our AI evaluates candidates against job requirements instantly. Upload a resume to get started.
            </p>
          </div>

          {/* Main Card */}
          <div className="glass-card rounded-3xl p-1 shadow-2xl overflow-hidden ring-1 ring-white/10">
            <div className="bg-[#0A0A0A]/80 backdrop-blur-xl rounded-[20px] p-6 md:p-10">
                
                {/* Job Selection */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                        Select Job Role <span className="text-primary">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-gray-500 group-hover:text-primary transition-colors" />
                        </div>
                        <select
                            value={selectedJob}
                            onChange={(e) => setSelectedJob(e.target.value)}
                            className="block w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 sm:text-sm transition-all appearance-none cursor-pointer hover:bg-white/[0.07]"
                        >
                            <option value="" disabled className="bg-dark text-gray-500">Choose a position...</option>
                            {jobs.map((job) => (
                                <option key={job.id} value={job.id} className="bg-[#1A1A1A] text-white py-2">
                                    {job.title} - {job.department || 'General'}
                                </option>
                            ))}
                        </select>
                         <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Dropzone */}
                <div 
                    {...getRootProps()} 
                    className={`relative group border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300 ease-in-out
                        ${isDragActive 
                            ? 'border-primary bg-primary/5 scale-[1.01]' 
                            : 'border-white/10 hover:border-primary/50 hover:bg-white/[0.02]'
                        }
                        ${uploadedFile ? 'bg-primary/[0.02] border-primary/30' : ''}
                    `}
                >
                    <input {...getInputProps()} />
                    <AnimatePresence mode="wait">
                        {!uploadedFile ? (
                            <motion.div
                                key="upload-prompt"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center"
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${isDragActive ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                                    <Upload className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
                                </h3>
                                <p className="text-gray-500 text-sm max-w-xs mx-auto mb-4">
                                    Supports PDF, DOCX, JPG (Max 10MB)
                                </p>
                                <div className="px-4 py-2 rounded-full bg-white/5 text-xs text-gray-400 border border-white/10 group-hover:border-primary/30 transition-colors">
                                    Browse Files
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="file-preview"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative w-full max-w-sm mx-auto bg-[#1A1A1A] rounded-xl p-4 border border-white/10 shadow-lg flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-sm font-medium text-white truncate">
                                        {uploadedFile.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                                <button 
                                    onClick={handleRemoveFile}
                                    className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Status Message */}
                <AnimatePresence>
                    {uploadStatus && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className={`rounded-xl p-4 flex items-start gap-3 ${
                                uploadStatus.type === 'error' 
                                    ? 'bg-red-500/10 border border-red-500/20 text-red-200' 
                                    : 'bg-green-500/10 border border-green-500/20 text-green-200'
                            }`}
                        >
                            {uploadStatus.type === 'error' ? (
                                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
                            ) : (
                                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
                            )}
                            <p className="text-sm">{uploadStatus.message}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Action Button */}
                <div className="mt-8">
                    <button
                        onClick={handleUpload}
                        disabled={uploading || !uploadedFile || !selectedJob}
                        className={`
                            w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300
                            ${uploading || !uploadedFile || !selectedJob
                                ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' 
                                : 'bg-primary text-black hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(212,242,35,0.3)]'
                            }
                        `}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5" />
                                Upload & Assess
                            </>
                        )}
                    </button>
                </div>
            </div>
          </div>
          
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    By uploading, you agree to our <a href="#" className="text-gray-400 hover:text-primary transition-colors underline">Terms of Service</a> and <a href="#" className="text-gray-400 hover:text-primary transition-colors underline">Privacy Policy</a>.
                </p>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
