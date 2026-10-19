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

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    return data as SiteSettings | null;
  } catch (err) {
    console.warn('Error fetching site_settings from Supabase:', err);
    return null;
  }
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
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('homepage_sections')
      .select('*')
      .eq('section_key', sectionKey)
      .eq('is_active', true)
      .limit(1)
      .maybeSingle();

    return data as HomepageSection | null;
  } catch {
    return null;
  }
}

export async function getServicesBanner(): Promise<ServicesBannerData> {
  const defaultBanner: ServicesBannerData = {
    eyebrow: 'OUR SERVICES',
    headline: 'Accounting, Audit & Advisory Services',
    description: 'Explore our core domains below. Each service is delivered with expertise, accuracy and a deep understanding of regulatory requirements to support your business goals.',
    image_url: '/images/service-accounting.jpg',
  };

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('homepage_sections')
      .select('*')
      .eq('section_key', 'services_banner')
      .eq('is_active', true)
      .limit(1)
      .maybeSingle();

    if (data) {
      return {
        eyebrow: data.eyebrow || defaultBanner.eyebrow,
        headline: data.headline || defaultBanner.headline,
        description: data.description || defaultBanner.description,
        image_url: data.desktop_image_url || data.mobile_image_url || defaultBanner.image_url,
      };
    }
  } catch {}

  return defaultBanner;
}

export async function getHomepageStats(): Promise<HomepageStat[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('homepage_stats')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    return (data as HomepageStat[]) || [];
  } catch {
    return [];
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data) {
      console.warn('Error fetching services from Supabase:', error?.message);
      return [];
    }

    return (data as Service[]) || [];
  } catch (err) {
    console.warn('Failed to query services:', err);
    return [];
  }
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
    return all.find((s) => s.slug === 'business-setup-roc' || s.slug === 'business-set-up-roc') || null;
  }

  return null;
}

export async function getComplianceDeadlines(): Promise<ComplianceDeadline[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('compliance_deadlines')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    return (data as ComplianceDeadline[]) || [];
  } catch {
    return [];
  }
}

export async function getWhyChooseItems(): Promise<WhyChooseItem[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('why_choose_items')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    return (data as WhyChooseItem[]) || [];
  } catch {
    return [];
  }
}

export async function getAboutContent(): Promise<AboutContent | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('about_content')
      .select('*')
      .limit(1)
      .maybeSingle();

    return data as AboutContent | null;
  } catch {
    return null;
  }
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
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('industries')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    return (data as Industry[]) || [];
  } catch {
    return [];
  }
}

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  const all = await getIndustries();
  return all.find((ind) => ind.slug === slug || ind.id === slug) || null;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    return (data as TeamMember[]) || [];
  } catch {
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    return (data as Testimonial[]) || [];
  } catch {
    return [];
  }
}

export async function getCareers(): Promise<Career[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('careers')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    return (data as Career[]) || [];
  } catch {
    return [];
  }
}

export interface CareerSettings {
  heading: string;
  description: string;
  button_text: string;
  email?: string;
  is_active?: boolean;
}

export async function getCareerSettings(): Promise<CareerSettings> {
  const defaults: CareerSettings = {
    heading: "Don't see your role above?",
    description: "We are always looking for driven CA finalists, semi-qualified accountants, and tax interns to join our talent pool.",
    button_text: "Send Your CV to info@hsauditors.com",
    email: "info@hsauditors.com",
    is_active: true,
  };

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('homepage_sections')
      .select('*')
      .eq('section_key', 'talent_pool')
      .limit(1)
      .maybeSingle();

    if (data) {
      return {
        heading: data.headline || defaults.heading,
        description: data.description || defaults.description,
        button_text: data.primary_cta_text || defaults.button_text,
        email: defaults.email,
        is_active: data.is_active ?? true,
      };
    }
  } catch {}

  return defaults;
}
