import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Video,
  Users,
  MessageSquare,
  Check
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ScheduleInterviewPageProps {
  candidate: any;
  jobTitle: string;
  onBack: () => void;
  onSchedule: (interviewData: InterviewData) => void;
}

export interface InterviewData {
  candidateId: string;
  candidateName: string;
  jobTitle: string;
  date: string;
  time: string;
  duration: string;
  type: 'in-person' | 'video' | 'phone';
  location: string;
  interviewers: string[];
  notes: string;
}

export function ScheduleInterviewPage({
  candidate,
  jobTitle,
  onBack,
  onSchedule
}: ScheduleInterviewPageProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: '30',
    type: 'video' as 'in-person' | 'video' | 'phone',
    location: '',
    interviewers: '',
    notes: ''
  });

  const durations = ['15', '30', '45', '60', '90', '120'];
  const interviewTypes = [
    { value: 'video', label: 'Video Call', icon: Video },
    { value: 'in-person', label: 'In-Person', icon: MapPin },
    { value: 'phone', label: 'Phone Call', icon: Users }
  ];

  // Generate time slots (9 AM to 6 PM)
  const timeSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      const displayTime = new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      timeSlots.push({ value: timeStr, label: displayTime });
    }
  }

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = () => {
    if (!formData.date || !formData.time) {
      toast.error('Please select date and time');
      return;
    }

    if (formData.type === 'in-person' && !formData.location) {
      toast.error('Please enter location for in-person interview');
      return;
    }

    const interviewData: InterviewData = {
      candidateId: candidate.id,
      candidateName: candidate.candidateName,
      jobTitle: jobTitle,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      type: formData.type,
      location: formData.location,
      interviewers: formData.interviewers.split(',').map(i => i.trim()).filter(i => i),
      notes: formData.notes
    };

    onSchedule(interviewData);
    toast.success('Interview scheduled successfully!');
    setTimeout(() => onBack(), 500);
  };

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-[#141A2A] px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-white">Schedule Interview</h1>
            <p className="text-gray-400 text-sm">{candidate.candidateName}</p>
          </div>
        </div>

        {/* Candidate Info Card */}
        <div className="bg-[#0A0F1C] rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#007BFF] flex items-center justify-center flex-shrink-0">
            <span className="text-white">{candidate.candidateName[0]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm truncate">{candidate.candidateName}</p>
            <p className="text-gray-400 text-xs truncate">Applying for: {jobTitle}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            candidate.matchScore >= 90 
              ? 'bg-green-500/20 text-green-500'
              : 'bg-orange-500/20 text-orange-500'
          }`}>
            {candidate.matchScore}%
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Interview Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#141A2A] rounded-2xl p-4"
        >
          <label className="text-white text-sm mb-3 block">Interview Type *</label>
          <div className="grid grid-cols-3 gap-2">
            {interviewTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => setFormData({ ...formData, type: type.value as any })}
                  className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    formData.type === type.value
                      ? 'bg-[#007BFF] text-white'
                      : 'bg-[#0A0F1C] text-gray-400 hover:bg-[#141A2A]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{type.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Date Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#141A2A] rounded-2xl p-4"
        >
          <label className="text-white text-sm mb-2 block flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Interview Date *
          </label>
          <input
            type="date"
            value={formData.date}
            min={today}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
          />
        </motion.div>

        {/* Time & Duration */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#141A2A] rounded-2xl p-4"
          >
            <label className="text-white text-sm mb-2 block flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Time *
            </label>
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
            >
              <option value="">Select</option>
              {timeSlots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#141A2A] rounded-2xl p-4"
          >
            <label className="text-white text-sm mb-2 block">Duration</label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
            >
              {durations.map((dur) => (
                <option key={dur} value={dur}>
                  {dur} mins
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        {/* Location (conditional) */}
        {formData.type === 'in-person' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#141A2A] rounded-2xl p-4"
          >
            <label className="text-white text-sm mb-2 block flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter office address"
              className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
            />
          </motion.div>
        )}

        {formData.type === 'video' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#007BFF]/10 border border-[#007BFF]/30 rounded-xl p-3"
          >
            <p className="text-[#007BFF] text-sm">
              Video call link will be sent to the candidate via email after scheduling.
            </p>
          </motion.div>
        )}

        {/* Interviewers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#141A2A] rounded-2xl p-4"
        >
          <label className="text-white text-sm mb-2 block flex items-center gap-2">
            <Users className="w-4 h-4" />
            Interviewers
          </label>
          <input
            type="text"
            value={formData.interviewers}
            onChange={(e) => setFormData({ ...formData, interviewers: e.target.value })}
            placeholder="Enter names separated by commas"
            className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
          />
          <p className="text-gray-500 text-xs mt-2">Example: John Doe, Jane Smith</p>
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#141A2A] rounded-2xl p-4"
        >
          <label className="text-white text-sm mb-2 block flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Additional Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Any special instructions or topics to cover..."
            className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none h-24 resize-none"
          />
        </motion.div>

        {/* Summary Card */}
        {formData.date && formData.time && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4"
          >
            <h3 className="text-green-500 mb-3 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Interview Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span className="text-white">{new Date(formData.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Time:</span>
                <span className="text-white">
                  {timeSlots.find(s => s.value === formData.time)?.label || formData.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duration:</span>
                <span className="text-white">{formData.duration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Type:</span>
                <span className="text-white capitalize">{formData.type.replace('-', ' ')}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="bg-[#141A2A] px-4 py-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-[#007BFF] text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0066CC] transition-all shadow-lg shadow-[#007BFF]/20"
        >
          <Check className="w-5 h-5" />
          Schedule Interview
        </button>
      </div>
    </div>
  );
}
