import { Database } from './database';

export type SiteSettings = Database['public']['Tables']['site_settings']['Row'];
export type NavigationItem = Database['public']['Tables']['navigation_items']['Row'];
export type HomepageSection = Database['public']['Tables']['homepage_sections']['Row'];
export type HomepageStat = Database['public']['Tables']['homepage_stats']['Row'];
export type Service = Database['public']['Tables']['services']['Row'];
export type ComplianceDeadline = Database['public']['Tables']['compliance_deadlines']['Row'];
export type WhyChooseItem = Database['public']['Tables']['why_choose_items']['Row'];
export type AboutContent = Database['public']['Tables']['about_content']['Row'];
export type AboutFeature = Database['public']['Tables']['about_features']['Row'];
export type ValueItem = Database['public']['Tables']['values']['Row'];
export type Industry = Database['public']['Tables']['industries']['Row'];
export type TeamMember = Database['public']['Tables']['team_members']['Row'];
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
export type Career = Database['public']['Tables']['careers']['Row'];
export type Enquiry = Database['public']['Tables']['enquiries']['Row'];
export type MediaItem = Database['public']['Tables']['media']['Row'];
export type AdminProfile = Database['public']['Tables']['admin_profiles']['Row'];

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

export interface ServiceWithSubServices extends Omit<Service, 'sub_services'> {
  sub_services?: SubService[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

