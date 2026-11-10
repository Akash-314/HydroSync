export interface InternshipProgram {
  id: string;
  title: string;
  domain: 'Embedded Systems' | 'IoT' | 'Edge AI' | 'Robotics';
  summary: string;
  durations: string[];
  modes: ('Online' | 'Offline' | 'Hybrid')[];
  eligibility: string[];
  skillsGained: string[];
  hardwareKit: string;
  stipendNote: string;
  featured?: boolean;
}

export const INTERNSHIP_PROGRAMS: InternshipProgram[] = [
  {
    id: 'embedded-firmware',
    title: 'Embedded Firmware & Bare-Metal C/C++',
    domain: 'Embedded Systems',
    summary:
      'Direct register-level programming on ARM Cortex-M microcontrollers, peripheral driver development (SPI, I2C, UART), interrupt handling, and FreeRTOS task scheduling.',
    durations: ['1 Month (4 Weeks)', '3 Months (12 Weeks)', '6 Months (24 Weeks)'],
    modes: ['Online', 'Offline', 'Hybrid'],
    eligibility: [
      'B.Tech / B.E / M.Tech / Diploma in ECE, EEE, EIE, CS, or Mechatronics',
      'Knowledge of basic C programming & digital electronics fundamentals',
      'Enthusiasm for hands-on oscilloscope testing and circuit debugging',
    ],
    skillsGained: [
      'Bare-metal STM32 register manipulation',
      'FreeRTOS task queues, semaphores & mutexes',
      'Oscilloscope & logic analyzer protocol decoding',
      'Low-power sleep state engineering',
    ],
    hardwareKit: 'STM32 / ARM Cortex-M dev board + breakout sensors + logic leads',
    stipendNote:
      'Foundational skill-building track includes physical dev kits. Performance-based stipends available for 6-month candidates evaluated during technical defense.',
    featured: true,
  },
  {
    id: 'industrial-iot',
    title: 'Industrial IoT Systems & Telemetry Gateways',
    domain: 'IoT',
    summary:
      'Architect robust sensor telemetry gateways, implement encrypted MQTT & LoRaWAN protocols, and stream real-time data to AWS IoT Core and monitoring dashboards.',
    durations: ['1 Month (4 Weeks)', '3 Months (12 Weeks)', '6 Months (24 Weeks)'],
    modes: ['Online', 'Offline', 'Hybrid'],
    eligibility: [
      'B.Tech / B.E / BCA / MCA / Diploma in ECE, CS, IT, or EEE',
      'Familiarity with microcontroller pinouts and basic networking concepts',
      'Curiosity for distributed sensor architectures and cloud telemetry',
    ],
    skillsGained: [
      'ESP32 FreeRTOS edge programming',
      'LoRaWAN point-to-point and gateway topologies',
      'Encrypted MQTT communication with device shadows',
      'Sensor calibration & solar power budgeting',
    ],
    hardwareKit: 'ESP32 development module + LoRaWAN transceiver + sensor array',
    stipendNote:
      'Includes complete hardware development package. Performance-linked honorariums awarded on successful completion of industrial client milestones.',
    featured: true,
  },
  {
    id: 'edge-ai-tinyml',
    title: 'Edge AI, Computer Vision & TinyML',
    domain: 'Edge AI',
    summary:
      'Train lightweight convolutional neural networks, quantize weights to INT8 precision with TensorFlow Lite for Microcontrollers, and execute real-time inference on edge silicon.',
    durations: ['3 Months (12 Weeks)', '6 Months (24 Weeks)'],
    modes: ['Online', 'Hybrid'],
    eligibility: [
      '3rd / 4th Year B.Tech / M.Tech in CS, AI/ML, Data Science, or ECE',
      'Proficiency in Python and basic machine learning workflows',
      'Prior exposure to image processing or sensor data analysis',
    ],
    skillsGained: [
      'OpenCV visual inspection pipeline construction',
      'Model quantization & memory budgeting (TFLite Micro)',
      'Camera sensor interfacing on resource-constrained MCUs',
      'Real-time edge classification & inference metrics',
    ],
    hardwareKit: 'Edge AI MCU kit with camera sensor & memory expansion',
    stipendNote:
      'Research-oriented track. Candidates contributing to published R&D prototypes or industrial defect systems are eligible for project-specific stipends.',
    featured: true,
  },
  {
    id: 'robotics-embedded-control',
    title: 'Robotics & Embedded Motor Control',
    domain: 'Robotics',
    summary:
      'Implement closed-loop PID algorithms, quadrature encoder feedback, and motor driver interfaces for mobile robotics chassis and industrial actuators.',
    durations: ['1 Month (4 Weeks)', '3 Months (12 Weeks)', '6 Months (24 Weeks)'],
    modes: ['Offline', 'Hybrid'],
    eligibility: [
      'B.Tech / Diploma in Robotics, Mechatronics, Mechanical, EEE, or ECE',
      'Interest in electromechanical systems, motor dynamics, and drivers',
      'Available for hands-on workbench testing at our lab facility',
    ],
    skillsGained: [
      'Closed-loop PID velocity & position tuning',
      'BLDC & stepper motor driver implementation',
      'Sensor fusion with IMU and ultrasonic sensors',
      'Power distribution & H-bridge protection circuits',
    ],
    hardwareKit: 'Robotics control board + dual motor drive chassis + IMU module',
    stipendNote:
      'Laboratory-based track with workbench instrument access. Project evaluation determines certificate grading and subsequent R&D associate opportunities.',
    featured: false,
  },
];

export const INTERNSHIP_FAQS = [
  {
    id: 'faq-intern-1',
    question: 'How do the Online vs. Offline lab modes work?',
    answer:
      'In Offline mode, interns work directly at our Bengaluru laboratory on dedicated hardware test benches with oscilloscopes and equipment. In Online and Hybrid modes, a physical hardware development kit is dispatched to your registered address with live daily instructor check-ins and remote debug sessions.',
  },
  {
    id: 'faq-intern-2',
    question: 'Can I receive an approved NOC and college major/minor project credit?',
    answer:
      'Yes. HydroSync provides formal verification letters, periodic guide evaluation rubrics, mid-term reviews, and final project documentation formatted to satisfy university autonomous guidelines and AICTE requirements.',
  },
  {
    id: 'faq-intern-3',
    question: 'What is the policy regarding stipends?',
    answer:
      'Internships are structured primarily as intensive, hands-on skill acceleration programs where physical hardware kits and one-on-one engineering mentorship are provided. For 6-month advanced tracks and candidates working on commercial client prototypes, performance-based stipends are offered following the candidate evaluation round.',
  },
  {
    id: 'faq-intern-4',
    question: 'What hardware development kit is provided?',
    answer:
      'Depending on your track, you receive authentic development silicon (such as STM32 ARM Cortex-M boards or ESP32 dual-core MCUs), breakout sensor modules, connection cables, and access to code repositories and schematic diagrams.',
  },
  {
    id: 'faq-intern-5',
    question: 'What is the selection and application process?',
    answer:
      'After submitting your application below, our engineering team reviews your academic background and interest. Shortlisted candidates participate in an introductory technical orientation call to align on track prerequisites, kit logistics, and batch commencement dates.',
  },
];

