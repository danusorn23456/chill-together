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
      rooms: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
          online_users: number
          owner_id: string
          owner_username: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
          online_users?: number
          owner_id: string
          owner_username: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
          online_users?: number
          owner_id?: string
          owner_username?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          avatar_url: string
          created_at: string
          email: string
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url: string
          created_at?: string
          email: string
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          email?: string
          id?: string
          updated_at?: string
          username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_room_by_id: {
        Args: {
          room_id: string
        }
        Returns: Json
      }
      get_rooms: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      get_user_by_id: {
        Args: {
          user_id: string
        }
        Returns: {
          avatar_url: string
          created_at: string
          email: string
          id: string
          updated_at: string
          username: string
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
