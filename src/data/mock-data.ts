import {
  ServiceItem,
  ProjectItem,
  CourseItem,
  EventItem,
  TeamMemberItem,
  TestimonialItem,
  FAQItem,
} from '@/types';

export const FOCUS_AREAS = [
  {
    number: '01',
    title: 'Embedded Systems',
    desc: 'Bare-metal C/C++, ARM Cortex-M, FreeRTOS, and industrial PCB layout.',
  },
  {
    number: '02',
    title: 'Internet of Things',
    desc: 'Secure edge telemetry, MQTT/CoAP protocols, LoRaWAN, and cloud connectivity.',
  },
  {
    number: '03',
    title: 'Artificial Intelligence',
    desc: 'Computer vision, TinyML on microcontrollers, and edge AI inferencing.',
  },
  {
    number: '04',
    title: 'Workforce Enablement',
    desc: 'Hands-on hardware internships, K-12 STEM ATL labs, and college MoUs.',
  },
];

export const FEATURED_COURSES: CourseItem[] = [
  {
    id: 'course-1',
    title: 'Industrial IoT Systems with ESP32 & FreeRTOS',
    category: 'IoT',
    level: 'Intermediate',
    duration: '6 Weeks (48 Hrs)',
    mode: 'Hybrid',
    summary:
      'Architect robust edge sensor gateways, integrate hardware sensors, and stream encrypted telemetry to cloud brokers.',
    hardwareKitIncluded: true,
    featured: true,
    href: '/courses',
  },
  {
    id: 'course-2',
    title: 'Advanced Embedded Firmware with ARM Cortex-M',
    category: 'Embedded',
    level: 'Advanced',
    duration: '8 Weeks (60 Hrs)',
    mode: 'Hands-on Classroom',
    summary:
      'Master bare-metal peripheral drivers, interrupt service routines, low-power optimization, and RTOS task scheduling.',
    hardwareKitIncluded: true,
    featured: true,
    href: '/courses',
  },
  {
    id: 'course-3',
    title: 'Edge AI & TinyML on Microcontrollers',
    category: 'AI',
    level: 'Intermediate',
    duration: '6 Weeks (40 Hrs)',
    mode: 'Online Live',
    summary:
      'Quantize and deploy computer vision models and neural network classifiers directly onto resource-constrained MCUs.',
    hardwareKitIncluded: false,
    featured: true,
    href: '/courses',
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Smart Agricultural Telemetry Irrigation Gateway',
    category: 'Industrial IoT',
    scope: 'Commercial Deployment',
    description:
      'Custom solar-powered LoRaWAN sensor nodes monitoring soil moisture, ambient temperature, and automated solenoid valve triggers.',
    technologies: ['ESP32', 'LoRaWAN', 'FreeRTOS', 'Next.js'],
    impactMetric: '40% Water Reduction',
    href: '/projects',
  },
  {
    id: 'proj-2',
    title: 'High-Precision BLDC Motor Controller Firmware',
    category: 'Embedded Firmware',
    scope: 'Industrial Robotics',
    description:
      'Field-oriented control (FOC) firmware algorithm running on STM32 with real-time CAN bus telemetry integration.',
    technologies: ['STM32', 'C/C++', 'CAN Bus', 'FOC'],
    impactMetric: '<50µs Loop Latency',
    href: '/projects',
  },
  {
    id: 'proj-3',
    title: 'Edge Computer Vision Inspection System',
    category: 'Edge AI',
    scope: 'Factory Automation',
    description:
      'High-speed visual defect identification pipeline inspecting electronics assemblies on assembly conveyor lines.',
    technologies: ['OpenCV', 'TensorFlow Lite', 'Raspberry Pi', 'Python'],
    impactMetric: '99.4% Defect Accuracy',
    href: '/projects',
  },
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    title: 'Hands-on STM32 Firmware & Hardware Debugging Masterclass',
    type: 'Workshop',
    date: '28 NOV 2026',
    time: '10:00 AM - 4:00 PM IST',
    location: 'HydroSync Innovation Lab 1',
    mode: 'Offline',
    seatsAvailable: 12,
    totalSeats: 35,
    status: 'Upcoming',
  },
  {
    id: 'event-2',
    title: 'Industrial IoT Architecture: From Sensors to AWS IoT Core',
    type: 'Masterclass',
    date: '05 DEC 2026',
    time: '2:00 PM - 6:00 PM IST',
    location: 'Virtual Classroom (Interactive)',
    mode: 'Online',
    seatsAvailable: 8,
    totalSeats: 50,
    status: 'Upcoming',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    author: 'Aditya Rao',
    role: 'Embedded Firmware Engineer',
    organization: 'Alumni (B.Tech ECE)',
    quote:
      'The hands-on hardware kit and bare-metal STM32 register-level training at HydroSync was directly responsible for clearing my core engineering interviews.',
    rating: 5,
    category: 'Student',
  },
  {
    id: 'test-2',
    author: 'Dr. Ramesh Kulkarni',
    role: 'Head of Electronics Department',
    organization: 'Engineering College Partner',
    quote:
      'HydroSync established our IoT Center of Excellence lab and trained 120+ students on real industrial hardware. Their technical rigor is unmatched.',
    rating: 5,
    category: 'College',
  },
  {
    id: 'test-3',
    author: 'Meera Nambiar',
    role: 'STEM Coordinator & ATL Lead',
    organization: 'Public School Network',
    quote:
      'HydroSync structured our school Atal Tinkering Lab robotics program from grade 6 to 10 with clear, age-appropriate experiential modules.',
    rating: 5,
    category: 'School',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Are hardware kits provided for hands-on courses and internships?',
    answer:
      'Yes. All physical courses and hardware internship tracks include dedicated development boards (such as ESP32 or STM32), custom breakout boards, sensors, and connecting cables delivered to students.',
    category: 'Internships',
  },
  {
    id: 'faq-2',
    question: 'Can college students receive formal academic credit or an MoU?',
    answer:
      'HydroSync provides verified internship completion certificates, formal evaluation reports, and sign-offs for college minor/major capstone projects as part of institutional MoUs.',
    category: 'Colleges',
  },
  {
    id: 'faq-3',
    question: 'How do schools partner with HydroSync for Atal Tinkering Labs (ATL)?',
    answer:
      'We offer turnkey lab setup, equipment calibration, teacher training workshops, and an annual robotics curriculum mapped to NITI Aayog guidelines.',
    category: 'Schools',
  },
];

