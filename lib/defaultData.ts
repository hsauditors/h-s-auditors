export interface SubService {
  id: string;
  title: string;
  description: string;
  image_url?: string;
}

export interface ServicesBannerData {
  eyebrow?: string;
  headline?: string;
  description?: string;
  image_url?: string;
}

export const DEFAULT_SERVICES_BANNER: ServicesBannerData = {
  eyebrow: 'OUR SERVICES',
  headline: 'Accounting, Audit & Advisory Services',
  description: 'Explore our core domains below. Each service is delivered with expertise, accuracy and a deep understanding of regulatory requirements to support your business goals.',
  image_url: '/images/service-accounting.jpg',
};

export interface DefaultServiceItem {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description: string | null;
  icon: string;
  image_url: string | null;
  cta_text: string;
  cta_url: string;
  benefits: string[];
  process_steps: string[];
  sub_services?: SubService[];
  display_order: number;
  is_active: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
}

export const DEFAULT_SERVICES: DefaultServiceItem[] = [
  {
    id: 'cat-taxation',
    title: 'Taxation Services',
    slug: 'taxation-services',
    short_description:
      'Comprehensive direct and indirect tax solutions for individuals, businesses and corporates.',
    long_description:
      'Our direct and indirect tax consultancy assists corporate entities, partnerships, LLPs, and individuals in strategic tax planning, GST filings, and compliance with statutory provisions.',
    icon: 'FileText',
    image_url: null,
    cta_text: 'Explore Taxation Services',
    cta_url: '/contact',
    benefits: [
      'Accurate GST and Income Tax compliance',
      'Timely return filing and tax computation',
      'Minimised tax exposure and dispute prevention',
    ],
    process_steps: [
      'Document review and ledger verification',
      'Tax computation & deductions validation',
      'Timely submission and acknowledgement',
    ],
    sub_services: [
      {
        id: 'sub-tax-1',
        title: 'GST Filing',
        description:
          'Accurate, hassle-free GST registration, monthly returns and reconciliation.',
      },
      {
        id: 'sub-tax-2',
        title: 'Income Tax',
        description:
          'Maximise tax savings while staying fully compliant with the Income Tax Act.',
      },
      {
        id: 'sub-tax-3',
        title: 'Return Filing',
        description:
          'ITR-1 to ITR-7 filing with end-to-end compliance, capital gains and tax planning.',
      },
      {
        id: 'sub-tax-4',
        title: 'TDS & TCS',
        description:
          'Monthly deduction and deposit, quarterly returns and Form 16/16A issuance and correction.',
      },
    ],
    display_order: 1,
    is_active: true,
  },
  {
    id: 'cat-advisory',
    title: 'Advisory & Compliance',
    slug: 'advisory-compliance',
    short_description:
      'Strategic advisory and regulatory support tailored to your industry and growth plans.',
    long_description:
      'Practical, strategic and sustainable advice for businesses navigating complex tax legislation, international transfers, and departmental scrutiny.',
    icon: 'TrendingUp',
    image_url: null,
    cta_text: 'Explore Advisory & Compliance',
    cta_url: '/contact',
    benefits: [
      'Proactive tax forecasting and cash flow management',
      'Professional representation before statutory bodies',
      'Cross-border compliance and DTAA certifications',
    ],
    process_steps: [
      'Initial situation assessment and transaction mapping',
      'Drafting computations, certificates, and grounds of appeal',
      'Representation and final resolution',
    ],
    sub_services: [
      {
        id: 'sub-adv-1',
        title: 'Advance Tax & Planning',
        description:
          'Advance tax computation and planning to optimise tax liability and manage cash flow.',
      },
      {
        id: 'sub-adv-2',
        title: 'Assessments & Appeals',
        description:
          'Representation before tax authorities for assessments, scrutiny, penalties and appeals.',
      },
      {
        id: 'sub-adv-3',
        title: 'Form 15CA/15CB',
        description:
          'Certification for foreign remittances and DTAA benefit claims.',
      },
      {
        id: 'sub-adv-4',
        title: 'Transfer Pricing',
        description:
          'End-to-end transfer pricing studies, documentation and compliance.',
      },
    ],
    display_order: 2,
    is_active: true,
  },
  {
    id: 'cat-accounting',
    title: 'Accounting & Business Support',
    slug: 'accounting-business-support',
    short_description:
      'Reliable financial support to keep your business organised and compliant.',
    long_description:
      'Accurate bookkeeping and reliable incorporation services to provide strong organizational foundation and real-time financial transparency.',
    icon: 'Calculator',
    image_url: null,
    cta_text: 'Explore Business Support',
    cta_url: '/contact',
    benefits: [
      'Up-to-date reconciliations and clean ledgers',
      'Fast-track entity registration with complete secretarial documentation',
      'Dedicated accounting supervisors',
    ],
    process_steps: [
      'Document and voucher ingestion',
      'System recording and ledger reconciliation',
      'Periodic MIS reporting',
    ],
    sub_services: [
      {
        id: 'sub-acc-1',
        title: 'Bookkeeping & Accounting',
        description:
          'Clean, current financial records to help you make informed business decisions.',
      },
      {
        id: 'sub-acc-2',
        title: 'Business Registration',
        description:
          'End-to-end assistance for company, LLP and firm registration.',
      },
    ],
    display_order: 3,
    is_active: true,
  },
  {
    id: 'cat-audit',
    title: 'Audit & Assurance',
    slug: 'audit-assurance',
    short_description:
      'Independent audit and assurance services to enhance compliance and transparency.',
    long_description:
      'A systematic scrutiny of books of account and statutory records to verify the true and fair view of your financial position, reported under the Companies Act, 2013 and ICAI standards.',
    icon: 'ShieldCheck',
    image_url: null,
    cta_text: 'Explore Audit & Assurance',
    cta_url: '/contact',
    benefits: [
      'Independent verification trusted by lenders and stakeholders',
      'Thorough risk assessment and internal control evaluation',
      'Seamless regulatory compliance',
    ],
    process_steps: [
      'Audit planning & risk assessment',
      'Substantive testing & sampling',
      'Observation discussion with leadership',
      'Final audit report issuance',
    ],
    sub_services: [
      {
        id: 'sub-aud-1',
        title: 'Statutory Audit',
        description:
          'Audit under the Companies Act 2013 with compliance to applicable standards (SA/AS).',
      },
      {
        id: 'sub-aud-2',
        title: 'Tax Audit (Sec. 44AB)',
        description:
          'Audit for businesses exceeding prescribed turnover with reporting in Form 3CA/3CB and 3CD.',
      },
      {
        id: 'sub-aud-3',
        title: 'Internal Audit',
        description:
          'Risk-based internal audit processes to strengthen controls and governance.',
      },
      {
        id: 'sub-aud-4',
        title: 'GST Audit & Reconciliation',
        description:
          'Annual reconciliation of books with GSTR-1, GSTR-3B and GSTR-2A and certified reconciliation in GSTR-9C.',
      },
    ],
    display_order: 4,
    is_active: true,
  },
];

export const DEFAULT_COMPLIANCE_DEADLINES = [
  {
    id: '1',
    compliance: 'GST outward supplies',
    form: 'GSTR-1',
    due_date: '11th of the following month',
    display_order: 1,
    is_active: true,
  },
  {
    id: '2',
    compliance: 'GST summary return & payment',
    form: 'GSTR-3B',
    due_date: '20th of the following month',
    display_order: 2,
    is_active: true,
  },
  {
    id: '3',
    compliance: 'TDS payment',
    form: 'Challan ITNS-281',
    due_date: '7th of the following month',
    display_order: 3,
    is_active: true,
  },
  {
    id: '4',
    compliance: 'Quarterly TDS return',
    form: '24Q / 26Q',
    due_date: '31st of the month after each quarter',
    display_order: 4,
    is_active: true,
  },
  {
    id: '5',
    compliance: 'Advance tax instalments',
    form: 'Challan 280',
    due_date: '15 Jun, 15 Sep, 15 Dec, 15 Mar',
    display_order: 5,
    is_active: true,
  },
  {
    id: '6',
    compliance: 'Income tax return (non-audit)',
    form: 'ITR',
    due_date: '31 July',
    display_order: 6,
    is_active: true,
  },
  {
    id: '7',
    compliance: 'Tax audit report',
    form: 'Form 3CA/3CB-3CD',
    due_date: '30 September',
    display_order: 7,
    is_active: true,
  },
  {
    id: '8',
    compliance: 'GST annual return',
    form: 'GSTR-9 / 9C',
    due_date: '31 December',
    display_order: 8,
    is_active: true,
  },
  {
    id: '9',
    compliance: 'ROC annual filings',
    form: 'AOC-4 / MGT-7',
    due_date: '30 Oct / 29 Nov',
    display_order: 9,
    is_active: true,
  },
];

export const DEFAULT_WHY_CHOOSE = [
  {
    id: '1',
    title: 'Direct access to senior professionals',
    description: 'Work directly with seasoned Chartered Accountants and tax consultants dedicated to your success.',
    icon_name: 'UserCheck',
    display_order: 1,
    is_active: true,
  },
  {
    id: '2',
    title: 'Real-time financial tracking and reporting',
    description: 'Stay informed with structured MIS reports and clean financial dashboards.',
    icon_name: 'TrendingUp',
    display_order: 2,
    is_active: true,
  },
  {
    id: '3',
    title: 'End-to-end compliance management',
    description: 'From monthly filings to statutory audits, every obligation is covered seamlessly.',
    icon_name: 'ShieldCheck',
    display_order: 3,
    is_active: true,
  },
  {
    id: '4',
    title: 'Personalised advisory for your business',
    description: 'Solutions tailored to the unique economic realities of your sector and business size.',
    icon_name: 'Compass',
    display_order: 4,
    is_active: true,
  },
  {
    id: '5',
    title: 'Transparent billing with no hidden fees',
    description: 'Upfront pricing with detailed deliverables, ensuring honesty in every engagement.',
    icon_name: 'Receipt',
    display_order: 5,
    is_active: true,
  },
  {
    id: '6',
    title: 'Multi-domain expertise under one roof',
    description: 'GST, Income Tax, Corporate Law, Accounting and Audits integrated under a single practice.',
    icon_name: 'Layers',
    display_order: 6,
    is_active: true,
  },
];

export const DEFAULT_STATS = [
  {
    id: '1',
    value: '500+',
    label: 'Returns Filed Yearly',
    icon_name: 'FileText',
    display_order: 1,
    is_active: true,
  },
  {
    id: '2',
    value: '100%',
    label: 'Compliance Record',
    icon_name: 'ShieldCheck',
    display_order: 2,
    is_active: true,
  },
  {
    id: '3',
    value: '12+',
    label: 'Years of Practice',
    icon_name: 'Award',
    display_order: 3,
    is_active: true,
  },
  {
    id: '4',
    value: 'Pan-India',
    label: 'Client Coverage',
    icon_name: 'Globe',
    display_order: 4,
    is_active: true,
  },
];

export const DEFAULT_HERO = {
  section_key: 'hero',
  eyebrow: 'PREMIER ACCOUNTING & TAX CONSULTANCY • INDIA',
  headline: 'Your Trusted Partner in Financial Growth and Compliance',
  description:
    'Professional accounting, taxation and compliance solutions bringing together deep expertise in GST, Income Tax, Bookkeeping, Audit & Assurance and Business Registration — for businesses across India.',
  primary_cta_text: 'Book a Consultation',
  primary_cta_link: '/contact',
  secondary_cta_text: 'Our Services',
  secondary_cta_link: '/services',
  trust_badge_value: '500+',
  trust_badge_label: 'Businesses Trust Us',
  trust_points: ['Expert Guidance', 'Transparent Process', 'Timely Support'],
  desktop_image_url: '/images/hero-team.jpg',
  mobile_image_url: '/images/hero-team.jpg',
  image_alt: 'H&S Auditors Team of Accounting & Tax Professionals in Consultation',
  is_active: true,
};

export const DEFAULT_ABOUT = {
  eyebrow: 'ABOUT THE FIRM',
  heading: 'Premier Accounting & Tax Consultancy',
  subheading: 'Committed to clarity, accuracy and personal attention',
  paragraph_1:
    'H&S Auditors is a premier Accounting & Tax consultancy firm. Our team of experienced professionals brings together deep expertise in GST, Income Tax, Bookkeeping, Audit & Assurance and Business Registration.',
  paragraph_2:
    'We believe every business deserves financial clarity without compromise. Our commitment to integrity, confidentiality, and timely delivery has made us the preferred partner for businesses across India.',
  image_url: '/images/H&S Auditors about section.png',
  image_alt: 'H&S Auditors Corporate Office Reception',
  cta_text: 'More About Us',
  cta_link: '/about',
};

export const DEFAULT_SETTINGS = {
  company_name: 'H&S AUDITORS',
  tagline: 'Accounting | Income Tax & GST | Audit | Business Solution',
  logo_url: '/images/hs-logo.png',
  phone: '+91 97461 35644',
  landline: '0466 - 221 0144',
  email: 'info@hsauditors.com',
  office_address: 'Room No.48, Harisree Square, Ottapalam, Palakkad, Kerala - 679101',
  linkedin_url: 'https://www.linkedin.com/company/hs-auditors',
  instagram_url: 'https://www.instagram.com/hsauditors',
  youtube_url: 'https://www.youtube.com/@hsauditors',
  default_seo_title: 'H&S Auditors | Premier Accounting, Tax & Audit Consultancy - India',
  default_seo_description:
    'Professional accounting, taxation and compliance solutions bringing together deep expertise in GST, Income Tax, Bookkeeping, Audit & Assurance and Business Registration across India.',
};

export const DEFAULT_TESTIMONIALS = [
  {
    id: 'test_1',
    name: 'Rajesh Menon',
    company: 'Malabar Logistics & Trading Co.',
    designation: 'Managing Director',
    quote: 'H&S Auditors transformed our compliance process. Their precision with GST filings and annual reconciliation saved us valuable time and avoided penalties completely.',
    image_url: null,
    rating: 5,
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'test_2',
    name: 'Anjali Sharma',
    company: 'FinTrack SaaS Solutions',
    designation: 'Co-Founder & CFO',
    quote: 'From corporate incorporation to ongoing statutory audits, H&S Auditors delivers exceptional guidance. The partners are always directly accessible and proactive.',
    image_url: null,
    rating: 5,
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'test_3',
    name: 'K. V. Nambiar',
    company: 'Highland Hospitality Group',
    designation: 'Director of Finance',
    quote: 'Their attention to detail and deep expertise in Indian direct and indirect tax laws make them our most trusted financial advisors. Highly recommended.',
    image_url: null,
    rating: 5,
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const DEFAULT_INDUSTRIES = [
  {
    id: 'ind-1',
    title: 'Manufacturing & MSME',
    slug: 'manufacturing-msme',
    description: 'Inventory controls, excise/GST input credit reconciliation, and MSME subsidy compliance.',
    image_url: null,
    icon_name: 'Factory',
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ind-2',
    title: 'Retail & Trading',
    slug: 'retail-trading',
    description: 'Point-of-sale accounting, multi-tier GST rates management, and inventory tracking.',
    image_url: null,
    icon_name: 'Store',
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ind-3',
    title: 'Construction & Real Estate',
    slug: 'construction-real-estate',
    description: 'RERA compliance, joint venture accounting, work contract tax and GST input structuring.',
    image_url: null,
    icon_name: 'HardHat',
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ind-4',
    title: 'Healthcare & Hospitals',
    slug: 'healthcare-hospitals',
    description: 'Hospital billing systems, medical trust compliance, and asset audits.',
    image_url: null,
    icon_name: 'HeartPulse',
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ind-5',
    title: 'Hotels & Restaurants',
    slug: 'hotels-restaurants',
    description: 'Hospitality sector GST compliance, food cost accounting and service charge structuring.',
    image_url: null,
    icon_name: 'UtensilsCrossed',
    display_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ind-6',
    title: 'Logistics & Transport',
    slug: 'logistics-transport',
    description: 'E-way bill management, reverse charge mechanism (RCM) and freight forwarder accounts.',
    image_url: null,
    icon_name: 'Truck',
    display_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ind-7',
    title: 'IT & Software Exports',
    slug: 'it-software-exports',
    description: 'Export of services, LUT filing, GST refunds, transfer pricing and foreign remittance reporting.',
    image_url: null,
    icon_name: 'Settings',
    display_order: 7,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ind-8',
    title: 'Education & Trusts',
    slug: 'education-trusts',
    description: '12A and 80G registrations, FCRA compliances, annual charitable trust audits and filings.',
    image_url: null,
    icon_name: 'GraduationCap',
    display_order: 8,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'ind-9',
    title: 'Textiles & Apparel',
    slug: 'textiles-apparel',
    description: 'Inverted tax structure refund filings, job work accounting and trade credit handling.',
    image_url: null,
    icon_name: 'Shirt',
    display_order: 9,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

