# 🎓 Smart Attendance Analyzer 

> **A Next-Generation Academic Attendance Management & AI Advisory System for College Students.**
> Inspired by the **Academics Management System (AMS)** at **Madhav Institute of Technology & Science (MITS), Gwalior** ([ams.mitsgwalior.in](https://ams.mitsgwalior.in/student/dashboard)) with advanced AI analytics, shortage early warning systems, and smart bunk calculators.

---

## 🌟 Key Features

### 1. 📋 Student Profile & Comprehensive Academic Dossier
* **Real Institutional Profile**: Displays student photo, Roll/Enrollment number, Department, Semester, Section, Academic Mentor, CGPA, and Academic Year.
* **Instant Profile Switcher**: Switch on-the-fly between:
  * ⚠️ **Aarav Sharma (At Risk - 73.6%)**: Borderline student with critical shortages in Compiler Design and Network Lab.
  * ✅ **Priya Verma (Safe - 88.5%)**: High achiever with 14+ safe bunks.
  * ⛔ **Rohan Malviya (Critical - 59.3%)**: Detained status student needing intensive recovery.
* **Full Profile Customizer**: Customize student name, roll number, mentor, and college policy thresholds directly from the UI.

### 2. 🧮 Smart Attendance Predictor & Bunk Planner (What-If Simulator)
* **Mathematical Bunk Calculator**:
  * Calculates exact number of classes a student can **safely miss** without falling below the required cutoff (e.g. 75% or 80%):
    $$\text{Safe Bunks} = \left\lfloor \frac{100 \times \text{Attended} - \text{Target} \times \text{Conducted}}{\text{Target}} \right\rfloor$$
* **Shortage Recovery Engine**:
  * If already below threshold, calculates the exact number of **consecutive classes** you must attend without a single absence to clear your exam debarment:
    $$\text{Consecutive Classes Needed} = \left\lceil \frac{\text{Target} \times \text{Conducted} - 100 \times \text{Attended}}{100 - \text{Target}} \right\rceil$$
* **Interactive Sliders**: Move the **"Future Classes to Attend"** and **"Future Classes to Miss"** sliders and watch the real-time projection change dynamically.

### 3. 🚨 Early Warning System & Shortage Alerts
* **Critical Debarment Banners**: Highlights detained and at-risk courses directly on the dashboard.
* **Risk Categorization**:
  * **Excellent (≥ 85%)**: Placements & honor list eligible.
  * **Safe Margin (75% - 84.9%)**: Above cutoff with safe buffer.
  * **Borderline Watch (70% - 74.9%)**: 0 safe bunks remaining.
  * **Critical Shortage (< 70%)**: Debarment notice active.

### 4. 📅 Timetable & Schedule Integration with Live 1-Click Tracker
* **Weekly Timetable Grid**: Full Monday-to-Saturday schedule complete with slot timings, course codes, theory/practical tags, faculty names, and lecture halls.
* **Today's Live Class Tracker**: Quick 1-click check-in buttons (**Attended**, **Missed**, **Cancelled/Holiday**) that instantly recompute your attendance ledger and save state.

### 5. 🤖 Aura: AI Academic & Attendance Copilot
* Grounded natural language AI assistant aware of your actual subject ledger and attendance deficits.
* Quick prompts:
  * 🎯 *"Which classes can I safely bunk this week?"*
  * ⚡ *"Generate my 3-step attendance recovery plan"*
  * 🗓️ *"Can I take Friday off?"*
  * 🏥 *"Explain college medical leave and OD exemptions"*

### 6. 📊 Visual Analytics & Trends
* **Course Attendance Bar Chart** with interactive 75% cutoff threshold reference line.
* **Class Ratio Doughnut Chart** (Attended vs. Unexcused Absences).
* **12-Week Semester Trajectory Chart** showing historical trends and shortage warnings.

### 7. 🏥 Medical & On-Duty (OD) Leave Simulator
* Colleges allow up to 10% attendance relaxation (from 75% down to 65%) for genuine medical illnesses or college-sponsored hackathons / sports fests.
* Input certified leave days and test if official submission clears your detention notice.

### 8. 📄 Official Verification Slip & CSV Import/Export
* **Printable MITS-DU Attendance Dossier**: Includes institutional header, student particulars, ledger table, Dean of Academics signature lines, and official verification seal.
* **Export to CSV**: Download complete records in spreadsheet format.
* **Import CSV**: Upload external attendance data.

---

## 🚀 How to Run

1. Open a terminal in this project directory:
   ```bash
   cd C:\Users\dell\.gemini\antigravity\scratch\smart-attendance-analyzer
   ```
2. Run the local Python server:
   ```bash
   python server.py --open
   ```
   *(Or double-click `run.bat` on Windows)*
3. Visit the website in your web browser:
   **[http://localhost:8080](http://localhost:8080)**

---

## 🛠️ Technology Stack
* **Frontend**: HTML5, Tailwind CSS, Modern CSS3 with Glassmorphism and CSS Custom Properties.
* **Icons**: FontAwesome 6 Pro CDN.
* **Data Visualization**: Chart.js.
* **Effects**: Canvas-Confetti for safe threshold celebrations.
* **Backend / Server**: Python 3 standard library `http.server` with custom CORS/caching headers.
* **Persistence**: Browser `localStorage` for saving state, logs, and student profiles.
