import React, { useEffect, useState } from 'react';
import { Search, RefreshCw, Send, Trash2, CheckCircle2, Clock, Eye, AlertCircle } from 'lucide-react';
import { api } from '../api/client';
import type { Message } from '../types';

export const Inbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'replied'>('all');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [replyError, setReplyError] = useState('');
  const [replySuccess, setReplySuccess] = useState('');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.getMessages({ status: filter });
      setMessages(res.messages || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const handleStatusChange = async (id: string, status: 'unread' | 'read') => {
    try {
      await api.updateMessageStatus(id, status);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage((prev) => (prev ? { ...prev, status } : null));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await api.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;
    setSendingReply(true);
    setReplyError('');
    setReplySuccess('');

    try {
      await api.replyToMessage(selectedMessage.id, replyText);
      setReplySuccess('Reply sent successfully via Resend!');
      setReplyText('');
      setMessages((prev) =>
        prev.map((m) =>
          m.id === selectedMessage.id
            ? { ...m, status: 'replied', reply_text: replyText, replied_at: new Date().toISOString() }
            : m
        )
      );
      setSelectedMessage((prev) =>
        prev
          ? { ...prev, status: 'replied', reply_text: replyText, replied_at: new Date().toISOString() }
          : null
      );
    } catch (err: any) {
      setReplyError(err.message || 'Failed to send reply email');
    } finally {
      setSendingReply(false);
    }
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Inquiries & Messages</h1>
          <p className="text-sm text-slate-400">All submissions from the portfolio contact form</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sender or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={fetchMessages}
            className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {(['all', 'unread', 'replied'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all cursor-pointer ${
              filter === tab
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Messages List & Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* List Section */}
        <div className="lg:col-span-5 space-y-3">
          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading inquiries...</div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
              No messages found.
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (msg.status === 'unread') {
                    handleStatusChange(msg.id, 'read');
                  }
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedMessage?.id === msg.id
                    ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-500/5'
                    : msg.status === 'unread'
                    ? 'bg-slate-900/90 border-amber-500/30 hover:border-amber-500/50'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-semibold text-white text-sm truncate">{msg.name}</span>
                  <span className="text-[11px] text-slate-500 shrink-0">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-xs text-slate-400 mb-2 truncate">{msg.email}</div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                  {msg.message}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                      msg.status === 'unread'
                        ? 'bg-amber-500/20 text-amber-300'
                        : msg.status === 'replied'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {msg.status === 'unread' && <Clock className="w-3 h-3" />}
                    {msg.status === 'replied' && <CheckCircle2 className="w-3 h-3" />}
                    {msg.status}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(msg.id);
                      }}
                      className="p-1 hover:text-red-400 text-slate-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail & Reply Section */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-6">
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedMessage.name}</h2>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-emerald-400 text-sm hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                  {selectedMessage.subject && (
                    <div className="text-xs text-slate-400 mt-1 font-medium">
                      Subject: {selectedMessage.subject}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleStatusChange(
                        selectedMessage.id,
                        selectedMessage.status === 'unread' ? 'read' : 'unread'
                      )
                    }
                    className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                  >
                    Mark as {selectedMessage.status === 'unread' ? 'Read' : 'Unread'}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Inquiry Content
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Previous Reply if any */}
              {selectedMessage.reply_text && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Sent Reply ({new Date(selectedMessage.replied_at || '').toLocaleString()})
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-sm text-emerald-200 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.reply_text}
                  </div>
                </div>
              )}

              {/* Reply Form */}
              <div className="pt-2 border-t border-slate-800">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
                  <span>Send Direct Email Reply (via Resend)</span>
                </div>

                {replyError && (
                  <div className="mb-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{replyError}</span>
                  </div>
                )}

                {replySuccess && (
                  <div className="mb-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{replySuccess}</span>
                  </div>
                )}

                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Hi ${selectedMessage.name},\n\nThank you for getting in touch! ...`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleSendReply}
                    disabled={sendingReply || !replyText.trim()}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-500/10"
                  >
                    {sendingReply ? (
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Reply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-center">
              <Eye className="w-10 h-10 mb-3 text-slate-600" />
              <div className="font-semibold text-slate-400">No message selected</div>
              <p className="text-xs text-slate-600 max-w-xs mt-1">
                Select an inquiry from the list on the left to view details and send an email reply.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
