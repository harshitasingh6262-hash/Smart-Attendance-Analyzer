/**
 * Smart Attendance Analyzer - Application Engine
 * Advanced College Student Attendance Tracker, Shortage Predictor & AI Copilot
 * Reference style: AMS (Academics Management System - MITS Gwalior)
 */

// Default Dataset & Profiles
const PRESET_PROFILES = {
  rohan_at_risk: {
    id: "rohan_at_risk",
    name: "Aarav Sharma",
    enrollment: "0901CS221045",
    college: "Madhav Institute of Technology & Science (MITS), Gwalior",
    branch: "Computer Science & Engineering",
    semester: "VI (6th Semester)",
    section: "A",
    batch: "2022 - 2026",
    mentor: "Dr. R. K. Gupta",
    cgpa: "8.42",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80",
    threshold: 75,
    subjects: [
      { id: "cs601", code: "CS-601", name: "Machine Learning", type: "Theory", faculty: "Prof. Sunita Sharma", room: "LT-204", credits: 4, conducted: 36, attended: 28, maxPlanned: 48 },
      { id: "cs602", code: "CS-602", name: "Compiler Design", type: "Theory", faculty: "Dr. Amit Neema", room: "LT-205", credits: 4, conducted: 34, attended: 23, maxPlanned: 46 }, // 67.6% Shortage!
      { id: "cs603", code: "CS-603", name: "Computer Networks", type: "Theory", faculty: "Prof. Vikram Joshi", room: "LT-204", credits: 4, conducted: 38, attended: 30, maxPlanned: 50 },
      { id: "cs604", code: "CS-604", name: "Cloud Computing & DevOps", type: "Theory", faculty: "Dr. Neha Patel", room: "LT-102", credits: 3, conducted: 32, attended: 24, maxPlanned: 42 }, // 75.0%
      { id: "cs605", code: "CS-605", name: "Full Stack Web Development", type: "Theory", faculty: "Prof. Manish Dubey", room: "Lab-3", credits: 3, conducted: 40, attended: 32, maxPlanned: 52 },
      { id: "cs606", code: "CS-606", name: "Machine Learning Lab", type: "Practical", faculty: "Prof. Sunita Sharma", room: "AI Lab-1", credits: 1, conducted: 12, attended: 10, maxPlanned: 15 },
      { id: "cs607", code: "CS-607", name: "Network Simulation Lab", type: "Practical", faculty: "Prof. Vikram Joshi", room: "Network Lab", credits: 1, conducted: 12, attended: 8, maxPlanned: 15 } // 66.7% Shortage!
    ]
  },
  priya_safe: {
    id: "priya_safe",
    name: "Priya Verma",
    enrollment: "0901IT221088",
    college: "Madhav Institute of Technology & Science (MITS), Gwalior",
    branch: "Information Technology",
    semester: "VI (6th Semester)",
    section: "B",
    batch: "2022 - 2026",
    mentor: "Dr. Sanjeev Khanna",
    cgpa: "9.18",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    threshold: 75,
    subjects: [
      { id: "it601", code: "IT-601", name: "Distributed Systems", type: "Theory", faculty: "Dr. Alok Jain", room: "LT-301", credits: 4, conducted: 36, attended: 33, maxPlanned: 48 },
      { id: "it602", code: "IT-602", name: "Information Security", type: "Theory", faculty: "Prof. Meenakshi Dixit", room: "LT-301", credits: 4, conducted: 34, attended: 30, maxPlanned: 46 },
      { id: "it603", code: "IT-603", name: "Artificial Intelligence", type: "Theory", faculty: "Dr. Preeti Jain", room: "LT-302", credits: 4, conducted: 38, attended: 34, maxPlanned: 50 },
      { id: "it604", code: "IT-604", name: "Mobile Computing", type: "Theory", faculty: "Prof. R. S. Jadon", room: "LT-302", credits: 3, conducted: 32, attended: 28, maxPlanned: 42 },
      { id: "it605", code: "IT-605", name: "AI Lab", type: "Practical", faculty: "Dr. Preeti Jain", room: "AI Lab-2", credits: 2, conducted: 14, attended: 13, maxPlanned: 16 }
    ]
  },
  rohan_detention: {
    id: "rohan_detention",
    name: "Rohan Malviya",
    enrollment: "0901EC221012",
    college: "Madhav Institute of Technology & Science (MITS), Gwalior",
    branch: "Electronics & Communication Engg.",
    semester: "VI (6th Semester)",
    section: "A",
    batch: "2022 - 2026",
    mentor: "Prof. P. K. Singhal",
    cgpa: "6.85",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    threshold: 75,
    subjects: [
      { id: "ec601", code: "EC-601", name: "Digital Signal Processing", type: "Theory", faculty: "Dr. Karuna Markam", room: "EC-201", credits: 4, conducted: 38, attended: 21, maxPlanned: 50 },
      { id: "ec602", code: "EC-602", name: "VLSI Design", type: "Theory", faculty: "Dr. Vandana Vikas", room: "EC-202", credits: 4, conducted: 36, attended: 19, maxPlanned: 48 },
      { id: "ec603", code: "EC-603", name: "Antenna & Wave Propagation", type: "Theory", faculty: "Prof. Bimal Garg", room: "EC-201", credits: 4, conducted: 35, attended: 20, maxPlanned: 48 },
      { id: "ec604", code: "EC-604", name: "Microcontrollers & Embedded Systems", type: "Theory", faculty: "Dr. Deepak Sharma", room: "EC-203", credits: 3, conducted: 30, attended: 18, maxPlanned: 42 },
      { id: "ec605", code: "EC-605", name: "DSP Lab", type: "Practical", faculty: "Dr. Karuna Markam", room: "DSP Lab", credits: 2, conducted: 14, attended: 8, maxPlanned: 16 }
    ]
  }
};

// Default Timetable Structure (Weekly)
const DEFAULT_TIMETABLE = {
  Monday: [
    { time: "09:30 - 10:30", subjectCode: "CS-601", name: "Machine Learning", type: "Theory", room: "LT-204", faculty: "Prof. Sunita Sharma" },
    { time: "10:30 - 11:30", subjectCode: "CS-602", name: "Compiler Design", type: "Theory", room: "LT-205", faculty: "Dr. Amit Neema" },
    { time: "11:45 - 12:45", subjectCode: "CS-603", name: "Computer Networks", type: "Theory", room: "LT-204", faculty: "Prof. Vikram Joshi" },
    { time: "02:30 - 04:30", subjectCode: "CS-606", name: "Machine Learning Lab", type: "Practical", room: "AI Lab-1", faculty: "Prof. Sunita Sharma" }
  ],
  Tuesday: [
    { time: "09:30 - 10:30", subjectCode: "CS-604", name: "Cloud Computing & DevOps", type: "Theory", room: "LT-102", faculty: "Dr. Neha Patel" },
    { time: "10:30 - 11:30", subjectCode: "CS-605", name: "Full Stack Web Development", type: "Theory", room: "Lab-3", faculty: "Prof. Manish Dubey" },
    { time: "11:45 - 12:45", subjectCode: "CS-601", name: "Machine Learning", type: "Theory", room: "LT-204", faculty: "Prof. Sunita Sharma" },
    { time: "12:45 - 01:45", subjectCode: "CS-602", name: "Compiler Design", type: "Theory", room: "LT-205", faculty: "Dr. Amit Neema" }
  ],
  Wednesday: [
    { time: "09:30 - 10:30", subjectCode: "CS-603", name: "Computer Networks", type: "Theory", room: "LT-204", faculty: "Prof. Vikram Joshi" },
    { time: "10:30 - 11:30", subjectCode: "CS-602", name: "Compiler Design", type: "Theory", room: "LT-205", faculty: "Dr. Amit Neema" },
    { time: "11:45 - 12:45", subjectCode: "CS-605", name: "Full Stack Web Development", type: "Theory", room: "Lab-3", faculty: "Prof. Manish Dubey" },
    { time: "02:30 - 04:30", subjectCode: "CS-607", name: "Network Simulation Lab", type: "Practical", room: "Network Lab", faculty: "Prof. Vikram Joshi" }
  ],
  Thursday: [
    { time: "09:30 - 10:30", subjectCode: "CS-601", name: "Machine Learning", type: "Theory", room: "LT-204", faculty: "Prof. Sunita Sharma" },
    { time: "10:30 - 11:30", subjectCode: "CS-604", name: "Cloud Computing & DevOps", type: "Theory", room: "LT-102", faculty: "Dr. Neha Patel" },
    { time: "11:45 - 12:45", subjectCode: "CS-603", name: "Computer Networks", type: "Theory", room: "LT-204", faculty: "Prof. Vikram Joshi" },
    { time: "12:45 - 01:45", subjectCode: "CS-605", name: "Full Stack Web Development", type: "Theory", room: "Lab-3", faculty: "Prof. Manish Dubey" }
  ],
  Friday: [
    { time: "09:30 - 10:30", subjectCode: "CS-602", name: "Compiler Design", type: "Theory", room: "LT-205", faculty: "Dr. Amit Neema" },
    { time: "10:30 - 11:30", subjectCode: "CS-604", name: "Cloud Computing & DevOps", type: "Theory", room: "LT-102", faculty: "Dr. Neha Patel" },
    { time: "11:45 - 12:45", subjectCode: "CS-601", name: "Machine Learning", type: "Theory", room: "LT-204", faculty: "Prof. Sunita Sharma" },
    { time: "02:30 - 04:30", subjectCode: "CS-605", name: "Web Dev Project Lab", type: "Practical", room: "Lab-3", faculty: "Prof. Manish Dubey" }
  ],
  Saturday: [
    { time: "10:00 - 11:30", subjectCode: "CS-603", name: "Networks Remedial / Seminar", type: "Theory", room: "LT-204", faculty: "Prof. Vikram Joshi" },
    { time: "11:45 - 01:15", subjectCode: "CS-602", name: "Compiler Tutorial & Doubt Clearing", type: "Tutorial", room: "LT-205", faculty: "Dr. Amit Neema" }
  ]
};

// Application State
class AttendanceAppState {
  constructor() {
    this.storageKey = "smart_attendance_analyzer_data_v1";
    this.currentProfileId = "rohan_at_risk";
    this.profile = null;
    this.timetable = DEFAULT_TIMETABLE;
    this.dailyLogs = {}; // date string -> { subjectId: "present" | "absent" | "cancelled" }
    this.activeTab = "dashboard";
    this.charts = {};
    this.chatHistory = [
      {
        sender: "ai",
        time: "Just now",
        text: "Hello! I am **Aura**, your Smart Attendance & Academic Advisor. I've analyzed your academic records and noticed **Compiler Design (67.6%)** and **Network Lab (66.7%)** are currently below the 75% college detention cutoff. How can I help you plan your attendance or safe bunks today?"
      }
    ];
    this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.currentProfileId = parsed.currentProfileId || "rohan_at_risk";
        this.profile = parsed.profile || JSON.parse(JSON.stringify(PRESET_PROFILES[this.currentProfileId]));
        this.timetable = parsed.timetable || DEFAULT_TIMETABLE;
        this.dailyLogs = parsed.dailyLogs || {};
      } else {
        this.profile = JSON.parse(JSON.stringify(PRESET_PROFILES.rohan_at_risk));
      }
    } catch (e) {
      console.warn("Could not load from localStorage, initializing fresh", e);
      this.profile = JSON.parse(JSON.stringify(PRESET_PROFILES.rohan_at_risk));
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({
        currentProfileId: this.currentProfileId,
        profile: this.profile,
        timetable: this.timetable,
        dailyLogs: this.dailyLogs
      }));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }

  switchProfile(profileKey) {
    if (PRESET_PROFILES[profileKey]) {
      this.currentProfileId = profileKey;
      this.profile = JSON.parse(JSON.stringify(PRESET_PROFILES[profileKey]));
      this.saveState();
      return true;
    }
    return false;
  }

  resetCurrentProfile() {
    if (PRESET_PROFILES[this.currentProfileId]) {
      this.profile = JSON.parse(JSON.stringify(PRESET_PROFILES[this.currentProfileId]));
    } else {
      this.profile = JSON.parse(JSON.stringify(PRESET_PROFILES.rohan_at_risk));
    }
    this.dailyLogs = {};
    this.saveState();
  }
}

// Instantiate Global App State
const state = new AttendanceAppState();

/**
 * Mathematical Calculation Helpers
 */
const MathEngine = {
  // Percentage calculation
  percentage(attended, conducted) {
    if (!conducted || conducted <= 0) return 100.0;
    return Math.round((attended / conducted) * 1000) / 10; // 1 decimal place
  },

  // Number of consecutive classes to attend to reach target threshold T (default 75%)
  // (attended + x) / (conducted + x) >= T / 100
  // x = ceil((T * conducted - 100 * attended) / (100 - T))
  classesNeeded(attended, conducted, target = 75) {
    if (conducted === 0) return 0;
    const currentPct = (attended / conducted) * 100;
    if (currentPct >= target) return 0;
    if (target >= 100) return Infinity; // mathematically impossible if already missed one

    const numerator = (target * conducted) - (100 * attended);
    const denominator = 100 - target;
    const x = Math.ceil(numerator / denominator);
    return Math.max(0, x);
  },

  // Safe bunks allowed without dropping below target threshold T (default 75%)
  // attended / (conducted + y) >= T / 100
  // y = floor((100 * attended - T * conducted) / T)
  safeBunks(attended, conducted, target = 75) {
    if (conducted === 0) return 0;
    const currentPct = (attended / conducted) * 100;
    if (currentPct < target) return 0;
    if (target <= 0) return Infinity;

    const numerator = (100 * attended) - (target * conducted);
    const y = Math.floor(numerator / target);
    return Math.max(0, y);
  },

  // What-If Projected Attendance
  projectedAttendance(attended, conducted, futureAttended = 0, futureMissed = 0) {
    const newAttended = attended + futureAttended;
    const newConducted = conducted + futureAttended + futureMissed;
    if (newConducted === 0) return 100.0;
    return Math.round((newAttended / newConducted) * 1000) / 10;
  },

  // Overall statistics aggregation
  getOverallStats(subjects, target = 75) {
    let totalConducted = 0;
    let totalAttended = 0;
    let shortageCount = 0;
    let safeCount = 0;
    let borderlineCount = 0;
    let totalSafeBunks = 0;
    let totalClassesNeeded = 0;

    subjects.forEach(sub => {
      totalConducted += sub.conducted;
      totalAttended += sub.attended;
      const pct = sub.conducted > 0 ? (sub.attended / sub.conducted) * 100 : 100;
      const needed = MathEngine.classesNeeded(sub.attended, sub.conducted, target);
      const bunks = MathEngine.safeBunks(sub.attended, sub.conducted, target);

      totalClassesNeeded += needed;
      totalSafeBunks += bunks;

      if (pct < target) {
        shortageCount++;
      } else if (pct < target + 5) {
        borderlineCount++;
      } else {
        safeCount++;
      }
    });

    const overallPct = totalConducted > 0 ? Math.round((totalAttended / totalConducted) * 1000) / 10 : 100;
    const overallNeeded = MathEngine.classesNeeded(totalAttended, totalConducted, target);
    const overallSafeBunks = MathEngine.safeBunks(totalAttended, totalConducted, target);

    return {
      totalConducted,
      totalAttended,
      totalAbsent: totalConducted - totalAttended,
      overallPct,
      shortageCount,
      safeCount,
      borderlineCount,
      totalSafeBunks,
      overallSafeBunks,
      totalClassesNeeded,
      overallNeeded,
      isShortage: overallPct < target || shortageCount > 0
    };
  },

  // Get status metadata and colors
  getStatusBadge(pct, target = 75) {
    if (pct >= target + 10) {
      return {
        label: "Excellent",
        bg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700",
        color: "emerald",
        icon: "fa-circle-check"
      };
    } else if (pct >= target) {
      return {
        label: "Safe Margin",
        bg: "bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-700",
        color: "blue",
        icon: "fa-shield-halved"
      };
    } else if (pct >= target - 5) {
      return {
        label: "Borderline Risk",
        bg: "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-700",
        color: "amber",
        icon: "fa-triangle-exclamation"
      };
    } else {
      return {
        label: "Critical Shortage",
        bg: "bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-300 dark:border-rose-700",
        color: "rose",
        icon: "fa-circle-exclamation"
      };
    }
  }
};

/**
 * AI Advisory & Insights Engine
 */
const AiAdvisor = {
  generateSubjectInsight(sub, target = 75) {
    const pct = MathEngine.percentage(sub.attended, sub.conducted);
    const needed = MathEngine.classesNeeded(sub.attended, sub.conducted, target);
    const bunks = MathEngine.safeBunks(sub.attended, sub.conducted, target);

    if (pct < target) {
      return {
        level: "danger",
        action: `Attend next ${needed} consecutive lecture${needed > 1 ? 's' : ''}`,
        summary: `Shortage of ${(target - pct).toFixed(1)}%. You are at risk of detention/debarment from mid-sem and end-sem examinations in this course. Zero bunks permitted.`
      };
    } else if (bunks === 0) {
      return {
        level: "warning",
        action: `Maintain perfect attendance; 0 bunks buffer remaining`,
        summary: `You are exactly on the border (${pct}%). Missing even 1 single lecture will immediately push you into detention shortage.`
      };
    } else {
      return {
        level: "safe",
        action: `You have ${bunks} safe class bunk${bunks > 1 ? 's' : ''} available`,
        summary: `Comfortably above college cutoff (${pct}%). You can safely miss up to ${bunks} lecture${bunks > 1 ? 's' : ''} while remaining above ${target}%.`
      };
    }
  },

  generateComprehensiveAudit(profile) {
    const target = profile.threshold || 75;
    const stats = MathEngine.getOverallStats(profile.subjects, target);
    const atRiskSubs = profile.subjects.filter(s => MathEngine.percentage(s.attended, s.conducted) < target);
    const borderlineSubs = profile.subjects.filter(s => {
      const p = MathEngine.percentage(s.attended, s.conducted);
      return p >= target && p < target + 5;
    });

    let diagnosis = "";
    let actionItems = [];

    if (atRiskSubs.length === 0) {
      diagnosis = `🎉 **Outstanding Academic Discipline!** All your registered subjects meet or exceed the institutional requirement of ${target}%. Your aggregate attendance is **${stats.overallPct}%**.`;
      actionItems.push(`You currently have a total cumulative cushion of **${stats.totalSafeBunks} safe classes** across subjects.`);
      actionItems.push("Continue this consistency to stay eligible for all campus placements and exam honor rolls.");
    } else {
      diagnosis = `⚠️ **Attendance Warning Notice:** You currently have **${atRiskSubs.length} subject(s)** falling below the mandatory ${target}% minimum criteria.`;
      atRiskSubs.forEach(s => {
        const p = MathEngine.percentage(s.attended, s.conducted);
        const needed = MathEngine.classesNeeded(s.attended, s.conducted, target);
        actionItems.push(`**${s.code} (${s.name})**: Currently **${p}%**. You MUST attend the next **${needed} consecutive classes** without a single absence to clear your debarment.`);
      });
      if (borderlineSubs.length > 0) {
        borderlineSubs.forEach(s => {
          actionItems.push(`**${s.code} (${s.name})**: Currently **${MathEngine.percentage(s.attended, s.conducted)}%** (Borderline). You have 0 to 1 safe bunk left.`);
        });
      }
    }

    return {
      stats,
      diagnosis,
      actionItems,
      atRiskSubs,
      borderlineSubs
    };
  },

  // Natural Language AI Chat Responder
  respondToChat(query, profile) {
    const q = query.toLowerCase();
    const target = profile.threshold || 75;
    const stats = MathEngine.getOverallStats(profile.subjects, target);

    // Question: Safe bunk / skip / miss
    if (q.includes("bunk") || q.includes("miss") || q.includes("skip") || q.includes("can i leave")) {
      const safeSubs = profile.subjects.filter(s => MathEngine.safeBunks(s.attended, s.conducted, target) > 0);
      const dangerSubs = profile.subjects.filter(s => MathEngine.classesNeeded(s.attended, s.conducted, target) > 0);

      let resp = `### 📊 AI Bunk Intelligence Analysis\n\n`;
      if (safeSubs.length > 0) {
        resp += `You can safely miss classes in the following subjects without falling below **${target}%**:\n`;
        safeSubs.forEach(s => {
          const bunks = MathEngine.safeBunks(s.attended, s.conducted, target);
          const pct = MathEngine.percentage(s.attended, s.conducted);
          resp += `* **${s.code} - ${s.name}**: **${bunks} safe class${bunks > 1 ? 'es' : ''}** (Current: ${pct}%)\n`;
        });
      } else {
        resp += `❌ **No Safe Bunks Allowed:** None of your registered subjects currently have safe bunk buffer. Any absence will push your attendance below ${target}% or deepen detention risk.\n\n`;
      }

      if (dangerSubs.length > 0) {
        resp += `\n⛔ **DO NOT MISS Under Any Circumstances:**\n`;
        dangerSubs.forEach(s => {
          const needed = MathEngine.classesNeeded(s.attended, s.conducted, target);
          const pct = MathEngine.percentage(s.attended, s.conducted);
          resp += `* **${s.code} - ${s.name}** (Current: ${pct}% - Needs ${needed} consecutive attendances)\n`;
        });
      }
      return resp;
    }

    // Question: Recovery plan / Roadmap
    if (q.includes("recovery") || q.includes("plan") || q.includes("strategy") || q.includes("roadmap") || q.includes("how to improve")) {
      const atRisk = profile.subjects.filter(s => MathEngine.percentage(s.attended, s.conducted) < target);
      if (atRisk.length === 0) {
        return `🌟 **Your attendance is in great shape!** You are already at **${stats.overallPct}%** and don't need a shortage recovery plan. Keep maintaining regular presence in lectures!`;
      }

      let resp = `### 🚀 3-Step AI Attendance Recovery Roadmap\n\n`;
      resp += `1. **Target Critical Deficits First**:\n`;
      atRisk.forEach(s => {
        const needed = MathEngine.classesNeeded(s.attended, s.conducted, target);
        resp += `   - **${s.name} (${s.code})**: Attend next **${needed} classes** consecutively. Set calendar alarms 15 minutes before this class.\n`;
      });
      resp += `2. **Protect Borderline Subjects**:\n`;
      resp += `   - Do not trade attendance between subjects. Avoid bunking even for assignment submissions or college fest preparations.\n`;
      resp += `3. **Submit Medical / Official Duty Leave Documentation**:\n`;
      resp += `   - If any past absences were due to illness, NSS/NCC, hackathons, or university sports, consult your Academic Mentor (**${profile.mentor}**) immediately with authorized proof.\n`;
      return resp;
    }

    // Question: Friday / Tomorrow / Day off
    if (q.includes("friday") || q.includes("tomorrow") || q.includes("day off") || q.includes("holiday")) {
      return `### 🗓️ Day-Off Feasibility Assessment\n\n` +
        `If you take an entire day off, you will register **3 to 4 absent marks** in a single stroke!\n` +
        `* Your overall aggregate would drop from **${stats.overallPct}%** down by approximately **1.2% - 1.8%**.\n` +
        `* If that day includes **Compiler Design** or **Network Lab**, your shortage gap will widen by an additional **2 to 3 recovery classes**.\n\n` +
        `💡 **Recommendation:** Only take a partial leave after attending your critical deficit subjects, or use the **What-If Simulator tab** above to test the exact day schedule!`;
    }

    // Question: Medical leave / Certificate / OD
    if (q.includes("medical") || q.includes("od") || q.includes("duty") || q.includes("certificate") || q.includes("exemption")) {
      return `### 🏥 Institutional Medical & On-Duty Exemption Rules\n\n` +
        `As per standard university regulations (MITS Gwalior / AICTE / UGC):\n` +
        `1. Medical certificates are accepted only for continuous illness spanning more than **3 days**, endorsed by a Registered Medical Practitioner / Chief Medical Officer.\n` +
        `2. Maximum relaxation granted is typically **up to 10%** (bringing the required threshold down from 75% to 65% in genuine medical or official sport/hackathon cases).\n` +
        `3. Use our built-in **"Medical & OD Leave Simulator"** in the sidebar to simulate the exact impact of approved leave slips on your percentage!`;
    }

    // General default answer
    const audit = AiAdvisor.generateComprehensiveAudit(profile);
    return `### 💡 Smart Attendance Summary for ${profile.name}\n\n` +
      `* **Overall Attendance:** **${stats.overallPct}%** (${stats.totalAttended} / ${stats.totalConducted} classes attended)\n` +
      `* **Institutional Threshold:** **${target}%**\n` +
      `* **At-Risk Courses:** **${stats.shortageCount}** course(s) require urgent attendance recovery\n` +
      `* **Total Safe Bunks Available:** **${stats.totalSafeBunks}** classes\n\n` +
      audit.diagnosis + "\n\n" +
      (audit.actionItems.length > 0 ? "#### Immediate Action Items:\n" + audit.actionItems.map(i => `• ${i}`).join("\n") : "");
  }
};

/**
 * UI Render & Controller Engine
 */
const AppUI = {
  init() {
    this.bindEvents();
    this.renderAll();
    this.startClock();
  },

  startClock() {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      const timeStr = now.toLocaleDateString('en-US', options);
      const el = document.getElementById("live-datetime-display");
      if (el) el.textContent = timeStr;
    };
    updateTime();
    setInterval(updateTime, 30000);
  },

  renderAll() {
    this.renderProfileCard();
    this.renderHeaderBadges();
    this.renderStatsKPIs();
    this.renderShortageAlertBanner();
    this.renderTodaySchedule();
    this.renderSubjectCards();
    this.renderSubjectTable();
    this.renderTimetableMatrix();
    this.renderPredictorPlayground();
    this.renderMedicalLeaveSimulator();
    this.renderCharts();
    this.renderChatMessages();
    this.renderAiInsightsPanel();
  },

  renderProfileCard() {
    const p = state.profile;
    document.getElementById("profile-name").textContent = p.name;
    document.getElementById("profile-enrollment").textContent = p.enrollment;
    document.getElementById("profile-branch").textContent = p.branch;
    document.getElementById("profile-semester").textContent = `${p.semester} • Sec ${p.section}`;
    document.getElementById("profile-cgpa").textContent = p.cgpa;
    document.getElementById("profile-mentor").textContent = p.mentor;
    document.getElementById("profile-batch").textContent = p.batch;
    document.getElementById("profile-avatar").src = p.avatar;

    // Header student mini badge
    const miniName = document.getElementById("header-student-name");
    if (miniName) miniName.textContent = p.name;
    const miniRoll = document.getElementById("header-student-roll");
    if (miniRoll) miniRoll.textContent = p.enrollment;
  },

  renderHeaderBadges() {
    const p = state.profile;
    const stats = MathEngine.getOverallStats(p.subjects, p.threshold);
    const badge = document.getElementById("header-attendance-badge");
    if (badge) {
      badge.textContent = `${stats.overallPct}%`;
      if (stats.overallPct >= p.threshold) {
        badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      } else {
        badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 animate-pulse";
      }
    }
  },

  renderStatsKPIs() {
    const p = state.profile;
    const stats = MathEngine.getOverallStats(p.subjects, p.threshold);

    // Overall attendance %
    const pctEl = document.getElementById("kpi-overall-pct");
    if (pctEl) pctEl.textContent = `${stats.overallPct}%`;

    const subtextEl = document.getElementById("kpi-overall-subtext");
    if (subtextEl) {
      if (stats.overallPct >= p.threshold) {
        subtextEl.innerHTML = `<span class="text-emerald-500 font-semibold flex items-center gap-1"><i class="fa-solid fa-check"></i> Safe from Detention</span>`;
      } else {
        subtextEl.innerHTML = `<span class="text-rose-500 font-semibold flex items-center gap-1"><i class="fa-solid fa-triangle-exclamation"></i> Below ${p.threshold}% cutoff</span>`;
      }
    }

    // Conducted & Attended counts
    document.getElementById("kpi-classes-attended").textContent = stats.totalAttended;
    document.getElementById("kpi-classes-conducted").textContent = stats.totalConducted;
    document.getElementById("kpi-classes-missed").textContent = stats.totalAbsent;

    // Safe Bunks
    const bunksEl = document.getElementById("kpi-safe-bunks");
    if (bunksEl) {
      bunksEl.textContent = stats.overallSafeBunks;
      const bunkDesc = document.getElementById("kpi-safe-bunks-desc");
      if (bunkDesc) {
        bunkDesc.textContent = stats.overallSafeBunks > 0 
          ? `You can safely miss ${stats.overallSafeBunks} total classes without dropping below ${p.threshold}%` 
          : `Zero safe skips available without dropping below ${p.threshold}%`;
      }
    }

    // Shortage Subjects count
    const shortageEl = document.getElementById("kpi-shortage-count");
    if (shortageEl) {
      shortageEl.textContent = stats.shortageCount;
      const shortageDesc = document.getElementById("kpi-shortage-desc");
      if (shortageDesc) {
        shortageDesc.textContent = stats.shortageCount > 0 
          ? `${stats.shortageCount} subject(s) in critical debarment zone` 
          : "All subjects meet minimum required threshold";
      }
    }

    // Circular gauge on dashboard
    const gaugeCircle = document.getElementById("kpi-gauge-circle");
    if (gaugeCircle) {
      const radius = 45;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (Math.min(100, stats.overallPct) / 100) * circumference;
      gaugeCircle.style.strokeDashoffset = offset;
      gaugeCircle.style.stroke = stats.overallPct >= p.threshold ? "#10b981" : "#ef4444";
    }
  },

  renderShortageAlertBanner() {
    const p = state.profile;
    const banner = document.getElementById("shortage-alert-banner");
    if (!banner) return;

    const atRisk = p.subjects.filter(s => MathEngine.percentage(s.attended, s.conducted) < p.threshold);
    if (atRisk.length === 0) {
      banner.classList.add("hidden");
      return;
    }

    banner.classList.remove("hidden");
    const listEl = document.getElementById("shortage-alert-subjects-list");
    if (listEl) {
      listEl.innerHTML = atRisk.map(s => {
        const pct = MathEngine.percentage(s.attended, s.conducted);
        const needed = MathEngine.classesNeeded(s.attended, s.conducted, p.threshold);
        return `
          <div class="flex items-center justify-between p-3 rounded-lg bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 flex items-center justify-center font-bold text-xs">
                ${s.code.split("-")[1] || "!"}
              </span>
              <div>
                <div class="font-semibold text-slate-800 dark:text-slate-100 text-sm">${s.name} (${s.code})</div>
                <div class="text-xs text-rose-600 dark:text-rose-400 font-medium">Current: ${pct}% • ${s.attended}/${s.conducted} attended</div>
              </div>
            </div>
            <div class="text-right">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-xs">
                Attend next ${needed} class${needed > 1 ? 'es' : ''}
              </span>
            </div>
          </div>
        `;
      }).join("");
    }
  },

  renderTodaySchedule() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayIndex = new Date().getDay();
    const todayName = (todayIndex === 0) ? "Monday" : days[todayIndex]; // default to Monday if Sunday

    document.getElementById("today-schedule-day-label").textContent = `${todayName}'s Schedule`;

    const classes = state.timetable[todayName] || state.timetable["Monday"];
    const container = document.getElementById("today-schedule-container");
    if (!container) return;

    if (classes.length === 0) {
      container.innerHTML = `
        <div class="p-6 text-center text-slate-500 dark:text-slate-400">
          <i class="fa-solid fa-mug-hot text-3xl mb-2 text-indigo-400"></i>
          <p>No classes scheduled for today. Enjoy your break!</p>
        </div>
      `;
      return;
    }

    const todayDateKey = new Date().toISOString().split("T")[0];
    const logs = state.dailyLogs[todayDateKey] || {};

    container.innerHTML = classes.map((c, idx) => {
      // Find matching subject from profile
      const matchingSub = state.profile.subjects.find(s => s.code === c.subjectCode);
      const subId = matchingSub ? matchingSub.id : `sub_${idx}`;
      const logStatus = logs[subId] || "unmarked";

      let statusBadge = "";
      if (logStatus === "attended") {
        statusBadge = `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"><i class="fa-solid fa-check mr-1"></i>Attended</span>`;
      } else if (logStatus === "absent") {
        statusBadge = `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"><i class="fa-solid fa-xmark mr-1"></i>Missed</span>`;
      } else if (logStatus === "cancelled") {
        statusBadge = `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"><i class="fa-solid fa-ban mr-1"></i>Cancelled</span>`;
      } else {
        statusBadge = `<span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">Scheduled</span>`;
      }

      return `
        <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all hover:border-indigo-300 dark:hover:border-indigo-700">
          <div class="flex items-start gap-3">
            <div class="px-2.5 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold text-center leading-tight">
              ${c.time.split(" - ")[0]}<br><span class="text-[10px] text-slate-500 dark:text-slate-400 font-normal">to ${c.time.split(" - ")[1]}</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-900 dark:text-slate-100 text-sm">${c.name}</span>
                <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">${c.subjectCode}</span>
                <span class="text-[11px] px-2 py-0.5 rounded ${c.type === 'Practical' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'} font-semibold">${c.type}</span>
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
                <span><i class="fa-solid fa-chalkboard-user mr-1 text-slate-400"></i>${c.faculty}</span>
                <span><i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>${c.room}</span>
              </div>
            </div>
          </div>
          
          <div class="flex items-center gap-2 self-end md:self-center">
            ${statusBadge}
            ${matchingSub ? `
              <div class="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-0.5 text-xs">
                <button onclick="AppUI.quickLogAttendance('${matchingSub.id}', 'attended')" title="Mark Attended" class="px-2.5 py-1 rounded-md transition-colors ${logStatus === 'attended' ? 'bg-emerald-600 text-white font-bold' : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'}">
                  <i class="fa-solid fa-check"></i>
                </button>
                <button onclick="AppUI.quickLogAttendance('${matchingSub.id}', 'absent')" title="Mark Absent" class="px-2.5 py-1 rounded-md transition-colors ${logStatus === 'absent' ? 'bg-rose-600 text-white font-bold' : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'}">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <button onclick="AppUI.quickLogAttendance('${matchingSub.id}', 'cancelled')" title="Class Cancelled / Holiday" class="px-2 py-1 rounded-md transition-colors ${logStatus === 'cancelled' ? 'bg-slate-500 text-white font-bold' : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'}">
                  <i class="fa-solid fa-ban"></i>
                </button>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");
  },

  renderSubjectCards() {
    const p = state.profile;
    const container = document.getElementById("subjects-cards-grid");
    if (!container) return;

    container.innerHTML = p.subjects.map(sub => {
      const pct = MathEngine.percentage(sub.attended, sub.conducted);
      const needed = MathEngine.classesNeeded(sub.attended, sub.conducted, p.threshold);
      const bunks = MathEngine.safeBunks(sub.attended, sub.conducted, p.threshold);
      const badge = MathEngine.getStatusBadge(pct, p.threshold);
      const isShortage = pct < p.threshold;

      return `
        <div class="card-hover-effect rounded-2xl border ${isShortage ? 'border-rose-300 dark:border-rose-900/80 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'} p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div class="flex items-start justify-between gap-2">
              <div>
                <span class="inline-block px-2.5 py-0.5 rounded-md font-mono text-xs font-bold bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400">
                  ${sub.code}
                </span>
                <span class="ml-2 text-xs px-2 py-0.5 rounded-full font-semibold ${sub.type === 'Practical' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'}">
                  ${sub.type}
                </span>
                <h4 class="font-bold text-slate-900 dark:text-slate-100 text-base mt-2 leading-snug">${sub.name}</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                  <span><i class="fa-solid fa-user-tie mr-1 text-slate-400"></i>${sub.faculty}</span>
                  <span>•</span>
                  <span>${sub.room}</span>
                </p>
              </div>
              
              <div class="text-right">
                <span class="text-2xl font-black font-mono-num ${isShortage ? 'text-rose-600 dark:text-rose-400' : pct >= p.threshold + 10 ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}">
                  ${pct}%
                </span>
                <div class="mt-1">
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${badge.bg}">
                    <i class="fa-solid ${badge.icon} text-[10px]"></i> ${badge.label}
                  </span>
                </div>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mt-4">
              <div class="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 font-mono-num">
                <span>Attended: <strong class="text-slate-900 dark:text-white">${sub.attended}</strong> / ${sub.conducted}</span>
                <span>Missed: <strong class="text-rose-500">${sub.conducted - sub.attended}</strong></span>
              </div>
              <div class="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                <!-- 75% Threshold Marker Line -->
                <div class="absolute top-0 bottom-0 left-[75%] w-0.5 bg-slate-400 dark:bg-slate-600 z-10" title="College 75% cutoff"></div>
                <div class="h-full rounded-full transition-all duration-500 ${isShortage ? 'bg-rose-500' : pct >= p.threshold + 10 ? 'bg-emerald-500' : 'bg-blue-500'}" style="width: ${Math.min(100, pct)}%"></div>
              </div>
            </div>

            <!-- Smart AI Pill Analysis -->
            <div class="mt-4 p-3 rounded-xl ${isShortage ? 'bg-rose-100/70 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-900' : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800'} text-xs">
              ${isShortage ? `
                <div class="font-bold flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
                  <i class="fa-solid fa-circle-exclamation"></i> Must attend next ${needed} classes!
                </div>
                <p class="mt-1 text-[11px] opacity-90">Consecutive attendance without absent marks required to attain ${p.threshold}% eligibility.</p>
              ` : `
                <div class="font-bold flex items-center gap-1.5 ${bunks > 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}">
                  <i class="fa-solid ${bunks > 0 ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i> 
                  ${bunks > 0 ? `${bunks} safe class bunk${bunks > 1 ? 's' : ''} available` : 'Zero bunks buffer remaining'}
                </div>
                <p class="mt-1 text-[11px] opacity-90">${bunks > 0 ? `You can miss up to ${bunks} lecture${bunks > 1 ? 's' : ''} safely.` : `Missing the next class drops you into shortage.`}</p>
              `}
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span class="text-slate-400 font-medium">Quick update:</span>
            <div class="flex items-center gap-1.5">
              <button onclick="AppUI.modifySubjectAttendance('${sub.id}', 1, 1)" class="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-semibold transition-colors flex items-center gap-1" title="Attended one class">
                <i class="fa-solid fa-plus text-[10px]"></i> Attended
              </button>
              <button onclick="AppUI.modifySubjectAttendance('${sub.id}', 0, 1)" class="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 font-semibold transition-colors flex items-center gap-1" title="Missed one class">
                <i class="fa-solid fa-plus text-[10px]"></i> Missed
              </button>
              <button onclick="AppUI.openEditSubjectModal('${sub.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" title="Edit subject">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  renderSubjectTable() {
    const p = state.profile;
    const tbody = document.getElementById("subjects-table-body");
    if (!tbody) return;

    tbody.innerHTML = p.subjects.map(sub => {
      const pct = MathEngine.percentage(sub.attended, sub.conducted);
      const needed = MathEngine.classesNeeded(sub.attended, sub.conducted, p.threshold);
      const bunks = MathEngine.safeBunks(sub.attended, sub.conducted, p.threshold);
      const badge = MathEngine.getStatusBadge(pct, p.threshold);
      const isShortage = pct < p.threshold;

      return `
        <tr class="border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
          <td class="py-3 px-4 font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
            ${sub.code}
          </td>
          <td class="py-3 px-4">
            <div class="font-semibold text-slate-900 dark:text-white text-sm">${sub.name}</div>
            <div class="text-xs text-slate-400 flex items-center gap-2">
              <span>${sub.faculty}</span>
              <span>•</span>
              <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold ${sub.type === 'Practical' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950' : 'bg-blue-100 text-blue-700 dark:bg-blue-950'}">${sub.type}</span>
            </div>
          </td>
          <td class="py-3 px-4 font-mono-num font-semibold text-slate-700 dark:text-slate-300 text-center">
            ${sub.conducted}
          </td>
          <td class="py-3 px-4 font-mono-num font-semibold text-emerald-600 dark:text-emerald-400 text-center">
            ${sub.attended}
          </td>
          <td class="py-3 px-4 font-mono-num font-semibold text-rose-500 text-center">
            ${sub.conducted - sub.attended}
          </td>
          <td class="py-3 px-4 text-center">
            <span class="font-mono-num font-bold text-sm ${isShortage ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-white'}">
              ${pct}%
            </span>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.bg}">
              <i class="fa-solid ${badge.icon} text-[10px]"></i> ${badge.label}
            </span>
          </td>
          <td class="py-3 px-4 text-center font-mono-num font-semibold ${isShortage ? 'text-rose-600 font-bold' : 'text-slate-400'}">
            ${isShortage ? `+${needed} classes` : '0'}
          </td>
          <td class="py-3 px-4 text-center font-mono-num font-semibold ${bunks > 0 ? 'text-emerald-600 font-bold' : 'text-slate-400'}">
            ${bunks > 0 ? `${bunks} safe bunks` : '0'}
          </td>
          <td class="py-3 px-4 text-right">
            <div class="inline-flex items-center gap-1">
              <button onclick="AppUI.modifySubjectAttendance('${sub.id}', 1, 1)" class="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600 transition-colors" title="Add attended">
                <i class="fa-solid fa-plus"></i>
              </button>
              <button onclick="AppUI.modifySubjectAttendance('${sub.id}', 0, 1)" class="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 transition-colors" title="Add absent">
                <i class="fa-solid fa-minus"></i>
              </button>
              <button onclick="AppUI.openEditSubjectModal('${sub.id}')" class="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors" title="Edit">
                <i class="fa-solid fa-pen"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  },

  renderTimetableMatrix() {
    const container = document.getElementById("timetable-full-matrix");
    if (!container) return;

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    container.innerHTML = days.map(day => {
      const classes = state.timetable[day] || [];
      return `
        <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
            <h4 class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              ${day}
            </h4>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
              ${classes.length} class${classes.length !== 1 ? 'es' : ''}
            </span>
          </div>
          
          <div class="space-y-2.5">
            ${classes.length > 0 ? classes.map(c => `
              <div class="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-all">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">${c.subjectCode}</span>
                  <span class="text-[11px] font-mono text-slate-500">${c.time}</span>
                </div>
                <div class="font-semibold text-slate-900 dark:text-slate-100 text-xs mt-1 truncate">${c.name}</div>
                <div class="text-[11px] text-slate-400 mt-1 flex justify-between">
                  <span>${c.faculty}</span>
                  <span class="font-medium">${c.room}</span>
                </div>
              </div>
            `).join("") : `<div class="text-xs text-slate-400 italic py-2">No scheduled lectures.</div>`}
          </div>
        </div>
      `;
    }).join("");
  },

  renderPredictorPlayground() {
    const p = state.profile;
    const select = document.getElementById("predictor-subject-select");
    if (!select) return;

    // Populate dropdown with options
    const currentValue = select.value || (p.subjects[0] ? p.subjects[0].id : "");
    select.innerHTML = `
      <option value="ALL">Aggregate (All Subjects Combined)</option>
      ${p.subjects.map(s => `
        <option value="${s.id}" ${s.id === currentValue ? 'selected' : ''}>${s.code} - ${s.name} (${MathEngine.percentage(s.attended, s.conducted)}%)</option>
      `).join("")}
    `;

    this.updatePredictorCalculations();
  },

  updatePredictorCalculations() {
    const p = state.profile;
    const select = document.getElementById("predictor-subject-select");
    const attendSlider = document.getElementById("slider-future-attend");
    const missSlider = document.getElementById("slider-future-miss");
    const targetInput = document.getElementById("predictor-target-threshold");

    if (!select || !attendSlider || !missSlider) return;

    const futureAttend = parseInt(attendSlider.value, 10) || 0;
    const futureMiss = parseInt(missSlider.value, 10) || 0;
    const target = parseFloat(targetInput ? targetInput.value : p.threshold) || 75;

    document.getElementById("slider-attend-val").textContent = futureAttend;
    document.getElementById("slider-miss-val").textContent = futureMiss;

    const selectedId = select.value;
    let baseAttended = 0;
    let baseConducted = 0;
    let subjectName = "";

    if (selectedId === "ALL") {
      const stats = MathEngine.getOverallStats(p.subjects, target);
      baseAttended = stats.totalAttended;
      baseConducted = stats.totalConducted;
      subjectName = "All Registered Courses (Overall)";
    } else {
      const found = p.subjects.find(s => s.id === selectedId);
      if (found) {
        baseAttended = found.attended;
        baseConducted = found.conducted;
        subjectName = `${found.code} - ${found.name}`;
      }
    }

    const currentPct = MathEngine.percentage(baseAttended, baseConducted);
    const projectedPct = MathEngine.projectedAttendance(baseAttended, baseConducted, futureAttend, futureMiss);
    const delta = Math.round((projectedPct - currentPct) * 10) / 10;

    const currentClassesNeeded = MathEngine.classesNeeded(baseAttended, baseConducted, target);
    const currentSafeBunks = MathEngine.safeBunks(baseAttended, baseConducted, target);

    const projectedAttendedTotal = baseAttended + futureAttend;
    const projectedConductedTotal = baseConducted + futureAttend + futureMiss;
    const projectedClassesNeeded = MathEngine.classesNeeded(projectedAttendedTotal, projectedConductedTotal, target);
    const projectedSafeBunks = MathEngine.safeBunks(projectedAttendedTotal, projectedConductedTotal, target);

    // Update UI elements
    document.getElementById("pred-current-pct").textContent = `${currentPct}%`;
    document.getElementById("pred-projected-pct").textContent = `${projectedPct}%`;
    
    const deltaBadge = document.getElementById("pred-delta-badge");
    if (deltaBadge) {
      if (delta > 0) {
        deltaBadge.textContent = `+${delta}% Gain`;
        deltaBadge.className = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
      } else if (delta < 0) {
        deltaBadge.textContent = `${delta}% Drop`;
        deltaBadge.className = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300";
      } else {
        deltaBadge.textContent = "0.0% No Change";
        deltaBadge.className = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
      }
    }

    // Verdict message
    const verdictEl = document.getElementById("pred-verdict-box");
    if (verdictEl) {
      if (projectedPct >= target) {
        verdictEl.className = "p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 text-sm";
        verdictEl.innerHTML = `
          <div class="font-bold flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
            <i class="fa-solid fa-circle-check text-base"></i> Safe Scenario Verified
          </div>
          <p class="mt-1 text-xs opacity-90">
            Under this plan, your attendance will be <strong>${projectedPct}%</strong>, safely above the <strong>${target}%</strong> college criteria. You will hold <strong>${projectedSafeBunks} safe bunk buffer</strong> remaining.
          </p>
        `;
      } else {
        verdictEl.className = "p-4 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 text-sm";
        verdictEl.innerHTML = `
          <div class="font-bold flex items-center gap-2 text-rose-800 dark:text-rose-300">
            <i class="fa-solid fa-triangle-exclamation text-base"></i> Detention Warning Triggered
          </div>
          <p class="mt-1 text-xs opacity-90">
            This projection drops your standing to <strong>${projectedPct}%</strong> (below ${target}%). You would require <strong>${projectedClassesNeeded} consecutive classes</strong> afterward to recover exam clearance!
          </p>
        `;
      }
    }

    // Quick calculation card
    document.getElementById("pred-consec-needed-val").textContent = currentClassesNeeded;
    document.getElementById("pred-safe-bunks-val").textContent = currentSafeBunks;
  },

  renderMedicalLeaveSimulator() {
    const p = state.profile;
    const leaveInput = document.getElementById("med-leave-days-input");
    if (!leaveInput) return;

    const days = parseInt(leaveInput.value, 10) || 0;
    const stats = MathEngine.getOverallStats(p.subjects, p.threshold);

    // Assume average 4 classes per medical leave day converted from absent to excused/attended
    const recoveredClasses = Math.min(stats.totalAbsent, days * 3);
    const adjustedAttended = stats.totalAttended + recoveredClasses;
    const adjustedPct = stats.totalConducted > 0 
      ? Math.round((adjustedAttended / stats.totalConducted) * 1000) / 10 
      : 100;

    document.getElementById("med-recovered-classes").textContent = `+${recoveredClasses} classes`;
    document.getElementById("med-adjusted-pct").textContent = `${adjustedPct}%`;
    
    const medStatus = document.getElementById("med-status-badge");
    if (medStatus) {
      if (adjustedPct >= p.threshold) {
        medStatus.textContent = "Clears Shortage Requirements";
        medStatus.className = "text-xs font-bold text-emerald-600 dark:text-emerald-400";
      } else {
        medStatus.textContent = `Still ${(p.threshold - adjustedPct).toFixed(1)}% below required minimum`;
        medStatus.className = "text-xs font-bold text-rose-500";
      }
    }
  },

  renderAiInsightsPanel() {
    const p = state.profile;
    const audit = AiAdvisor.generateComprehensiveAudit(p);
    const container = document.getElementById("ai-insights-report-container");
    if (!container) return;

    container.innerHTML = `
      <div class="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 mb-4">
        <div class="flex items-start gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            <i class="fa-solid fa-brain"></i>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white text-sm">Automated Attendance Risk Diagnosis</h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">${audit.diagnosis}</p>
          </div>
        </div>
      </div>

      <div class="space-y-2.5">
        <h5 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Target Priority Actions</h5>
        ${audit.actionItems.map(item => `
          <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
            <i class="fa-solid fa-arrow-right-long text-indigo-500 mt-0.5 shrink-0"></i>
            <div>${item}</div>
          </div>
        `).join("")}
      </div>
    `;
  },

  renderCharts() {
    if (typeof Chart === "undefined") return;

    const p = state.profile;
    const isDark = document.documentElement.classList.contains("dark");
    const textColor = isDark ? "#94a3b8" : "#475569";
    const gridColor = isDark ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)";

    // 1. Subject Comparison Bar Chart
    const barCtx = document.getElementById("chart-subjects-bar");
    if (barCtx) {
      if (this.charts.bar) this.charts.bar.destroy();

      const labels = p.subjects.map(s => s.code);
      const percentages = p.subjects.map(s => MathEngine.percentage(s.attended, s.conducted));
      const backgroundColors = percentages.map(pct => {
        if (pct >= p.threshold + 10) return "rgba(16, 185, 129, 0.85)"; // Emerald
        if (pct >= p.threshold) return "rgba(59, 130, 246, 0.85)"; // Blue
        if (pct >= p.threshold - 5) return "rgba(245, 158, 11, 0.85)"; // Amber
        return "rgba(239, 68, 68, 0.85)"; // Red
      });

      this.charts.bar = new Chart(barCtx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Attendance %",
              data: percentages,
              backgroundColor: backgroundColors,
              borderRadius: 6,
              maxBarThickness: 38
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `Attendance: ${ctx.parsed.y}%`
              }
            }
          },
          scales: {
            y: {
              min: 0,
              max: 100,
              ticks: { color: textColor, font: { family: 'JetBrains Mono' } },
              grid: { color: gridColor }
            },
            x: {
              ticks: { color: textColor, font: { family: 'JetBrains Mono', weight: 'bold' } },
              grid: { display: false }
            }
          }
        }
      });
    }

    // 2. Overall Breakdown Doughnut Chart
    const doughnutCtx = document.getElementById("chart-overall-doughnut");
    if (doughnutCtx) {
      if (this.charts.doughnut) this.charts.doughnut.destroy();

      const stats = MathEngine.getOverallStats(p.subjects, p.threshold);
      this.charts.doughnut = new Chart(doughnutCtx, {
        type: "doughnut",
        data: {
          labels: ["Attended Classes", "Missed / Absent"],
          datasets: [
            {
              data: [stats.totalAttended, stats.totalAbsent],
              backgroundColor: ["#3b82f6", "#ef4444"],
              borderWidth: 0,
              hoverOffset: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "75%",
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: textColor, font: { family: 'Plus Jakarta Sans', weight: 'bold' }, padding: 12 }
            }
          }
        }
      });
    }

    // 3. Weekly Trajectory Trend Chart (Simulated 12 Weeks)
    const trendCtx = document.getElementById("chart-attendance-trend");
    if (trendCtx) {
      if (this.charts.trend) this.charts.trend.destroy();

      const currentStats = MathEngine.getOverallStats(p.subjects, p.threshold);
      const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"];
      // Generate a realistic trend leading up to current attendance
      const currentPct = currentStats.overallPct;
      const trendData = [
        92.0,
        89.5,
        86.0,
        84.5,
        81.0,
        79.5,
        77.0,
        76.2,
        Math.max(50, currentPct - 1.2),
        Math.max(50, currentPct - 0.5),
        currentPct,
        null
      ];

      this.charts.trend = new Chart(trendCtx, {
        type: "line",
        data: {
          labels: weeks,
          datasets: [
            {
              label: "Overall Trend %",
              data: trendData,
              borderColor: "#6366f1",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              fill: true,
              tension: 0.35,
              pointBackgroundColor: "#6366f1",
              pointRadius: 4,
              pointHoverRadius: 6
            },
            {
              label: "75% College Cutoff",
              data: Array(12).fill(p.threshold),
              borderColor: "#ef4444",
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: { color: textColor, font: { family: 'Plus Jakarta Sans' } }
            }
          },
          scales: {
            y: {
              min: 40,
              max: 100,
              ticks: { color: textColor, font: { family: 'JetBrains Mono' } },
              grid: { color: gridColor }
            },
            x: {
              ticks: { color: textColor, font: { family: 'JetBrains Mono' } },
              grid: { color: gridColor }
            }
          }
        }
      });
    }
  },

  renderChatMessages() {
    const container = document.getElementById("ai-chat-messages");
    if (!container) return;

    container.innerHTML = state.chatHistory.map(msg => {
      const isAi = msg.sender === "ai";
      // Render markdown formatting
      let formattedText = msg.text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/### (.*?)\n/g, '<h4 class="font-bold text-sm text-indigo-700 dark:text-indigo-300 mt-1 mb-1">$1</h4>')
        .replace(/• (.*?)\n/g, '<li class="ml-4 list-disc">$1</li>')
        .replace(/\n\n/g, '<div class="h-2"></div>')
        .replace(/\n/g, '<br>');

      return `
        <div class="flex items-start gap-3 ${isAi ? '' : 'flex-row-reverse'} mb-3">
          <div class="w-8 h-8 rounded-full ${isAi ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-white'} flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
            ${isAi ? '<i class="fa-solid fa-sparkles"></i>' : '<i class="fa-solid fa-user"></i>'}
          </div>
          <div class="max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${isAi ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 shadow-xs' : 'bg-indigo-600 text-white'}">
            <div class="flex items-center justify-between gap-4 mb-1 border-b ${isAi ? 'border-slate-100 dark:border-slate-700 pb-1 text-[10px] text-slate-400' : 'border-indigo-500 pb-1 text-[10px] text-indigo-200'}">
              <span class="font-bold">${isAi ? 'Aura AI Academic Copilot' : 'You'}</span>
              <span>${msg.time}</span>
            </div>
            <div>${formattedText}</div>
          </div>
        </div>
      `;
    }).join("");

    container.scrollTop = container.scrollHeight;
  },

  sendUserMessage(text) {
    if (!text || !text.trim()) return;

    const query = text.trim();
    state.chatHistory.push({
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    });
    this.renderChatMessages();

    // Generate AI Response with pleasant micro-delay
    setTimeout(() => {
      const response = AiAdvisor.respondToChat(query, state.profile);
      state.chatHistory.push({
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: response
      });
      this.renderChatMessages();
    }, 450);
  },

  quickLogAttendance(subjectId, status) {
    const todayKey = new Date().toISOString().split("T")[0];
    if (!state.dailyLogs[todayKey]) {
      state.dailyLogs[todayKey] = {};
    }

    const prevStatus = state.dailyLogs[todayKey][subjectId];
    const sub = state.profile.subjects.find(s => s.id === subjectId);
    if (!sub) return;

    // Undo previous if any
    if (prevStatus === "attended") {
      sub.attended = Math.max(0, sub.attended - 1);
      sub.conducted = Math.max(0, sub.conducted - 1);
    } else if (prevStatus === "absent") {
      sub.conducted = Math.max(0, sub.conducted - 1);
    }

    // Apply new status
    if (status === "attended") {
      sub.attended += 1;
      sub.conducted += 1;
      state.dailyLogs[todayKey][subjectId] = "attended";
      this.triggerConfettiIfSafe();
      this.showToast(`Logged +1 attended for ${sub.code}!`, "success");
    } else if (status === "absent") {
      sub.conducted += 1;
      state.dailyLogs[todayKey][subjectId] = "absent";
      this.showToast(`Marked absent for ${sub.code}.`, "warning");
    } else if (status === "cancelled") {
      state.dailyLogs[todayKey][subjectId] = "cancelled";
      this.showToast(`Class marked cancelled/holiday for ${sub.code}.`, "info");
    }

    state.saveState();
    this.renderAll();
  },

  modifySubjectAttendance(subjectId, addAttended, addConducted) {
    const sub = state.profile.subjects.find(s => s.id === subjectId);
    if (!sub) return;

    sub.attended = Math.max(0, sub.attended + addAttended);
    sub.conducted = Math.max(0, sub.conducted + addConducted);

    state.saveState();
    this.renderAll();

    if (addAttended > 0) {
      this.showToast(`Updated ${sub.code}: Attended +1`, "success");
      this.triggerConfettiIfSafe();
    } else {
      this.showToast(`Updated ${sub.code}: Missed +1`, "warning");
    }
  },

  triggerConfettiIfSafe() {
    const stats = MathEngine.getOverallStats(state.profile.subjects, state.profile.threshold);
    if (stats.overallPct >= state.profile.threshold && typeof confetti === "function") {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  },

  showToast(message, type = "info") {
    const toast = document.createElement("div");
    let bg = "bg-slate-900 text-white";
    if (type === "success") bg = "bg-emerald-600 text-white";
    if (type === "warning") bg = "bg-amber-600 text-white";
    if (type === "danger") bg = "bg-rose-600 text-white";

    toast.className = `fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg transition-all transform duration-300 flex items-center gap-2 ${bg}`;
    toast.innerHTML = `<i class="fa-solid fa-bell"></i> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  },

  // Switch Tabs
  switchTab(tabId) {
    state.activeTab = tabId;
    document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
    const activeEl = document.getElementById(`tab-content-${tabId}`);
    if (activeEl) activeEl.classList.remove("hidden");

    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      const target = btn.getAttribute("data-tab");
      if (target === tabId) {
        btn.classList.add("bg-indigo-50", "text-indigo-600", "dark:bg-indigo-950/60", "dark:text-indigo-400", "font-bold");
        btn.classList.remove("text-slate-600", "dark:text-slate-400", "font-medium");
      } else {
        btn.classList.remove("bg-indigo-50", "text-indigo-600", "dark:bg-indigo-950/60", "dark:text-indigo-400", "font-bold");
        btn.classList.add("text-slate-600", "dark:text-slate-400", "font-medium");
      }
    });

    // Re-render charts when switching to Analytics tab
    if (tabId === "analytics") {
      setTimeout(() => this.renderCharts(), 50);
    }
  },

  // Edit Subject Modal
  openEditSubjectModal(subjectId) {
    const sub = state.profile.subjects.find(s => s.id === subjectId);
    if (!sub) return;

    document.getElementById("modal-edit-sub-id").value = sub.id;
    document.getElementById("modal-edit-sub-code").value = sub.code;
    document.getElementById("modal-edit-sub-name").value = sub.name;
    document.getElementById("modal-edit-sub-faculty").value = sub.faculty;
    document.getElementById("modal-edit-sub-conducted").value = sub.conducted;
    document.getElementById("modal-edit-sub-attended").value = sub.attended;
    document.getElementById("modal-edit-sub-room").value = sub.room || "";
    document.getElementById("modal-edit-sub-type").value = sub.type || "Theory";

    const modal = document.getElementById("edit-subject-modal");
    if (modal) modal.classList.remove("hidden");
  },

  closeEditSubjectModal() {
    const modal = document.getElementById("edit-subject-modal");
    if (modal) modal.classList.add("hidden");
  },

  saveEditedSubject() {
    const id = document.getElementById("modal-edit-sub-id").value;
    const sub = state.profile.subjects.find(s => s.id === id);
    if (!sub) return;

    sub.code = document.getElementById("modal-edit-sub-code").value.trim();
    sub.name = document.getElementById("modal-edit-sub-name").value.trim();
    sub.faculty = document.getElementById("modal-edit-sub-faculty").value.trim();
    sub.conducted = Math.max(0, parseInt(document.getElementById("modal-edit-sub-conducted").value, 10) || 0);
    sub.attended = Math.min(sub.conducted, Math.max(0, parseInt(document.getElementById("modal-edit-sub-attended").value, 10) || 0));
    sub.room = document.getElementById("modal-edit-sub-room").value.trim();
    sub.type = document.getElementById("modal-edit-sub-type").value;

    state.saveState();
    this.closeEditSubjectModal();
    this.renderAll();
    this.showToast(`Updated details for ${sub.code}`, "success");
  },

  deleteSubject() {
    const id = document.getElementById("modal-edit-sub-id").value;
    if (!confirm("Are you sure you want to remove this subject?")) return;

    state.profile.subjects = state.profile.subjects.filter(s => s.id !== id);
    state.saveState();
    this.closeEditSubjectModal();
    this.renderAll();
    this.showToast("Subject removed", "warning");
  },

  openAddSubjectModal() {
    document.getElementById("form-add-subject").reset();
    const modal = document.getElementById("add-subject-modal");
    if (modal) modal.classList.remove("hidden");
  },

  closeAddSubjectModal() {
    const modal = document.getElementById("add-subject-modal");
    if (modal) modal.classList.add("hidden");
  },

  handleAddSubjectSubmit(e) {
    e.preventDefault();
    const code = document.getElementById("add-sub-code").value.trim();
    const name = document.getElementById("add-sub-name").value.trim();
    const faculty = document.getElementById("add-sub-faculty").value.trim() || "Faculty Assigned";
    const type = document.getElementById("add-sub-type").value;
    const room = document.getElementById("add-sub-room").value.trim() || "LT-101";
    const conducted = parseInt(document.getElementById("add-sub-conducted").value, 10) || 0;
    const attended = parseInt(document.getElementById("add-sub-attended").value, 10) || 0;

    const newSub = {
      id: `sub_${Date.now()}`,
      code,
      name,
      faculty,
      type,
      room,
      credits: type === 'Practical' ? 2 : 4,
      conducted: Math.max(0, conducted),
      attended: Math.min(conducted, Math.max(0, attended)),
      maxPlanned: 50
    };

    state.profile.subjects.push(newSub);
    state.saveState();
    this.closeAddSubjectModal();
    this.renderAll();
    this.showToast(`Added ${code} - ${name}`, "success");
  },

  // Edit Profile Modal
  openProfileModal() {
    const p = state.profile;
    document.getElementById("edit-prof-name").value = p.name;
    document.getElementById("edit-prof-enrollment").value = p.enrollment;
    document.getElementById("edit-prof-branch").value = p.branch;
    document.getElementById("edit-prof-semester").value = p.semester;
    document.getElementById("edit-prof-threshold").value = p.threshold || 75;
    document.getElementById("edit-prof-cgpa").value = p.cgpa;
    document.getElementById("edit-prof-mentor").value = p.mentor;

    const modal = document.getElementById("edit-profile-modal");
    if (modal) modal.classList.remove("hidden");
  },

  closeProfileModal() {
    const modal = document.getElementById("edit-profile-modal");
    if (modal) modal.classList.add("hidden");
  },

  saveProfileDetails() {
    const p = state.profile;
    p.name = document.getElementById("edit-prof-name").value.trim();
    p.enrollment = document.getElementById("edit-prof-enrollment").value.trim();
    p.branch = document.getElementById("edit-prof-branch").value.trim();
    p.semester = document.getElementById("edit-prof-semester").value.trim();
    p.threshold = parseFloat(document.getElementById("edit-prof-threshold").value) || 75;
    p.cgpa = document.getElementById("edit-prof-cgpa").value.trim();
    p.mentor = document.getElementById("edit-prof-mentor").value.trim();

    state.saveState();
    this.closeProfileModal();
    this.renderAll();
    this.showToast("Profile settings updated successfully!", "success");
  },

  // Export to CSV
  exportToCSV() {
    const p = state.profile;
    let csv = "Course Code,Course Name,Type,Faculty,Conducted,Attended,Absent,Attendance %,Required For 75%,Safe Bunks\n";
    p.subjects.forEach(s => {
      const pct = MathEngine.percentage(s.attended, s.conducted);
      const needed = MathEngine.classesNeeded(s.attended, s.conducted, p.threshold);
      const bunks = MathEngine.safeBunks(s.attended, s.conducted, p.threshold);
      csv += `"${s.code}","${s.name}","${s.type}","${s.faculty}",${s.conducted},${s.attended},${s.conducted - s.attended},${pct}%,${needed},${bunks}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `AMS_Attendance_${p.enrollment}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast("Attendance CSV downloaded!", "success");
  },

  // Import CSV
  importFromCSV(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length < 2) throw new Error("CSV contains insufficient lines.");

        // Skip header
        const newSubjects = [];
        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(",").map(p => p.replace(/"/g, '').trim());
          if (parts.length >= 6) {
            const code = parts[0];
            const name = parts[1];
            const type = parts[2] || "Theory";
            const faculty = parts[3] || "Faculty";
            const conducted = parseInt(parts[4], 10) || 0;
            const attended = parseInt(parts[5], 10) || 0;
            newSubjects.push({
              id: `csv_${Date.now()}_${i}`,
              code,
              name,
              type,
              faculty,
              room: "LT-101",
              credits: 4,
              conducted: Math.max(0, conducted),
              attended: Math.min(conducted, Math.max(0, attended)),
              maxPlanned: 50
            });
          }
        }

        if (newSubjects.length > 0) {
          state.profile.subjects = newSubjects;
          state.saveState();
          this.renderAll();
          this.showToast(`Imported ${newSubjects.length} subjects successfully!`, "success");
        } else {
          alert("Could not parse subjects from CSV. Please check formatting.");
        }
      } catch (err) {
        alert("Failed to parse CSV file: " + err.message);
      }
    };
    reader.readAsText(file);
  },

  // Print Official College Attendance Statement
  printReport() {
    window.print();
  },

  bindEvents() {
    // Navigation tabs
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-tab");
        this.switchTab(tab);
      });
    });

    // Theme toggle (Dark / Light)
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("smart_attendance_theme", isDark ? "dark" : "light");
        this.renderCharts();
      });
    }

    // Profile switcher dropdown
    const profileSelect = document.getElementById("profile-switcher-select");
    if (profileSelect) {
      profileSelect.value = state.currentProfileId;
      profileSelect.addEventListener("change", (e) => {
        state.switchProfile(e.target.value);
        this.renderAll();
        this.showToast(`Switched profile to ${state.profile.name}`, "info");
      });
    }

    // Predictor controls
    const predSelect = document.getElementById("predictor-subject-select");
    if (predSelect) predSelect.addEventListener("change", () => this.updatePredictorCalculations());

    const attendSlider = document.getElementById("slider-future-attend");
    if (attendSlider) attendSlider.addEventListener("input", () => this.updatePredictorCalculations());

    const missSlider = document.getElementById("slider-future-miss");
    if (missSlider) missSlider.addEventListener("input", () => this.updatePredictorCalculations());

    const targetInput = document.getElementById("predictor-target-threshold");
    if (targetInput) targetInput.addEventListener("input", () => this.updatePredictorCalculations());

    // Medical leave simulator
    const medInput = document.getElementById("med-leave-days-input");
    if (medInput) medInput.addEventListener("input", () => this.renderMedicalLeaveSimulator());

    // AI Chat Input
    const chatForm = document.getElementById("ai-chat-form");
    if (chatForm) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("ai-chat-input");
        if (input && input.value) {
          this.sendUserMessage(input.value);
          input.value = "";
        }
      });
    }

    // Quick AI prompt chips
    document.querySelectorAll(".ai-prompt-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const prompt = chip.getAttribute("data-prompt");
        this.sendUserMessage(prompt);
      });
    });

    // CSV File upload input
    const csvFileInput = document.getElementById("csv-file-input");
    if (csvFileInput) {
      csvFileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          this.importFromCSV(e.target.files[0]);
        }
      });
    }
  }
};

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // Check theme preference
  const savedTheme = localStorage.getItem("smart_attendance_theme");
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  AppUI.init();
});
