export interface SubService {
  id: string;
  title: string;
  description: string;
}

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
    id: '1',
    title: 'Audit & Assurance',
    slug: 'audit-assurance',
    short_description:
      'A systematic scrutiny of books of account and statutory records to verify the true and fair view of your financial position, reported under the Companies Act, 2013 and the Standards on Auditing issued by ICAI.',
    long_description:
      'Independent audits provide lenders, shareholders, and regulatory authorities with absolute confidence in your financial statements. We conduct statutory audits under the Companies Act, tax audits under Section 44AB of the Income Tax Act, and internal audits.',
    icon: 'FileCheck',
    image_url: null,
    cta_text: 'Explore Audit & Assurance',
    cta_url: '/contact',
    benefits: [
      'Statutory audit (as per applicable laws)',
      'Internal audit & risk assessment',
      'Compliance and process review',
      'Management reporting',
    ],
    process_steps: [
      'Audit planning & risk assessment',
      'Substantive testing & sampling',
      'Observation discussion with leadership',
      'Final audit report issuance',
    ],
    sub_services: [
      {
        id: 'sub-1-1',
        title: 'Statutory Audit',
        description:
          'Mandatory audit of companies under Section 139 of the Companies Act, 2013, with financial statements prepared as per Schedule III and Ind AS / AS.',
      },
      {
        id: 'sub-1-2',
        title: 'Tax Audit (Sec. 44AB)',
        description:
          'Audit for businesses crossing ₹10 crore turnover (₹1 crore where cash receipts and payments are above 5%) and professionals above ₹50 lakh, reported in Form 3CA/3CB and 3CD.',
      },
      {
        id: 'sub-1-3',
        title: 'Internal Audit',
        description:
          'Risk-based review of processes and controls, mandatory for prescribed companies under Section 138 read with Rule 13 of the Companies (Accounts) Rules.',
      },
      {
        id: 'sub-1-4',
        title: 'GST Audit & Reconciliation',
        description:
          'Annual reconciliation of books with GSTR-1, GSTR-3B and GSTR-2B, and self-certified reconciliation in GSTR-9C where turnover exceeds ₹5 crore.',
      },
      {
        id: 'sub-1-5',
        title: 'Stock & Bank Audit',
        description:
          'Stock, receivables and concurrent audits for banks and NBFCs, including drawing-power and credit-monitoring reports.',
      },
      {
        id: 'sub-1-6',
        title: 'Trust, Society & NGO Audit',
        description:
          'Audit under Section 12A/10(23C) in Form 10B/10BB, along with FCRA and state trust-act compliance.',
      },
    ],
    display_order: 1,
    is_active: true,
  },
  {
    id: '2',
    title: 'GST Compliance',
    slug: 'gst-compliance',
    short_description:
      'End-to-end Goods and Services Tax support under the CGST/SGST Acts, 2017 — from registration to departmental representation.',
    long_description:
      'Navigating Goods and Services Tax in India requires meticulous attention to deadlines, classification, and input tax credit (ITC) reconciliation. H&S Auditors provides comprehensive GST advisory, registration, periodic return filings, and handling of departmental notices.',
    icon: 'Receipt',
    image_url: null,
    cta_text: 'Explore GST Compliance',
    cta_url: '/contact',
    benefits: [
      'GST registration',
      'Monthly / quarterly return filing',
      'Reconciliation & advisory',
      'Ongoing compliance support',
    ],
    process_steps: [
      'Invoice & ledger collection',
      'Input Tax Credit verification',
      'Return preparation & validation',
      'Client sign-off & electronic filing',
    ],
    sub_services: [
      {
        id: 'sub-2-1',
        title: 'GST Registration',
        description:
          'Registration once turnover crosses ₹40 lakh for goods or ₹20 lakh for services (₹20 lakh / ₹10 lakh in special category states), plus voluntary and composition registrations.',
      },
      {
        id: 'sub-2-2',
        title: 'Return Filing',
        description:
          'GSTR-1, GSTR-3B, CMP-08, GSTR-4 and GSTR-9/9C filed on time, with input tax credit matched against GSTR-2B every month.',
      },
      {
        id: 'sub-2-3',
        title: 'Refunds & Exports',
        description:
          'Refund claims for exports, LUT filing, SEZ supplies and inverted duty structure under Section 54.',
      },
      {
        id: 'sub-2-4',
        title: 'Notices & Assessment',
        description:
          'Replies to ASMT-10, DRC-01 and audit notices, plus representation before GST officers and appellate authorities.',
      },
      {
        id: 'sub-2-5',
        title: 'E-Invoicing & E-way Bills',
        description:
          'Set-up and monitoring of e-invoicing (mandatory above ₹5 crore turnover) and e-way bill compliance.',
      },
    ],
    display_order: 2,
    is_active: true,
  },
  {
    id: '3',
    title: 'Income Tax & TDS',
    slug: 'income-tax',
    short_description:
      'Planning, filing and representation under the Income Tax Act, 1961 for individuals, firms, LLPs, companies and trusts.',
    long_description:
      'Our direct tax consultancy assists corporate entities, partnerships, LLPs, and individuals in strategic tax planning, advance tax computation, tax-deducted-at-source (TDS) management, and annual return filings.',
    icon: 'Calculator',
    image_url: null,
    cta_text: 'Explore Income Tax & TDS',
    cta_url: '/contact',
    benefits: [
      'Income tax return filing',
      'Tax planning & advisory',
      'Response to tax notices',
      'Individual & business taxation',
    ],
    process_steps: [
      'Financial review & tax computations',
      'Deductions & exemption optimisation',
      'Draft return review',
      'E-filing and acknowledgement verification',
    ],
    sub_services: [
      {
        id: 'sub-3-1',
        title: 'Return Filing',
        description:
          'ITR-1 to ITR-7 filed with the right regime choice — old vs. new — and complete capital gains, house property and foreign asset disclosure.',
      },
      {
        id: 'sub-3-2',
        title: 'TDS & TCS',
        description:
          'Monthly deduction and deposit, quarterly 24Q/26Q/27Q returns, Form 16/16A issuance and correction of defaults on TRACES.',
      },
      {
        id: 'sub-3-3',
        title: 'Advance Tax & Planning',
        description:
          'Quarterly advance tax computation (15 June, 15 Sept, 15 Dec, 15 March) and lawful tax planning under Chapter VI-A and presumptive schemes 44AD/44ADA.',
      },
      {
        id: 'sub-3-4',
        title: 'Assessments & Appeals',
        description:
          'Responses to Section 143(1), 143(2), 148 and faceless assessment notices, and appeals before CIT (A) and ITAT.',
      },
      {
        id: 'sub-3-5',
        title: 'Form 15CA/15CB',
        description:
          'Certification for foreign remittances and DTAA benefit determination for non-resident payments.',
      },
    ],
    display_order: 3,
    is_active: true,
  },
  {
    id: '4',
    title: 'Accounting & Payroll',
    slug: 'accounting-payroll',
    short_description:
      'Books that stay current, reconciled and ready for any statutory or lender review.',
    long_description:
      'Accurate bookkeeping is the bedrock of business vitality. We manage your day-to-day transaction records, bank reconciliations, accounts payable and receivable, payroll, and monthly Management Information System (MIS) reports.',
    icon: 'BookOpen',
    image_url: null,
    cta_text: 'Explore Accounting & Payroll',
    cta_url: '/contact',
    benefits: [
      'Day-to-day bookkeeping',
      'Monthly & quarterly reports',
      'Customised chart of accounts',
      'Financial analysis & support',
    ],
    process_steps: [
      'Document ingestion & voucher entry',
      'Periodic reconciliation & journal adjustments',
      'Management report generation',
      'Strategic financial review',
    ],
    sub_services: [
      {
        id: 'sub-4-1',
        title: 'Bookkeeping',
        description:
          'Tally / Zoho / Quickbooks accounting with GST-ready ledgers and monthly bank reconciliation.',
      },
      {
        id: 'sub-4-2',
        title: 'Accounting Supervision',
        description:
          'Chief-accountant-level oversight: chart of accounts design, accounting policy, review of books and preparation of financial statements.',
      },
      {
        id: 'sub-4-3',
        title: 'Payroll & Labour Compliance',
        description:
          'Salary processing with PF, ESI, professional tax and gratuity workings, plus monthly challans and returns.',
      },
      {
        id: 'sub-4-4',
        title: 'MIS & Management Reporting',
        description:
          'Monthly profitability, cash-flow and ratio reporting so decisions rest on current numbers.',
      },
    ],
    display_order: 4,
    is_active: true,
  },
  {
    id: '5',
    title: 'Business Set-up & ROC',
    slug: 'business-setup-roc',
    short_description:
      'Incorporation and ongoing secretarial compliance under the Companies Act, 2013 and LLP Act, 2008.',
    long_description:
      'Turn your entrepreneurial vision into a legally established corporate entity. H&S Auditors facilitates complete registration for Private Limited Companies, One Person Companies (OPC), Limited Liability Partnerships (LLP), Partnership Firms, and Sole Proprietorships.',
    icon: 'Landmark',
    image_url: null,
    cta_text: 'Explore Business Set-up & ROC',
    cta_url: '/contact',
    benefits: [
      'Private Limited & LLP registration',
      'Trade license and other registrations',
      'Regulatory compliance support',
      'Guidance on statutory requirements',
    ],
    process_steps: [
      'Entity selection & name approval',
      'Documentation & digital signature setup',
      'MCA form submission',
      'Certificate of Incorporation issuance',
    ],
    sub_services: [
      {
        id: 'sub-5-1',
        title: 'Company & LLP Incorporation',
        description:
          'SPICe+ / FiLLiP filing with DSC, DIN, PAN, TAN, MOA and AOA — private limited, OPC, LLP and partnership firms.',
      },
      {
        id: 'sub-5-2',
        title: 'ROC Annual Filings',
        description:
          'AOC-4, MGT-7/7A, DIR-3 KYC, DPT-3 and MSME-1 filed within statutory due dates.',
      },
      {
        id: 'sub-5-3',
        title: 'Registrations',
        description:
          'MSME/Udyam, Import Export Code, Shops & Establishment, FSSAI, PF/ESI and 12A/80G for NGOs.',
      },
      {
        id: 'sub-5-4',
        title: 'Closure & Strike-off',
        description:
          'Voluntary strike-off under Section 248, LLP closure and liquidation support under IBC.',
      },
    ],
    display_order: 5,
    is_active: true,
  },
  {
    id: '6',
    title: 'Advisory',
    slug: 'advisory',
    short_description:
      'Practical, sustainable advice for businesses navigating a fast-changing regulatory landscape.',
    long_description:
      'Navigating mergers, fundraising, or complex restructuring requires strategic insight. Our advisory arm supports growing firms with valuation, financial modeling, CMA reports, and transaction advisory.',
    icon: 'Award',
    image_url: null,
    cta_text: 'Explore Advisory',
    cta_url: '/contact',
    benefits: [
      'Transaction advisory',
      'Financial projections & CMA',
      'Valuation reports',
      'Due diligence',
    ],
    process_steps: [
      'Preliminary scope analysis',
      'Financial modeling & verification',
      'Report formulation',
      'Executive debrief & recommendations',
    ],
    sub_services: [
      {
        id: 'sub-6-1',
        title: 'Due Diligence',
        description:
          'Financial, tax and compliance due diligence for mergers, acquisitions and equity investments.',
      },
      {
        id: 'sub-6-2',
        title: 'Business Valuation',
        description:
          'Valuation reports for fundraising, share transfers, regulatory compliance and dispute resolution.',
      },
      {
        id: 'sub-6-3',
        title: 'Project Reports & Funding',
        description:
          'CMA data, project reports and financial projections for bank loans and working capital limits.',
      },
      {
        id: 'sub-6-4',
        title: 'Transaction Advisory',
        description:
          'Structuring contracts, cross-border transactions, agreements, and tax implications.',
      },
    ],
    display_order: 6,
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
  image_url: '/images/about-office.jpg',
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

