'use client';

import React, { useState } from 'react';
import { MessageSquare, Search, Send, Phone, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface TicketItem {
  id: string;
  customerName: string;
  customerMobile: string;
  subject: string;
  channel: 'WHATSAPP' | 'IN_APP' | 'CALL';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  time: string;
}

const initialTickets: TicketItem[] = [
  { id: 'TCK-892', customerName: 'Aarav Patel', customerMobile: '+91 98251 44556', subject: 'Rider delayed for Order #HYP-9841 by 10 minutes', channel: 'WHATSAPP', priority: 'HIGH', status: 'OPEN', time: '5 mins ago' },
  { id: 'TCK-891', customerName: 'Meera Shah', customerMobile: '+91 98792 11223', subject: 'Requested invoice copy for business GST filing', channel: 'IN_APP', priority: 'LOW', status: 'IN_PROGRESS', time: '22 mins ago' },
  { id: 'TCK-890', customerName: 'Vikram Joshi', customerMobile: '+91 97123 66778', subject: 'Refund credit not reflected in digital wallet balance', channel: 'WHATSAPP', priority: 'HIGH', status: 'OPEN', time: '1 hour ago' },
  { id: 'TCK-889', customerName: 'Ananya Sharma', customerMobile: '+91 99044 88990', subject: 'Change delivery address before rider departs store', channel: 'CALL', priority: 'MEDIUM', status: 'RESOLVED', time: '3 hours ago' },
];

export const SupportInboxView: React.FC = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<TicketItem>(initialTickets[0]);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    toast.success('Reply Sent via WhatsApp', `Message dispatched to ${selectedTicket.customerName}`);
    setReplyText('');
  };

  const handleResolve = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'RESOLVED' } : t))
    );
    toast.success('Ticket Resolved', `${id} marked as resolved.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <MessageSquare className="w-6 h-6 text-rose-500" />
          Customer Support Inbox & WhatsApp CRM
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Resolve order disputes, answer WhatsApp live inquiries, and handle delivery return inquiries.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Ticket List (Col 5) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-xs space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 pb-1">
            Active Tickets ({tickets.filter((t) => t.status !== 'RESOLVED').length} Open)
          </p>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {tickets.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTicket(t)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedTicket.id === t.id
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold text-slate-500">{t.id}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      t.priority === 'HIGH'
                        ? 'bg-rose-100 text-rose-800'
                        : t.priority === 'MEDIUM'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{t.subject}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span>{t.customerName}</span>
                  <span>{t.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Conversation Detail (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-slate-400">{selectedTicket.id}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  {selectedTicket.subject}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Customer: <span className="font-bold text-slate-800 dark:text-slate-200">{selectedTicket.customerName}</span> ({selectedTicket.customerMobile})
                </p>
              </div>
              {selectedTicket.status !== 'RESOLVED' ? (
                <button
                  onClick={() => handleResolve(selectedTicket.id)}
                  className="px-3 py-1.5 rounded-xl font-bold text-xs bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer"
                >
                  Mark Resolved
                </button>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Resolved
                </span>
              )}
            </div>

            <div className="py-6 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  "Hello, I placed order #HYP-9841 for Organic Cow Ghee and Strawberries. The app estimated 20 minutes delivery, but the rider seems stationary. Could you please check with rider Suresh?"
                </p>
                <span className="text-[10px] text-slate-400 block mt-2">Customer message via WhatsApp</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Type reply to customer via official WhatsApp API..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
