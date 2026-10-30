/* ==========================================================
   FIXIA — Explore Ideas Library
   Comprehensive dataset of 112 practical & next-generation
   software blueprints across 14 industries.
   ========================================================== */

const INDUSTRIES_DATA = [
  {
    id: "restaurants",
    slug: "restaurants",
    name: "Restaurants & Cafes",
    shortDesc: "QR ordering, kitchen display systems, live table management, and WhatsApp repeat-visit engines.",
    tagline: "Turn table chaos into clockwork kitchen speed and repeat patrons.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
    ideas: [
      {
        id: "rest-qr-order",
        tier: "essential",
        title: "QR Digital Menu & Table Self-Ordering",
        oneLiner: "Instant browser menu accessed via table QR code without requiring app downloads.",
        problem: "Waiters spend 10+ minutes handing physical menus, writing orders on paper, and making mistake-prone re-entries.",
        softwareType: "Web App",
        whoUses: ["Dine-in Guests", "Captains", "Floor Managers"],
        howItWorks: "Diners scan the table QR code on their phone camera. A fast, photos-rich menu loads instantly. Customers select variations, spice levels, and tap order. The order shoots straight to the kitchen ticket queue with the exact table number.",
        features: [
          "Instant zero-install web app optimized for all Android & iOS phones",
          "Real-time item 86ing (mark sold out in 1 click across all tables)",
          "Multi-language switch with high-res food dish previews",
          "Direct UPI / Card digital checkout or 'Pay at Cashier' option"
        ],
        howFixiaBuilds: "Built on lightweight static frontends paired with a ultra-fast real-time database (Firebase or Supabase) ensuring sub-second menu loading even on weak cafe Wi-Fi."
      },
      {
        id: "rest-kds",
        tier: "essential",
        title: "Kitchen Display System (KDS) & Ticket Dispatcher",
        oneLiner: "Color-coded kitchen touchscreen replacing noisy paper printers and lost kitchen order tickets.",
        problem: "Paper KOT slips get lost near boiling stoves, orders get delayed, and cooks cannot see prep countdowns.",
        softwareType: "Custom Software",
        whoUses: ["Head Chef", "Line Cooks", "Expediters"],
        howItWorks: "Kitchen tablets display incoming table and delivery tickets prioritized by prep time. Cooks tap an item when starting, and tap 'Done' to alert floor captains or delivery runners.",
        features: [
          "Color-coded urgency timers (Green -> Amber -> Red warning for delayed plates)",
          "Split-station routing (Bar items route to bartender; grill items route to grill cook)",
          "One-tap bump bar interface operable with gloved or wet hands",
          "Daily average preparation time benchmarking per station"
        ],
        howFixiaBuilds: "Designed as an offline-resilient Progressive Web App running smoothly on inexpensive 10-inch Android tablets with zero recurring software subscription fees."
      },
      {
        id: "rest-inventory",
        tier: "essential",
        title: "Raw Ingredient & Daily Wastage Tracker",
        oneLiner: "Recipe-linked inventory that auto-deducts milk, coffee beans, cheese, and meats as orders are sold.",
        problem: "Pilferage, over-purchasing perishable dairy, and sudden mid-service stockouts of signature dishes.",
        softwareType: "Dashboard",
        whoUses: ["Restaurant Owner", "Kitchen Storekeeper", "Purchasing Lead"],
        howItWorks: "Every menu recipe is mapped to raw grams. When 20 burgers sell, the system deducts 3kg patties and 20 buns. End-of-day discrepancy audits flag spoilage and theft.",
        features: [
          "Dynamic recipe-based BOM (Bill of Materials) auto-deduction",
          "Threshold low-stock alerts sent to owner WhatsApp every evening",
          "Daily variance audit (Expected Stock vs Physical Shelf Count)",
          "Supplier purchase order generation with PDF WhatsApp dispatch"
        ],
        howFixiaBuilds: "Custom PostgreSQL or SQLite backend with a high-contrast mobile dashboard engineered for quick stock tally checks during closing hours."
      },
      {
        id: "rest-wa-updates",
        tier: "growth",
        title: "WhatsApp Order Updates & Bill Dispatcher",
        oneLiner: "Automatic branded WhatsApp message with itemized GST bill and review link upon checkout.",
        problem: "Paper thermal bills get thrown away immediately; owners miss out on collecting customer phone numbers for repeat marketing.",
        softwareType: "Automation & Integration",
        whoUses: ["Customers", "Cashier", "Marketing Manager"],
        howItWorks: "When the cashier closes the check, the guest instantly receives a WhatsApp message with a clean PDF invoice and a 1-tap link to leave a 5-star Google review.",
        features: [
          "Instant WhatsApp Business Cloud API integration",
          "Automated PDF bill dispatch with embedded payment confirmation",
          "Conditional review prompt (5-stars directed to Google Maps; low scores routed to private owner feedback)",
          "100% compliant customer opt-in phone database collection"
        ],
        howFixiaBuilds: "Official WhatsApp Cloud API webhook pipeline with zero per-contact subscription lock-ins."
      },
      {
        id: "rest-loyalty",
        tier: "growth",
        title: "Repeat-Visit VIP Loyalty & Cashback Wallet",
        oneLiner: "Phone-number-based cashback system incentivizing 3rd and 4th cafe visits without plastic cards.",
        problem: "Third-party food delivery apps take 25-30% commissions while retaining customer relationships.",
        softwareType: "Web App",
        whoUses: ["Repeat Diners", "Baristas", "Marketing Team"],
        howItWorks: "Guests type their phone number at checkout. They earn 5% wallet cashback credited towards their next dine-in bill, with automatic WhatsApp reminders if they haven't visited in 21 days.",
        features: [
          "Zero plastic cards or complex passwords (1-tap phone lookup)",
          "Automated win-back triggers ('We miss you! Here is a free cappuccino this weekend')",
          "Custom tier levels (Bronze, Gold VIP, Elite Taster)",
          "Direct attribution analytics showing revenue brought in by loyal members"
        ],
        howFixiaBuilds: "Integrated directly into the POS checkout screen with simple SMS/WhatsApp notification triggers."
      },
      {
        id: "rest-reservations",
        tier: "growth",
        title: "Table Reservation & Advance Deposit Manager",
        oneLiner: "Direct website table booking widget with UPI deposit to eliminate weekend no-shows.",
        problem: "Large weekend party bookings cancel 10 minutes prior, leaving prime tables empty and ruining table turns.",
        softwareType: "Website & Web App",
        whoUses: ["Guests", "Hostess", "Restaurant General Manager"],
        howItWorks: "Guests reserve their preferred time and dining zone on your website, pay a modest advance deposit via UPI, and receive an instant calendar invite and WhatsApp confirmation.",
        features: [
          "Interactive floor-plan seating selector with live time-slot capacity",
          "Integrated advance deposit processing with automated cancellation windows",
          "SMS / WhatsApp reminder sent 3 hours prior to booking time",
          "VIP guest history tag (e.g., Anniversary, Window seat preference, Allergies)"
        ],
        howFixiaBuilds: "Clean embeddable widget that docks directly onto your existing website or standalone domain with direct UPI payment gateway integration."
      },
      {
        id: "rest-multibranch",
        tier: "next-gen",
        title: "Multi-Branch Owner Live Margin Dashboard",
        oneLiner: "Real-time command center giving owners live net sales, discounts, and labour cost percentages across all outlets.",
        problem: "Multi-outlet owners spend their evenings calling individual branch managers to ask 'how much did we do today?'.",
        softwareType: "Dashboard",
        whoUses: ["Franchise Founders", "Operating Partners", "Auditors"],
        howItWorks: "A sleek executive dashboard pulls live ticket streams from all locations into a unified phone view, flagging unusual discounts, voided bills, or high labor costs.",
        features: [
          "Cross-outlet live revenue, cover counts, and average ticket size",
          "Discrepancy alert bot (notifies owner immediately if high-value bills are cancelled)",
          "Comparative item velocity heatmaps across locations",
          "Automated midnight summary report sent to executive WhatsApp groups"
        ],
        howFixiaBuilds: "Built on high-speed time-series databases with fine-grained role permissions for partners, store managers, and accountants."
      },
      {
        id: "rest-ai-prep",
        tier: "next-gen",
        title: "Predictive Kitchen Prep & Weather-Demand Planner",
        oneLiner: "Smart prep sheet forecasting dish quantities based on weekend weather, holidays, and past sales trends.",
        problem: "Chefs over-prep curries and dough on rainy days leading to massive food spoilage, or run out on sunny festival weekends.",
        softwareType: "Custom Software",
        whoUses: ["Executive Chef", "Procurement Manager"],
        howItWorks: "The system analyzes the past 90 days of hourly sales matched against rainfall and holidays to generate an exact morning prep sheet for the line cooks.",
        features: [
          "Morning kitchen batch recommendation sheet (exact batch sizes to cook)",
          "Automated weather forecast correlation (monsoon spikes, heatwave beverage surge)",
          "Wastage trend reporting highlighting high-waste ingredients",
          "Weekly cost-saving estimate based on reduced kitchen throwaways"
        ],
        howFixiaBuilds: "Custom statistical regression engine running locally on your store database without requiring expensive third-party AI subscriptions."
      }
    ]
  },
  {
    id: "gyms",
    slug: "gyms",
    name: "Gyms & Fitness",
    shortDesc: "QR gate attendance, automatic UPI renewals, trainer rosters, and member retention engines.",
    tagline: "Stop chasing expired subscriptions and running paper workout logs.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12M2 12h4M18 12h4"/></svg>`,
    ideas: [
      {
        id: "gym-qr-attendance",
        tier: "essential",
        title: "QR Turnstile & Tablet Attendance Gatekeeper",
        oneLiner: "Instant member QR scan checking subscription validity before unlocking entry.",
        problem: "Members whose plans expired 3 months ago walk in unnoticed while front desk staff are busy chatting.",
        softwareType: "Mobile App & Tablet",
        whoUses: ["Gym Members", "Front Desk Receptionist", "Facility Owner"],
        howItWorks: "Members scan their personal digital gym pass on an iPad or tablet mounted at the reception desk. Green chime = Active plan; Red chime = Plan expired, prompts immediate 1-click renewal.",
        features: [
          "Sub-second offline-capable QR scanner compatible with any budget tablet or phone",
          "Visual membership expiry badge with remaining active days",
          "Anti-passback prevention (stops two people from sharing one screenshot)",
          "Live in-facility head count displayed on front desk screen"
        ],
        howFixiaBuilds: "Built using encrypted rotating QR tokens synced with local SQLite/Supabase databases for instantaneous response."
      },
      {
        id: "gym-renewal-bot",
        tier: "essential",
        title: "Automatic WhatsApp Renewal & UPI Payment Link",
        oneLiner: "Automated friendly reminder sent 5 days and 1 day before expiry with direct UPI payment link.",
        problem: "Owners feel awkward chasing members for fees; members delay payment for weeks until confronted.",
        softwareType: "Automation & Integration",
        whoUses: ["Gym Owner", "Members", "Accountant"],
        howItWorks: "The automated system sends a personalized WhatsApp reminder: 'Hey Rahul, your 3-month Matrix Gym pass renews on Friday. Tap below to renew in 10 seconds via GPay/PhonePe.'",
        features: [
          "Pre-expiry friendly nudge (Day -5, Day -1, and Expiry Day)",
          "One-click UPI dynamic payment link pre-filled with correct renewal amount",
          "Automatic membership extension and instant digital tax invoice upon payment",
          "Zero human intervention required to reconcile payments"
        ],
        howFixiaBuilds: "Direct WhatsApp Cloud API paired with Razorpay/Cashfree webhook automation that triggers immediate database record updates."
      },
      {
        id: "gym-trainer-roster",
        tier: "essential",
        title: "Personal Trainer Allocation & Session Roster",
        oneLiner: "Digital calendar managing 1-on-1 personal training slots and PT commission calculations.",
        problem: "Trainers dispute how many PT sessions they conducted; clients complain about missed appointments.",
        softwareType: "Dashboard",
        whoUses: ["Personal Trainers", "Head Coach", "Clients"],
        howItWorks: "Trainers log client sessions with a 1-tap client digital confirmation signature. The owner dashboard calculates monthly trainer payout splits automatically.",
        features: [
          "Client session balance counter (e.g. 'Session 8 of 12 completed')",
          "Trainer scheduling calendar preventing double-booked equipment or time slots",
          "Automated monthly commission and payout ledger",
          "Client cancellation grace period enforcement"
        ],
        howFixiaBuilds: "Mobile-responsive web portal accessible on trainers' phones with strict role-based view limits."
      },
      {
        id: "gym-workout-app",
        tier: "growth",
        title: "Branded Member Workout & Progression Tracker",
        oneLiner: "Custom white-label gym mobile app showcasing equipment exercises, sets, reps, and personal bests.",
        problem: "New members feel lost on the gym floor, do not see results, get bored, and abandon their membership within 60 days.",
        softwareType: "Mobile App",
        whoUses: ["Gym Members", "Floor Trainers"],
        howItWorks: "Members scan QR stickers placed on gym equipment to watch a 10-second video of proper form, log their weights, and track their bench/squat progress charts.",
        features: [
          "On-equipment QR codes linked to correct machine exercise demos",
          "Personal best milestone badges (e.g. 'First 100kg Deadlift club')",
          "Trainer-assigned weekly workout routines tailored for fat loss or hypertrophy",
          "Body measurement & transformation photo timeline"
        ],
        howFixiaBuilds: "Clean React Native or PWA mobile application branded with your gym's official logo, colors, and mascot."
      },
      {
        id: "gym-day-pass",
        tier: "growth",
        title: "Online Day Pass & Weekend Guest Booking Portal",
        oneLiner: "Self-serve website page allowing visitors and travelers to purchase instant single-day passes.",
        problem: "Travelers, busy executives, and potential trial members leave when reception quotes complicated monthly signups.",
        softwareType: "Website",
        whoUses: ["Visiting Athletes", "Casual Gym Goers", "Desk Staff"],
        howItWorks: "A sleek landing page offers ₹300 Day Passes or ₹1,000 Weekend Trial passes. The guest pays online, signs the digital liability waiver, and gets an entry QR code immediately.",
        features: [
          "Instant digital waiver signature with photo ID capture",
          "Timed QR pass valid for selected date only",
          "Automated follow-up discount code for annual membership if they join within 48h",
          "Captures lead contact info for marketing"
        ],
        howFixiaBuilds: "Lightweight single-page checkout integrated into your existing domain with direct UPI payment processing."
      },
      {
        id: "gym-member-diet",
        tier: "growth",
        title: "Diet Plan & Calorie Macro Delivery Portal",
        oneLiner: "Dietitian dashboard that sends personalized PDF meal plans directly to member WhatsApp.",
        problem: "Diet charts written on scrap paper get lost on kitchen counters, leading to poor adherence and unhappy clients.",
        softwareType: "Dashboard & WhatsApp",
        whoUses: ["In-house Nutritionist", "Personal Trainers", "Members"],
        howItWorks: "The nutritionist selects target calories and macro splits from a curated Indian & continental food library. One click generates a clean, branded PDF dispatched via WhatsApp.",
        features: [
          "Curated regional vegetarian, eggetarian, and non-veg macro database",
          "Auto-calculated BMR and calorie deficit / surplus recommendations",
          "Weekly weigh-in reminder bot checking progress on Sunday mornings",
          "Grocery shopping checklist generator"
        ],
        howFixiaBuilds: "Modern headless PDF generation pipeline creating crisp vector charts delivered straight into chat."
      },
      {
        id: "gym-churn-alert",
        tier: "next-gen",
        title: "At-Risk Churn Predictor & Retention Alert Engine",
        oneLiner: "Algorithm flagging members whose attendance dropped below 2 days/week before they quit.",
        problem: "Gyms only discover a member quit when their subscription expires, which is too late to save the account.",
        softwareType: "Dashboard & Analytics",
        whoUses: ["Gym Owner", "Customer Success Lead"],
        howItWorks: "The system monitors scan frequencies. If a regular 5-day attendee drops to 1 visit over 14 days, it triggers a 'High Risk' alert to the head coach to reach out and check in.",
        features: [
          "Automated attendance frequency decay monitoring",
          "Trainer re-engagement task generator with suggested friendly message templates",
          "Cohort retention analytics (Which months or trainers retain members longest)",
          "Win-back campaign manager"
        ],
        howFixiaBuilds: "Statistical event tracking engine embedded into the attendance database without needing external SaaS monthly subscriptions."
      },
      {
        id: "gym-occupancy-cam",
        tier: "next-gen",
        title: "Live Facility Heatmap & Rush Hour Visualizer",
        oneLiner: "Website widget showing members how crowded the gym currently is in real time.",
        problem: "Members show up during 7 PM peak hours, find every bench taken, get frustrated, and leave negative reviews.",
        softwareType: "Web Widget & Display",
        whoUses: ["Members", "Prospective Leads"],
        howItWorks: "Using live gate check-in counts minus estimated session durations, a sleek widget displays: 'Current Vibe: Chill (32% Capacity) — Plenty of benches open'.",
        features: [
          "Live percentage capacity gauge (Chill, Moderate, Peak Hustle)",
          "Historical hourly rush charts (like Google Maps 'Popular Times')",
          "Incentivized off-peak pass discounts to balance floor traffic",
          "Public-facing website badge proving transparent facility standards"
        ],
        howFixiaBuilds: "Lightweight API connected to attendance logs that computes a rolling head-count estimate."
      }
    ]
  },
  {
    id: "coaching",
    slug: "coaching",
    name: "Coaching & Education",
    shortDesc: "Batch attendance, WhatsApp marks broadcasts, online test portals, and fee receipt management.",
    tagline: "Replace chaotic student registers and paper test sheets with transparent academic software.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15zM8 7h8M8 11h6"/></svg>`,
    ideas: [
      {
        id: "edu-batch-fees",
        tier: "essential",
        title: "Student Batch Attendance & Fee Receipt Manager",
        oneLiner: "One central ledger managing batch rosters, fee installment deadlines, and instant digital receipts.",
        problem: "Manual fee registers lead to forgotten overdue installments, mismatched cash totals, and lost paper slips.",
        softwareType: "Dashboard & Custom Software",
        whoUses: ["Institute Director", "Administrative Clerk", "Accountant"],
        howItWorks: "Staff select student, record cash/UPI receipt, and the system auto-calculates remaining installments while instantly dispatching a signed digital receipt to the parent's phone.",
        features: [
          "Batch-wise student rosters with subject and timing filters",
          "Installment payment tracker with automated overdue penalty calculator",
          "Instant GST-compliant fee receipt generation with official institute watermark",
          "Daily collection balance report (Cash in Drawer vs Bank UPI)"
        ],
        howFixiaBuilds: "Secure web application with role-based access ensuring teachers only see attendance while finance managers see cash balances."
      },
      {
        id: "edu-parent-wa",
        tier: "essential",
        title: "Parent WhatsApp Attendance & Absence Alert Bot",
        oneLiner: "Instant WhatsApp notice delivered to parents when a student is marked absent in morning class.",
        problem: "Students skip classes or bunk coaching without parents knowing until exam report cards arrive.",
        softwareType: "Automation",
        whoUses: ["Teachers", "Parents", "Students"],
        howItWorks: "Teacher takes 60-second batch attendance on mobile. Any student marked absent triggers an automated WhatsApp message to parents: 'Notice: Priyanshu was absent from Physics Batch A today.'",
        features: [
          "60-second mobile attendance roll-call interface for educators",
          "Automated instant parent absence notification",
          "Weekly attendance percentage tally included in monthly parent briefing",
          "Two-way parent response logging for verified sick leave requests"
        ],
        howFixiaBuilds: "Automated webhook pipeline connecting classroom attendance forms with WhatsApp Cloud API."
      },
      {
        id: "edu-marksheet",
        tier: "essential",
        title: "Weekly Test Series & Marksheet Rank Generator",
        oneLiner: "Enter raw marks once to automatically generate student report cards, batch ranks, and parent alerts.",
        problem: "Teachers spend entire Sunday evenings manually writing report cards, calculating percentages, and figuring out ranks.",
        softwareType: "Custom Software",
        whoUses: ["Faculty", "Students", "Parents"],
        howItWorks: "Faculty enter marks for Math, Science, and English. The software computes highest, median, batch percentiles, and sends a styled PDF marksheet straight to the parent.",
        features: [
          "Automated rank and percentile calculations across batches",
          "Subject-wise strength and weakness visual breakdown",
          "Batch performance bell-curve for institute faculty meetings",
          "One-click PDF marksheet batch generation and WhatsApp broadcasting"
        ],
        howFixiaBuilds: "Fast client-side rendering with SVG chart generation creating sharp printable report cards."
      },
      {
        id: "edu-test-portal",
        tier: "growth",
        title: "Online Practice Test Portal with Timed Exam Modes",
        oneLiner: "Web testing platform simulating real entrance exam interfaces (JEE, NEET, Sainik, CUET).",
        problem: "Students freeze during actual competitive exams because they only practiced on paper sheets without countdown timers.",
        softwareType: "Web App / Portal",
        whoUses: ["Competitive Exam Students", "Coaching Faculty"],
        howItWorks: "Students log in to take timed weekly mock tests with negative marking, question palette navigation (Answered, Marked for Review), and instant score analysis upon submission.",
        features: [
          "Realistic NTA-style online exam UI with countdown clock",
          "Negative marking and section-wise time limit enforcement",
          "Instant post-exam answer key and comprehensive explanation review",
          "Speed vs Accuracy metrics (Shows minutes wasted on wrong questions)"
        ],
        howFixiaBuilds: "High-concurrency React/Vue application with offline state preservation so an accidental browser refresh never loses student answers."
      },
      {
        id: "edu-inquiry-crm",
        tier: "growth",
        title: "Student Admission Funnel & Lead Inquiry CRM",
        oneLiner: "Tracks prospective parent inquiries from walk-ins, phone calls, and website forms to enrollment.",
        problem: "Dozens of prospective parents call before school sessions start, but contact notes written on scraps of paper get lost.",
        softwareType: "Dashboard",
        whoUses: ["Counselors", "Admission Officers", "Director"],
        howItWorks: "Capture inquiries into a visual pipeline (Inquiry -> Demo Class Scheduled -> Demo Attended -> Fee Discussed -> Enrolled). Counselors get automated follow-up reminders.",
        features: [
          "Multi-channel lead ingestion (Website, Walk-in, Google Local Ads, Walk-in)",
          "Demo class attendance tracker and follow-up call scheduler",
          "Conversion rate reporting by course and lead source",
          "Automated WhatsApp message with syllabus brochure and fee structure"
        ],
        howFixiaBuilds: "Clean Kanban pipeline view tailored specifically to academic calendar cycles."
      },
      {
        id: "edu-video-library",
        tier: "growth",
        title: "Recorded Lecture & Study Material Vault",
        oneLiner: "Secure student-only portal hosting recorded class lectures, formula sheets, and chapter assignments.",
        problem: "Sharing lecture links via YouTube or Google Drive results in pirated content and students losing track of assignments.",
        softwareType: "Web Portal",
        whoUses: ["Enrolled Students", "Teaching Assistants"],
        howItWorks: "Students log in to access organized chapters. Missed classes can be replayed anytime with downloadable PDF notes watermarked with the student's phone number.",
        features: [
          "Chapter-wise categorized video playlists with playback speed controls",
          "Dynamic student phone watermark on video and PDFs to prevent unauthorized sharing",
          "Assignment submission upload portal with teacher grading feedback",
          "Progress tracking bar showing syllabus completion percentage"
        ],
        howFixiaBuilds: "Integrated with secure cloud video hosting (Cloudflare Stream or AWS) for lightning-fast buffer-free streaming on mobile data."
      },
      {
        id: "edu-diagnostic",
        tier: "next-gen",
        title: "Weak-Topic Diagnostic & Targeted Revision Engine",
        oneLiner: "Software that analyzes wrong test answers to automatically generate custom revision question sheets.",
        problem: "Students keep re-studying chapters they already know while neglecting the specific concepts causing them to fail tests.",
        softwareType: "Custom Software",
        whoUses: ["Students", "Academic Mentors"],
        howItWorks: "If a student repeatedly misses questions tagged with 'Thermodynamics Formulas', the system automatically compiles a 15-question targeted remedial drill specifically on that sub-topic.",
        features: [
          "Granular question tagging by subject, chapter, and micro-concept",
          "Personalized student difficulty heatmap",
          "Automated custom 1-click revision worksheet PDF generator",
          "Teacher alert highlighting batch-wide conceptual stumbling blocks"
        ],
        howFixiaBuilds: "Tag-based relational database querying that surfaces precise question subsets based on historical student errors."
      },
      {
        id: "edu-doubt-desk",
        tier: "next-gen",
        title: "Interactive Doubt Resolution & Faculty Desk",
        oneLiner: "Student mobile interface to snap a photo of a textbook problem and queue it for faculty resolution.",
        problem: "Shy students don't ask questions in 100-student lecture halls, falling further and further behind.",
        softwareType: "Web App",
        whoUses: ["Students", "Faculty Mentors"],
        howItWorks: "A student snaps a picture of a difficult question and submits it. Dedicated faculty receive it on their dashboard, record a 2-minute audio/video explanation, and reply directly.",
        features: [
          "Photo question upload with crop and text annotation tools",
          "Faculty queue sorted by urgency and upcoming exam deadlines",
          "Searchable institute doubt repository (students can see if someone already asked this)",
          "Faculty response time benchmarking"
        ],
        howFixiaBuilds: "Real-time chat and media messaging interface optimized for low-bandwidth mobile devices."
      }
    ]
  },
  {
    id: "real-estate",
    slug: "real-estate",
    name: "Real Estate & Property",
    shortDesc: "Property inventory catalogs, lead capture CRM, WhatsApp site-visit booking, and plot availability maps.",
    tagline: "Turn slow inquiries into scheduled site visits and closed property deals.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l8-4v18M13 21V3l6 4v14M9 9h1M9 13h1M9 17h1M17 11h1M17 15h1"/></svg>`,
    ideas: [
      {
        id: "re-inventory",
        tier: "essential",
        title: "Live Property Inventory & Unit Availability Catalog",
        oneLiner: "Real-time master catalog showing which plots, flats, or villas are Available, Booked, or Under Registration.",
        problem: "Two brokers pitch the same plot to different buyers because inventory lists are maintained on paper whiteboards.",
        softwareType: "Web Portal & Dashboard",
        whoUses: ["Real Estate Developers", "Sales Brokers", "Prospective Buyers"],
        howItWorks: "Sales agents open the live cloud inventory on their phones during client meetings. Tapping a plot reveals dimensions, facing direction, price per sq ft, and live booking status.",
        features: [
          "Visual color-coded unit grid (Green: Available, Yellow: On Hold 48h, Red: Sold)",
          "Instant unit specification card with pricing calculator and payment plan breakdown",
          "One-click 48-hour temporary hold feature with token payment logging",
          "Public-facing luxury showcase mode hiding sensitive broker margins"
        ],
        howFixiaBuilds: "High-aesthetic responsive dashboard with real-time WebSocket state synchronization preventing accidental double-allocations."
      },
      {
        id: "re-lead-crm",
        tier: "essential",
        title: "Multi-Channel Property Lead CRM & Broker Pipeline",
        oneLiner: "Capture leads from 99acres, Magicbricks, Facebook ads, and walk-ins into one prioritized follow-up board.",
        problem: "Inquiries go cold because brokers take 3 days to call back or forget what budget the client asked for.",
        softwareType: "Dashboard & Mobile App",
        whoUses: ["Sales Team Lead", "Property Advisors", "Managing Director"],
        howItWorks: "All incoming leads auto-populate into one clean dashboard with source tags. Agents are assigned leads automatically with a requirement to log follow-up notes within 2 hours.",
        features: [
          "Automatic lead ingestion from web ads, portals, and WhatsApp inquiries",
          "Smart lead scoring based on budget, purchase timeline, and loan readiness",
          "Broker commission and deal pipeline revenue forecasting",
          "Automated WhatsApp intro message with brochure and project location link"
        ],
        howFixiaBuilds: "Lightweight, ultra-fast CRM designed specifically for Indian property developers with zero per-seat software charges."
      },
      {
        id: "re-visit-scheduler",
        tier: "essential",
        title: "WhatsApp Site-Visit Scheduler & Location Dispatcher",
        oneLiner: "Automated booking system coordinating client site visits with pin drops, driver details, and reminders.",
        problem: "Clients get lost trying to find remote suburban development sites, or show up when no site executive is available.",
        softwareType: "Automation",
        whoUses: ["Prospective Buyers", "Site Supervisors", "Call Center"],
        howItWorks: "When a client agrees to a visit, the system sends an automated WhatsApp confirmation with Google Maps location, site executive contact card, and a morning-of-visit reminder.",
        features: [
          "One-tap calendar and Google Maps pin drop dispatch",
          "Site-supervisor live notification when a client is en route",
          "Automated post-visit feedback and rating collection",
          "Driver cab coordination if developer provides complimentary pickup"
        ],
        howFixiaBuilds: "Integrated WhatsApp Cloud API webhook service coordinating appointment slots with site team calendars."
      },
      {
        id: "re-interactive-masterplan",
        tier: "growth",
        title: "Interactive Masterplan & Plot Layout Navigator",
        oneLiner: "Interactive SVG architectural layout where buyers can tap individual plots to view sizes, park views, and prices.",
        problem: "Static PDF layouts look flat, confuse buyers, and fail to convey prime road or park-facing advantages.",
        softwareType: "Interactive Web App",
        whoUses: ["Buyers on Website", "Sales Reps on iPad"],
        howItWorks: "A sleek interactive canvas of the township. Users pinch-to-zoom, tap Plot #42, see that it faces the sunrise and community park, check pricing, and request a callback on that specific unit.",
        features: [
          "Interactive vector township map with smooth pan and zoom on all touch devices",
          "Instant filtering (e.g. 'Show only North-facing plots over 150 sq yards')",
          "Direct unit enquiry carrying exact plot coordinates into the CRM",
          "Embedded video renders of the clubhouse and approach road"
        ],
        howFixiaBuilds: "Custom SVG/Canvas interactive engine built without heavy 3D engine bloat, loading instantly on 4G mobile connections."
      },
      {
        id: "re-installment-engine",
        tier: "growth",
        title: "Buyer Installment Tracker & Milestone Demand Engine",
        oneLiner: "Automates construction-linked demand letters, payment receipts, and bank loan documentation.",
        problem: "Developers lose weeks waiting for construction milestone payments because sending demand letters manually is painfully slow.",
        softwareType: "Custom Software & Portal",
        whoUses: ["Project Accounts Team", "Allotted Buyers", "Home Loan Executives"],
        howItWorks: "When structural slabs are poured, the engineer updates the milestone. The system automatically issues formal demand notices to all allotted buyers with payment schedule receipts.",
        features: [
          "Construction-linked payment milestone trigger (Foundation, 1st Slab, Brickwork, Handover)",
          "Automated demand letter PDF generation with interest calculation on delayed dues",
          "Buyer self-service portal to download tax receipts and possession certificates",
          "Direct integration with bank approved project loan portals"
        ],
        howFixiaBuilds: "Robust financial ledger system with automated PDF rendering and WhatsApp delivery."
      },
      {
        id: "re-broker-portal",
        tier: "growth",
        title: "Channel Partner (CP) Broker Portal & Payout Ledger",
        oneLiner: "Dedicated portal for external brokers to register clients, track deal progress, and check commission payouts.",
        problem: "External channel partners distrust developers when client registrations get disputed or commission payouts are delayed.",
        softwareType: "Web Portal",
        whoUses: ["External Real Estate Brokers", "Developer Channel Head"],
        howItWorks: "Brokers register their client's phone number before site visits to lock in attribution. When deals close, brokers track their exact commission percentage, TDS deductions, and release dates.",
        features: [
          "30-day client phone registration locking to prevent broker disputes",
          "Live commission milestone tracker (e.g., 50% paid on agreement, 50% on registry)",
          "Instant downloadable project marketing kits, banners, and brochures with broker contact details",
          "Broker leaderboard and seasonal bonus incentive tracking"
        ],
        howFixiaBuilds: "Multi-tenant portal with isolated partner logins and developer administrative oversight."
      },
      {
        id: "re-virtual-sunlight",
        tier: "next-gen",
        title: "360° Virtual Walkthrough & Sunlight Angle Simulator",
        oneLiner: "Web experience letting buyers see natural sunlight and shadows inside the property at 9 AM, 2 PM, and 6 PM.",
        problem: "Vastu and natural lighting are major deal-breakers for Indian homebuyers, but empty concrete flats make it impossible to visualize.",
        softwareType: "Interactive Web Experience",
        whoUses: ["High-End Property Buyers", "Luxury Sales Executives"],
        howItWorks: "Buyers drag a time slider on their phone screen to watch how sunrays move across the living room and balcony during winter and summer solstices.",
        features: [
          "Time-of-day natural lighting and shadow simulation",
          "360-degree panoramic room view from balcony and master bedroom",
          "Vastu compliance checklist overlay for prayer room and kitchen directions",
          "VR headset compatible mode for experiential marketing lounges"
        ],
        howFixiaBuilds: "Lightweight WebGL/Three.js shader engine optimized for instant mobile web browser rendering."
      },
      {
        id: "re-document-vault",
        tier: "next-gen",
        title: "Instant Title Verification & Buyer Registry Locker",
        oneLiner: "Secure buyer portal providing verified municipal sanctions, RERA certificates, and chain-of-title deeds.",
        problem: "Buyers hesitate for months because of legal title anxiety, fearing encroachment or lack of municipal approvals.",
        softwareType: "Web Portal",
        whoUses: ["Buyer Legal Advocates", "Prospective Buyers", "Developer Legal Team"],
        howItWorks: "A legal assurance vault showcasing RERA registration numbers, approved land conversion orders, and municipal maps with verified digital timestamps.",
        features: [
          "Categorized legal assurance document library with 1-click preview",
          "RERA compliance certificate verification badge",
          "Watermarked deed downloads for bank loan pre-approval vetting",
          "Real-time registry appointment tracking and token generation"
        ],
        howFixiaBuilds: "Encrypted, high-trust document delivery architecture with immutable audit logs."
      }
    ]
  },
  {
    id: "clinics",
    slug: "clinics",
    name: "Clinics & Healthcare",
    shortDesc: "Waiting room token displays, appointment scheduling, digital prescription EMR, and follow-up reminders.",
    tagline: "Organize patient queues and clinical records with zero medical staff stress.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    ideas: [
      {
        id: "med-queue-display",
        tier: "essential",
        title: "Digital Patient Queue & Waiting Room TV Display",
        oneLiner: "Live token display for waiting room TVs with estimated wait times and patient mobile status tracking.",
        problem: "Waiting rooms are packed with agitated patients constantly knocking on the doctor's door to ask 'how much longer?'.",
        softwareType: "Dashboard & TV Display",
        whoUses: ["Patients", "Receptionist", "Consulting Doctor"],
        howItWorks: "Reception checks in patient. A large waiting room smart TV displays 'Now Seeing Token #14 — Next: #15'. Patients can also check their live queue status on their phones from nearby cafes.",
        features: [
          "High-contrast smart TV display layout operable on any Android TV or HDMI stick",
          "Sub-second doctor desk chime when calling the next token",
          "Mobile live wait-time link (patients can wait outside without losing their turn)",
          "Emergency patient queue bump feature for critical cases"
        ],
        howFixiaBuilds: "Real-time WebSocket connection ensuring 0ms latency between doctor desk clicks and waiting room TV screens."
      },
      {
        id: "med-appointments",
        tier: "essential",
        title: "Doctor OPD Appointment Booking & WhatsApp Confirmation",
        oneLiner: "Direct patient booking calendar with instant slot confirmation and WhatsApp clinic directions.",
        problem: "Receptionists spend 4 hours a day on the phone repeating available doctor timings and re-explaining clinic locations.",
        softwareType: "Website & Web App",
        whoUses: ["Patients", "Front Desk Receptionist", "Doctors"],
        howItWorks: "Patients select doctor, clinic location, and convenient time slot on the clinic website. They get an immediate WhatsApp appointment pass with Google Maps location and token details.",
        features: [
          "Real-time doctor calendar slot sync preventing overbooking",
          "Advance consultation fee collection via UPI (reduces no-show rate)",
          "Automated WhatsApp reminder sent 3 hours prior to consultation slot",
          "One-tap cancellation and rescheduling link"
        ],
        howFixiaBuilds: "Custom booking engine integrated into the clinic's own brand domain with zero per-appointment platform commissions."
      },
      {
        id: "med-emr-rx",
        tier: "essential",
        title: "Lightning Digital Prescription (Rx) & EMR Generator",
        oneLiner: "Doctor tablet interface to write prescriptions in 45 seconds with pre-saved medicine dosages.",
        problem: "Handwritten paper prescriptions are illegible, get lost by patients, and fail to maintain patient diagnostic history.",
        softwareType: "Custom Software",
        whoUses: ["Consulting Physicians", "Compounders", "Patients"],
        howItWorks: "Doctor selects diagnosis, taps common drug templates (e.g. 'Amoxicillin 500mg - 1 Tab TDS after meals x 5 days'), and prints or WhatsApps a crisp, professional digital prescription.",
        features: [
          "Pre-populated common medicine drug formulation and dosage templates",
          "Past visit timeline review (vitals, diagnoses, past allergic reactions)",
          "1-click thermal or A4 prescription print with clinic header and digital signature",
          "Instant automated PDF copy sent directly to patient WhatsApp"
        ],
        howFixiaBuilds: "Designed specifically for doctors with high-speed keyboard shortcuts and tablet stylus compatibility, operable offline."
      },
      {
        id: "med-followup-bot",
        tier: "growth",
        title: "Automated Patient Follow-Up & Dosage Reminder Engine",
        oneLiner: "Automated WhatsApp health check-in asking patients how they feel 4 days after starting medication.",
        problem: "Patients abandon medication courses early, suffer relapses, and blame the clinic for poor recovery.",
        softwareType: "Automation",
        whoUses: ["Patients", "Clinic Care Coordinators"],
        howItWorks: "Four days after an acute visit, the system sends a polite message: 'Hi Sunita, Dr. Mehta checking in. Is your fever settling? Tap below if you need a follow-up consultation.'",
        features: [
          "Condition-specific automated check-in schedules (Day 3 for fever, Day 14 for chronic care)",
          "Low-effort patient response buttons ('Feeling Better' vs 'Need to speak with doctor')",
          "Direct route to book follow-up review before treatment slips",
          "Automated reminders for routine blood tests (e.g. HbA1c check every 90 days)"
        ],
        howFixiaBuilds: "HIPAA-conscious privacy-first WhatsApp automation workflow tied directly to visit outcome tags."
      },
      {
        id: "med-lab-portal",
        tier: "growth",
        title: "Diagnostic Lab Report & Radiology Download Portal",
        oneLiner: "Patient phone portal to download blood test and ultrasound PDF reports as soon as the lab verifies them.",
        problem: "Patients make repeated trips to the clinic just to collect physical paper test reports.",
        softwareType: "Web Portal",
        whoUses: ["Patients", "Pathologists", "Referring Doctors"],
        howItWorks: "Lab uploads verified PDF report. Patient receives an instant SMS/WhatsApp link: 'Your Lipid Profile is ready. Tap to view.' Referring doctors see the report automatically in their clinic feed.",
        features: [
          "Zero-password phone OTP access for quick patient convenience",
          "Historical lab report graphing (e.g. Blood Sugar trends over past 6 months)",
          "Doctor instant notification for abnormal or critical lab values",
          "Watermarked, digitally signed diagnostic certificates"
        ],
        howFixiaBuilds: "Secure cloud storage integration (AWS S3 / Cloudflare R2) with expiring presigned download URLs for medical privacy."
      },
      {
        id: "med-teleconsult",
        tier: "growth",
        title: "Integrated Video Teleconsultation & UPI Paywall",
        oneLiner: "Browser-based video room allowing doctors to conduct virtual consults with outstation patients.",
        problem: "Doctors try conducting video calls over regular WhatsApp, resulting in uncollected fees and late-night personal intrusions.",
        softwareType: "Web App",
        whoUses: ["Doctors", "Out-of-Town Patients"],
        howItWorks: "Patient pays the consultation fee upfront, receives a timed video room link. Doctor clicks 'Join Call', conducts consultation, and issues a digital prescription from the same screen.",
        features: [
          "Browser-based video calls requiring no third-party app installations",
          "Upfront automated UPI consultation fee lock before entering call queue",
          "Side-by-side medical history notes while on camera",
          "Doctor privacy protection (hides doctor's personal phone number)"
        ],
        howFixiaBuilds: "WebRTC peer-to-peer video streaming infrastructure with end-to-end security encryption."
      },
      {
        id: "med-multiclinic",
        tier: "next-gen",
        title: "Multi-Clinic Doctor Roster & Emergency On-Call Allocator",
        oneLiner: "Unified schedule coordinator for doctors practicing across multiple hospitals and private clinics.",
        problem: "Doctors arrive late at clinics because surgery at their hospital ran overtime with no automated cross-clinic schedule updates.",
        softwareType: "Dashboard",
        whoUses: ["Visiting Specialists", "Clinic Managers", "Hospital Coordinators"],
        howItWorks: "A shared schedule command board. If a specialist clicks 'Delayed 45 mins' at Hospital A, clinics B and C are automatically updated and waiting patients receive adjusted token times.",
        features: [
          "Cross-facility schedule and availability broadcaster",
          "Dynamic token delay adjustment alerting scheduled patients in advance",
          "Revenue and consultation fee split reconciliation by clinic location",
          "Emergency on-call specialist paging system"
        ],
        howFixiaBuilds: "Real-time state broker synchronizing calendars and patient queue databases across locations."
      },
      {
        id: "med-vitals-monitor",
        tier: "next-gen",
        title: "Chronic Care Patient Monitoring & Vitals Trend Engine",
        oneLiner: "Patient dashboard logging daily blood pressure, sugar, and weight with physician threshold alerts.",
        problem: "Hypertension and diabetic patients only check vitals once every 3 months, missing acute spikes.",
        softwareType: "Mobile Web App",
        whoUses: ["Chronic Care Patients", "Attending Physicians"],
        howItWorks: "Patients submit their morning BP or glucose readings via quick WhatsApp or web form. If readings exceed clinical safety limits, the clinic is alerted to intervene immediately.",
        features: [
          "One-tap daily vitals logging with visual green/yellow/red range indicators",
          "Automated medical warning dispatch for dangerous blood pressure spikes",
          "Monthly clinical summary chart for routine review appointments",
          "Family caregiver notification if elderly patient fails to log daily readings"
        ],
        howFixiaBuilds: "Lightweight progressive web app with smart trend outlier detection algorithms."
      }
    ]
  },
  {
    id: "retail",
    slug: "retail",
    name: "Retail & Shops",
    shortDesc: "Barcode billing, stock depletion alerts, digital customer receipts, and multi-store inventory sync.",
    tagline: "Replace clunky desktop POS software and paper registers with modern retail tools.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>`,
    ideas: [
      {
        id: "ret-pos",
        tier: "essential",
        title: "Lightning Barcode POS & Thermal Billing Terminal",
        oneLiner: "Fast keyboard-first checkout terminal that prints bills in 3 seconds flat even without internet.",
        problem: "Slow desktop POS systems crash during festival rush hours, creating 15-person queues and lost walkouts.",
        softwareType: "Custom Software",
        whoUses: ["Cashiers", "Store Managers", "Inventory Stockers"],
        howItWorks: "Cashier scans barcodes or uses quick numeric search. Total calculates instantly with GST, auto-triggers thermal printer cut, and syncs sales to the cloud.",
        features: [
          "Offline-first architecture (keeps billing even if shop Wi-Fi or broadband drops)",
          "Instant thermal printer integration (USB, Bluetooth, and LAN printers)",
          "Multiple payment splits (Part cash, part UPI on a single bill)",
          "Rapid barcode generation and label sticker printing for unbranded items"
        ],
        howFixiaBuilds: "Ultra-fast Electron or local browser SQLite database with sub-50ms keystroke reaction times."
      },
      {
        id: "ret-stock-alerts",
        tier: "essential",
        title: "Stock Depletion Alerts & Low-Inventory Reorder Desk",
        oneLiner: "Dashboard that monitors fast-moving SKUs and generates supplier purchase orders before shelves run empty.",
        problem: "Owners only realize their top-selling item is out of stock when a paying customer asks for it and walks away.",
        softwareType: "Dashboard",
        whoUses: ["Shop Owner", "Warehouse Incharge", "Procurement Clerk"],
        howItWorks: "The system tracks daily velocity. When shampoo bottles hit 6 units, the system sounds an alert and drafts a WhatsApp purchase order ready to send to the distributor.",
        features: [
          "Custom low-stock threshold per category (Safety Stock Levels)",
          "Automated supplier purchase order PDF generation with current distributor rates",
          "Dead-stock identifier (flags items sitting on shelves for >60 days with zero sales)",
          "Daily inventory value estimation for insurance and loan audits"
        ],
        howFixiaBuilds: "Relational inventory database with automated calculation engines and instant export capabilities."
      },
      {
        id: "ret-khata",
        tier: "essential",
        title: "Digital Customer Khata & Credit Ledger with UPI Pay Links",
        oneLiner: "Replaces paper udhar/credit notebooks with automated WhatsApp balance reminders.",
        problem: "Unpaid customer credit accumulates in dusty notebooks, with customers forgetting or disputing old balances.",
        softwareType: "Custom Software & WhatsApp",
        whoUses: ["Shop Owner", "Credit Customers"],
        howItWorks: "Shopkeeper taps customer name, enters ₹450 credit. The customer receives an instant WhatsApp acknowledgment. At month-end, the customer gets a polite summary with a direct GPay/PhonePe link.",
        features: [
          "Zero disputes (every credit entry sends instant SMS/WhatsApp confirmation to customer)",
          "One-click monthly statement dispatch with embedded payment QR code",
          "Customer credit limit safeguards (flags if a customer exceeds ₹5,000 credit)",
          "Direct bank reconciliation when credit is cleared via UPI"
        ],
        howFixiaBuilds: "Cloud-synchronized credit ledger accessible on the shopkeeper's phone or counter terminal."
      },
      {
        id: "ret-online-catalog",
        tier: "growth",
        title: "Local Customer Online Store & WhatsApp Order Catalog",
        oneLiner: "Sleek e-commerce storefront letting neighborhood customers browse local store stock and order for home delivery.",
        problem: "Neighborhood retail stores lose business to quick-commerce apps like Blinkit and Zepto.",
        softwareType: "Website & Web App",
        whoUses: ["Local Shoppers", "Delivery Boys", "Store Counter"],
        howItWorks: "Customers browse store inventory on their phone, add items to cart, and hit 'Order via WhatsApp'. Counter staff pack the bag and dispatch it with their delivery staff.",
        features: [
          "Real-time sync with shop POS inventory (no selling items that aren't on shelves)",
          "Neighborhood delivery radius configuration (e.g. within 3 km)",
          "WhatsApp cart checkout with customer location pin drop",
          "Promotional banner zones for weekly shop discounts and new arrivals"
        ],
        howFixiaBuilds: "Mobile-first e-commerce web platform loaded from your custom domain with lightning search."
      },
      {
        id: "ret-whatsapp-receipt",
        tier: "growth",
        title: "Paperless Digital WhatsApp Receipts & Review Engine",
        oneLiner: "Dispatches PDF bills directly to shopper WhatsApp with automatic Google review requests.",
        problem: "Thermal paper rolls are expensive, fade in weeks, and end up in the dustbin without building customer relationships.",
        softwareType: "Automation",
        whoUses: ["Customers", "Cashiers", "Marketing Lead"],
        howItWorks: "Cashier enters shopper phone number. The customer receives a beautiful PDF bill on WhatsApp with store contact info, return policy, and a button to review the store on Google.",
        features: [
          "Saves ₹2,000+ monthly on thermal paper rolls and ink cartridges",
          "Built-in Google Maps review generation funnel",
          "Customer purchase history lookup for easy 30-day exchange or returns",
          "Compliant customer phone number database capture for festive broadcasts"
        ],
        howFixiaBuilds: "Serverless PDF rendering microservice triggering official WhatsApp Cloud API templates."
      },
      {
        id: "ret-festive-broadcast",
        tier: "growth",
        title: "Segmented Customer Festive Offer & VIP Broadcast Engine",
        oneLiner: "Send targeted WhatsApp product announcements to high-spenders before Diwali, Eid, or New Year.",
        problem: "Shops send generic spam to everyone or run no promotions at all, losing seasonal surges to online malls.",
        softwareType: "Dashboard",
        whoUses: ["Shop Owner", "Marketing Assistant"],
        howItWorks: "Filter customers who spent over ₹5,000 in the past 6 months. Send a personalized WhatsApp card announcing an exclusive 2-day festive preview sale.",
        features: [
          "Customer spending segmentation (High Value, Regular, Inactive 90 Days)",
          "Personalized broadcast tags (e.g., 'Dear Priya, your exclusive Diwali preview starts tomorrow')",
          "Direct catalog link with promo code auto-applied at checkout",
          "Delivery and response tracking dashboard"
        ],
        howFixiaBuilds: "Compliant Meta Business messaging interface with rate-limiting controls to prevent number flagging."
      },
      {
        id: "ret-multiwarehouse",
        tier: "next-gen",
        title: "Multi-Store Inventory Balancing & Transfer Tracker",
        oneLiner: "Live stock tracker across 3+ retail branches with inter-store transfer requests.",
        problem: "Branch A turns away a customer for lack of size XL, while Branch B has 12 unsold pieces sitting in a box.",
        softwareType: "ERP System",
        whoUses: ["Multi-Branch Retail Owners", "Branch Managers"],
        howItWorks: "Cashier searches an out-of-stock item. System shows '3 units available at Branch 2 (1.5 km away)'. Staff can request an internal stock transfer with one tap.",
        features: [
          "Cross-branch real-time stock lookup at the checkout counter",
          "Digital transfer gate pass with dispatch and receiving verification",
          "Automated stock rebalancing suggestions based on branch neighborhood demographics",
          "Consolidated multi-store profit and loss overview"
        ],
        howFixiaBuilds: "Enterprise-grade multi-tenant architecture designed to scale seamlessly across 2 to 50 retail outlets."
      },
      {
        id: "ret-self-checkout",
        tier: "next-gen",
        title: "In-Store QR Scan & Self-Checkout System",
        oneLiner: "Shoppers scan item barcodes on their own phone cameras and pay via UPI to skip checkout lines entirely.",
        problem: "Shoppers abandon full baskets on peak weekend evenings when they see a 20-minute line at the billing desk.",
        softwareType: "Mobile Web App",
        whoUses: ["Shoppers", "Exit Security Guard"],
        howItWorks: "Shoppers open the store web app, scan barcodes as they place items in their bag, pay via UPI, and show a digital QR exit pass to security.",
        features: [
          "Zero app download required (runs directly in standard mobile browser)",
          "Anti-theft dynamic animated exit verification token for security guards",
          "Instant digital receipt with item quantity summary",
          "Drastically reduces cashier staffing requirements during peak hours"
        ],
        howFixiaBuilds: "High-performance browser barcode scanner utilizing modern WebAssembly camera APIs."
      }
    ]
  },
  {
    id: "hotels",
    slug: "hotels",
    name: "Hotels & Hospitality",
    shortDesc: "Direct room booking engine, mobile check-in, in-room QR dining, and housekeeping task dispatchers.",
    tagline: "Cut OTA commission fees and deliver boutique guest experiences.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></svg>`,
    ideas: [
      {
        id: "hotel-booking-engine",
        tier: "essential",
        title: "Direct Hotel Booking Engine & Rate Calendar",
        oneLiner: "Commission-free room reservation engine embedded right on the hotel's official website.",
        problem: "Online Travel Agencies (MakeMyTrip, Booking.com) take 18-25% cuts on every guest reservation.",
        softwareType: "Website & Web App",
        whoUses: ["Guests", "Reservation Manager", "Hotel Owner"],
        howItWorks: "Guests select dates, view high-res room photos, amenities, pick meal plans (EP, CP, MAP), and pay advance deposits directly to the hotel's bank account.",
        features: [
          "Zero commission direct booking funnel with dynamic seasonal rates",
          "Room inventory calendar with instant hold and booking locks",
          "Upsell package add-ons (Airport cab pickup, romantic dinner setup, extra bed)",
          "Automated instant booking voucher with hotel contact and directions"
        ],
        howFixiaBuilds: "Modern responsive booking engine with real-time rate management and direct payment gateway integration."
      },
      {
        id: "hotel-mobile-checkin",
        tier: "essential",
        title: "Contactless Pre-Arrival Check-In & Digital ID Upload",
        oneLiner: "Guests upload Aadhaar/Passport and sign registration cards on their phone before stepping into the lobby.",
        problem: "Tired guests arriving from 8-hour flights stand in front desk queues waiting for staff to photocopy ID cards.",
        softwareType: "Web App",
        whoUses: ["Arriving Guests", "Front Desk Receptionist"],
        howItWorks: "A link is sent on WhatsApp the morning of arrival. Guest snaps photos of their ID cards and signs the digital registration card. At the lobby, they simply collect their room key in 15 seconds.",
        features: [
          "Aadhaar, Passport, and Driving License photo capture with auto-crop",
          "Digital signature compliance matching local hospitality police regulations",
          "Express key pickup alert sent to front desk 30 minutes before arrival",
          "Automated generation of government Form-C records for international guests"
        ],
        howFixiaBuilds: "Encrypted image upload pipeline adhering strictly to government data privacy norms."
      },
      {
        id: "hotel-housekeeping",
        tier: "essential",
        title: "Housekeeping & Room Cleanliness Task Dispatcher",
        oneLiner: "Tablet interface managing room cleaning status, minibar checks, and maintenance repair alerts.",
        problem: "Front desk accidentally assigns a dirty room to a newly arrived guest because housekeeping communication happens over shouting.",
        softwareType: "Mobile App & Dashboard",
        whoUses: ["Housekeeping Staff", "Front Office Manager", "Maintenance Engineer"],
        howItWorks: "When a guest checks out, the room turns yellow ('Needs Cleaning') on the housekeeping tablet. Cleaning staff tap 'In Progress', then 'Inspected & Clean', instantly opening the room for check-in.",
        features: [
          "Color-coded room status board (Occupied, Dirty, In Progress, Ready, Maintenance)",
          "One-tap maintenance issue logging (e.g. 'AC leaking in 204' alerts the electrician)",
          "Staff turnaround time tracking (measures average minutes taken to prep a room)",
          "Linen and guest amenity stock consumption tracking"
        ],
        howFixiaBuilds: "High-contrast, multilingual mobile dashboard designed for non-technical cleaning staff."
      },
      {
        id: "hotel-qr-dining",
        tier: "growth",
        title: "In-Room QR Dining & Digital Concierge Portal",
        oneLiner: "Bedside QR code allowing guests to order room service, fresh towels, or extra pillows from their smartphone.",
        problem: "Room intercom phones ring unanswered during dinner peak hours; guests give up and order food from outside Swiggy.",
        softwareType: "Mobile Web App",
        whoUses: ["Hotel Guests", "Room Service Captain", "Kitchen Staff"],
        howItWorks: "Guest scans the QR sticker on the bedside nightstand. A full room service menu opens with dish photos. Orders route straight to the kitchen with the exact room number.",
        features: [
          "Room service food & beverage menu with live ordering",
          "1-tap housekeeping request chips ('Need Extra Water', 'Clean My Room', 'Laundry Bag')",
          "Room bill charging (Orders post directly to the guest's master folio)",
          "Local tourist guide and recommended nearby attraction list"
        ],
        howFixiaBuilds: "Zero-friction PWA web app linked dynamically to room numbers via encrypted URL parameters."
      },
      {
        id: "hotel-wa-concierge",
        tier: "growth",
        title: "Automated Pre-Arrival WhatsApp Welcome & Travel Guide",
        oneLiner: "Personalized WhatsApp concierge sending route directions, weather updates, and early check-in inquiries.",
        problem: "Hotels fail to connect with guests before arrival, missing lucrative opportunities to sell airport transfers and meals.",
        softwareType: "Automation",
        whoUses: ["Incoming Guests", "Guest Relations Executive"],
        howItWorks: "24 hours before check-in, an automated WhatsApp arrives: 'Welcome to Udaipur, Mr. Kapoor! Here is the quickest road route to our heritage gate, plus local weather info.'",
        features: [
          "Automated weather forecast and live route road condition updates",
          "Airport and train station transfer booking upsell",
          "Dietary and special occasion notification (e.g. Birthday decoration requests)",
          "Direct chat escalation to human front desk manager if needed"
        ],
        howFixiaBuilds: "Automated cron workflow linked to reservation database check-in date triggers."
      },
      {
        id: "hotel-corporate-billing",
        tier: "growth",
        title: "Corporate & Group Stay Billing Consolidation Hub",
        oneLiner: "Consolidates 20+ room bookings, banquet hall fees, and food catering into one organized corporate master invoice.",
        problem: "Corporate wedding and conference billing takes 3 days of manual spreadsheet reconciliation, creating payment delays.",
        softwareType: "Custom Software",
        whoUses: ["Banquet Sales Manager", "Corporate Bookers", "Hotel Financial Controller"],
        howItWorks: "All expenses incurred across rooms, conference halls, projector rentals, and buffets attach to a single corporate account code, outputting a clean GST tax invoice with 1 click.",
        features: [
          "Consolidated group room folio management with individual room allowance limits",
          "Automated corporate GST tax invoice generator with detailed split annexures",
          "Advance deposit schedule tracking with contract milestone dates",
          "Direct shareable link for corporate event organizers to inspect live billing"
        ],
        howFixiaBuilds: "Multi-currency, double-entry financial ledger tailored to hospitality revenue standards."
      },
      {
        id: "hotel-dynamic-pricing",
        tier: "next-gen",
        title: "Dynamic Room Pricing & Local Event Occupancy Engine",
        oneLiner: "Auto-adjusts room rates based on city concert dates, festival demand, and current hotel occupancy.",
        problem: "Hotels sell out at standard ₹3,000 rates during a major cricket match weekend when market demand was ₹12,000.",
        softwareType: "Dashboard & Analytics",
        whoUses: ["Revenue Manager", "General Manager"],
        howItWorks: "When hotel occupancy crosses 75%, rates automatically climb in tiered increments. The system integrates city holiday and event calendars to maximize RevPAR (Revenue Per Available Room).",
        features: [
          "Occupancy-triggered rate rules (e.g., >80% occupied -> increase rack rate by 30%)",
          "Local holiday and festival demand calendar integration",
          "Competitor public price scraping benchmark overview",
          "One-click rate push across all website booking channels"
        ],
        howFixiaBuilds: "Rule-based pricing engine running automated hourly evaluations against occupancy metrics."
      },
      {
        id: "hotel-multi-property",
        tier: "next-gen",
        title: "Multi-Property Central Reservation System (CRS)",
        oneLiner: "Unified reservation and guest profile database across a boutique hotel chain or resort group.",
        problem: "A loyal guest treated as a VIP at your Goa resort arrives at your Manali property and is treated like a total stranger.",
        softwareType: "ERP System",
        whoUses: ["Hotel Chain Founders", "Central Reservations Team"],
        howItWorks: "When a guest books any property, their historical preferences (Pillow type, vegetarian diet, favorite wine, room temperature) sync instantly to the destination resort.",
        features: [
          "Unified cross-property guest CRM profile and loyalty history",
          "Centralized phone reservation desk routing bookings across all branch hotels",
          "Group-wide financial rollups and occupancy comparisons",
          "Cross-property staff transfer and performance audits"
        ],
        howFixiaBuilds: "Distributed cloud database architecture with fine-grained multi-property tenancy isolations."
      }
    ]
  },
  {
    id: "gaming",
    slug: "gaming",
    name: "Gaming Clubs & Entertainment",
    shortDesc: "Real-time table session timers, snack billing, tournament brackets, and private VIP cabin booking.",
    tagline: "Run snooker tables, gaming lounges, and entertainment venues with zero time or snack leakage.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/></svg>`,
    ideas: [
      {
        id: "game-table-timers",
        tier: "essential",
        title: "Live Table Session Matrix with Auto-Minute Timers",
        oneLiner: "Real-time dashboard managing snooker/pool tables and console stations with automatic per-minute billing.",
        problem: "Staff write game start times on paper slips, miscalculate minutes, or fail to charge friends for extra time played.",
        softwareType: "Custom Software & Real-Time",
        whoUses: ["Arena Cashier", "Floor Marshals", "Club Owner"],
        howItWorks: "Cashier taps 'Start Table 04'. A live stopwatch ticks up on screen. Pausing and stopping calculates exact minutes at the designated hourly rate (e.g. ₹200/hr) with zero math errors.",
        features: [
          "8-to-32 station live visual matrix with color-coded active/idle states",
          "Configurable table rates (Snooker vs Pool vs VIP Private Cabin vs PS5)",
          "Split-bill calculator (divides total bill among 4 players automatically)",
          "Tamper-proof audit log (staff cannot erase minutes without owner PIN)"
        ],
        howFixiaBuilds: "Lightweight local server or web socket architecture ensuring timers tick smoothly even during internet outages."
      },
      {
        id: "game-pos-snack",
        tier: "essential",
        title: "Integrated Session POS & Snack Combo Billing",
        oneLiner: "Add energy drinks, fries, and hookahs directly to an active table session into one combined bill.",
        problem: "Snacks ordered during a 3-hour snooker match get lost on scrap notes and are never added to the final table invoice.",
        softwareType: "POS & Custom Software",
        whoUses: ["Cafe Counter", "Table Runners", "Cashier"],
        howItWorks: "When players order 2 Red Bulls and a sandwich, the runner taps Table 03 on the tablet. The cost attaches to the active gaming session for a single combined checkout ticket.",
        features: [
          "One-touch snack ordering linked directly to active table timer cards",
          "Kitchen snack token printer dispatch",
          "Inventory auto-deduction for packaged beverages and snacks",
          "Eliminates uncollected cafe bills with unified settlement"
        ],
        howFixiaBuilds: "Fast counter POS touchscreen interface with direct thermal billing printer integration."
      },
      {
        id: "game-cash-close",
        tier: "essential",
        title: "Shift Turnover & Automated Cash Drawer Reconciliation",
        oneLiner: "1-click shift handover comparing system revenue with cash in drawer to eliminate evening disputes.",
        problem: "Cashiers hand over shifts with mismatched money bags, leaving the club owner with daily cash shortages.",
        softwareType: "Dashboard",
        whoUses: ["Shift Managers", "Club Owner", "Auditor"],
        howItWorks: "At shift end, the cashier inputs physical cash count. The system compares it against recorded cash, UPI, and staff expenses, outputting an instant discrepancy report to the owner's WhatsApp.",
        features: [
          "Blind shift close (Cashier must count drawer before system reveals expected amount)",
          "Staff daily expense tracking (petty cash for ice, lemons, cleaner tips)",
          "Detailed UPI vs Cash vs Card payment method breakdown",
          "Midnight automated executive profit & loss summary"
        ],
        howFixiaBuilds: "Secure double-entry cashier ledger with tamper-evident audit trails."
      },
      {
        id: "game-hourly-booking",
        tier: "growth",
        title: "Hourly VIP Cabin & Table Online Reservation Portal",
        oneLiner: "Website page letting players reserve peak evening tables in advance with a 50% UPI deposit.",
        problem: "Players show up on Friday night at 8 PM, find all tables occupied, wait 45 minutes, get frustrated, and leave.",
        softwareType: "Website & Web App",
        whoUses: ["Club Members", "Competitive Players", "Front Desk"],
        howItWorks: "Players check upcoming table slot availability on their phone, reserve Table 1 for 9 PM, pay an advance booking token via UPI, and receive an instant digital confirmation pass.",
        features: [
          "Live slot picker with standard vs private VIP cabin tier options",
          "Automated UPI deposit processing to eliminate weekend no-shows",
          "SMS / WhatsApp reminder sent 45 minutes prior to booked slot",
          "Live club atmosphere widget showing open tables and current wait times"
        ],
        howFixiaBuilds: "Lightweight mobile-first web reservation system integrated seamlessly into your venue's domain."
      },
      {
        id: "game-tournaments",
        tier: "growth",
        title: "Club Leaderboard & Weekly Tournament Bracket Manager",
        oneLiner: "Interactive TV display and web app managing double-elimination tournament brackets and prize pools.",
        problem: "Tournament organizers draw brackets on whiteboards, leading to messy handwriting and disputed match outcomes.",
        softwareType: "Web App & Big Screen Display",
        whoUses: ["Tournament Director", "Competing Players", "Spectators"],
        howItWorks: "Players register online. The system auto-generates randomized double-elimination brackets, displays them on the arena lounge TV, and notifies players via WhatsApp when their match is up.",
        features: [
          "Auto-seeded single and double-elimination tournament bracket generator",
          "Live arena big-screen TV presentation mode with sponsor logos",
          "Live score updating by table referees on mobile",
          "Seasonal player rating leaderboard and Hall of Fame display"
        ],
        howFixiaBuilds: "Modern interactive vector canvas bracket engine rendering crisply on 4K arena TVs."
      },
      {
        id: "game-prepaid-wallet",
        tier: "growth",
        title: "Member Prepaid Gaming Pass & Discount Wallet",
        oneLiner: "Members load ₹3,000 to get ₹3,500 gaming credits, locking in recurring venue loyalty.",
        problem: "Occasional casual players only visit once a month without an incentive to make your venue their primary hangout.",
        softwareType: "Mobile Web App",
        whoUses: ["Regular Players", "Venue Cashier"],
        howItWorks: "Members look up their phone number at the counter. Their prepaid balance deducts automatically after every session, and they get an instant WhatsApp alert of their remaining credits.",
        features: [
          "Phone-number-based wallet lookup requiring zero plastic swipe cards",
          "Incentivized recharge tiers (e.g. 'Pay ₹5,000, play with ₹6,500')",
          "Happy-hour discounted rates automatically applied to member sessions",
          "Recharge reminder when member balance drops below ₹300"
        ],
        howFixiaBuilds: "Secure internal credit wallet database with cryptographic transaction logs."
      },
      {
        id: "game-smart-switches",
        tier: "next-gen",
        title: "IoT Smart Table Overhead Light & Power Controller",
        oneLiner: "Hardware relay that automatically switches on table lights when a timer starts, and turns them off when stopped.",
        problem: "Staff allow friends to play in the dark or under dim lights off-the-books without starting the billing timer.",
        softwareType: "Custom Software & IoT",
        whoUses: ["Arena Owner", "Automated System"],
        howItWorks: "The software links to smart Wi-Fi relays. Starting Table 02 on the counter POS clicks the overhead lights ON instantly. Stopping the session cuts the lights OFF until paid.",
        features: [
          "Zero unbilled playtime (impossible to play without the billing timer running)",
          "100% cloud-synchronized power relay control over standard Tuya / ESP32 hardware",
          "Emergency owner override button for facility maintenance",
          "Detailed electricity wattage and consumption tracking per table"
        ],
        howFixiaBuilds: "Reliable local network MQTT / HTTP IoT controller integrated directly with FIXIA's POS software."
      },
      {
        id: "game-matchmaking",
        tier: "next-gen",
        title: "Player Skill Rating (Elo) & Open Challenge Matchmaker",
        oneLiner: "App connecting solo players with equally skilled opponents currently looking for a game at the club.",
        problem: "Solo players walk in alone, find no one at their skill level to play against, and leave without spending money.",
        softwareType: "Web App",
        whoUses: ["Club Members", "Cue Sports Enthusiasts"],
        howItWorks: "A player taps 'Looking for match at 7 PM'. The app matches them with another player possessing a similar handicap rating, reserving a table for their challenge match.",
        features: [
          "Dynamic Elo skill rating system that updates after every recorded match",
          "In-app challenge request with notification dispatched to nearby players",
          "Club handicap calculator for fair matches between amateurs and veterans",
          "Monthly club champion ranking showcases"
        ],
        howFixiaBuilds: "Real-time presence and matching algorithms running in a lightweight progressive web app."
      }
    ]
  },
  {
    id: "travel",
    slug: "travel",
    name: "Travel & Tourism",
    shortDesc: "Tour package customizers, bus seat allocation charts, live mountain weather feeds, and digital boarding passes.",
    tagline: "Organize group expeditions and travel bookings with zero manual spreadsheet chaos.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 2 4.5 9 8.5 1.5-6.5 6 1.5 8.5-8-4.5-8 4.5 1.5-8.5-6.5-6L7.5 11z"/></svg>`,
    ideas: [
      {
        id: "trv-package-builder",
        tier: "essential",
        title: "Interactive Tour Package Customizer & Instant Quote Engine",
        oneLiner: "Allows travelers to customize nights, hotel tiers, and cab options to receive an instant price quote.",
        problem: "Travel agents spend 45 minutes manually typing out itineraries on WhatsApp for leads who ghost them.",
        softwareType: "Website & Web App",
        whoUses: ["Travelers", "Tour Coordinators", "Sales Agents"],
        howItWorks: "Traveler selects destination (e.g. Manali 5N/6D), picks 3-star vs 4-star stays, adds rafting or bonfire options, and gets an instant downloadable branded PDF itinerary with pricing.",
        features: [
          "Dynamic price calculator based on passenger count and room configurations",
          "Interactive day-by-day itinerary view with sightseeing photos",
          "One-click downloadable branded itinerary PDF with terms & conditions",
          "Direct lead capture routing inquiry into agent follow-up CRM"
        ],
        howFixiaBuilds: "High-speed front-end price calculator with serverless PDF generation rendering custom travel brochures in seconds."
      },
      {
        id: "trv-seat-cabin",
        tier: "essential",
        title: "Bus & Vehicle Seat Reservation Matrix",
        oneLiner: "Interactive 46-seat bus cabin chart showing live booked, reserved, and available seats for group trips.",
        problem: "Managing bus seat allocations across WhatsApp chats leads to double-booked window seats and angry passengers on departure day.",
        softwareType: "Custom Software & Web App",
        whoUses: ["Travelers", "Trip Leaders", "Transport Coordinator"],
        howItWorks: "Travelers select their preferred seats on a visual interactive bus floor plan (Front Cabin, Window, Double sleeper), lock them in with payment, and receive seat numbers on their boarding pass.",
        features: [
          "Interactive 2x2 or 2x1 sleeper bus cabin seating layout",
          "Real-time seat availability locks preventing concurrent double-booking",
          "Trip leader master passenger manifesto generator for police checkpoints",
          "Pickup and boarding point selector (e.g. Majnu Ka Tilla, Kashmiri Gate)"
        ],
        howFixiaBuilds: "Lightweight reactive SVG seating canvas with real-time state synchronization."
      },
      {
        id: "trv-boarding-pass",
        tier: "essential",
        title: "Digital Boarding Pass & Itinerary Ticket Generator",
        oneLiner: "Automated digital boarding passes with QR codes, bus numbers, hotel addresses, and emergency contacts.",
        problem: "Passengers lose paper tickets or keep calling coordinators at 11 PM to ask 'what is the hotel address again?'.",
        softwareType: "Web App & Automation",
        whoUses: ["Passengers", "Bus Drivers", "Trip Marshals"],
        howItWorks: "Upon booking, the passenger receives an Apple Wallet / Google Wallet compatible digital pass with bus number, cabin seat, emergency contact, and Google Maps hotel links.",
        features: [
          "One-click mobile boarding pass saved directly to phone without app install",
          "Emergency SOS coordinator contact and mountain medical guidelines",
          "Driver phone number and live bus vehicle registration number callout",
          "QR code scanned by trip marshal at the bus door for instant check-in"
        ],
        howFixiaBuilds: "Offline-capable HTML5 pass generator with integrated dynamic QR code validation."
      },
      {
        id: "trv-group-discounts",
        tier: "growth",
        title: "Tiered Group Savings & College Ambassador Engine",
        oneLiner: "Dynamic discount calculator: 'Bring 4 friends, save ₹300 each; Bring 10 friends, trip leader travels free.'",
        problem: "Student and youth travel operators struggle to incentivize group leaders to bring entire college batches.",
        softwareType: "Web App",
        whoUses: ["Student Leaders", "Campus Ambassadors", "Tour Operator"],
        howItWorks: "A shared group booking link tracks referrals in real time. As friends join the pool, the tier unlocks bigger discounts for everyone in the group.",
        features: [
          "Live group progress thermometer ('3 more friends to unlock ₹500 off')",
          "Unique campus ambassador referral links with automated commission tally",
          "Split-payment support (each friend pays their own individual share online)",
          "WhatsApp share card generator with customized college group banners"
        ],
        howFixiaBuilds: "Viral group-buying logic integrated directly into the booking checkout pipeline."
      },
      {
        id: "trv-wa-updates",
        tier: "growth",
        title: "Traveler WhatsApp Broadcast & Incident Dispatcher",
        oneLiner: "Broadcast urgent itinerary changes, breakfast timings, and meeting points to all passengers with 1 click.",
        problem: "Coordinators have to shout in bus aisles or hope everyone reads messy 50-person WhatsApp groups.",
        softwareType: "Automation",
        whoUses: ["Trip Leaders", "All Passengers"],
        howItWorks: "The trip leader taps a template: 'Morning call: Breakfast served till 9:00 AM. Departure for Solang Valley at 9:30 AM sharp.' Every passenger receives it as an individual official WhatsApp alert.",
        features: [
          "Official 1-way broadcast eliminating spam and arguments in group chats",
          "Scheduled reminder triggers (e.g. luggage pack reminder at 8 AM on checkout day)",
          "Emergency weather advisory and roadblock broadcast",
          "Post-trip photo album link dispatch"
        ],
        howFixiaBuilds: "Official WhatsApp Cloud API bulk messaging interface with passenger batch tagging."
      },
      {
        id: "trv-vendor-payouts",
        tier: "growth",
        title: "Vendor Voucher & Cab/Hotel Disbursement Tracker",
        oneLiner: "Manages purchase orders, advance hotel vouchers, and transport driver payment balances per departure.",
        problem: "Operators lose track of how much cash was paid to local taxi unions and hotels, ending up with unexpected cost overruns.",
        softwareType: "Dashboard",
        whoUses: ["Tour Accounts Team", "Operations Manager"],
        howItWorks: "Each tour batch tracks associated expenses (Hotel rooms booked, Tempo travelers hired, meal coupons). System tracks advance paid vs balance due on arrival.",
        features: [
          "Automated hotel confirmation voucher PDF generator",
          "Driver diesel and toll cash disbursement logging",
          "Net batch profitability calculation (Gross Tour Receipts minus Vendor Costs)",
          "Vendor invoice archive for GST input tax credit reconciliation"
        ],
        howFixiaBuilds: "Robust project-based accounting system designed specifically for tour operators."
      },
      {
        id: "trv-weather-feed",
        tier: "next-gen",
        title: "Live Mountain Weather, Pass Condition & Altitude Monitor",
        oneLiner: "Real-time widget showing snowfall, temperature, road clearance, and altitude warnings for high-altitude treks.",
        problem: "Unpredictable mountain weather catches travelers unprepared with wrong clothing, leading to hypothermia and disputes.",
        softwareType: "Web Widget & API",
        whoUses: ["Adventurers", "Trek Guides", "Prospective Bookers"],
        howItWorks: "Pulls live weather radar, snow depth, and Rohtang/Atal Tunnel clearance updates directly onto the trip landing page, setting honest expectations for travelers.",
        features: [
          "Live temperature and snowfall radar for high-altitude passes",
          "Interactive altitude profile chart (e.g. 2,050m Manali to 4,270m Rohtang)",
          "Recommended gear checklist generator customized to current week temperatures",
          "Automatic storm alert notification dispatched to trip leaders"
        ],
        howFixiaBuilds: "Integrated with global meteorological APIs (OpenWeather, MET Norway) with localized mountain caching."
      },
      {
        id: "trv-expense-splitter",
        tier: "next-gen",
        title: "In-Trip Group Expense Splitter for Travel Cohorts",
        oneLiner: "Mobile web tool letting travel companions log shared cafe bills, taxi fares, and calculate who owes whom.",
        problem: "End of trip turns sour when friends spend 2 hours arguing over who paid for dinner and who owes for fuel.",
        softwareType: "Mobile Web App",
        whoUses: ["Travel Groups", "Solo Travelers in Cohorts"],
        howItWorks: "Travelers add expenses on a shared trip board. At the end of the trip, the app calculates the simplest settlement transfers with 1-click UPI pay links.",
        features: [
          "Zero app download required (browser link shared via WhatsApp)",
          "Supports unequal splits and multi-currency conversions",
          "Minimal settlement algorithm (reduces 15 random payments down to 3 simple transfers)",
          "Direct UPI integration to settle balances instantly via GPay or PhonePe"
        ],
        howFixiaBuilds: "Client-side graph settlement algorithm with persistent local storage and cloud sync."
      }
    ]
  },
  {
    id: "salons",
    slug: "salons",
    name: "Salons & Beauty",
    shortDesc: "Stylist appointment calendars, service menus, client treatment notes, and automated trim recalls.",
    tagline: "Fill salon chairs on slow weekdays and track stylist commissions seamlessly.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
    ideas: [
      {
        id: "sal-chair-booking",
        tier: "essential",
        title: "Stylist Chair Scheduling & Slot Booking Calendar",
        oneLiner: "Client self-booking calendar showing specific hair stylist availability and treatment durations.",
        problem: "Clients demand their favorite stylist, show up unannounced, and throw tantrums when told the stylist is booked for 2 hours.",
        softwareType: "Website & Web App",
        whoUses: ["Salon Clients", "Senior Stylists", "Receptionist"],
        howItWorks: "Clients pick their stylist, select services (Haircut + Keratin Spa = 90 mins), see open chair slots, and book with an instant WhatsApp confirmation pass.",
        features: [
          "Stylist-specific calendar sync with intelligent multi-service duration stacking",
          "Prevents double-booking during complex chemical or bridal treatments",
          "Advance deposit collection for weekend slots to prevent no-shows",
          "Instant reception alert when a VIP client books"
        ],
        howFixiaBuilds: "Visual booking interface with drag-and-drop chair management for salon tablets."
      },
      {
        id: "sal-service-menu",
        tier: "essential",
        title: "Digital Service Menu & Hair/Skin Combo Catalog",
        oneLiner: "Mobile-friendly interactive service menu with transparent pricing, photos, and time requirements.",
        problem: "Paper menus get stained with hair dye and hair serums, and clients are shocked by unexpected add-on charges at the billing desk.",
        softwareType: "Website",
        whoUses: ["Clients", "Front Desk"],
        howItWorks: "Clients scan a mirror QR code or visit your website to explore hair, skin, and spa packages with clear itemized pricing and treatment step descriptions.",
        features: [
          "High-aesthetic photo showcase for bridal, hair spa, and nail art services",
          "Curated service combos (e.g. 'Haircut + Beard Trim + Charcoal Facial combo')",
          "Transparent pricing with clear hair-length variance indicators",
          "Direct 'Book This Service' button linking directly to the appointment scheduler"
        ],
        howFixiaBuilds: "Responsive, luxury typographic web menu loading in sub-second speeds."
      },
      {
        id: "sal-commissions",
        tier: "essential",
        title: "Daily Cash, UPI & Stylist Commission Calculator",
        oneLiner: "Automatically calculates each stylist's daily service commission, product sales cut, and tips.",
        problem: "End of month commission tally causes major arguments between salon owners and stylists over manual service slips.",
        softwareType: "Dashboard",
        whoUses: ["Salon Owner", "Stylists", "Accountant"],
        howItWorks: "Every completed bill tags the performing stylist. The system automatically computes their 10% service commission and 5% shampoo retail cut without manual math.",
        features: [
          "Custom commission tiers per staff member (Junior Stylist vs Master Artist)",
          "Separate service commission vs retail product sales incentive tracking",
          "Daily performance dashboard showing top-earning stylists of the week",
          "1-click monthly payroll and commission payout slip generation"
        ],
        howFixiaBuilds: "Transparent role-based dashboard where stylists can view their daily earnings on their own phones."
      },
      {
        id: "sal-client-history",
        tier: "growth",
        title: "Client Hair Treatment History & Formula Notes",
        oneLiner: "Digital client card storing exact hair color dye ratios, skin allergies, and haircut preferences.",
        problem: "A client returns after 2 months asking for 'the exact blonde shade you did last time', but the stylist forgot the color formula.",
        softwareType: "Custom Software",
        whoUses: ["Colorists", "Beauticians", "Clients"],
        howItWorks: "Stylists snap a quick post-treatment photo on the salon tablet and note the exact formulation (e.g. 'L'Oreal Majirel 7.1 + 20 vol, 35 mins'). Next visit, any stylist can replicate it perfectly.",
        features: [
          "Confidential client treatment notes with before/after photo timeline",
          "Allergy warning badges (e.g., 'Ammonia allergy', 'Sensitive scalp')",
          "Preferred beverage and conversation preferences tag",
          "VIP anniversary and birthday reminder calendar"
        ],
        howFixiaBuilds: "Secure tablet application with private cloud photo storage and instant phone-number search."
      },
      {
        id: "sal-trim-recall",
        tier: "growth",
        title: "Automated 'Time for a Trim' WhatsApp Recall Engine",
        oneLiner: "Sends a polite automated message 25 days after a haircut or 45 days after a root touchup.",
        problem: "Clients intend to get a haircut every month but get busy and procrastinate, stretching salon visit cycles to 8 weeks.",
        softwareType: "Automation",
        whoUses: ["Clients", "Salon Owner"],
        howItWorks: "The system monitors elapsed days since the client's last visit. Day 28: 'Hey Rohan! Your fade is about 4 weeks old. Rahul has an open chair this Thursday. Tap to book.'",
        features: [
          "Service-specific smart recall triggers (Beard: 14 days, Men's Hair: 25 days, Keratin: 90 days)",
          "Direct 1-tap rebooking link with stylist pre-selected",
          "Measurable recovered revenue analytics showing bookings brought back by the bot",
          "Polite frequency controls preventing spam"
        ],
        howFixiaBuilds: "Automated event-driven WhatsApp messaging pipeline connected to checkout date records."
      },
      {
        id: "sal-membership-cards",
        tier: "growth",
        title: "Prepaid Beauty Wallet & Annual VIP Memberships",
        oneLiner: "Clients purchase ₹10,000 prepaid cards to receive 15% off all services for a full year.",
        problem: "Clients hop between rival salons based on whichever has a temporary street coupon.",
        softwareType: "Web App",
        whoUses: ["Salon Regulars", "Counter Cashier"],
        howItWorks: "Clients maintain a digital prepaid wallet. Checkout is seamless with zero physical card requirements, and clients receive an automated WhatsApp balance receipt after every visit.",
        features: [
          "Phone-number-linked digital membership wallet",
          "Tiered perks (Silver, Gold VIP, Bridal Elite)",
          "Automated monthly credit statements sent via WhatsApp",
          "Captures immediate upfront cash flow for the salon owner"
        ],
        howFixiaBuilds: "Integrated ledger system directly connected to the salon checkout terminal."
      },
      {
        id: "sal-ai-hairstyles",
        tier: "next-gen",
        title: "Virtual Hairstyle & Hair Color Augmented Style Preview",
        oneLiner: "Tablet mirror letting clients preview how they would look with balayage, copper red, or a bob cut before scissors touch their hair.",
        problem: "Clients are terrified of trying bold hair colors or dramatic cuts, settling for safe, cheap basic trims.",
        softwareType: "Interactive Web App",
        whoUses: ["Clients", "Creative Hair Directors"],
        howItWorks: "The stylist snaps a photo on the salon iPad. The client previews realistic color shades and hair lengths on their own face, giving them the confidence to purchase premium ₹6,000+ hair color treatments.",
        features: [
          "Realistic hair color tint overlay on live camera / still photo",
          "Curated trendy cut templates (Pixie, Curtain bangs, Wolf cut, Fade)",
          "One-tap social share card with salon branding watermarks",
          "Boosts high-ticket color service conversion rates"
        ],
        howFixiaBuilds: "Client-side WebGL canvas shader with facial landmark tracking running smoothly in Safari/Chrome."
      },
      {
        id: "sal-dynamic-slots",
        tier: "next-gen",
        title: "Off-Peak Dynamic Flash Discount Slot Promoter",
        oneLiner: "Automatically announces 20% discounts on Tuesday afternoon slots to fill idle salon chairs.",
        problem: "Salons are packed to the ceiling on Sunday but completely dead on Tuesday between 1 PM and 5 PM.",
        softwareType: "Automation & Web App",
        whoUses: ["Flexible Clients", "Salon Manager"],
        howItWorks: "If the salon calendar shows 4 empty chairs on Tuesday afternoon, the system sends a limited flash offer to nearby clients: 'Happy Hours: 20% off all hair spas today 1-5 PM.'",
        features: [
          "Automated idle-chair detection based on upcoming calendar density",
          "Limited flash discount countdown banner on the website booking page",
          "Exclusive broadcast to students and flexible remote workers",
          "Increases overall weekly revenue without discounting busy weekend peak slots"
        ],
        howFixiaBuilds: "Algorithmic capacity analyzer checking calendar occupancy 24 hours in advance."
      }
    ]
  },
  {
    id: "automobile",
    slug: "automobile",
    name: "Automobile Businesses",
    shortDesc: "Digital job cards, spare parts inventory, WhatsApp estimate approvals, and live service bay trackers.",
    tagline: "Modernize multi-brand garages, detailing studios, and auto workshops.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 10.8 2 11v5c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`,
    ideas: [
      {
        id: "auto-job-card",
        tier: "essential",
        title: "Digital Job Card & Vehicle Intake Photo Checklist",
        oneLiner: "Tablet intake app logging odometer, fuel level, and existing scratches with photos before service begins.",
        problem: "Customers accuse the workshop of scratching their car or stealing fuel because paper intake slips lack photo proof.",
        softwareType: "Mobile App & Tablet",
        whoUses: ["Service Advisor", "Vehicle Owners", "Workshop Supervisor"],
        howItWorks: "The advisor walks around the car with a tablet, marks existing dents on a 3D diagram, photographs the fuel gauge, logs customer complaints, and gets a digital customer signature.",
        features: [
          "Interactive car exterior diagram to mark dents and scratches",
          "Timestamped photo upload of fuel meter, odometer, and engine bay",
          "Instant digital job card copy dispatched to customer WhatsApp",
          "Prevents false damage liability claims with photographic proof"
        ],
        howFixiaBuilds: "Offline-first Progressive Web App designed for greasy workshop environments."
      },
      {
        id: "auto-spare-parts",
        tier: "essential",
        title: "Spare Parts Inventory & Supplier Purchase Ledger",
        oneLiner: "Barcode inventory tracking brake pads, synthetic engine oil, filters, and distributor credit balances.",
        problem: "Spare parts vanish from the workshop shelf with zero attribution, or cars sit on hydraulic lifts waiting for parts.",
        softwareType: "Custom Software",
        whoUses: ["Workshop Storekeeper", "Procurement Lead", "Owner"],
        howItWorks: "Mechanics scan out brake pads against a specific Job Card #. The cost adds to the customer's bill, inventory levels deduct, and the storekeeper gets low-stock alerts.",
        features: [
          "OEM vs Aftermarket part code catalog with compatibility lookup",
          "Job-card-linked part dispensing (no part leaves the room without a job card number)",
          "Distributor purchase ledger with unpaid credit balance tracking",
          "Engine oil drum dispense metering tracker"
        ],
        howFixiaBuilds: "Relational SQL database with fast keyboard barcode scanner support."
      },
      {
        id: "auto-estimate-approval",
        tier: "essential",
        title: "Digital Service Estimator & WhatsApp Customer Approval",
        oneLiner: "Send itemized repair estimates with photos of worn-out parts for instant 1-tap customer WhatsApp approval.",
        problem: "Mechanics replace expensive parts without written consent; customers get furious and refuse to pay the final bill.",
        softwareType: "Web App & Automation",
        whoUses: ["Service Advisor", "Car Owner"],
        howItWorks: "When the technician removes a damaged suspension arm, the advisor snaps a photo, creates an estimate, and sends a WhatsApp link: 'Brake pads worn out (photo attached). Total: ₹3,200. [Approve] / [Decline]'.",
        features: [
          "Transparent photo proof attached to individual repair recommendations",
          "Legally valid digital approval log with timestamp",
          "Separate mandatory safety repairs vs optional cosmetic add-ons",
          "Zero bill-shock disputes at the time of vehicle delivery"
        ],
        howFixiaBuilds: "Lightweight mobile approval interface requiring zero login credentials for the customer."
      },
      {
        id: "auto-bay-tracker",
        tier: "growth",
        title: "Live Service Bay Stage Tracker & Customer Status Portal",
        oneLiner: "Real-time web portal showing vehicle progress: 'In Washing -> Wheel Alignment -> Final Quality Check'.",
        problem: "Customers call the service manager 5 times a day asking 'is my car ready? Can I come pick it up?'.",
        softwareType: "Customer Web Portal",
        whoUses: ["Vehicle Owners", "Shop Floor Supervisor"],
        howItWorks: "Customers click their private tracking link to see live stage progress, inspection photos, and the exact estimated ready-for-delivery time.",
        features: [
          "Visual step-by-step progress tracker (Vehicle In -> Diagnostics -> Parts Fitted -> Wash -> Ready)",
          "Automated WhatsApp notification when vehicle clears final quality inspection",
          "Integrated online payment link to settle bill before arriving at the workshop",
          "Customer review prompt upon vehicle gate exit"
        ],
        howFixiaBuilds: "Modern reactive status tracker updating in real time via WebSockets."
      },
      {
        id: "auto-service-reminder",
        tier: "growth",
        title: "Next Service Due & Insurance Renewal Reminder Engine",
        oneLiner: "Predictive reminder bot that calculates when a car is due for its 10,000 km oil service or annual insurance.",
        problem: "Workshops lose customers to rival service centers because they never follow up after the first visit.",
        softwareType: "Automation",
        whoUses: ["Car Owners", "Workshop Customer Relationship Manager"],
        howItWorks: "Based on past driving kilometers, the system estimates when the vehicle will hit its next service milestone and sends a WhatsApp reminder: 'Your Creta completed 6 months since its last service. Book your periodic maintenance today.'",
        features: [
          "Predictive odometer mileage decay algorithm",
          "Annual motor insurance policy renewal countdown alerts",
          "Monsoon and summer pre-trip vehicle checkup campaign triggers",
          "Direct 1-tap service booking and pickup request"
        ],
        howFixiaBuilds: "Automated cron workflow linked to customer vehicle service history databases."
      },
      {
        id: "auto-pickup-drop",
        tier: "growth",
        title: "Doorstep Vehicle Pickup & Drop Driver Management",
        oneLiner: "Mobile app for workshop drivers to log customer vehicle pickup, fuel levels, and delivery handovers.",
        problem: "Workshop drivers get into traffic disputes, take personal detours with customer cars, or lose track of keys.",
        softwareType: "Mobile App",
        whoUses: ["Workshop Drivers", "Service Coordinator", "Customers"],
        howItWorks: "Drivers accept pickup assignments, take 4 photos of the vehicle at the customer's house, and the customer tracks the driver en route to the workshop.",
        features: [
          "Driver assignment dispatch with customer address and phone",
          "Pre-pickup vehicle condition photos signed off by customer",
          "Live GPS route tracking of customer vehicle while en route",
          "Digital gate pass verification upon safe return"
        ],
        howFixiaBuilds: "Progressive Web App utilizing smartphone GPS geolocation and camera APIs."
      },
      {
        id: "auto-obd-telematics",
        tier: "next-gen",
        title: "OBD-II Bluetooth Scanner & Fault Code Plain-English Translator",
        oneLiner: "Translates cryptic engine error codes (e.g. P0420) into plain customer explanations and repair quotes.",
        problem: "Technicians struggle to explain technical check-engine codes to non-technical vehicle owners.",
        softwareType: "Custom Software",
        whoUses: ["Diagnostic Technicians", "Service Advisors", "Customers"],
        howItWorks: "The technician plugs in an OBD scanner. The app translates 'P0300 Random Misfire' into: 'Engine spark plugs need replacement to avoid poor mileage and stalling', accompanied by an instant repair quote.",
        features: [
          "Automated OBD-II diagnostic fault code dictionary in plain Hindi & English",
          "Instant cost quotation mapped directly to detected fault codes",
          "Exportable vehicle health report PDF for vehicle resale inspection",
          "Historic error code comparison across service visits"
        ],
        howFixiaBuilds: "Custom diagnostic interpretation engine with extensive automotive code mappings."
      },
      {
        id: "auto-mechanic-efficiency",
        tier: "next-gen",
        title: "Workshop Bay Capacity & Mechanic Efficiency Analytics",
        oneLiner: "Tracks average repair duration per technician, lift utilization rates, and parts profit margins.",
        problem: "Workshop owners can't tell which mechanics are slacking off and which service bays sit idle generating zero revenue.",
        softwareType: "Dashboard & Analytics",
        whoUses: ["Workshop Founder", "Operations Auditor"],
        howItWorks: "The dashboard visualizes 6 hydraulic lifts: which bay is generating the highest hourly labor return, and which mechanics finish oil services 20% faster than standard book time.",
        features: [
          "Lift utilization rate heatmaps across working hours",
          "Technician labor billing efficiency metrics (Billed Hours vs Clocked Hours)",
          "Labor gross margin vs spare parts profit breakdown",
          "Workshop customer repeat visit retention rate"
        ],
        howFixiaBuilds: "Executive intelligence dashboard built with high-contrast data visualizations."
      }
    ]
  },
  {
    id: "events",
    slug: "events",
    name: "Event Management",
    shortDesc: "QR ticket scanners, vendor milestone budgets, interactive seating layouts, and live attendee Q&A.",
    tagline: "Streamline weddings, conferences, and exhibitions with zero backstage chaos.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    ideas: [
      {
        id: "evt-qr-tickets",
        tier: "essential",
        title: "Sub-Second QR Ticket Scanner & Gate Entry App",
        oneLiner: "Offline smartphone app verifying attendee ticket QR passes in 0.3 seconds to eliminate entrance queues.",
        problem: "2,000 attendees show up at the venue gate at 9 AM; slow scanner apps crash, causing security stampedes.",
        softwareType: "Mobile App & Scanner",
        whoUses: ["Gate Security", "Event Ushers", "Event Director"],
        howItWorks: "Ushers scan attendee phone tickets using their camera. Green beep = Valid pass; Red beep = Duplicate or counterfeit ticket already scanned.",
        features: [
          "Offline-first scanner (validates 5,000+ tickets without needing active venue Wi-Fi)",
          "Anti-passback prevention (stops people sharing ticket screenshots across WhatsApp)",
          "Real-time venue head-count attendance counter displayed on the organizer dashboard",
          "VIP badge printing and instant lanyard allocation"
        ],
        howFixiaBuilds: "High-speed WebAssembly QR camera reader with encrypted ticket token validation."
      },
      {
        id: "evt-budget-vendor",
        tier: "essential",
        title: "Event Budget Planner & Vendor Payment Milestones",
        oneLiner: "Master financial tracker managing catering, sound, lights, decor advances, and pending balances.",
        problem: "Wedding planners lose track of cash advances given to 15 different vendors, ending up in massive budget overruns.",
        softwareType: "Dashboard",
        whoUses: ["Event Planner", "Client / Bride & Groom", "Finance Lead"],
        howItWorks: "All vendor contracts are logged with agreed milestone deadlines (e.g., 'Caterer: 25% Advance, 50% on Event Morning, 25% Post Event'). System alerts you when balances are due.",
        features: [
          "Milestone-based vendor payment tracking with digital cash receipts",
          "Real-time budget variance tracker (Planned Budget vs Actual Spend)",
          "Client transparent view (clients can log in to view expense approvals)",
          "Vendor contract PDF repository with contact details"
        ],
        howFixiaBuilds: "Double-entry project accounting portal tailored to event timelines."
      },
      {
        id: "evt-microsite",
        tier: "essential",
        title: "Branded Event Microsite & Ticket Purchasing Engine",
        oneLiner: "Custom branded website selling conference or concert tickets with zero third-party platform cuts.",
        problem: "Ticketing platforms like BookMyShow charge 10-15% convenience fees and keep customer email/phone data.",
        softwareType: "Website & Web App",
        whoUses: ["Attendees", "Event Organizers"],
        howItWorks: "Attendees visit your branded event page, view speaker schedules, select ticket tiers (Standard, VIP, Backstage), and pay via UPI with 100% money going directly to your account.",
        features: [
          "Zero third-party ticket commission fees",
          "Custom ticket tiers with early-bird countdown timers",
          "Automated instant PDF pass dispatch via WhatsApp and email",
          "100% attendee database ownership for future event marketing"
        ],
        howFixiaBuilds: "High-concurrency landing page engineered to handle sudden viral traffic spikes during ticket drops."
      },
      {
        id: "evt-interactive-seating",
        tier: "growth",
        title: "Interactive Banquet Seating & Table Layout Planner",
        oneLiner: "Drag-and-drop banquet floor plan arranging VIP tables, stage sightlines, and guest allocations.",
        problem: "Paper guest lists result in relatives fighting over banquet seating and VIPs placed next to loud sound speakers.",
        softwareType: "Interactive Web Canvas",
        whoUses: ["Wedding Planners", "Banquet Host", "Bride & Groom"],
        howItWorks: "Organizers drag round banquet tables onto the venue floor plan and assign guest names. Guests receive an SMS on arrival: 'Welcome! You are seated at Table 08 (Lotus Hall)'.",
        features: [
          "Drag-and-drop table layout canvas matching exact venue dimensions",
          "Dietary requirement tags per seat (Jain, Vegan, Gluten-Free)",
          "Instant search for guest names by table number",
          "Exportable seating manifesto for catering and hostess teams"
        ],
        howFixiaBuilds: "HTML5 vector canvas interface with intuitive pinch, drag, and drop touch controls."
      },
      {
        id: "evt-wa-pass-updates",
        tier: "growth",
        title: "WhatsApp Pass Delivery & Live Schedule Alert Engine",
        oneLiner: "Dispatches personalized digital entry passes and real-time announcements directly to attendee WhatsApp.",
        problem: "Attendees don't check email; schedule changes (e.g. 'Keynote moved to Hall B') get missed entirely.",
        softwareType: "Automation",
        whoUses: ["Attendees", "Event Control Room"],
        howItWorks: "When the conference schedule shifts, the organizer sends an instant WhatsApp broadcast to all 800 attendees: 'Notice: Fireside Chat starting in 10 mins in Main Auditorium.'",
        features: [
          "Personalized WhatsApp pass with attendee name and QR entry code",
          "Real-time session starting notifications sent 15 mins before key speakers",
          "Directions, parking lot map pin, and Wi-Fi password broadcast",
          "Post-event presentation slides download link"
        ],
        howFixiaBuilds: "Official WhatsApp Cloud API broadcasting service with high delivery guarantees."
      },
      {
        id: "evt-speaker-portal",
        tier: "growth",
        title: "Speaker & Performer Coordination Hub",
        oneLiner: "Dedicated portal for conference speakers to submit presentation slides, bios, and travel requirements.",
        problem: "Event organizers spend weeks chasing 20 keynote speakers over email for PowerPoint decks and headshots.",
        softwareType: "Web Portal",
        whoUses: ["Speakers", "Conference Content Curator", "AV Team"],
        howItWorks: "Speakers log in to review their stage time, upload their final PowerPoint deck, and list AV requirements (Lapel mic, HDMI, clicker). The AV sound booth gets direct access to all verified files.",
        features: [
          "Speaker slide submission portal with file versioning (prevents old PPTs on stage)",
          "Automated deadline reminders for late slide submissions",
          "Audio-visual equipment checklist per speaker",
          "Green room hospitality and airport transfer schedule"
        ],
        howFixiaBuilds: "Secure file portal integrated with cloud storage for large presentation files."
      },
      {
        id: "evt-live-qa-polls",
        tier: "next-gen",
        title: "Real-Time Audience Q&A & Live Stage Poll Voting",
        oneLiner: "Attendees scan a stage QR code on their phones to vote in live polls and upvote questions for keynote speakers.",
        problem: "Passing handheld wireless microphones around 500-person halls wastes 15 minutes of dead time during Q&A sessions.",
        softwareType: "Real-Time Web App",
        whoUses: ["Audience Members", "Stage Moderator", "Speakers"],
        howItWorks: "Audience types questions into their phone web browser. Other attendees upvote the best questions. The stage moderator sees top-voted questions on an iPad and asks the speaker directly.",
        features: [
          "Zero app download required (scanned directly from stage screen QR code)",
          "Audience question upvoting system surfacing top community inquiries",
          "Live bar-chart poll results animating on the main stage screen in real time",
          "Moderator profanity filter and screening queue"
        ],
        howFixiaBuilds: "Real-time WebSocket server handling thousands of concurrent votes and live data pushes."
      },
      {
        id: "evt-photo-ai-search",
        tier: "next-gen",
        title: "Instant Selfie-Based Event Photo Gallery Finder",
        oneLiner: "Attendees snap a selfie to instantly find all professional photos taken of them by the event photographer.",
        problem: "Photographers take 3,000 photos, dump them in a 50GB Google Drive link, and attendees spend 3 hours scrolling to find 2 photos of themselves.",
        softwareType: "Web App",
        whoUses: ["Wedding & Conference Attendees", "Event Photographers"],
        howItWorks: "An attendee uploads a quick selfie on the event gallery link. The system matches facial features and delivers their personalized 12 photos in high resolution ready to share.",
        features: [
          "Instant facial matching across thousands of high-res event photos",
          "Custom event sponsor watermark on social media download exports",
          "Photographer upload portal with automated batch processing",
          "Massive viral social media exposure for the event brand"
        ],
        howFixiaBuilds: "High-speed vector embedding facial detection running directly in cloud storage buckets."
      }
    ]
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    name: "Manufacturing",
    shortDesc: "Production batch tracking, raw material balance sheets, machine maintenance logs, and worker piece-rate counters.",
    tagline: "Replace paper shop-floor sheets with streamlined factory operations software.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>`,
    ideas: [
      {
        id: "mfg-batch-tracker",
        tier: "essential",
        title: "Production Batch Tracker & Shop-Floor Routing",
        oneLiner: "Digital job route cards tracking parts from Cutting -> Machining -> Coating -> Final Assembly.",
        problem: "Factory supervisors can't locate which workstation a critical 500-unit client order is currently stuck at.",
        softwareType: "Custom Software & ERP",
        whoUses: ["Shop Floor Supervisors", "Factory Manager", "Machine Operators"],
        howItWorks: "Each production lot gets a barcode traveler card. Operators scan the card when finishing their stage. The factory manager sees real-time progress of all batches on their dashboard.",
        features: [
          "Workstation-by-workstation production lot progression",
          "Bottleneck detection (highlights machines with high backlogs)",
          "Scrap and defect unit count logging per operation",
          "Estimated batch completion countdown time"
        ],
        howFixiaBuilds: "Industrial-grade touchscreen web application designed for rugged factory tablets."
      },
      {
        id: "mfg-bom-inventory",
        tier: "essential",
        title: "Raw Material vs Finished Goods Stock Ledger",
        oneLiner: "Automated Bill of Materials (BOM) deducting sheet metal, screws, and paint as finished units are completed.",
        problem: "Assembly lines stop mid-shift because the factory ran out of tiny fasteners that someone forgot to reorder.",
        softwareType: "Dashboard & Custom Software",
        whoUses: ["Store Incharge", "Procurement Head", "Plant Director"],
        howItWorks: "When 100 electrical panels are marked finished, the system automatically consumes the designated copper wire, metal enclosures, and terminal blocks from warehouse inventory.",
        features: [
          "Multi-level Bill of Materials (BOM) recipe architecture",
          "Minimum order quantity (MOQ) safety stock alerts for raw materials",
          "Distributor purchase requisition generator with PO approvals",
          "Inventory valuation report (Raw Material vs Work-in-Progress vs Finished Goods)"
        ],
        howFixiaBuilds: "Relational database ledger ensuring strict audit trails and zero phantom stock entries."
      },
      {
        id: "mfg-maintenance-log",
        tier: "essential",
        title: "Machine Maintenance Log & Preventative Downtime Alerts",
        oneLiner: "Schedules periodic oil changes, hydraulic checks, and tool replacements to prevent catastrophic machine breakdowns.",
        problem: "Heavy injection molding or CNC machines break down unexpectedly because routine preventative oiling was neglected.",
        softwareType: "Dashboard",
        whoUses: ["Maintenance Engineers", "Plant Operations Head"],
        howItWorks: "The system tracks operating hours per machine. At 500 running hours, an alert triggers a mandatory 30-minute preventative maintenance checklist with technician signoff.",
        features: [
          "Hours-based and calendar-based preventative maintenance schedules",
          "Spare parts kit mapping for routine overhauls (gaskets, belts, lubricants)",
          "Breakdown MTBF (Mean Time Between Failures) and MTTR tracking",
          "Machine history log documenting past motor replacements and repairs"
        ],
        howFixiaBuilds: "Automated schedule monitor sending preventative task tickets to technician phones."
      },
      {
        id: "mfg-piece-rate",
        tier: "growth",
        title: "Worker Piece-Rate Counter & Shift Attendance Terminal",
        oneLiner: "Tablet terminal tracking units produced per worker to automatically calculate fair daily piece-rate wages.",
        problem: "Daily wage and piece-rate tallies maintained on paper notebooks lead to disputes, fraudulent counts, and payroll delays.",
        softwareType: "Mobile App & Tablet",
        whoUses: ["Factory Workers", "Shift Supervisors", "Payroll Clerk"],
        howItWorks: "Workers tap their badge at their station and log completed pieces. Supervisors inspect and approve batches with a single tap, auto-computing weekly wage disbursements.",
        features: [
          "Worker badge QR check-in and station allocation",
          "Piece-rate wage calculator factoring quality rejection deductions",
          "Shift-wise operator productivity benchmarking",
          "Automated weekly cash / bank payout slips"
        ],
        howFixiaBuilds: "Simple, pictorial touch-first interface usable by operators of any literacy level."
      },
      {
        id: "mfg-b2b-portal",
        tier: "growth",
        title: "Client B2B Order Progress & Dispatch Tracking Portal",
        oneLiner: "Secure client portal where corporate buyers track manufacturing progress, inspection certificates, and dispatch dates.",
        problem: "Corporate procurement buyers call your sales team 3 times a week demanding production status and test reports.",
        softwareType: "Web Portal",
        whoUses: ["B2B Clients", "Sales Account Managers"],
        howItWorks: "Corporate buyers log in to check PO #10842. They see that production is at 80%, download the intermediate quality inspection certificate, and track the dispatched logistics truck.",
        features: [
          "PO-specific production milestone visibility (Raw Material Received -> Production -> QC -> Dispatched)",
          "Downloadable Quality Inspection (QC) certificates and Mill Test Reports",
          "Logistics truck number and E-way bill document repository",
          "Re-order request button for repeat production batches"
        ],
        howFixiaBuilds: "White-labeled corporate portal showcasing advanced manufacturing maturity to institutional clients."
      },
      {
        id: "mfg-quality-qc",
        tier: "growth",
        title: "Quality Control (QC) Inspection & Defect Rejection Log",
        oneLiner: "Tablet checklist for quality inspectors logging defect categories, tolerance measurements, and scrap rates.",
        problem: "Defective parts slip through to clients because inspections are hurried through without structured checklists.",
        softwareType: "Mobile App",
        whoUses: ["QC Inspectors", "Production Head"],
        howItWorks: "Inspector selects random lot sample, measures dimensions with vernier calipers, logs readings on tablet. If measurements deviate beyond tolerance, the lot is automatically put on hold.",
        features: [
          "Tolerance limit validation with visual warning when out of specification",
          "Defect categorization Pareto charts (Dimensional, Surface scratch, Burr, Assembly error)",
          "Customer rejection claim root cause analysis tracker",
          "Digital QC stamp approval generating Certificate of Analysis (CoA)"
        ],
        howFixiaBuilds: "Fast tablet form with smart numeric boundary checks preventing invalid measurements."
      },
      {
        id: "mfg-iot-vibration",
        tier: "next-gen",
        title: "IoT Machine Vibration & Temperature Alert Hub",
        oneLiner: "Affordable sensor hub monitoring motor heat and vibration to predict bearing failures before machines seize up.",
        problem: "A critical hydraulic pump seizes up without warning, stopping the entire factory line for 4 days.",
        softwareType: "Dashboard & IoT",
        whoUses: ["Chief Engineer", "Factory Owner"],
        howItWorks: "Inexpensive magnetic vibration sensors attach to key motors. If vibration or temperature spikes abnormally, an alarm sounds and the supervisor receives an urgent WhatsApp alert.",
        features: [
          "Continuous motor temperature and vibration anomaly detection",
          "Emergency alert dispatch to engineer phones before mechanical seizure",
          "Energy consumption kilowatt-hour (kWh) tracking per production unit",
          "Prevents hundreds of thousands in emergency motor rewinding costs"
        ],
        howFixiaBuilds: "Lightweight MQTT broker connected to ESP32 industrial sensors streaming to a live dashboard."
      },
      {
        id: "mfg-bom-estimator",
        tier: "next-gen",
        title: "Instant Custom Quoting & Raw Material Margin Estimator",
        oneLiner: "Calculates precise manufacturing costs and target margins for custom client inquiries in 2 minutes.",
        problem: "Sales engineers take 4 days to calculate raw material, machine hours, and labor costs for custom RFQs, losing bids.",
        softwareType: "Custom Software",
        whoUses: ["Costing Engineers", "Sales Director"],
        howItWorks: "Enter dimensions, material grade, and estimated CNC cycle time. The tool calculates metal weight, tooling wear, machine hour rate, overhead, and recommends a profitable selling price.",
        features: [
          "Live raw material commodity price integration (Steel, Aluminum, Brass, Plastic resins)",
          "Machine hour rate (MHR) and setup time calculation matrix",
          "Volume discount tier generator (e.g. Price at 500 pcs vs 5,000 pcs)",
          "One-click professional B2B quotation PDF generator"
        ],
        howFixiaBuilds: "Parametric mathematical estimation engine tailored to your specific shop processes."
      }
    ]
  },
  {
    id: "other",
    slug: "other",
    name: "Other Businesses",
    shortDesc: "Custom internal tools, digital quotation builders, GST invoicing, and workflow automation engines.",
    tagline: "Software engineered around the exact unique way your business works.",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    ideas: [
      {
        id: "oth-excel-replace",
        tier: "essential",
        title: "Custom Spreadsheet-to-Web Workflow Replacement",
        oneLiner: "Replaces slow, error-prone 40MB Excel sheets with a multi-user web application.",
        problem: "Your entire company relies on one massive Excel file that crashes, gets corrupted, and accidentally gets overwritten.",
        softwareType: "Custom Software",
        whoUses: ["All Internal Staff", "Company Founder"],
        howItWorks: "We transform your existing messy spreadsheet columns into a fast, relational web application with user logins, dropdown validations, search filters, and automatic backups.",
        features: [
          "Zero spreadsheet crash anxiety with automatic cloud database backups",
          "Role-based permissions (Staff only see their work; owners see company totals)",
          "Instant search across 100,000+ historical records in under 100ms",
          "One-click export back to Excel whenever your accountant requests it"
        ],
        howFixiaBuilds: "Built on high-performance relational databases with custom intuitive interfaces tailored to your team."
      },
      {
        id: "oth-quote-builder",
        tier: "essential",
        title: "Digital Quotation & PDF Proposal Generator",
        oneLiner: "Generate polished, branded PDF quotations with payment terms and terms of service in 90 seconds.",
        problem: "Sales reps spend 2 hours formatting Word documents that look sloppy and have outdated pricing.",
        softwareType: "Web App",
        whoUses: ["Sales Executives", "Freelancers", "Agency Owners"],
        howItWorks: "Select client, pick standard service items or custom hourly scopes, choose milestone terms, and click 'Create Proposal'. A gorgeous, branded vector PDF is generated instantly.",
        features: [
          "Pre-saved service catalog with standard rates and customizable line items",
          "Automatic tax, discount, and payment milestone calculations",
          "Digital signature acceptance link (client signs on phone screen)",
          "Automated tracking showing when the client opened and viewed the proposal"
        ],
        howFixiaBuilds: "High-fidelity PDF generation engine paired with client viewing analytics."
      },
      {
        id: "oth-invoicing-gst",
        tier: "essential",
        title: "Simple Invoicing, Payment Tracking & GST Register",
        oneLiner: "Clean invoice maker tracking unpaid client balances without the complexity of bloated accounting suites.",
        problem: "Software like Tally is too complex for basic billing, while generic free invoicing apps slap their ugly watermark on your bills.",
        softwareType: "Custom Software",
        whoUses: ["Business Owner", "Accountant"],
        howItWorks: "Create professional GST-compliant invoices in 30 seconds. Track paid vs overdue accounts with one-click payment receipts and monthly sales tax summaries.",
        features: [
          "GSTIN validation and state-specific CGST/SGST/IGST breakdown",
          "Overdue payment tracker with automated polite WhatsApp reminders",
          "Client ledger balance sheet showing total lifetime business and pending dues",
          "Monthly GSTR-1 sales data export ready for your Chartered Accountant"
        ],
        howFixiaBuilds: "Clean, fast financial ledger application with zero recurring monthly subscription fees."
      },
      {
        id: "oth-client-portal",
        tier: "growth",
        title: "Customer Self-Service Account & History Portal",
        oneLiner: "A clean client dashboard where customers download past invoices, check order status, and submit requests.",
        problem: "Customers bombard your support staff with phone calls asking for copies of old receipts and service dates.",
        softwareType: "Web Portal",
        whoUses: ["Clients & Customers", "Support Team"],
        howItWorks: "Customers log in via simple phone OTP. They can view active contracts, download historical invoices, update their company details, and lodge service requests 24/7.",
        features: [
          "Zero-friction phone OTP login requiring no forgotten passwords",
          "Complete historical invoice and document download repository",
          "Ticket and inquiry submission desk with status notifications",
          "Branded luxury client experience building professional trust"
        ],
        howFixiaBuilds: "Secure progressive web portal designed to integrate with your existing client database."
      },
      {
        id: "oth-wa-tickets",
        tier: "growth",
        title: "WhatsApp Multi-Agent Support & Inbound Routing Desk",
        oneLiner: "Allows 4 team members to answer inquiries from a single business WhatsApp number without confusion.",
        problem: "All client inquiries come to the owner's personal phone, or team members duplicate answers to the same customer.",
        softwareType: "Custom Software & WhatsApp",
        whoUses: ["Support Agents", "Sales Team", "Business Owner"],
        howItWorks: "Customers message your official WhatsApp. Inquiries appear on a unified team dashboard. Agents assign tickets to themselves, write internal team notes, and reply seamlessly.",
        features: [
          "Multiple team members chatting from one official WhatsApp phone number",
          "Internal private notes between staff visible only to your team",
          "Quick canned response templates for frequently asked questions",
          "Customer conversation history timeline and resolution analytics"
        ],
        howFixiaBuilds: "Official WhatsApp Cloud API multi-agent team inbox without expensive monthly SaaS seat pricing."
      },
      {
        id: "oth-role-perms",
        tier: "growth",
        title: "Multi-User Role Permissions & Audit Trail Security",
        oneLiner: "Give staff access to exactly what they need while protecting sensitive financial data and customer lists.",
        problem: "Disgruntled ex-employees download your entire customer database because everyone shared one master password.",
        softwareType: "Custom Software",
        whoUses: ["Business Owner", "Branch Managers", "Staff"],
        howItWorks: "Create roles (e.g. Sales, Counter Staff, Operations, Accounts). Sales can create quotes but cannot see profit margins or export customer phone numbers to Excel.",
        features: [
          "Fine-grained role permissions (View, Edit, Delete, Export)",
          "Immutable audit log (records exactly who created, modified, or deleted any record)",
          "Export restrictions preventing bulk customer data theft",
          "Instant single-click account deactivation when an employee leaves"
        ],
        howFixiaBuilds: "Strict database-level Row-Level Security (RLS) ensuring bulletproof data segregation."
      },
      {
        id: "oth-workflow-engine",
        tier: "next-gen",
        title: "Custom Business Workflow Engine & Zapier Replacement",
        oneLiner: "Connects your website, WhatsApp, email, and internal databases into one automated pipeline with zero monthly Zapier fees.",
        problem: "Third-party automation tools like Zapier charge expensive monthly subscriptions that balloon as your business scales.",
        softwareType: "Custom Integration",
        whoUses: ["Operations Team", "Business Founder"],
        howItWorks: "When an event occurs (e.g. New Website Lead), the custom engine automatically validates the phone number, logs it to your CRM, dispatches a WhatsApp brochure, and pings your sales lead on Slack.",
        features: [
          "100% owned automation pipelines with zero third-party recurring charges",
          "Reliable webhook handlers with automated retry logic on failure",
          "Custom business logic rules (e.g. 'Route leads over ₹1 Lakh directly to founder')",
          "Direct integration with payment gateways, SMS, WhatsApp, and Google Sheets"
        ],
        howFixiaBuilds: "High-speed serverless webhooks running on your own infrastructure with total data privacy."
      },
      {
        id: "oth-executive-briefing",
        tier: "next-gen",
        title: "Executive Daily KPI Briefing Bot",
        oneLiner: "Automated 9 AM WhatsApp message summarizing yesterday's revenue, new leads, collections, and pending tasks.",
        problem: "Owners have to log into 4 different tools or call 3 managers every morning just to understand company performance.",
        softwareType: "Automation & Analytics",
        whoUses: ["Business Owner", "Partners", "Managing Director"],
        howItWorks: "Every morning at 9:00 AM, the owner receives a crisp WhatsApp briefing: 'Good morning! Yesterday: ₹1,42,000 billed, 4 new inquiries, 2 overdue payments. Cash in bank: ₹8,14,000.'",
        features: [
          "Automated daily 9 AM executive morning performance summary",
          "Visual weekly and monthly pacing chart against business targets",
          "Early warning flags (e.g. '3 client inquiries uncontacted for >24 hours')",
          "Custom metrics tailored specifically to what you care about most"
        ],
        howFixiaBuilds: "Automated analytics aggregation service compiling metrics directly into concise chat cards."
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.INDUSTRIES_DATA = INDUSTRIES_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = INDUSTRIES_DATA;
}
