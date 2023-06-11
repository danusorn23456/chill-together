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
      messages: {
        Row: {
          created_at: string
          created_by: string
          id: string
          message: string
          room_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id: string
          message: string
          room_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          message?: string
          room_id?: string
        }
        Relationships: []
      }
      rooms: {
        Row: {
          created_at: string
          created_by: string
          description: string
          id: string
          name: string
          online_users: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description: string
          id?: string
          name: string
          online_users?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          name?: string
          online_users?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_messages: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["CompositeTypes"]["get_messages_type"][]
      }
      get_messages_by_room_id: {
        Args: {
          id: string
        }
        Returns: Database["public"]["CompositeTypes"]["get_messages_by_room_id_type"][]
      }
      get_room_by_id: {
        Args: {
          room_id: string
        }
        Returns: Database["public"]["CompositeTypes"]["room_type"]
      }
      get_rooms: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["CompositeTypes"]["get_rooms_return"][]
      }
      get_user_by_id: {
        Args: {
          id: string
        }
        Returns: Database["public"]["CompositeTypes"]["user_type"]
      }
      send_message: {
        Args: {
          room_id: string
          created_by: string
          message: string
        }
        Returns: Database["public"]["CompositeTypes"]["send_message_type"]
      }
    }
    Enums: {
      app_permission: "messages.delete"
    }
    CompositeTypes: {
      created_by_type: {
        id: string
        username: string
        avatar_url: string
      }
      get_messages_by_room_id_type: {
        id: string
        message: string
        room_id: string
        created_by: string
        created_at: string
        sender: Database["public"]["CompositeTypes"]["sender_type"]
      }
      get_messages_type: {
        id: string
        message: string
        room_id: string
        created_by: string
        created_at: string
        sender: Database["public"]["CompositeTypes"]["sender_type"]
      }
      get_rooms_return: {
        id: string
        name: string
        description: string
        online_users: number
        created_by: string
        created_at: string
        updated_at: string
        owner: Database["public"]["CompositeTypes"]["room_owner_type"]
      }
      message_type: {
        id: string
        message: string
        created_by: string
        room_id: string
        created_at: string
      }
      owner_type: {
        id: string
        username: string
        avatar_url: string
      }
      room_owner_type: {
        id: string
        username: string
        avatar_url: string
      }
      room_type: {
        id: string
        created_by: string
        online_users: number
        name: string
        description: string
        created_at: string
        updated_at: string
      }
      send_message_return: {
        room_id: string
        created_by: string
        message: string
      }
      send_message_type: {
        room_id: string
        created_by: string
        message: string
      }
      sender_type: {
        id: string
        username: string
        avatar_url: string
      }
      user_type: {
        id: string
        username: string
        avatar_url: string
        email: string
        created_at: string
        updated_at: string
      }
    }
  }
}
