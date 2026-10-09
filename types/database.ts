export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          id: string;
          email: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: string;
          created_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          company_name: string;
          tagline: string;
          logo_url: string | null;
          phone: string;
          landline: string;
          email: string;
          office_address: string;
          linkedin_url: string | null;
          instagram_url: string | null;
          youtube_url: string | null;
          default_seo_title: string;
          default_seo_description: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_name?: string;
          tagline?: string;
          logo_url?: string | null;
          phone?: string;
          landline?: string;
          email?: string;
          office_address?: string;
          linkedin_url?: string | null;
          instagram_url?: string | null;
          youtube_url?: string | null;
          default_seo_title?: string;
          default_seo_description?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string;
          tagline?: string;
          logo_url?: string | null;
          phone?: string;
          landline?: string;
          email?: string;
          office_address?: string;
          linkedin_url?: string | null;
          instagram_url?: string | null;
          youtube_url?: string | null;
          default_seo_title?: string;
          default_seo_description?: string;
          updated_at?: string;
        };
      };
      navigation_items: {
        Row: {
          id: string;
          label: string;
          href: string;
          display_order: number;
          is_active: boolean;
          is_cta: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          href: string;
          display_order?: number;
          is_active?: boolean;
          is_cta?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          href?: string;
          display_order?: number;
          is_active?: boolean;
          is_cta?: boolean;
          created_at?: string;
        };
      };
      homepage_sections: {
        Row: {
          id: string;
          section_key: string;
          eyebrow: string | null;
          headline: string | null;
          description: string | null;
          primary_cta_text: string | null;
          primary_cta_link: string | null;
          secondary_cta_text: string | null;
          secondary_cta_link: string | null;
          trust_badge_value: string | null;
          trust_badge_label: string | null;
          trust_points: string[] | null;
          desktop_image_url: string | null;
          mobile_image_url: string | null;
          image_alt: string | null;
          is_active: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_key: string;
          eyebrow?: string | null;
          headline?: string | null;
          description?: string | null;
          primary_cta_text?: string | null;
          primary_cta_link?: string | null;
          secondary_cta_text?: string | null;
          secondary_cta_link?: string | null;
          trust_badge_value?: string | null;
          trust_badge_label?: string | null;
          trust_points?: string[] | null;
          desktop_image_url?: string | null;
          mobile_image_url?: string | null;
          image_alt?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_key?: string;
          eyebrow?: string | null;
          headline?: string | null;
          description?: string | null;
          primary_cta_text?: string | null;
          primary_cta_link?: string | null;
          secondary_cta_text?: string | null;
          secondary_cta_link?: string | null;
          trust_badge_value?: string | null;
          trust_badge_label?: string | null;
          trust_points?: string[] | null;
          desktop_image_url?: string | null;
          mobile_image_url?: string | null;
          image_alt?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      homepage_stats: {
        Row: {
          id: string;
          value: string;
          label: string;
          icon_name: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          value: string;
          label: string;
          icon_name?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          value?: string;
          label?: string;
          icon_name?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string;
          long_description: string | null;
          icon: string;
          image_url: string | null;
          cta_text: string;
          cta_url: string;
          benefits: string[] | null;
          process_steps: string[] | null;
          display_order: number;
          is_active: boolean;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          short_description: string;
          long_description?: string | null;
          icon?: string;
          image_url?: string | null;
          cta_text?: string;
          cta_url?: string;
          benefits?: string[] | null;
          process_steps?: string[] | null;
          display_order?: number;
          is_active?: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          short_description?: string;
          long_description?: string | null;
          icon?: string;
          image_url?: string | null;
          cta_text?: string;
          cta_url?: string;
          benefits?: string[] | null;
          process_steps?: string[] | null;
          display_order?: number;
          is_active?: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      compliance_deadlines: {
        Row: {
          id: string;
          compliance: string;
          form: string;
          due_date: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          compliance: string;
          form: string;
          due_date: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          compliance?: string;
          form?: string;
          due_date?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      why_choose_items: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          icon_name: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          icon_name?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          icon_name?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      about_content: {
        Row: {
          id: string;
          eyebrow: string;
          heading: string;
          subheading: string | null;
          paragraph_1: string;
          paragraph_2: string;
          image_url: string | null;
          image_alt: string | null;
          cta_text: string;
          cta_link: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          eyebrow?: string;
          heading?: string;
          subheading?: string | null;
          paragraph_1: string;
          paragraph_2: string;
          image_url?: string | null;
          image_alt?: string | null;
          cta_text?: string;
          cta_link?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          eyebrow?: string;
          heading?: string;
          subheading?: string | null;
          paragraph_1?: string;
          paragraph_2?: string;
          image_url?: string | null;
          image_alt?: string | null;
          cta_text?: string;
          cta_link?: string;
          updated_at?: string;
        };
      };
      about_features: {
        Row: {
          id: string;
          title: string;
          icon_name: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          icon_name?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          icon_name?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      values: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon_name: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon_name?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          icon_name?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      industries: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          icon_name: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          icon_name?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          icon_name?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          designation: string;
          image_url: string | null;
          biography: string | null;
          linkedin_url: string | null;
          email: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          designation: string;
          image_url?: string | null;
          biography?: string | null;
          linkedin_url?: string | null;
          email?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          designation?: string;
          image_url?: string | null;
          biography?: string | null;
          linkedin_url?: string | null;
          email?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          company: string | null;
          designation: string | null;
          quote: string;
          image_url: string | null;
          rating: number | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          company?: string | null;
          designation?: string | null;
          quote: string;
          image_url?: string | null;
          rating?: number | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          company?: string | null;
          designation?: string | null;
          quote?: string;
          image_url?: string | null;
          rating?: number | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      careers: {
        Row: {
          id: string;
          job_title: string;
          department: string;
          location: string;
          employment_type: string;
          description: string;
          requirements: string[] | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          job_title: string;
          department: string;
          location?: string;
          employment_type?: string;
          description: string;
          requirements?: string[] | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          job_title?: string;
          department?: string;
          location?: string;
          employment_type?: string;
          description?: string;
          requirements?: string[] | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          message: string;
          status: 'new' | 'contacted' | 'closed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          message: string;
          status?: 'new' | 'contacted' | 'closed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          message?: string;
          status?: 'new' | 'contacted' | 'closed';
          created_at?: string;
          updated_at?: string;
        };
      };
      media: {
        Row: {
          id: string;
          public_id: string;
          secure_url: string;
          resource_type: string;
          folder: string | null;
          width: number | null;
          height: number | null;
          bytes: number | null;
          alt_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          public_id: string;
          secure_url: string;
          resource_type?: string;
          folder?: string | null;
          width?: number | null;
          height?: number | null;
          bytes?: number | null;
          alt_text?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          public_id?: string;
          secure_url?: string;
          resource_type?: string;
          folder?: string | null;
          width?: number | null;
          height?: number | null;
          bytes?: number | null;
          alt_text?: string | null;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
