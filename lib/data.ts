import fs from 'fs';
import path from 'path';
import { createClient } from './supabase/server';
import {
  SiteSettings,
  NavigationItem,
  HomepageSection,
  HomepageStat,
  Service,
  ServicesBannerData,
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
  let base: any = null;
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

  if (!base && !override) return null;
  return { ...(base || {}), ...(override || {}) } as SiteSettings;
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
  const override = getOverride('homepage_sections', sectionKey);
  let base: any = null;

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

export async function getServicesBanner(): Promise<ServicesBannerData> {
  const override =
    getOverride('services_banner', 'banner') ||
    getOverride('services_banner', 'default');

  const defaultBanner: ServicesBannerData = {
    eyebrow: 'OUR SERVICES',
    headline: 'Accounting, Audit & Advisory Services',
    description: 'Explore our core domains below. Each service is delivered with expertise, accuracy and a deep understanding of regulatory requirements to support your business goals.',
    image_url: '/images/service-accounting.jpg',
  };

  return {
    ...defaultBanner,
    ...(override || {}),
  };
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

  const map = new Map<string, Service>();
  baseList.forEach((s: any) => {
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
  const override = getOverride('about_content', 'about') || getOverride('about_content', 'default');
  let base: any = null;
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

  if (!base && !override) return null;
  return { ...(base || {}), ...(override || {}) } as AboutContent;
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
