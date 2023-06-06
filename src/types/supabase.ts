export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string
          created_at: string | null
          email: string
          id: string
          username: string
        }
        Insert: {
          avatar_url?: string
          created_at?: string | null
          email: string
          id?: string
          username: string
        }
        Update: {
          avatar_url?: string
          created_at?: string | null
          email?: string
          id?: string
          username?: string
        }
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
