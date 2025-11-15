# Complete Implementation Plan - All Features

## ✅ IMPLEMENTED FEATURES

### 1. PAN Verification - NO LOGOUT BUTTON ✅
- Removed logout button from PAN Verification
- Only back button present
- Clean interface

### 2. Instant AI Verification ✅  
- After PAN submit → Instant verification screen
- Shows "Admin Verification" (AI powered)
- 5-second verification process with steps
- 95% approval rate
- **Success**: "Account Activated" → Auto redirect to dashboard
- **Failed**: "Verification Failed" → Back to PAN page
- No manual admin approval needed

### 3. Company Dashboard Title Fixed ✅
- Changed from "My Jobs" to "My Job Listings"
- Proper display on tab button

## 🚧 FEATURES TO IMPLEMENT

### 1. Three-Dot Menu on Each Job Card
**Location**: Company Dashboard → My Job Listings tab
**Functionality**:
```
Three-dot button (⋮) on each job card
↓
Opens dropdown menu with options:
- View Applications
- Edit Job
- View Analytics  
- Share Job
- Delete Job
```

### 2. Candidate Profile Page - 4 Buttons
**Current**: View Profile button takes to profile
**Need**: 4 action buttons on profile page:

1. **Schedule Interview** → Opens interview scheduling page
2. **Mark Reviewed** → Moves candidate to "Reviewed" section
3. **Shortlist** → Moves candidate to "Shortlist" section  
4. **Reject** → Moves candidate to "Rejected" (hidden from main view)

### 3. Complete Interview Flow with Notifications

#### A. Interview Scheduling Page ✅ (Already Created)
- Date picker
- Time slots
- Duration
- Interview type
- Location
- Interviewers
- Notes

#### B. After Submit → Send Notifications
**Email Notification** (to candidate):
```
Subject: Interview Scheduled - [Job Title] at [Company]
Priority: High

Dear [Candidate Name],

Your interview has been scheduled:

📅 Date: [Date]
⏰ Time: [Time]  
⏱️ Duration: [Duration]
📍 Type: [Video/In-Person/Phone]
📌 Location: [If in-person]
👥 Interviewers: [Names]

Additional Notes:
[Notes from company]

Please confirm your availability.

Best regards,
[Company Name]
```

**App Notification** (in-app):
```
🔔 High Priority Notification
Title: Interview Scheduled!
Body: Your interview for [Job Title] is on [Date] at [Time]
Actions: [View Details] [Confirm] [Reschedule]

Notification Badge: Red dot on bell icon
Sound: Priority sound
Vibration: Pattern for interview
```

### 4. Dedicated Pages for Each Status

#### A. Shortlisted Page ✅ (Already Created - needs enhancement)
**Current Features**:
- Shows all shortlisted candidates
- Search and filter

**ADD**: Bulk Interview Scheduling
```
[Schedule All] button at top
↓
Opens bulk scheduling form:
- Same date/time for all OR
- Individual dates/times
- Same interview type
- Common location
- Same interviewers

After filling once:
→ Shows list of all shortlisted candidates
→ Each has [Edit] button to customize
→ [Send All Invitations] button
→ Sends notifications to all at once
```

#### B. Reviewed Page ✅ (Already Created)
- Shows all reviewed candidates
- Can move to shortlist
- Can schedule interview
- Can reject

#### C. Rejected Page (NEW - TO CREATE)
```
Similar to Reviewed/Shortlisted pages but:
- Shows rejected candidates
- Grayed out design
- Can "Un-reject" (move back to candidates)
- Export rejected list
- Add rejection reason
```

#### D. Interviews Page (Enhanced)
```
Current: Shows scheduled interviews
ADD:
- Interview status: Scheduled/Completed/Cancelled
- Candidate feedback form
- Interview notes
- Mark as completed
- Reschedule option
- Cancel option
- Send reminder
```

### 5. Three-Dot Menu Implementation

**Component Structure**:
```tsx
{jobs.map((job) => (
  <div className="job-card">
    <div className="header">
      <h3>{job.title}</h3>
      <button onClick={() => toggleJobMenu(job.id)}>
        <MoreVertical />
      </button>
    </div>
    
    {activeJobMenu === job.id && (
      <DropdownMenu>
        <MenuItem onClick={() => viewApplications(job)}>
          <Eye /> View Applications
        </MenuItem>
        <MenuItem onClick={() => editJob(job)}>
          <Edit /> Edit Job
        </MenuItem>
        <MenuItem onClick={() => viewAnalytics(job)}>
          <BarChart /> View Analytics
        </MenuItem>
        <MenuItem onClick={() => shareJob(job)}>
          <Share2 /> Share Job
        </MenuItem>
        <MenuItem onClick={() => deleteJob(job)}>
          <Trash2 /> Delete Job
        </MenuItem>
      </DropdownMenu>
    )}
  </div>
))}
```

### 6. Notification System Architecture

**A. Notification Storage**:
```typescript
interface Notification {
  id: string;
  type: 'interview' | 'application' | 'message';
  priority: 'high' | 'medium' | 'low';
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  data: {
    interviewId?: string;
    candidateId?: string;
    jobId?: string;
  };
}
```

**B. Email Service** (Mock Implementation):
```typescript
const sendInterviewEmail = async (data: InterviewData) => {
  // In production: Use SendGrid/AWS SES
  // For demo: Show toast "Email sent to candidate"
  
  console.log(`Sending email to: ${data.candidateEmail}`);
  console.log(`Subject: Interview Scheduled`);
  console.log(`Body: ${formatEmailBody(data)}`);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, messageId: generateId() };
};
```

**C. In-App Notification**:
```typescript
const createNotification = (interview: InterviewData) => {
  const notification: Notification = {
    id: generateId(),
    type: 'interview',
    priority: 'high',
    title: 'Interview Scheduled!',
    body: `Your interview for ${interview.jobTitle} is on ${interview.date} at ${interview.time}`,
    timestamp: new Date(),
    read: false,
    data: {
      interviewId: interview.id,
      candidateId: interview.candidateId,
      jobId: interview.jobId
    }
  };
  
  // Add to notifications list
  addNotification(notification);
  
  // Show toast
  toast.success('Interview scheduled & candidate notified');
};
```

### 7. Bulk Interview Scheduling Flow

```
Shortlisted Section
↓
[Schedule All Interviews] button
↓
Bulk Scheduling Form:
┌─────────────────────────────────────┐
│ Schedule Interviews for All (5)     │
├─────────────────────────────────────┤
│ Common Settings:                    │
│ □ Date: [Select Date]               │
│ □ Interview Type: [Video/In-Person] │
│ □ Duration: [30 mins]               │
│ □ Interviewers: [Names]             │
│ □ Notes: [Common notes]             │
├─────────────────────────────────────┤
│ Individual Customization:           │
│                                     │
│ 1. Rahul Sharma                     │
│    Time: [10:00 AM] [Edit]         │
│                                     │
│ 2. Priya Patel                      │
│    Time: [11:00 AM] [Edit]         │
│                                     │
│ 3. Amit Kumar                       │
│    Time: [12:00 PM] [Edit]         │
├─────────────────────────────────────┤
│ [Preview All] [Send Invitations]   │
└─────────────────────────────────────┘
```

**Edit Individual**:
```
Click [Edit] on any candidate
↓
Opens modal with:
- Date (editable)
- Time (editable)
- Duration (editable)
- Type (editable)
- Location (editable)
- Notes (editable)

[Save] → Returns to bulk view
```

## 📁 FILES TO CREATE/UPDATE

### New Files:
1. `/components/company/RejectedSection.tsx`
2. `/components/company/JobMenuDropdown.tsx`
3. `/components/company/BulkInterviewScheduler.tsx`
4. `/components/company/InterviewDetailsModal.tsx`
5. `/utils/emailService.ts`
6. `/utils/notificationService.ts`

### Files to Update:
1. `/components/CompanyDashboardNew.tsx` - Add three-dot menu
2. `/components/company/CandidateProfilePage.tsx` - Add 4 buttons
3. `/components/company/ScheduleInterviewPage.tsx` - Add notification triggers
4. `/components/company/ShortlistSection.tsx` - Add bulk scheduling
5. `/components/NotificationsScreen.tsx` - Enhanced display
6. `/App.tsx` - Add notification state management

## 🎯 IMPLEMENTATION ORDER

1. ✅ Three-dot menu on job cards
2. ✅ Update CandidateProfilePage with 4 buttons
3. ✅ Create Rejected section page
4. ✅ Add notification service (mock)
5. ✅ Connect interview scheduling to notifications
6. ✅ Create bulk interview scheduler
7. ✅ Add edit individual interview option
8. ✅ Test complete flow

## 🔄 USER FLOW EXAMPLE

### Complete Hiring Flow:
```
1. Company posts job
   ↓
2. Candidates apply
   ↓
3. Company views applications
   ↓
4. Company views candidate profile
   ↓
5. Company has 4 options:
   - Schedule Interview → Sends email & app notification
   - Mark Reviewed → Moves to reviewed section
   - Shortlist → Moves to shortlist section
   - Reject → Hides from main view
   ↓
6. In Shortlist section:
   - Can schedule interviews individually
   - OR use bulk scheduler for all
   ↓
7. Candidate receives:
   - High priority in-app notification
   - Email with all details
   - Can confirm/reschedule
   ↓
8. Interview tab shows all scheduled interviews
   - Company can edit/cancel/reschedule
   - Mark as completed
   - Add feedback
```

---

## 🚀 READY TO IMPLEMENT

All features documented and ready for implementation!
Should I proceed with creating all the files and connecting everything?
