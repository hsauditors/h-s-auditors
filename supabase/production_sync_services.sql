-- ========================================================
-- H&S AUDITORS: PRODUCTION SERVICES MIGRATION SCRIPT
-- Run this in Supabase Dashboard -> SQL Editor
-- ========================================================

-- 1. Ensure services can store string IDs and UUIDs
ALTER TABLE services ALTER COLUMN id TYPE TEXT;

-- 2. Ensure sub_services column exists
ALTER TABLE services ADD COLUMN IF NOT EXISTS sub_services JSONB DEFAULT '[]'::jsonb;

-- 3. Upsert all 6 services with all their cards (0% data loss)

INSERT INTO services (
  id, title, slug, short_description, long_description, icon, image_url,
  cta_text, cta_url, benefits, process_steps, display_order, is_active,
  seo_title, seo_description, sub_services, updated_at
) VALUES (
  '00000000-0000-0000-0004-000000000005',
  'Audit & Assurance',
  'audit-assurance',
  'A systematic scrutiny of books of account and statutory records to verify the true and fair view of your financial position, reported under the Companies Act, 2013 and the Standards on Auditing issued by ICAI.',
  'Independent audits provide lenders, shareholders, and regulatory authorities with absolute confidence in your financial statements. We conduct statutory audits under the Companies Act, tax audits under Section 44AB of the Income Tax Act, internal audits to strengthen internal controls, and inventory/stock verifications.',
  'ShieldCheck',
  'https://res.cloudinary.com/ovbx5bzv/image/upload/v1792154801/hs_auditors/services/z66gyux7owbcevtvxbsb.jpg',
  'Learn More',
  '/services/audit-assurance',
  '["Rigorous verification adhering to ICAI Standards","Tax audit reporting via Form 3CA/3CB-3CD","Internal audits designed to mitigate financial risks","Enhanced credibility with investors and banking institutions"]'::jsonb,
  '["Audit planning & risk assessment","Substantive testing & sampling","Observation discussion with leadership","Final audit report issuance"]'::jsonb,
  1,
  true,
  'Audit & Assurance Services | H&S Auditors',
  'Statutory, internal and tax audits that ensure complete compliance and financial transparency.',
  '[{"id":"sub-aud-1","title":"Statutory Audit","description":"Mandatory audit of companies under Section 139 of the Companies Act, 2013, with financial statements prepared as per Schedule III and Ind AS / AS.","image_url":"https://res.cloudinary.com/ovbx5bzv/image/upload/v1791545130/hs_auditors/services/dacyofutvkhbgjytq6pb.png"},{"id":"sub-aud-2","title":"Tax Audit (Sec. 44AB)","description":"Audit for businesses crossing ₹1 crore turnover (₹10 crore where cash receipts and payments are within 5%) and professionals above ₹50 lakh, reported in Form 3CA/3CB and 3CD.","image_url":"https://res.cloudinary.com/ovbx5bzv/image/upload/v1791545534/hs_auditors/services/o5bvhqldguzyd1tespki.png"},{"id":"sub-aud-3","title":"Internal Audit","description":"Risk-based review of processes and controls, mandatory for prescribed companies under Section 138 read with Rule 13 of the Companies (Accounts) Rules.","image_url":"https://res.cloudinary.com/ovbx5bzv/image/upload/v1791545668/hs_auditors/services/tzclwrqmaxhjoxidqvie.png"},{"id":"sub-aud-4","title":"GST Audit & Reconciliation","description":"Annual reconciliation of books with GSTR-1, GSTR-3B and GSTR-2A and certified reconciliation in GSTR-9C.","image_url":"https://res.cloudinary.com/ovbx5bzv/image/upload/v1791545744/hs_auditors/services/ncczsdrs7fki4hp4ypvf.png"},{"id":"sub_1792243894019","title":"Stock & Bank Audit","description":"Stock, receivables and concurrent audits for banks and NBFCs, including drawing-power and credit-monitoring reports.","image_url":""},{"id":"sub_1792244150723","title":"Trust, Society & NGO Audit","description":"Audit under Section 12A/10(23C) in Form 10B/10BB, along with FCRA and state trust-act compliance.","image_url":""}]'::jsonb,
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  long_description = EXCLUDED.long_description,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  cta_text = EXCLUDED.cta_text,
  cta_url = EXCLUDED.cta_url,
  benefits = EXCLUDED.benefits,
  process_steps = EXCLUDED.process_steps,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  sub_services = EXCLUDED.sub_services,
  updated_at = NOW();

INSERT INTO services (
  id, title, slug, short_description, long_description, icon, image_url,
  cta_text, cta_url, benefits, process_steps, display_order, is_active,
  seo_title, seo_description, sub_services, updated_at
) VALUES (
  '00000000-0000-0000-0004-000000000001',
  'GST Compliance',
  'gst-compliance',
  'End-to-end Goods and Services Tax support under the CGST/SGST Acts, 2017 — from registration to departmental representation.',
  'Navigating Goods and Services Tax in India requires meticulous attention to deadlines, classification, and input tax credit (ITC) reconciliation. H&S Auditors provides comprehensive GST advisory, registration, periodic return filings (GSTR-1, GSTR-3B, GSTR-9/9C), departmental audit support, and handling of departmental notices to ensure 100% statutory compliance without business disruption.',
  'FileText',
  'https://res.cloudinary.com/ovbx5bzv/image/upload/v1792154432/hs_auditors/services/ha3p8uxqyajbmykitaeg.jpg',
  'Learn More',
  '/services/gst-filing',
  '["Accurate ITC reconciliation eliminating double-taxation","Prompt monthly GSTR-1 and GSTR-3B filings","Expert handling of GST departmental notices & audits","Assistance in GST refund applications for exporters"]'::jsonb,
  '["Invoice & ledger collection","Input Tax Credit verification","Return preparation & validation","Client sign-off & electronic filing"]'::jsonb,
  2,
  true,
  'GST Filing & Compliance Services | H&S Auditors',
  'Accurate, hassle-free GST registration, monthly returns and reconciliation by experienced tax professionals.',
  '[{"id":"sub_1791545805921","title":"GST Registration","description":"Registration once turnover crosses ₹40 lakh for goods or ₹20 lakh for services (₹20 lakh / ₹10 lakh in special category states), plus voluntary and composition registrations.","image_url":"https://res.cloudinary.com/ovbx5bzv/image/upload/v1791546229/hs_auditors/services/vemlthw02ae866iwi4wo.png"},{"id":"sub_1791545975676","title":"Return Filing","description":"GSTR-1, GSTR-3B, CMP-08, GSTR-9 and GSTR-9C filed on time, with input tax credit matched against GSTR-2B every month.","image_url":"https://res.cloudinary.com/ovbx5bzv/image/upload/v1791546189/hs_auditors/services/baco0l454kugvnt3yjjb.png"},{"id":"sub_1791546257244","title":"Refunds & Exports","description":"Refund claims for exports, LUT filing, SEZ supplies and inverted duty structure under Section 54.","image_url":"https://res.cloudinary.com/ovbx5bzv/image/upload/v1791546379/hs_auditors/services/lkgqn0opgqqeqxeymxhe.png"},{"id":"sub_1791546460866","title":"Notices & Assessment","description":"Replies to ASMT-10, DRC-01 and audit notices, plus representation before GST officers and appellate authorities.","image_url":"https://res.cloudinary.com/ovbx5bzv/image/upload/v1791546606/hs_auditors/services/fvzfx23dlxkcflxgj26k.png"},{"id":"sub_1792244537810","title":"E-invoicing & E-way Bills","description":"Set-up and monitoring of e-invoicing (mandatory above ₹5 crore turnover) and e-way bill compliance.","image_url":""}]'::jsonb,
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  long_description = EXCLUDED.long_description,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  cta_text = EXCLUDED.cta_text,
  cta_url = EXCLUDED.cta_url,
  benefits = EXCLUDED.benefits,
  process_steps = EXCLUDED.process_steps,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  sub_services = EXCLUDED.sub_services,
  updated_at = NOW();

INSERT INTO services (
  id, title, slug, short_description, long_description, icon, image_url,
  cta_text, cta_url, benefits, process_steps, display_order, is_active,
  seo_title, seo_description, sub_services, updated_at
) VALUES (
  '00000000-0000-0000-0004-000000000002',
  'Income Tax & TDS',
  'income-tax-tds',
  'Planning, filing and representation under the Income Tax Act, 1961 for individuals, firms, LLPs, companies and trusts.',
  'Our direct tax consultancy assists corporate entities, partnerships, LLPs, and individuals in strategic tax planning, advance tax computation, tax-deducted-at-source (TDS) management, and annual return filings. We provide sound representation in scrutiny assessments and appeals before tax authorities, keeping your tax liability optimised and fully legitimate.',
  'BarChart3',
  'https://res.cloudinary.com/ovbx5bzv/image/upload/v1792155476/hs_auditors/services/my7fnupfnmrrkhazhzvb.jpg',
  'Learn More',
  '/services/income-tax',
  '["Proactive tax planning under new & old regimes","Advance tax computation to avoid interest penalties","TDS/TCS compliance & quarterly return filing","Appellate and scrutiny assessment representation"]'::jsonb,
  '["Financial review & tax computations","Deductions & exemption optimisation","Draft return review","E-filing and acknowledgement verification"]'::jsonb,
  3,
  true,
  'Income Tax Planning & Filing Services | H&S Auditors',
  'Maximise tax savings while staying fully compliant with the Income Tax Act with expert advisory from H&S Auditors.',
  '[{"id":"sub_1791546843150","title":"Return Filing","description":"ITR-1 to ITR-7 filed with the right regime choice — old vs. new — and complete capital gains, house property and foreign asset disclosure.","image_url":"https://res.cloudinary.com/ovbx5bzv/image/upload/v1791547253/hs_auditors/services/fm3drk5fsajgcl7yp6f2.png"},{"id":"sub_1791547276934","title":"TDS & TCS","description":"Monthly deduction and deposit, quarterly 24Q/26Q/27Q returns, Form 16/16A issuance and correction of defaults on TRACES.","image_url":"https://res.cloudinary.com/ovbx5bzv/image/upload/v1791547517/hs_auditors/services/pdjxnb2pwwbo4evwttep.png"},{"id":"sub_1791547629707","title":"Advance Tax & Planning","description":"Quarterly advance tax computation (15 June, 15 Sept, 15 Dec, 15 March) and lawful tax planning under Chapter VI-A and presumptive schemes 44AD/44ADA.","image_url":"https://res.cloudinary.com/ovbx5bzv/image/upload/v1791547917/hs_auditors/services/k7weg16rk83upjhfdtwi.png"},{"id":"sub_1791548012160","title":"Assessments & Appeals","description":"Responses to Section 143(1), 143(2), 148 and faceless assessment notices, and appeals before CIT(A) and ITAT.\n\n","image_url":"https://res.cloudinary.com/ovbx5bzv/image/upload/v1791548094/hs_auditors/services/qm8wqmi3tjucxnantotl.png"},{"id":"sub_1792244594299","title":"Form 15CA/15CB","description":"Certification for foreign remittances and DTAA benefit determination for non-resident payments.","image_url":""}]'::jsonb,
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  long_description = EXCLUDED.long_description,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  cta_text = EXCLUDED.cta_text,
  cta_url = EXCLUDED.cta_url,
  benefits = EXCLUDED.benefits,
  process_steps = EXCLUDED.process_steps,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  sub_services = EXCLUDED.sub_services,
  updated_at = NOW();

INSERT INTO services (
  id, title, slug, short_description, long_description, icon, image_url,
  cta_text, cta_url, benefits, process_steps, display_order, is_active,
  seo_title, seo_description, sub_services, updated_at
) VALUES (
  'cat_1792153252257',
  'Accounting & Payroll',
  'accounting-payroll',
  'Books that stay current, reconciled and ready for any statutory or lender review.',
  '',
  'FileText',
  'https://res.cloudinary.com/ovbx5bzv/image/upload/v1792154728/hs_auditors/services/xb5hlp5immc5yet3bnng.jpg',
  'Learn More',
  '/services/accounting-payroll',
  '[]'::jsonb,
  '[]'::jsonb,
  4,
  true,
  'Accounting & Payroll | H&S Auditors',
  'Books that stay current, reconciled and ready for any statutory or lender review.',
  '[{"id":"sub_1792244619738","title":"Bookkeeping","description":"Tally / Zoho / QuickBooks accounting with GST-ready ledgers and monthly bank reconciliation.","image_url":""},{"id":"sub_1792244635546","title":"Accounting Supervision","description":"Chief-accountant-level oversight: chart of accounts design, accounting policy, review of books and preparation of financial statements.","image_url":""},{"id":"sub_1792244654282","title":"Payroll & Labour Compliance","description":"Salary processing with PF, ESI, professional tax and gratuity workings, plus monthly challans and returns.","image_url":""},{"id":"sub_1792244672506","title":"MIS & Management Reporting","description":"Monthly profitability, cash-flow and ratio reporting so decisions rest on current numbers.","image_url":""}]'::jsonb,
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  long_description = EXCLUDED.long_description,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  cta_text = EXCLUDED.cta_text,
  cta_url = EXCLUDED.cta_url,
  benefits = EXCLUDED.benefits,
  process_steps = EXCLUDED.process_steps,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  sub_services = EXCLUDED.sub_services,
  updated_at = NOW();

INSERT INTO services (
  id, title, slug, short_description, long_description, icon, image_url,
  cta_text, cta_url, benefits, process_steps, display_order, is_active,
  seo_title, seo_description, sub_services, updated_at
) VALUES (
  'cat_1792155246231',
  'Business Set-up & ROC',
  'business-set-up-roc',
  'Incorporation and ongoing secretarial compliance under the Companies Act, 2013 and LLP Act, 2008.',
  '',
  'FileText',
  'https://res.cloudinary.com/ovbx5bzv/image/upload/v1792155241/hs_auditors/services/lnngwophchmnhawcissa.jpg',
  'Learn More',
  '/services/business-set-up-roc',
  '[]'::jsonb,
  '[]'::jsonb,
  5,
  true,
  'Business Set-up & ROC | H&S Auditors',
  'Incorporation and ongoing secretarial compliance under the Companies Act, 2013 and LLP Act, 2008.',
  '[{"id":"sub_1792244695666","title":"Company & LLP Incorporation","description":"SPICe+ / FiLLiP filing with DSC, DIN, PAN, TAN, MOA and AOA — private limited, OPC, LLP and partnership firms.","image_url":""},{"id":"sub_1792244852353","title":"ROC Annual Filings","description":"AOC-4, MGT-7/7A, DIR-3 KYC, DPT-3 and MSME-1 filed within statutory due dates.","image_url":""},{"id":"sub_1792244869889","title":"Registrations","description":"MSME/Udyam, Import Export Code, Shops & Establishment, FSSAI, PF/ESI and 12A/80G for NGOs.","image_url":""},{"id":"sub_1792244891689","title":"Closure & Strike-off","description":"Voluntary strike-off under Section 248, LLP closure and liquidation support under IBC.","image_url":""}]'::jsonb,
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  long_description = EXCLUDED.long_description,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  cta_text = EXCLUDED.cta_text,
  cta_url = EXCLUDED.cta_url,
  benefits = EXCLUDED.benefits,
  process_steps = EXCLUDED.process_steps,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  sub_services = EXCLUDED.sub_services,
  updated_at = NOW();

INSERT INTO services (
  id, title, slug, short_description, long_description, icon, image_url,
  cta_text, cta_url, benefits, process_steps, display_order, is_active,
  seo_title, seo_description, sub_services, updated_at
) VALUES (
  'cat_1792155378086',
  'Advisory',
  'advisory',
  'Practical, sustainable advice for businesses navigating a fast-changing regulatory landscape.',
  '',
  'Users',
  'https://res.cloudinary.com/ovbx5bzv/image/upload/v1792155373/hs_auditors/services/qbdpcwfwosqilk5lxebu.jpg',
  'Learn More',
  '/services/advisory',
  '[]'::jsonb,
  '[]'::jsonb,
  6,
  true,
  'Advisory | H&S Auditors',
  'Practical, sustainable advice for businesses navigating a fast-changing regulatory landscape.',
  '[{"id":"sub_1792244926897","title":"Due Diligence","description":"Financial, tax and compliance due diligence for investments, acquisitions and lender review.","image_url":""},{"id":"sub_1792244942145","title":"Business Valuation","description":"Valuation reports for fund raising, share transfers and Rule 11UA / Section 56(2)(x) requirements.","image_url":""},{"id":"sub_1792244959818","title":"Project Reports & Funding","description":"CMA data, project reports and financial projections for bank term loans, CC limits and MSME schemes","image_url":""},{"id":"sub_1792244978833","title":"Internal Controls","description":"Design and testing of SOPs and internal financial controls, including IFC reporting for companies.","image_url":""}]'::jsonb,
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  short_description = EXCLUDED.short_description,
  long_description = EXCLUDED.long_description,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  cta_text = EXCLUDED.cta_text,
  cta_url = EXCLUDED.cta_url,
  benefits = EXCLUDED.benefits,
  process_steps = EXCLUDED.process_steps,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  sub_services = EXCLUDED.sub_services,
  updated_at = NOW();
