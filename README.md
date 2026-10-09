# H&S AUDITORS — Enterprise Website & CMS

A complete, production-ready website and Content Management System (CMS) for **H&S AUDITORS**, an Indian accounting, taxation, statutory audit, and corporate consultancy firm based in Ottapalam, Palakkad, Kerala.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase PostgreSQL & Auth**, and **Cloudinary**.

---

## 📸 Design System & Visual Reference

The website faithfully reproduces the corporate visual language, layout, typography, and card structures:
- **Deep Navy** (`#071A3D`) — Primary corporate brand color
- **Navy** (`#102A56`) — Secondary container color
- **Blue** (`#2563EB`) & **Soft Blue** (`#EFF6FF`) — Accent highlights & icon badges
- **Gold** (`#F4C542`) — Premium CTA accent & key typography emphasis
- **White** (`#FFFFFF`) & **Light Gray** (`#F7F9FC`) — High contrast content surfaces
- **Typography** — Plus Jakarta Sans with crisp hierarchy, small uppercase eyebrows, and balanced line heights.

---

## ⚡ Zero-Mock-Data Architecture

This project strictly adheres to the **Zero-Mock-Data Rule**:
- **No mock data arrays or JSON fixtures** in the React frontend.
- All services, compliance deadlines, why choose points, about content, core values, industries, and contact details are driven **100% dynamically from Supabase**.
- **Complete Supabase Seed File**: `supabase/seed.sql` populates the full production content immediately upon execution. The Admin panel is for editing and managing seeded records—not for tedious manual data entry.

```
                 SUPABASE
                    │
             seed.sql data
                    │
                    ▼
              ADMIN CMS
                    │
        ┌───────────┴───────────┐
        │                       │
      EDIT                    MEDIA
        │                       │
        ▼                       ▼
   SUPABASE                 CLOUDINARY
        │
        ▼
   PUBLIC WEBSITE
```

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router, Server Components, Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom brand tokens
- **Database & Auth**: Supabase PostgreSQL, Row Level Security (RLS), Supabase Auth
- **Media Storage**: Cloudinary (Server-side signed uploads & deletions)
- **Icons**: Lucide React
- **Validation**: Zod schema validation for enquiries and API payloads

---

## 📋 Prerequisites & Node Version

- **Node.js**: v18.18.0 or v20.x+ (Recommended: Node 20 LTS)
- **npm**: v9.x or v10.x
- A free **Supabase** project
- A free **Cloudinary** account

---

## 🚀 Quick Setup & Installation

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in your project credentials in `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Supabase Server-Side Secret Key (DO NOT expose in client code)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cloudinary Media Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Public Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🗄️ Database Setup (Supabase)

### Step 1: Run the Database Migration

Open your **Supabase Dashboard** → **SQL Editor** → Click **New Query**.

1. Copy and paste the entire contents of [`supabase/migrations/001_initial_schema.sql`](file:///c:/Users/muham/OneDrive/Desktop/Antigravity/H&S%20Auditors/supabase/migrations/001_initial_schema.sql).
2. Click **Run**.
3. This creates all relational tables, indexes, Row Level Security (RLS) policies, and authorization functions.

### Step 2: Run the Deterministic Seed Script

In the same **Supabase SQL Editor** → Click **New Query**.

1. Copy and paste the entire contents of [`supabase/seed.sql`](file:///c:/Users/muham/OneDrive/Desktop/Antigravity/H&S%20Auditors/supabase/seed.sql).
2. Click **Run**.
3. All H&S Auditors data is immediately populated:
   - Site Settings & Office Contact Details
   - Navigation Items
   - Hero Section & Trust Badges
   - 4 Homepage Statistics
   - 6 Core Services (GST, Income Tax, Bookkeeping, Business Registration, Audit & Assurance, Company Secretarial)
   - 9 Indian Compliance Deadlines (GSTR-1, GSTR-3B, TDS, Advance Tax, ITR, 3CA/3CD, GSTR-9, AOC-4/MGT-7)
   - 6 "Why Choose H&S" Feature Items
   - About The Firm Narrative & 5 Capability Features
   - 3 Core Values (Integrity, Confidentiality, Timely)
   - 12 Sector Experience Industries

*Note: The seed script uses `ON CONFLICT DO UPDATE` and deterministic UUIDs, making it 100% safe to re-run multiple times without duplicate rows.*

---

## 👤 Creating an Admin CMS User

1. In your **Supabase Dashboard**, navigate to **Authentication** → **Users**.
2. Click **Add User** → **Create User**.
3. Enter an email (e.g., `admin@hsauditors.com`) and a secure password.
4. Go to **SQL Editor** and grant this user the admin role:

```sql
INSERT INTO admin_profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'admin@hsauditors.com'
ON CONFLICT (id) DO NOTHING;
```

5. You can now log in at `/admin/login`.

---

## ☁️ Cloudinary Media Integration

The CMS includes seamless Cloudinary media management:
- **Server-Side API Routes**:
  - `POST /api/admin/media/upload`: Validates image MIME type, file size (<10MB), streams to Cloudinary, and saves metadata in the `media` table.
  - `POST /api/admin/media/delete`: Securely deletes assets from Cloudinary and clears records from Supabase.
- **Image Uploader Component**: Drag-and-drop, real-time preview, progress indicator, replacement, and deletion.
- **Media Library**: Browse all uploaded images, view dimensions, and copy secure URLs with one click.

---

## 💻 Running Locally

Start the Next.js development server:

```bash
npm run dev
```

Visit:
- **Public Website**: [http://localhost:3000](http://localhost:3000)
- **Admin CMS**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Admin Login**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 🗺️ Public Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage matching reference screenshot with all 11 sections |
| `/services` | Services overview with core service cards & consultation CTA |
| `/services/[slug]` | Dynamic service detail pages with benefits, process & related services |
| `/about` | Firm history, office reception, capabilities, values, and why choose |
| `/our-team` | Authentic leadership profiles from Supabase (clean empty state if unpopulated) |
| `/industries` | 12 sector cards with tailored regulatory solutions |
| `/careers` | Job postings CMS with genuine vacancies or "No current openings" state |
| `/contact` | Office details, phones, landline, address, and interactive enquiry form |
| `/privacy-policy` | Professional privacy policy adhering to ICAI ethics standards |
| `/terms-of-service` | Scope of engagement and terms of service |
| `/sitemap.xml` | Dynamic SEO sitemap with all static and service URLs |
| `/robots.txt` | Crawler directives protecting admin routes |

---

## 🗃️ Database Table Schema

| Table Name | Purpose | RLS Policy |
|---|---|---|
| `site_settings` | Firm name, phone, landline, email, address, social links, SEO | Public read, Admin write |
| `navigation_items` | Header menu items and primary CTA button | Active public read, Admin write |
| `homepage_sections`| Full-width Hero content, badges, and image links | Active public read, Admin write |
| `homepage_stats` | 4 metric counters under hero | Active public read, Admin write |
| `services` | 6 core practice areas, slugs, long content, benefits | Active public read, Admin write |
| `compliance_deadlines` | 9 Indian tax and ROC due dates | Active public read, Admin write |
| `why_choose_items` | 6 precision cards in dark navy section | Active public read, Admin write |
| `about_content` | Firm narrative and office image URL | Public read, Admin write |
| `about_features` | 5 capability checklist items | Active public read, Admin write |
| `values` | Integrity, Confidentiality, Timely | Active public read, Admin write |
| `industries` | 12 economic sectors served | Active public read, Admin write |
| `team_members` | Authentic partner profiles | Active public read, Admin write |
| `testimonials` | Client reviews | Active public read, Admin write |
| `careers` | Published job openings | Active public read, Admin write |
| `enquiries` | Client consultation leads from contact form | Public insert only, Admin read/write |
| `media` | Cloudinary uploaded assets metadata | Public read, Admin write |
| `admin_profiles` | RBAC admin access linked to `auth.users` | Admin only |

---

## 🔒 Security Best Practices

1. **Row Level Security (RLS)** is enforced on 100% of tables.
2. Sensitive tables like `enquiries` cannot be read by public anon keys.
3. `SUPABASE_SERVICE_ROLE_KEY` is only used inside secure server endpoints.
4. Contact form uses **Zod schema validation** and rate-limiting to block spam.
5. `CLOUDINARY_API_SECRET` is kept server-side only.

---

## 🌐 Production Deployment (Vercel)

1. Push your repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_SITE_URL`).
4. Click **Deploy**.
