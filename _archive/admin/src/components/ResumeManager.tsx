import React, { useState, useRef } from 'react';
import { FileText, Upload, CheckCircle2, AlertCircle, Copy, ExternalLink, Cloud } from 'lucide-react';
import { api } from '../api/client';

export const ResumeManager: React.FC = () => {
  const [resumeUrl, setResumeUrl] = useState<string>(
    localStorage.getItem('uploaded_resume_url') || 'https://emran.work/Resume_of_Emran_Hossen.pdf'
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setError('Please upload a valid PDF document (.pdf)');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const url = await api.uploadResume(file);
      setResumeUrl(url);
      localStorage.setItem('uploaded_resume_url', url);
      setSuccess('Resume successfully uploaded to Cloudflare R2 Object Storage!');
    } catch (err: any) {
      setError(err.message || 'Failed to upload resume to Cloudflare R2');
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = () => {
    if (!resumeUrl) return;
    navigator.clipboard.writeText(resumeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Resume & Documents (Cloudflare R2)</h1>
        <p className="text-sm text-slate-400">
          Store and deliver your PDF resume directly from Cloudflare R2 with zero egress fees
        </p>
      </div>

      {/* R2 Cloud Info Card */}
      <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-3 text-sm text-orange-300">
        <Cloud className="w-5 h-5 shrink-0 text-orange-400 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Cloudflare R2 Object Storage:</span>
          <p className="text-xs text-orange-300/80 mt-1 leading-relaxed">
            Files uploaded here are directly streamed via the S3-compatible API to your Cloudflare R2 bucket. Your portfolio frontend links to this URL for visitors to view or download.
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <FileText className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">Upload New PDF Resume</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            Choose your latest formatted CV in PDF format. This replaces or updates your active resume file in Cloudflare R2.
          </p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="application/pdf"
          onChange={handleFileUpload}
          className="hidden"
        />

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center justify-center gap-2 max-w-md mx-auto">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center gap-2 max-w-md mx-auto">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <div>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Streaming to Cloudflare R2...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Select PDF to Upload</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Resume Card */}
      {resumeUrl && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Active Resume Endpoint</h3>
                <p className="text-xs text-slate-400 font-mono">{resumeUrl}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy URL'}</span>
              </button>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in New Tab</span>
              </a>
            </div>
          </div>

          {/* Embed Preview */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 h-96">
            <iframe
              src={resumeUrl}
              title="Resume Preview"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};
