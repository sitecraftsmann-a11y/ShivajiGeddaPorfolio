export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: {
          id: string
          created_at: string
          name: string
          bio: string
          photo_url: string | null
          email: string
          phone: string | null
          whatsapp: string | null
          social_links: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          bio: string
          photo_url?: string | null
          email: string
          phone?: string | null
          whatsapp?: string | null
          social_links?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          bio?: string
          photo_url?: string | null
          email?: string
          phone?: string | null
          whatsapp?: string | null
          social_links?: Json | null
        }
        Relationships: []
      }
      services: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          icon: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          icon?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          icon?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: string
          created_at: string
          name: string
          category: string
          proficiency: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          category: string
          proficiency: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          category?: string
          proficiency?: number
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          category: string
          tools: string[] | null
          client: string | null
          main_image: string
          gallery: string[] | null
          order: number
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          category: string
          tools?: string[] | null
          client?: string | null
          main_image: string
          gallery?: string[] | null
          order: number
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          category?: string
          tools?: string[] | null
          client?: string | null
          main_image?: string
          gallery?: string[] | null
          order?: number
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          created_at: string
          name: string
          role: string | null
          content: string
          photo_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          role?: string | null
          content: string
          photo_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          role?: string | null
          content?: string
          photo_url?: string | null
        }
        Relationships: []
      }
      experience: {
        Row: {
          id: string
          created_at: string
          company: string
          role: string
          duration: string
          description: string
          order: number
        }
        Insert: {
          id?: string
          created_at?: string
          company: string
          role: string
          duration: string
          description: string
          order: number
        }
        Update: {
          id?: string
          created_at?: string
          company?: string
          role?: string
          duration?: string
          description?: string
          order?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          message: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          message: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          message?: string
        }
        Relationships: []
      }
      admin_config: {
        Row: {
          id: string
          username: string
          password: string
          recovery_key: string
        }
        Insert: {
          id?: string
          username: string
          password: string
          recovery_key: string
        }
        Update: {
          id?: string
          username?: string
          password?: string
          recovery_key?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
