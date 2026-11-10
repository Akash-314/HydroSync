export interface Course {
  id: string;
  title: string;
  category:
    | 'IoT and Embedded Systems'
    | 'Arduino and ESP32'
    | 'AI and Machine Learning for IoT'
    | 'Python Programming'
    | 'Electronics Basics'
    | 'Drone Technology'
    | 'Web Development';
  shortDescription: string;
  duration: string;
  mode: 'Online Live' | 'Classroom Hands-on' | 'Hybrid';
  fee: string;
  outcomes: string[];
  prerequisites: string;
  hardwareKitIncluded: boolean;
  featured?: boolean;
}

export const COURSE_CATEGORIES = [
  'All Categories',
  'IoT and Embedded Systems',
  'Arduino and ESP32',
  'AI and Machine Learning for IoT',
  'Python Programming',
  'Electronics Basics',
  'Drone Technology',
  'Web Development',
] as const;

export const COURSES_DATA: Course[] = [
  {
    id: 'iot-embedded-systems',
    title: 'Industrial IoT & Embedded Systems with FreeRTOS',
    category: 'IoT and Embedded Systems',
    shortDescription:
      'Master bare-metal peripheral drivers on ARM Cortex-M, multi-tasking with FreeRTOS, and secure industrial telemetry gateways over MQTT and LoRaWAN.',
    duration: '6 Weeks (48 Hours)',
    mode: 'Hybrid',
    fee: 'Available on Enquiry (Hardware Kit Included)',
    outcomes: [
      'Write bare-metal register drivers for UART, SPI, and I2C',
      'Implement real-time task queues, mutexes, and semaphores with FreeRTOS',
      'Configure low-power sleep modes and watchdog timers',
      'Deploy encrypted sensor telemetry to cloud IoT brokers',
    ],
    prerequisites: 'Basic knowledge of C programming & digital electronics fundamentals.',
    hardwareKitIncluded: true,
    featured: true,
  },
  {
    id: 'arduino-esp32',
    title: 'Connected Device Prototyping with ESP32 & Arduino',
    category: 'Arduino and ESP32',
    shortDescription:
      'Build connected smart sensor nodes using dual-core ESP32 microcontrollers, Wi-Fi/Bluetooth LE stacks, and responsive cloud telemetry dashboards.',
    duration: '4 Weeks (32 Hours)',
    mode: 'Classroom Hands-on',
    fee: 'Available on Enquiry (Starter Kit Included)',
    outcomes: [
      'Understand ESP32 dual-core architecture and GPIO matrix',
      'Calibrate analog sensors and interface digital OLED displays',
      'Establish Wi-Fi station and access point modes with HTTP/MQTT streaming',
      'Integrate Bluetooth Low Energy (BLE) peripheral beacons',
    ],
    prerequisites: 'High school physics or introductory electronics concepts.',
    hardwareKitIncluded: true,
    featured: true,
  },
  {
    id: 'edge-ai-iot',
    title: 'AI & Machine Learning for IoT (TinyML)',
    category: 'AI and Machine Learning for IoT',
    shortDescription:
      'Train lightweight machine learning models, quantize weights to INT8 precision, and run real-time inference on resource-constrained microcontrollers.',
    duration: '6 Weeks (40 Hours)',
    mode: 'Online Live',
    fee: 'Available on Enquiry',
    outcomes: [
      'Collect and clean sensory time-series and visual datasets',
      'Quantize neural network models using TensorFlow Lite for Microcontrollers',
      'Deploy real-time anomaly detection and gesture recognition on MCUs',
      'Optimize SRAM and flash memory footprints for edge inferencing',
    ],
    prerequisites: 'Basic Python programming and introductory machine learning familiarity.',
    hardwareKitIncluded: false,
    featured: true,
  },
  {
    id: 'python-programming',
    title: 'Applied Python for Hardware Telemetry & Automation',
    category: 'Python Programming',
    shortDescription:
      'Learn modern Python tailored for electronic engineers: serial communications, automated test benches, sensor data logging, and RESTful telemetry.',
    duration: '4 Weeks (30 Hours)',
    mode: 'Online Live',
    fee: 'Available on Enquiry',
    outcomes: [
      'Master core Python data structures, functions, and OOP principles',
      'Automate serial port data acquisition using PySerial and sockets',
      'Process and graph live telemetry with NumPy, Pandas, and Matplotlib',
      'Build headless automated testing scripts for electronic boards',
    ],
    prerequisites: 'Basic computer literacy; suitable for complete programming beginners.',
    hardwareKitIncluded: false,
    featured: false,
  },
  {
    id: 'electronics-basics',
    title: 'Practical Electronics, Circuit Analysis & Lab Debugging',
    category: 'Electronics Basics',
    shortDescription:
      'A hands-on foundation in analog and digital electronics: schematic reading, breadboard prototyping, multimeter measurements, and oscilloscope operation.',
    duration: '4 Weeks (28 Hours)',
    mode: 'Classroom Hands-on',
    fee: 'Available on Enquiry (Components Box Included)',
    outcomes: [
      'Analyze resistive, capacitive, and inductive DC/AC circuits',
      'Master transistor switching, MOSFET drivers, and operational amplifiers',
      'Safely operate bench power supplies, multimeters, and oscilloscopes',
      'Solder through-hole components and inspect circuit continuity',
    ],
    prerequisites: 'Curiosity about physical electronics; no prior experience required.',
    hardwareKitIncluded: true,
    featured: false,
  },
  {
    id: 'drone-technology',
    title: 'UAV & Drone Fundamentals: Avionics, Telemetry & Flight',
    category: 'Drone Technology',
    shortDescription:
      'Explore uncrewed aerial vehicle (UAV) systems: multirotor airframe mechanics, electronic speed controllers (ESCs), flight controller calibration, and telemetry links.',
    duration: '4 Weeks (32 Hours)',
    mode: 'Classroom Hands-on',
    fee: 'Available on Enquiry (Flight Simulation & Assembly Lab)',
    outcomes: [
      'Understand quadcopter aerodynamics, thrust-to-weight ratios, and center of gravity',
      'Wire and calibrate brushless DC motors with Electronic Speed Controllers (ESCs)',
      'Configure flight controller firmware (Betaflight/PX4) and PID tuning',
      'Interpret telemetry data and understand national drone airspace safety regulations',
    ],
    prerequisites: 'Basic electronics knowledge and safe laboratory handling awareness.',
    hardwareKitIncluded: false,
    featured: true,
  },
  {
    id: 'web-development',
    title: 'Full-Stack IoT Dashboard & Telemetry Web Engineering',
    category: 'Web Development',
    shortDescription:
      'Design modern, responsive web portals for connected devices using Next.js, React, WebSockets, and real-time charting libraries.',
    duration: '6 Weeks (45 Hours)',
    mode: 'Online Live',
    fee: 'Available on Enquiry',
    outcomes: [
      'Build modern UI layouts using React, Next.js, TypeScript, and Tailwind CSS',
      'Stream live sensor updates into browser viewports via WebSockets & MQTT over WS',
      'Create secure API routes for device provisioning and configuration',
      'Render high-frequency time-series graphs for hardware telemetry monitoring',
    ],
    prerequisites: 'Basic familiarity with HTML, CSS, and JavaScript fundamentals.',
    hardwareKitIncluded: false,
    featured: false,
  },
];

export const COURSES_FAQS = [
  {
    id: 'course-faq-1',
    question: 'How do course fees and payment options work?',
    answer:
      'Course fees depend on the specific track, whether physical hardware kits are included, and the chosen learning mode (Classroom vs. Online). To ensure transparency, exact fee quotes and hardware kit breakdowns are provided directly upon submitting an enquiry below. We do not charge automatic subscription fees.',
  },
  {
    id: 'course-faq-2',
    question: 'Are physical hardware kits provided for hands-on courses?',
    answer:
      'Yes. For courses marked with "Hardware Kit Included" (such as IoT & Embedded Systems, Arduino & ESP32, and Electronics Basics), candidates receive a physical kit containing developmental silicon, sensors, and connecting leads. For online learners, kits are shipped directly to your registered address.',
  },
  {
    id: 'course-faq-3',
    question: 'What type of certification is issued upon course completion?',
    answer:
      'Every student who successfully completes course lab assignments and presents their capstone project receives a verified certificate of completion issued by HydroSync Innovations LLP, featuring a unique verifiable credential serial number.',
  },
  {
    id: 'course-faq-4',
    question: 'Can college students attend weekend or flexible batches?',
    answer:
      'Yes. We offer specialized weekend batches and evening live sessions designed specifically for engineering undergraduates and working professionals to accommodate college timetables.',
  },
  {
    id: 'course-faq-5',
    question: 'What happens after I submit the enquiry form?',
    answer:
      'Our academic admissions coordinator will review your background and send the full syllabus document, upcoming batch start dates, and kit delivery schedules to your email and phone within 24 business hours.',
  },
];

