import fs from 'fs';
import path from 'path';
import cloudinary from './cloudinary';
import { createClient } from './supabase/server';
import {
  DEFAULT_SERVICES,
  DEFAULT_COMPLIANCE_DEADLINES,
  DEFAULT_WHY_CHOOSE,
  DEFAULT_STATS,
  DEFAULT_HERO,
  DEFAULT_ABOUT,
  DEFAULT_SETTINGS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_INDUSTRIES,
} from './defaultData';
import {
  SiteSettings,
  NavigationItem,
  HomepageSection,
  HomepageStat,
  Service,
  ComplianceDeadline,
  WhyChooseItem,
  AboutContent,
  AboutFeature,
  ValueItem,
  Industry,
  TeamMember,
  Testimonial,
  Career,
} from '@/types';

const ARTIFACT_DIR = 'C:\\Users\\muham\\.gemini\\antigravity-ide\\brain\\ce0b4e2c-2cfb-4289-b5b3-db171af02d6a';
const CURRENT_ARTIFACT_DIR = 'C:\\Users\\muham\\.gemini\\antigravity-ide\\brain\\a8efad44-b0d6-4618-9d1f-ad2f8e97210f';

function ensureLocalImages() {
  try {
    const pubImages = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(pubImages)) fs.mkdirSync(pubImages, { recursive: true });

    const heroDest = path.join(pubImages, 'hero-team.jpg');
    if (!fs.existsSync(heroDest)) {
      const heroSrc = path.join(ARTIFACT_DIR, 'hero_accounting_team_1791368389781.jpg');
      if (fs.existsSync(heroSrc)) {
        fs.copyFileSync(heroSrc, heroDest);
      }
    }

    const compDest = path.join(pubImages, 'compliance-calendar.jpg');
    if (!fs.existsSync(compDest)) {
      const compSrc = path.join(ARTIFACT_DIR, 'compliance_calendar_1791368440104.jpg');
      if (fs.existsSync(compSrc)) {
        fs.copyFileSync(compSrc, compDest);
      }
    }

    const srvDest = path.join(pubImages, 'service-accounting.jpg');
    if (!fs.existsSync(srvDest)) {
      const srvSrc = path.join(ARTIFACT_DIR, 'calculator_financial_1791368415493.jpg');
      if (fs.existsSync(srvSrc)) {
        fs.copyFileSync(srvSrc, srvDest);
      }
    }

    const officeDest = path.join(pubImages, 'about-office.jpg');
    const newOfficeSrc = path.join(ARTIFACT_DIR, 'about_reception_lounge_1791449919209.jpg');
    if (fs.existsSync(newOfficeSrc)) {
      fs.copyFileSync(newOfficeSrc, officeDest);
    } else {
      const officeSrc = path.join(CURRENT_ARTIFACT_DIR, 'about_office_reception_1791439743586.jpg');
      if (fs.existsSync(officeSrc)) {
        fs.copyFileSync(officeSrc, officeDest);
      }
    }

    const plantDest = path.join(pubImages, 'contact-plant.jpg');
    if (!fs.existsSync(plantDest)) {
      const plantSrc = path.join(CURRENT_ARTIFACT_DIR, 'contact_desk_plant_1791439782184.jpg');
      if (fs.existsSync(plantSrc)) {
        fs.copyFileSync(plantSrc, plantDest);
      }
    }

    const uploadedBanner = path.join(process.cwd(), 'public', 'uploads', '1791380975583-de0e86a4-95a9-408b-849e-d1dded1b5cd5.png');
    if (fs.existsSync(uploadedBanner)) {
      fs.copyFileSync(uploadedBanner, path.join(pubImages, 'hero-team.jpg'));
    }

    const uploadedLogo = path.join(CURRENT_ARTIFACT_DIR, '.user_uploaded', 'media_1791441565319.png');
    if (fs.existsSync(uploadedLogo)) {
      fs.copyFileSync(uploadedLogo, path.join(pubImages, 'hs-logo.png'));
      fs.copyFileSync(uploadedLogo, path.join(process.cwd(), 'public', 'logo.png'));
      fs.copyFileSync(uploadedLogo, path.join(process.cwd(), 'public', 'favicon.png'));
    }
  } catch (err) {
    console.warn('ensureLocalImages note:', err);
  }
}

// Ensure images on server init
ensureLocalImages();

function getOverridesForTable(table: string): Record<string, any> {
  try {
    const file = path.join(process.cwd(), 'data', 'cms_overrides.json');
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      const json = JSON.parse(content || '{}');
      return json[table] || {};
    }
  } catch {}
  return {};
}

function getOverride(table: string, key: string): any {
  const tableData = getOverridesForTable(table);
  return tableData[key] || Object.values(tableData)[0] || null;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const override = getOverride('site_settings', 'settings') || getOverride('site_settings', 'default');
  let base: any = DEFAULT_SETTINGS;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      base = data;
    }
  } catch {}

  return { ...base, ...(override || {}) } as SiteSettings;
}

export async function getNavigationItems(): Promise<NavigationItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('navigation_items')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data) return [];
    return data as NavigationItem[];
  } catch {
    return [];
  }
}

export async function getHomepageSection(sectionKey: string): Promise<HomepageSection | null> {
  ensureLocalImages();
  const override = getOverride('homepage_sections', sectionKey);
  let base: any = sectionKey === 'hero' ? DEFAULT_HERO : null;

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('homepage_sections')
      .select('*')
      .eq('section_key', sectionKey)
      .eq('is_active', true)
      .limit(1)
      .single();

    if (data) {
      base = data;
    }
  } catch {}

  if (!base && !override) return null;
  return { ...(base || {}), ...(override || {}) } as HomepageSection;
}

export async function getHomepageStats(): Promise<HomepageStat[]> {
  const overrides = getOverridesForTable('homepage_stats');
  let baseList: HomepageStat[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('homepage_stats')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    if (data && data.length > 0) baseList = data as HomepageStat[];
  } catch {}

  if (baseList.length === 0) {
    baseList = [...DEFAULT_STATS] as unknown as HomepageStat[];
  }

  const map = new Map<string, HomepageStat>();
  baseList.forEach((item) => map.set(item.id, item));

  Object.entries(overrides).forEach(([key, val]: [string, any]) => {
    if (val._deleted) {
      map.delete(key);
      return;
    }
    if (map.has(key)) {
      map.set(key, { ...map.get(key)!, ...val });
    } else if (key !== 'default') {
      map.set(key, val);
    }
  });

  return Array.from(map.values())
    .filter((s) => s.is_active !== false && !(s as any)._deleted)
    .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99));
}

export async function getServices(): Promise<Service[]> {
  const serviceOverrides = getOverridesForTable('services');
  let baseList: Service[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (data && data.length > 0) baseList = data as Service[];
  } catch {}

  if (baseList.length === 0) {
    baseList = [...DEFAULT_SERVICES] as unknown as Service[];
  }

  const map = new Map<string, Service>();
  baseList.forEach((s: any) => {
    if (!s.sub_services || s.sub_services.length === 0) {
      const def = DEFAULT_SERVICES.find(
        (d) => d.slug === s.slug || d.title?.toLowerCase() === s.title?.toLowerCase()
      );
      if (def?.sub_services) {
        s.sub_services = def.sub_services;
      }
    }
    map.set(String(s.id || s.slug), s);
  });

  Object.entries(serviceOverrides).forEach(([key, val]: [string, any]) => {
    if (val._deleted) {
      map.delete(key);
      return;
    }
    let matched = false;
    for (const [existingKey, existingVal] of Array.from(map.entries())) {
      if (
        existingKey === key ||
        String(existingVal.id) === String(val.id) ||
        existingVal.slug === val.slug
      ) {
        map.set(existingKey, { ...existingVal, ...val });
        matched = true;
        break;
      }
    }
    if (!matched && key !== 'default') {
      map.set(key, val);
    }
  });

  return Array.from(map.values())
    .filter((s) => s.is_active !== false && !(s as any)._deleted)
    .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const all = await getServices();
  const direct = all.find((s) => s.slug === slug || s.id === slug);
  if (direct) return direct;

  // Gracefully handle common legacy slug aliases
  if (slug === 'gst-filing') return all.find((s) => s.slug === 'gst-compliance') || null;
  if (slug === 'bookkeeping-accounting' || slug === 'bookkeeping-and-accounting') {
    return all.find((s) => s.slug === 'accounting-payroll') || null;
  }
  if (slug === 'business-registration' || slug === 'company-secretarial') {
    return all.find((s) => s.slug === 'business-setup-roc') || null;
  }

  return null;
}

export async function getComplianceDeadlines(): Promise<ComplianceDeadline[]> {
  const overrides = getOverridesForTable('compliance_deadlines');
  let baseList: ComplianceDeadline[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('compliance_deadlines')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    if (data && data.length > 0) baseList = data as ComplianceDeadline[];
  } catch {}

  if (baseList.length === 0) {
    baseList = [...DEFAULT_COMPLIANCE_DEADLINES] as unknown as ComplianceDeadline[];
  }

  const map = new Map<string, ComplianceDeadline>();
  baseList.forEach((item) => map.set(String(item.id), item));

  Object.entries(overrides).forEach(([key, val]: [string, any]) => {
    if (val._deleted) {
      map.delete(key);
      return;
    }
    if (map.has(key)) {
      map.set(key, { ...map.get(key)!, ...val });
    } else if (key !== 'default') {
      map.set(key, val);
    }
  });

  return Array.from(map.values())
    .filter((s) => s.is_active !== false && !(s as any)._deleted)
    .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99));
}

export async function getWhyChooseItems(): Promise<WhyChooseItem[]> {
  const overrides = getOverridesForTable('why_choose_items');
  let baseList: WhyChooseItem[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('why_choose_items')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    if (data && data.length > 0) baseList = data as WhyChooseItem[];
  } catch {}

  if (baseList.length === 0) {
    baseList = [...DEFAULT_WHY_CHOOSE] as unknown as WhyChooseItem[];
  }

  const map = new Map<string, WhyChooseItem>();
  baseList.forEach((item) => map.set(String(item.id), item));

  Object.entries(overrides).forEach(([key, val]: [string, any]) => {
    if (val._deleted) {
      map.delete(key);
      return;
    }
    if (map.has(key)) {
      map.set(key, { ...map.get(key)!, ...val });
    } else if (key !== 'default') {
      map.set(key, val);
    }
  });

  return Array.from(map.values())
    .filter((s) => s.is_active !== false && !(s as any)._deleted)
    .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99));
}

export async function getAboutContent(): Promise<AboutContent | null> {
  ensureLocalImages();
  const override = getOverride('about_content', 'about') || getOverride('about_content', 'default');
  let base: any = DEFAULT_ABOUT;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('about_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      base = data;
    }
  } catch {}

  return { ...base, ...(override || {}) } as AboutContent;
}

export async function getAboutFeatures(): Promise<AboutFeature[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('about_features')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data) return [];
    return data as AboutFeature[];
  } catch {
    return [];
  }
}

export async function getValues(): Promise<ValueItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('values')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data) return [];
    return data as ValueItem[];
  } catch {
    return [];
  }
}

export async function getIndustries(): Promise<Industry[]> {
  const overrides = getOverridesForTable('industries');
  let baseList: Industry[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('industries')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (data && data.length > 0) baseList = data as Industry[];
  } catch {}

  if (baseList.length === 0) {
    baseList = [...DEFAULT_INDUSTRIES] as unknown as Industry[];
  }

  const map = new Map<string, Industry>();
  baseList.forEach((item) => map.set(String(item.id || item.slug), item));

  Object.entries(overrides).forEach(([key, val]: [string, any]) => {
    if (val._deleted) {
      map.delete(key);
      return;
    }
    let matched = false;
    for (const [existingKey, existingVal] of Array.from(map.entries())) {
      if (
        existingKey === key ||
        String(existingVal.id) === String(val.id) ||
        existingVal.slug === val.slug
      ) {
        map.set(existingKey, { ...existingVal, ...val });
        matched = true;
        break;
      }
    }
    if (!matched && key !== 'default') {
      map.set(key, val);
    }
  });

  return Array.from(map.values())
    .filter((s) => s.is_active !== false && !(s as any)._deleted)
    .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99));
}

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  const all = await getIndustries();
  return all.find((ind) => ind.slug === slug || ind.id === slug) || null;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const overrides = getOverridesForTable('team_members');
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    let list = (data as TeamMember[]) || [];
    if (Object.keys(overrides).length > 0) {
      list = list.map((item) => ({ ...item, ...(overrides[item.id] || {}) }));
    }
    if (list.length > 0) return list;
    return Object.values(overrides) as TeamMember[];
  } catch {
    return (Object.values(overrides) as TeamMember[]) || [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const overrides = getOverridesForTable('testimonials');
  let baseList: Testimonial[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (data && data.length > 0) baseList = data as Testimonial[];
  } catch {}

  if (baseList.length === 0) {
    baseList = [...DEFAULT_TESTIMONIALS] as Testimonial[];
  }

  const map = new Map<string, Testimonial>();
  baseList.forEach((item) => map.set(String(item.id), item));

  Object.entries(overrides).forEach(([key, val]: [string, any]) => {
    if (val._deleted) {
      map.delete(key);
      return;
    }
    if (map.has(key)) {
      map.set(key, { ...map.get(key)!, ...val });
    } else if (key !== 'default') {
      map.set(key, val);
    }
  });

  return Array.from(map.values())
    .filter((s) => s.is_active !== false && !(s as any)._deleted)
    .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99));
}

export async function getCareers(): Promise<Career[]> {
  const overrides = getOverridesForTable('careers');
  let baseList: Career[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('careers')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (data && data.length > 0) baseList = data as Career[];
  } catch {}

  const map = new Map<string, Career>();
  baseList.forEach((item) => map.set(String(item.id), item));

  Object.entries(overrides).forEach(([key, val]: [string, any]) => {
    if (val._deleted) {
      map.delete(key);
      return;
    }
    if (map.has(key)) {
      map.set(key, { ...map.get(key)!, ...val });
    } else if (key !== 'default') {
      map.set(key, val);
    }
  });

  return Array.from(map.values())
    .filter((s) => s.is_active !== false && !(s as any)._deleted)
    .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99));
}

export interface CareerSettings {
  heading: string;
  description: string;
  button_text: string;
  email?: string;
  is_active?: boolean;
}

export async function getCareerSettings(): Promise<CareerSettings> {
  const overrides = getOverridesForTable('career_settings');
  const defaults: CareerSettings = {
    heading: "Don't see your role above?",
    description: "We are always looking for driven CA finalists, semi-qualified accountants, and tax interns to join our talent pool.",
    button_text: "Send Your CV to info@hsauditors.com",
    email: "info@hsauditors.com",
    is_active: true,
  };

  if (overrides && overrides.talent_pool) {
    return { ...defaults, ...overrides.talent_pool };
  }
  return defaults;
}
