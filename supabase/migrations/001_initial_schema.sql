-- 001_initial_schema.sql
-- H&S Auditors Supabase Migration

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMIN PROFILES
CREATE TABLE IF NOT EXISTS admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL DEFAULT 'H&S AUDITORS',
    tagline TEXT NOT NULL DEFAULT 'Accounting | Income Tax & GST | Audit | Business Solution',
    logo_url TEXT,
    phone TEXT NOT NULL DEFAULT '+91 97461 35644',
    landline TEXT NOT NULL DEFAULT '0466 - 221 0144',
    email TEXT NOT NULL DEFAULT 'info@hsauditors.com',
    office_address TEXT NOT NULL DEFAULT 'Room No.48, Harisree Square, Ottapalam, Palakkad, Kerala - 679101',
    linkedin_url TEXT DEFAULT 'https://linkedin.com',
    instagram_url TEXT DEFAULT 'https://instagram.com',
    youtube_url TEXT DEFAULT 'https://youtube.com',
    default_seo_title TEXT NOT NULL DEFAULT 'H&S Auditors | Premier Accounting, Tax & Audit Consultancy - India',
    default_seo_description TEXT NOT NULL DEFAULT 'Professional accounting, taxation and compliance solutions with deep expertise in GST, Income Tax, Bookkeeping, Audit & Assurance and Business Registration across India.',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. NAVIGATION ITEMS
CREATE TABLE IF NOT EXISTS navigation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_cta BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. HOMEPAGE SECTIONS (Hero, Side cards, etc.)
CREATE TABLE IF NOT EXISTS homepage_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key TEXT NOT NULL UNIQUE,
    eyebrow TEXT,
    headline TEXT,
    description TEXT,
    primary_cta_text TEXT,
    primary_cta_link TEXT,
    secondary_cta_text TEXT,
    secondary_cta_link TEXT,
    trust_badge_value TEXT,
    trust_badge_label TEXT,
    trust_points JSONB DEFAULT '[]'::jsonb,
    desktop_image_url TEXT,
    mobile_image_url TEXT,
    image_alt TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. HOMEPAGE STATS STRIP
CREATE TABLE IF NOT EXISTS homepage_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    value TEXT NOT NULL,
    label TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'FileText',
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. SERVICES
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    long_description TEXT,
    icon TEXT NOT NULL DEFAULT 'FileText',
    image_url TEXT,
    cta_text TEXT NOT NULL DEFAULT 'Learn More',
    cta_url TEXT NOT NULL DEFAULT '/contact',
    benefits JSONB DEFAULT '[]'::jsonb,
    process_steps JSONB DEFAULT '[]'::jsonb,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. COMPLIANCE DEADLINES
CREATE TABLE IF NOT EXISTS compliance_deadlines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    compliance TEXT NOT NULL,
    form TEXT NOT NULL,
    due_date TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. WHY CHOOSE ITEMS
CREATE TABLE IF NOT EXISTS why_choose_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    icon_name TEXT NOT NULL DEFAULT 'ShieldCheck',
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. ABOUT CONTENT
CREATE TABLE IF NOT EXISTS about_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    eyebrow TEXT NOT NULL DEFAULT 'ABOUT THE FIRM',
    heading TEXT NOT NULL DEFAULT 'Premier Accounting & Tax Consultancy',
    subheading TEXT,
    paragraph_1 TEXT NOT NULL,
    paragraph_2 TEXT NOT NULL,
    image_url TEXT,
    image_alt TEXT DEFAULT 'H&S Auditors Office Reception',
    cta_text TEXT NOT NULL DEFAULT 'More About Us',
    cta_link TEXT NOT NULL DEFAULT '/about',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. ABOUT FEATURES
CREATE TABLE IF NOT EXISTS about_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'CheckCircle2',
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. VALUES
CREATE TABLE IF NOT EXISTS values (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'Award',
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. INDUSTRIES
CREATE TABLE IF NOT EXISTS industries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    icon_name TEXT NOT NULL DEFAULT 'Briefcase',
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. TEAM MEMBERS
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    image_url TEXT,
    biography TEXT,
    linkedin_url TEXT,
    email TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company TEXT,
    designation TEXT,
    quote TEXT NOT NULL,
    image_url TEXT,
    rating INT DEFAULT 5,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. CAREERS
CREATE TABLE IF NOT EXISTS careers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT 'Ottapalam, Kerala',
    employment_type TEXT NOT NULL DEFAULT 'Full-time',
    description TEXT NOT NULL,
    requirements JSONB DEFAULT '[]'::jsonb,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. ENQUIRIES (Public leads)
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. MEDIA (Cloudinary Assets)
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id TEXT NOT NULL UNIQUE,
    secure_url TEXT NOT NULL,
    resource_type TEXT NOT NULL DEFAULT 'image',
    folder TEXT DEFAULT 'hs_auditors',
    width INT,
    height INT,
    bytes INT,
    alt_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(display_order) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_compliance_order ON compliance_deadlines(display_order) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_industries_slug ON industries(slug);
CREATE INDEX IF NOT EXISTS idx_industries_order ON industries(display_order) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status, created_at DESC);

-- ========================================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================================

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE values ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Helper function: check if caller is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. admin_profiles policies
CREATE POLICY "Admins can view profile" ON admin_profiles
    FOR SELECT TO authenticated
    USING (id = auth.uid() OR is_admin());

CREATE POLICY "Admins can update profile" ON admin_profiles
    FOR ALL TO authenticated
    USING (is_admin());

-- 2. Public read policies (active items)
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT TO public USING (TRUE);
CREATE POLICY "Public read navigation_items" ON navigation_items FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Public read homepage_sections" ON homepage_sections FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Public read homepage_stats" ON homepage_stats FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Public read services" ON services FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Public read compliance_deadlines" ON compliance_deadlines FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Public read why_choose_items" ON why_choose_items FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Public read about_content" ON about_content FOR SELECT TO public USING (TRUE);
CREATE POLICY "Public read about_features" ON about_features FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Public read values" ON values FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Public read industries" ON industries FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Public read team_members" ON team_members FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Public read careers" ON careers FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Public read media" ON media FOR SELECT TO public USING (TRUE);

-- 3. Public INSERT for enquiries
CREATE POLICY "Public can submit enquiry" ON enquiries FOR INSERT TO public WITH CHECK (TRUE);

-- 4. Admin full access policies for all content tables
CREATE POLICY "Admin manage site_settings" ON site_settings FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage navigation_items" ON navigation_items FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage homepage_sections" ON homepage_sections FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage homepage_stats" ON homepage_stats FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage services" ON services FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage compliance_deadlines" ON compliance_deadlines FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage why_choose_items" ON why_choose_items FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage about_content" ON about_content FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage about_features" ON about_features FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage values" ON values FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage industries" ON industries FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage team_members" ON team_members FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage testimonials" ON testimonials FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage careers" ON careers FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage enquiries" ON enquiries FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin manage media" ON media FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());
