export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; email: string; role: "admin" | "manager"; created_at: string };
        Insert: { id: string; email: string; role?: "admin" | "manager"; created_at?: string };
        Update: { email?: string; role?: "admin" | "manager" };
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: string; company_name: string; hero_title: string; hero_subtitle: string; about_summary: string;
          mission: string; vision: string; address: string; email: string; phone: string; business_number: string;
          instagram_url: string | null; youtube_url: string | null; privacy_policy: string; terms_of_service: string;
          footer_text: string; updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Relationships: [];
      };
      banners: {
        Row: { id: string; title: string; subtitle: string; image_url: string; link_url: string | null; sort_order: number; is_active: boolean; created_at: string; updated_at: string; created_by: string | null; updated_by: string | null };
        Insert: Partial<Database["public"]["Tables"]["banners"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["banners"]["Row"]>;
        Relationships: [];
      };
      challenges: {
        Row: { id: string; title: string; slug: string; thumbnail_url: string; cover_image_url: string; short_description: string; description: string; target_audience: string; benefits: string; precautions: string; start_date: string; end_date: string; status: "ongoing" | "upcoming" | "ended"; is_featured: boolean; created_at: string; updated_at: string; created_by: string | null; updated_by: string | null };
        Insert: Partial<Database["public"]["Tables"]["challenges"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["challenges"]["Row"]>;
        Relationships: [];
      };
      auditions: {
        Row: { id: string; title: string; slug: string; category: "singer" | "actor" | "model" | "dancer" | "creator"; thumbnail_url: string; cover_image_url: string; short_description: string; description: string; requirements: string; submission_guide: string; start_date: string; end_date: string; status: "open" | "closed"; is_featured: boolean; created_at: string; updated_at: string; created_by: string | null; updated_by: string | null };
        Insert: Partial<Database["public"]["Tables"]["auditions"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["auditions"]["Row"]>;
        Relationships: [];
      };
      audition_applications: {
        Row: { id: string; audition_id: string; name: string; birth_date: string; gender: string; email: string; phone: string; region: string; sns_url: string | null; portfolio_url: string | null; self_intro: string; category: string; attachment_url: string | null; consent_privacy: boolean; status: "new" | "reviewing" | "done"; created_at: string };
        Insert: Partial<Database["public"]["Tables"]["audition_applications"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["audition_applications"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "audition_applications_audition_id_fkey",
            columns: ["audition_id"],
            referencedRelation: "auditions",
            referencedColumns: ["id"],
          },
        ],
      };
      magazines: {
        Row: { id: string; title: string; slug: string; thumbnail_url: string; cover_image_url: string; summary: string; content: string; category: "news" | "event" | "artist" | "project"; published_at: string; is_featured: boolean; is_public: boolean; created_at: string; updated_at: string; created_by: string | null; updated_by: string | null };
        Insert: Partial<Database["public"]["Tables"]["magazines"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["magazines"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: { is_admin: { Args: Record<string, never>; Returns: boolean } };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
