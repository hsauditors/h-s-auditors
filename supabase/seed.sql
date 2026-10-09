-- ========================================================
-- H&S AUDITORS - COMPLETE DETERMINISTIC SEED FILE
-- Safe to execute multiple times (uses ON CONFLICT)
-- ========================================================

-- 1. SITE SETTINGS
INSERT INTO site_settings (
    id,
    company_name,
    tagline,
    logo_url,
    phone,
    landline,
    email,
    office_address,
    linkedin_url,
    instagram_url,
    youtube_url,
    default_seo_title,
    default_seo_description,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'H&S AUDITORS',
    'Accounting | Income Tax & GST | Audit | Business Solution',
    '/images/hs-logo.svg',
    '+91 97461 35644',
    '0466 - 221 0144',
    'info@hsauditors.com',
    'Room No.48, Harisree Square, Ottapalam, Palakkad, Kerala - 679101',
    'https://www.linkedin.com/company/hs-auditors',
    'https://www.instagram.com/hsauditors',
    'https://www.youtube.com/@hsauditors',
    'H&S Auditors | Premier Accounting, Tax & Audit Consultancy - India',
    'Professional accounting, taxation and compliance solutions bringing together deep expertise in GST, Income Tax, Bookkeeping, Audit & Assurance and Business Registration across India.',
    NOW()
)
ON CONFLICT (id) DO UPDATE SET
    company_name = EXCLUDED.company_name,
    tagline = EXCLUDED.tagline,
    phone = EXCLUDED.phone,
    landline = EXCLUDED.landline,
    email = EXCLUDED.email,
    office_address = EXCLUDED.office_address,
    updated_at = NOW();

-- 2. NAVIGATION ITEMS
INSERT INTO navigation_items (id, label, href, display_order, is_active, is_cta) VALUES
    ('00000000-0000-0000-0001-000000000001', 'Home', '/', 1, TRUE, FALSE),
    ('00000000-0000-0000-0001-000000000002', 'Services', '/services', 2, TRUE, FALSE),
    ('00000000-0000-0000-0001-000000000003', 'About', '/about', 3, TRUE, FALSE),
    ('00000000-0000-0000-0001-000000000004', 'Our Team', '/our-team', 4, TRUE, FALSE),
    ('00000000-0000-0000-0001-000000000005', 'Industries', '/industries', 5, TRUE, FALSE),
    ('00000000-0000-0000-0001-000000000006', 'Careers', '/careers', 6, TRUE, FALSE),
    ('00000000-0000-0000-0001-000000000007', 'Contact', '/contact', 7, TRUE, FALSE),
    ('00000000-0000-0000-0001-000000000008', 'Talk to an Expert', '/contact', 8, TRUE, TRUE)
ON CONFLICT (id) DO UPDATE SET
    label = EXCLUDED.label,
    href = EXCLUDED.href,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active,
    is_cta = EXCLUDED.is_cta;

-- 3. HOMEPAGE SECTIONS (Hero & Highlights)
INSERT INTO homepage_sections (
    id,
    section_key,
    eyebrow,
    headline,
    description,
    primary_cta_text,
    primary_cta_link,
    secondary_cta_text,
    secondary_cta_link,
    trust_badge_value,
    trust_badge_label,
    trust_points,
    desktop_image_url,
    mobile_image_url,
    image_alt,
    is_active,
    updated_at
) VALUES (
    '00000000-0000-0000-0002-000000000001',
    'hero',
    'PREMIER ACCOUNTING & TAX CONSULTANCY – INDIA',
    'Your Trusted Partner in Financial Growth and Compliance',
    'Professional accounting, taxation and compliance solutions bringing together deep expertise in GST, Income Tax, Bookkeeping, Audit & Assurance and Business Registration – for businesses across India.',
    'Book a Consultation',
    '/contact',
    'Our Services',
    '/services',
    '500+',
    'Businesses Trust Us',
    '["Expert Guidance", "Transparent Process", "Timely Support"]'::jsonb,
    '/images/hero-accounting-team.svg',
    '/images/hero-accounting-team-mobile.svg',
    'H&S Auditors Team of Accounting & Tax Professionals in Consultation',
    TRUE,
    NOW()
)
ON CONFLICT (section_key) DO UPDATE SET
    eyebrow = EXCLUDED.eyebrow,
    headline = EXCLUDED.headline,
    description = EXCLUDED.description,
    primary_cta_text = EXCLUDED.primary_cta_text,
    primary_cta_link = EXCLUDED.primary_cta_link,
    secondary_cta_text = EXCLUDED.secondary_cta_text,
    secondary_cta_link = EXCLUDED.secondary_cta_link,
    trust_badge_value = EXCLUDED.trust_badge_value,
    trust_badge_label = EXCLUDED.trust_badge_label,
    trust_points = EXCLUDED.trust_points,
    desktop_image_url = EXCLUDED.desktop_image_url,
    mobile_image_url = EXCLUDED.mobile_image_url,
    image_alt = EXCLUDED.image_alt,
    updated_at = NOW();

-- 4. HOMEPAGE STATS STRIP
INSERT INTO homepage_stats (id, value, label, icon_name, display_order, is_active) VALUES
    ('00000000-0000-0000-0003-000000000001', '500+', 'Returns Filed Yearly', 'FileText', 1, TRUE),
    ('00000000-0000-0000-0003-000000000002', '100%', 'Compliance Record', 'ShieldCheck', 2, TRUE),
    ('00000000-0000-0000-0003-000000000003', '12+', 'Years of Practice', 'Award', 3, TRUE),
    ('00000000-0000-0000-0003-000000000004', 'Pan-India', 'Client Coverage', 'Globe', 4, TRUE)
ON CONFLICT (id) DO UPDATE SET
    value = EXCLUDED.value,
    label = EXCLUDED.label,
    icon_name = EXCLUDED.icon_name,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;

-- 5. SERVICES
INSERT INTO services (
    id,
    title,
    slug,
    short_description,
    long_description,
    icon,
    image_url,
    cta_text,
    cta_url,
    benefits,
    process_steps,
    display_order,
    is_active,
    seo_title,
    seo_description
) VALUES
(
    '00000000-0000-0000-0004-000000000001',
    'GST Filing',
    'gst-filing',
    'Accurate, hassle-free GST registration, monthly returns and reconciliation.',
    'Navigating Goods and Services Tax in India requires meticulous attention to deadlines, classification, and input tax credit (ITC) reconciliation. H&S Auditors provides comprehensive GST advisory, registration, periodic return filings (GSTR-1, GSTR-3B, GSTR-9/9C), departmental audit support, and handling of departmental notices to ensure 100% statutory compliance without business disruption.',
    'FileText',
    '/images/service-gst.png',
    'Learn More',
    '/services/gst-filing',
    '["Accurate ITC reconciliation eliminating double-taxation", "Prompt monthly GSTR-1 and GSTR-3B filings", "Expert handling of GST departmental notices & audits", "Assistance in GST refund applications for exporters"]'::jsonb,
    '["Invoice & ledger collection", "Input Tax Credit verification", "Return preparation & validation", "Client sign-off & electronic filing"]'::jsonb,
    1,
    TRUE,
    'GST Filing & Compliance Services | H&S Auditors',
    'Accurate, hassle-free GST registration, monthly returns and reconciliation by experienced tax professionals.'
),
(
    '00000000-0000-0000-0004-000000000002',
    'Income Tax',
    'income-tax',
    'Maximise tax savings while staying fully compliant with the Income Tax Act.',
    'Our direct tax consultancy assists corporate entities, partnerships, LLPs, and individuals in strategic tax planning, advance tax computation, tax-deducted-at-source (TDS) management, and annual return filings. We provide sound representation in scrutiny assessments and appeals before tax authorities, keeping your tax liability optimised and fully legitimate.',
    'BarChart3',
    '/images/service-tax.png',
    'Learn More',
    '/services/income-tax',
    '["Proactive tax planning under new & old regimes", "Advance tax computation to avoid interest penalties", "TDS/TCS compliance & quarterly return filing", "Appellate and scrutiny assessment representation"]'::jsonb,
    '["Financial review & tax computations", "Deductions & exemption optimisation", "Draft return review", "E-filing and acknowledgement verification"]'::jsonb,
    2,
    TRUE,
    'Income Tax Planning & Filing Services | H&S Auditors',
    'Maximise tax savings while staying fully compliant with the Income Tax Act with expert advisory from H&S Auditors.'
),
(
    '00000000-0000-0000-0004-000000000003',
    'Bookkeeping & Accounting',
    'bookkeeping-accounting',
    'Clean, current financial records that help you make informed business decisions.',
    'Accurate bookkeeping is the bedrock of business vitality. We manage your day-to-day transaction records, bank reconciliations, accounts payable and receivable, payroll, and monthly Management Information System (MIS) reports. With our structured accounting workflows, business owners gain real-time visibility into cash flow and profitability.',
    'Calculator',
    '/images/service-accounting.png',
    'Learn More',
    '/services/bookkeeping-accounting',
    '["Cloud-enabled ledger and voucher management", "Monthly bank and vendor reconciliations", "Timely MIS reports detailing P&L and balance sheets", "Clear audit trails ensuring effortless year-end closures"]'::jsonb,
    '["Document ingestion & voucher entry", "Periodic reconciliation & journal adjustments", "Management report generation", "Strategic financial review"]'::jsonb,
    3,
    TRUE,
    'Bookkeeping & Accounting Services | H&S Auditors',
    'Clean, current financial records that help you make informed business decisions with timely MIS reporting.'
),
(
    '00000000-0000-0000-0004-000000000004',
    'Business Registration',
    'business-registration',
    'End-to-end assistance for company, LLP and firm registration.',
    'Turn your entrepreneurial vision into a legally established corporate entity. H&S Auditors facilitates complete registration for Private Limited Companies, One Person Companies (OPC), Limited Liability Partnerships (LLP), Partnership Firms, and Sole Proprietorships. We handle name reservation, digital signatures (DSC), drafting MOA/AOA, and PAN/TAN allocation smoothly.',
    'Building2',
    '/images/service-registration.png',
    'Learn More',
    '/services/business-registration',
    '["Guidance on optimal corporate structure", "DSC, DIN, and SPICe+ MCA filing support", "Drafting Memorandum & Articles of Association", "Post-incorporation compliance guidance"]'::jsonb,
    '["Entity selection & name approval", "Documentation & digital signature setup", "MCA form submission", "Certificate of Incorporation issuance"]'::jsonb,
    4,
    TRUE,
    'Business Registration & Incorporation | H&S Auditors',
    'End-to-end assistance for company, LLP and firm registration across India.'
),
(
    '00000000-0000-0000-0004-000000000005',
    'Audit & Assurance',
    'audit-assurance',
    'Statutory, internal and tax audits that ensure compliance and transparency.',
    'Independent audits provide lenders, shareholders, and regulatory authorities with absolute confidence in your financial statements. We conduct statutory audits under the Companies Act, tax audits under Section 44AB of the Income Tax Act, internal audits to strengthen internal controls, and inventory/stock verifications.',
    'ShieldCheck',
    '/images/service-audit.png',
    'Learn More',
    '/services/audit-assurance',
    '["Rigorous verification adhering to ICAI Standards", "Tax audit reporting via Form 3CA/3CB-3CD", "Internal audits designed to mitigate financial risks", "Enhanced credibility with investors and banking institutions"]'::jsonb,
    '["Audit planning & risk assessment", "Substantive testing & sampling", "Observation discussion with leadership", "Final audit report issuance"]'::jsonb,
    5,
    TRUE,
    'Audit & Assurance Services | H&S Auditors',
    'Statutory, internal and tax audits that ensure complete compliance and financial transparency.'
),
(
    '00000000-0000-0000-0004-000000000006',
    'Company Secretarial',
    'company-secretarial',
    'ROC filings, board compliance and secretarial support handled end to end.',
    'Maintaining corporate governance standards is essential to protect directors and companies from heavy penalties under the Ministry of Corporate Affairs (MCA). We handle annual ROC filings (AOC-4, MGT-7), maintenance of statutory registers, director KYC (DIR-3 KYC), minutes of board and general meetings, and alterations in share capital or registered office.',
    'Briefcase',
    '/images/service-secretarial.png',
    'Learn More',
    '/services/company-secretarial',
    '["Timely filing of AOC-4, MGT-7 and MCA annual returns", "Director KYC and appointment/resignation filings", "Statutory register maintenance & board resolutions", "Compliance checkups preventing heavy MCA penalties"]'::jsonb,
    '["Compliance audit & gap analysis", "Board resolution & documentation drafting", "MCA portal e-filing", "ROC acknowledgement archiving"]'::jsonb,
    6,
    TRUE,
    'Company Secretarial & ROC Filings | H&S Auditors',
    'ROC filings, board compliance and secretarial support handled end to end with zero hassle.'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    long_description = EXCLUDED.long_description,
    icon = EXCLUDED.icon,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active,
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description,
    updated_at = NOW();

-- 6. COMPLIANCE DEADLINES
INSERT INTO compliance_deadlines (id, compliance, form, due_date, display_order, is_active) VALUES
    ('00000000-0000-0000-0005-000000000001', 'GST outward supplies', 'GSTR-1', '11th of the following month', 1, TRUE),
    ('00000000-0000-0000-0005-000000000002', 'GST summary return & payment', 'GSTR-3B', '20th of the following month', 2, TRUE),
    ('00000000-0000-0000-0005-000000000003', 'TDS payment', 'Challan ITNS-281', '7th of the following month', 3, TRUE),
    ('00000000-0000-0000-0005-000000000004', 'Quarterly TDS return', '24Q / 26Q', '31st of the month after each quarter', 4, TRUE),
    ('00000000-0000-0000-0005-000000000005', 'Advance tax instalments', 'Challan 280', '15 Jun, 15 Sep, 15 Dec, 15 Mar', 5, TRUE),
    ('00000000-0000-0000-0005-000000000006', 'Income tax return (non-audit)', 'ITR', '31 July', 6, TRUE),
    ('00000000-0000-0000-0005-000000000007', 'Tax audit report', 'Form 3CA/3CB-3CD', '30 September', 7, TRUE),
    ('00000000-0000-0000-0005-000000000008', 'GST annual return', 'GSTR-9 / 9C', '31 December', 8, TRUE),
    ('00000000-0000-0000-0005-000000000009', 'ROC annual filings', 'AOC-4 / MGT-7', '30 Oct / 29 Nov', 9, TRUE)
ON CONFLICT (id) DO UPDATE SET
    compliance = EXCLUDED.compliance,
    form = EXCLUDED.form,
    due_date = EXCLUDED.due_date,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;

-- 7. WHY CHOOSE H&S
INSERT INTO why_choose_items (id, title, description, icon_name, display_order, is_active) VALUES
    ('00000000-0000-0000-0006-000000000001', 'Direct access to senior professionals', 'Work directly with seasoned Chartered Accountants and tax consultants dedicated to your success.', 'UserCheck', 1, TRUE),
    ('00000000-0000-0000-0006-000000000002', 'Real-time financial tracking and reporting', 'Stay informed with structured MIS reports and clean financial dashboards.', 'TrendingUp', 2, TRUE),
    ('00000000-0000-0000-0006-000000000003', 'End-to-end compliance management', 'From monthly filings to statutory audits, every obligation is covered seamlessly.', 'ShieldCheck', 3, TRUE),
    ('00000000-0000-0000-0006-000000000004', 'Personalised advisory for your business', 'Solutions tailored to the unique economic realities of your sector and business size.', 'Compass', 4, TRUE),
    ('00000000-0000-0000-0006-000000000005', 'Transparent billing with no hidden fees', 'Upfront pricing with detailed deliverables, ensuring honesty in every engagement.', 'Receipt', 5, TRUE),
    ('00000000-0000-0000-0006-000000000006', 'Multi-domain expertise under one roof', 'GST, Income Tax, Corporate Law, Accounting and Audits integrated under a single practice.', 'Layers', 6, TRUE)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    icon_name = EXCLUDED.icon_name,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;

-- 8. ABOUT CONTENT
INSERT INTO about_content (
    id,
    eyebrow,
    heading,
    subheading,
    paragraph_1,
    paragraph_2,
    image_url,
    image_alt,
    cta_text,
    cta_link,
    updated_at
) VALUES (
    '00000000-0000-0000-0007-000000000001',
    'ABOUT THE FIRM',
    'Premier Accounting & Tax Consultancy',
    'Committed to clarity, accuracy and personal attention',
    'H&S Auditors is a premier Accounting & Tax consultancy firm. Our team of experienced professionals brings together deep expertise in GST, Income Tax, Bookkeeping, Audit & Assurance and Business Registration.',
    'We believe every business deserves financial clarity without compromise. Our commitment to integrity, confidentiality, and timely delivery has made us the preferred partner for businesses across India.',
    '/images/about-office.svg',
    'H&S Auditors Corporate Office Reception',
    'More About Us',
    '/about',
    NOW()
)
ON CONFLICT (id) DO UPDATE SET
    eyebrow = EXCLUDED.eyebrow,
    heading = EXCLUDED.heading,
    subheading = EXCLUDED.subheading,
    paragraph_1 = EXCLUDED.paragraph_1,
    paragraph_2 = EXCLUDED.paragraph_2,
    image_url = EXCLUDED.image_url,
    image_alt = EXCLUDED.image_alt,
    cta_text = EXCLUDED.cta_text,
    cta_link = EXCLUDED.cta_link,
    updated_at = NOW();

-- 9. ABOUT FEATURES (Checklist)
INSERT INTO about_features (id, title, icon_name, display_order, is_active) VALUES
    ('00000000-0000-0000-0008-000000000001', 'GST registration, returns, refunds and departmental notices', 'CheckCircle2', 1, TRUE),
    ('00000000-0000-0000-0008-000000000002', 'Income tax planning, filing and representation before authorities', 'CheckCircle2', 2, TRUE),
    ('00000000-0000-0000-0008-000000000003', 'Statutory, internal, stock and tax audits', 'CheckCircle2', 3, TRUE),
    ('00000000-0000-0000-0008-000000000004', 'Company & LLP incorporation with ROC compliance', 'CheckCircle2', 4, TRUE),
    ('00000000-0000-0000-0008-000000000005', 'Payroll, TDS and monthly management reporting', 'CheckCircle2', 5, TRUE)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    icon_name = EXCLUDED.icon_name,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;

-- 10. VALUES SECTION
INSERT INTO values (id, title, description, icon_name, display_order, is_active) VALUES
    ('00000000-0000-0000-0009-000000000001', 'Integrity', 'Every opinion, certificate and return is issued on merit and in line with ICAI''s Code of Ethics.', 'Award', 1, TRUE),
    ('00000000-0000-0000-0009-000000000002', 'Confidentiality', 'Client records, ITR and GSTN details are protected with the highest level of data security.', 'Lock', 2, TRUE),
    ('00000000-0000-0000-0009-000000000003', 'Timely', 'Filings are prepared ahead of statutory deadlines, so you avoid late fees and penalties.', 'Clock', 3, TRUE)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    icon_name = EXCLUDED.icon_name,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;

-- 11. INDUSTRIES (12 Industries)
INSERT INTO industries (id, title, slug, description, image_url, icon_name, display_order, is_active) VALUES
    ('00000000-0000-0000-0010-000000000001', 'Manufacturing & MSME', 'manufacturing-msme', 'Inventory costing, excise/GST input credit reconciliation, and MSME subsidy compliance.', NULL, 'Factory', 1, TRUE),
    ('00000000-0000-0000-0010-000000000002', 'Retail & Trading', 'retail-trading', 'Point-of-sale accounting, multi-tier GST rates management, and inventory tracking.', NULL, 'Store', 2, TRUE),
    ('00000000-0000-0000-0010-000000000003', 'Construction & Real Estate', 'construction-real-estate', 'RERA compliance, joint venture accounting, work contract tax and GST input structuring.', NULL, 'HardHat', 3, TRUE),
    ('00000000-0000-0000-0010-000000000004', 'Healthcare & Hospitals', 'healthcare-hospitals', 'Hospital billing systems, medical trust compliance, doctor TDS provisions and asset audits.', NULL, 'Activity', 4, TRUE),
    ('00000000-0000-0000-0010-000000000005', 'Hotels & Restaurants', 'hotels-restaurants', 'Hospitality sector GST compliance, food cost accounting and service charge structuring.', NULL, 'Utensils', 5, TRUE),
    ('00000000-0000-0000-0010-000000000006', 'Logistics & Transport', 'logistics-transport', 'E-way bill management, reverse charge mechanism (RCM), and freight forwarder accounts.', NULL, 'Truck', 6, TRUE),
    ('00000000-0000-0000-0010-000000000007', 'IT & Software Exports', 'it-software-exports', 'Export of services, LUT filing, GST refunds, transfer pricing and foreign remittance reporting.', NULL, 'Cpu', 7, TRUE),
    ('00000000-0000-0000-0010-000000000008', 'Education & Trusts', 'education-trusts', '12A and 80G registrations, FCRA compliances, annual charitable trust audits and filings.', NULL, 'GraduationCap', 8, TRUE),
    ('00000000-0000-0000-0010-000000000009', 'Textiles & Apparel', 'textiles-apparel', 'Inverted tax structure refund filings, job work accounting and trade credit handling.', NULL, 'Scissors', 9, TRUE),
    ('00000000-0000-0000-0010-000000000010', 'Agriculture & Commodities', 'agriculture-commodities', 'APMC market transactions, agricultural exemption advisory and commodity accounting.', NULL, 'Sprout', 10, TRUE),
    ('00000000-0000-0000-0010-000000000011', 'Professional Services', 'professional-services', 'Presumptive taxation under 44ADA, professional tax registration and individual partner filings.', NULL, 'Briefcase', 11, TRUE),
    ('00000000-0000-0000-0010-000000000012', 'NBFC & Co-operative Societies', 'nbfc-cooperative-societies', 'RBI prudential norms reporting, statutory co-operative audits and loan book reviews.', NULL, 'Landmark', 12, TRUE)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    icon_name = EXCLUDED.icon_name,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;

-- 12. TEAM & TESTIMONIALS (Left clean / empty per instructions: do NOT invent mock people/testimonials)
-- Admins can populate these with real members and reviews through the Admin panel when ready.
