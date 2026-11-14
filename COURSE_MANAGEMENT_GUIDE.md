# HydroSync Innovations LLP — Course Management Guide

This guide describes how academic managers and course coordinators can create, update, and manage technical training courses and cohorts.

---

## 1. Creating a New Course

1. Navigate to **Courses & Batches** (`/admin/courses`).
2. Click **Create New Course** at the top right.
3. Complete the core course specifications:
   - **Course Title**: e.g. *Industrial Embedded Systems & Bare-Metal C*.
   - **URL Slug**: e.g. `industrial-embedded-systems-bare-metal-c` (automatically generated).
   - **Category**: Select domain (Embedded Systems, IoT, Edge AI, Robotics, VLSI, PCB Design).
   - **Skill Level**: Beginner, Intermediate, Advanced, or All Levels.
   - **Duration (Weeks)**: Duration of the training program.
   - **Delivery Mode**: Hybrid (Lab + Online), In-Person Hands-on, or Live Online.
   - **Tuition Fee (INR)**: Numerical fee (e.g. `4999`).
   - **Overview & Prerequisites**: Course summary and recommended student background.
4. Add hardware tools: Enter microcontroller tags (e.g. `STM32F401`, `FreeRTOS`, `Saleae Logic Analyzer`).
5. **Interactive Syllabus Builder**:
   - Click **Add Module**.
   - Fill in Module Title and Duration (Weeks).
   - Add specific lecture topics.
   - Reorder modules using the **Move Up** and **Move Down** buttons.
6. Click **Save Course** to publish.

---

## 2. Scheduling Live Batches

Under each course, managers can manage active batches:
- Set batch start date and maximum seat capacity.
- As students enroll, current seat counts are tracked in real-time.
- Mark batch as `scheduled`, `in_progress`, or `completed`.
