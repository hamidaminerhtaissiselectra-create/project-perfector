export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      booking_proofs: {
        Row: {
          booking_id: string
          created_at: string
          file_url: string
          id: string
          message: string | null
          proof_type: string
          submitted_at: string
          walker_id: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          file_url: string
          id?: string
          message?: string | null
          proof_type: string
          submitted_at?: string
          walker_id: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          file_url?: string
          id?: string
          message?: string | null
          proof_type?: string
          submitted_at?: string
          walker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_proofs_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_date: string
          created_at: string
          dog_id: string
          duration_minutes: number
          id: string
          owner_id: string
          payment_released: boolean | null
          proof_submitted: boolean | null
          proof_validated: boolean | null
          service_type: Database["public"]["Enums"]["service_type"] | null
          special_notes: string | null
          start_time: string
          status: string
          total_price: number
          updated_at: string
          walker_id: string
        }
        Insert: {
          booking_date: string
          created_at?: string
          dog_id: string
          duration_minutes: number
          id?: string
          owner_id: string
          payment_released?: boolean | null
          proof_submitted?: boolean | null
          proof_validated?: boolean | null
          service_type?: Database["public"]["Enums"]["service_type"] | null
          special_notes?: string | null
          start_time: string
          status?: string
          total_price: number
          updated_at?: string
          walker_id: string
        }
        Update: {
          booking_date?: string
          created_at?: string
          dog_id?: string
          duration_minutes?: number
          id?: string
          owner_id?: string
          payment_released?: boolean | null
          proof_submitted?: boolean | null
          proof_validated?: boolean | null
          service_type?: Database["public"]["Enums"]["service_type"] | null
          special_notes?: string | null
          start_time?: string
          status?: string
          total_price?: number
          updated_at?: string
          walker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dogs"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          booking_id: string | null
          created_at: string
          id: string
          participant1_id: string
          participant2_id: string
          updated_at: string
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          id?: string
          participant1_id: string
          participant2_id: string
          updated_at?: string
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          id?: string
          participant1_id?: string
          participant2_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      dogs: {
        Row: {
          age: number | null
          breed: string | null
          created_at: string
          health_notes: string | null
          id: string
          name: string
          owner_id: string
          photo_url: string | null
          temperament: string | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          breed?: string | null
          created_at?: string
          health_notes?: string | null
          id?: string
          name: string
          owner_id: string
          photo_url?: string | null
          temperament?: string | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          breed?: string | null
          created_at?: string
          health_notes?: string | null
          id?: string
          name?: string
          owner_id?: string
          photo_url?: string | null
          temperament?: string | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          user_id: string
          walker_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
          walker_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
          walker_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          related_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          related_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          related_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_verified: boolean | null
          address: string | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string
          criminal_record_verified: boolean | null
          email: string
          first_name: string
          id: string
          id_card_verified: boolean | null
          insurance_verified: boolean | null
          last_name: string
          phone: string | null
          postal_code: string | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          account_verified?: boolean | null
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          criminal_record_verified?: boolean | null
          email: string
          first_name: string
          id: string
          id_card_verified?: boolean | null
          insurance_verified?: boolean | null
          last_name: string
          phone?: string | null
          postal_code?: string | null
          updated_at?: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          account_verified?: boolean | null
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          criminal_record_verified?: boolean | null
          email?: string
          first_name?: string
          id?: string
          id_card_verified?: boolean | null
          insurance_verified?: boolean | null
          last_name?: string
          phone?: string | null
          postal_code?: string | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          id: string
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          reviewee_id?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      walker_badges: {
        Row: {
          badge_type: string
          earned_at: string
          id: string
          walker_id: string
        }
        Insert: {
          badge_type: string
          earned_at?: string
          id?: string
          walker_id: string
        }
        Update: {
          badge_type?: string
          earned_at?: string
          id?: string
          walker_id?: string
        }
        Relationships: []
      }
      walker_documents: {
        Row: {
          created_at: string
          document_type: string
          file_url: string
          id: string
          rejection_reason: string | null
          updated_at: string
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
          walker_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          file_url: string
          id?: string
          rejection_reason?: string | null
          updated_at?: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          walker_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          file_url?: string
          id?: string
          rejection_reason?: string | null
          updated_at?: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          walker_id?: string
        }
        Relationships: []
      }
      walker_profiles: {
        Row: {
          availability: string | null
          certifications: string[] | null
          created_at: string
          experience_years: number | null
          hourly_rate: number
          id: string
          is_verified: boolean | null
          rating: number | null
          service_rates: Json | null
          services: string[] | null
          total_reviews: number | null
          updated_at: string
        }
        Insert: {
          availability?: string | null
          certifications?: string[] | null
          created_at?: string
          experience_years?: number | null
          hourly_rate: number
          id: string
          is_verified?: boolean | null
          rating?: number | null
          service_rates?: Json | null
          services?: string[] | null
          total_reviews?: number | null
          updated_at?: string
        }
        Update: {
          availability?: string | null
          certifications?: string[] | null
          created_at?: string
          experience_years?: number | null
          hourly_rate?: number
          id?: string
          is_verified?: boolean | null
          rating?: number | null
          service_rates?: Json | null
          services?: string[] | null
          total_reviews?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      walker_public_info: {
        Row: {
          availability: string | null
          avatar_url: string | null
          bio: string | null
          certifications: string[] | null
          city: string | null
          experience_years: number | null
          first_name: string | null
          hourly_rate: number | null
          id: string | null
          is_verified: boolean | null
          rating: number | null
          services: string[] | null
          total_reviews: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_notification: {
        Args: {
          p_message: string
          p_related_id?: string
          p_title: string
          p_type: string
          p_user_id: string
        }
        Returns: string
      }
      get_user_display_info: {
        Args: { user_id: string }
        Returns: {
          avatar_url: string
          first_name: string
          id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      service_type:
        | "promenade"
        | "visite_domicile"
        | "hebergement_nuit"
        | "hebergement_jour"
        | "garde_domicile"
        | "visite_sanitaire"
        | "accompagnement_veterinaire"
      user_type: "owner" | "walker"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      service_type: [
        "promenade",
        "visite_domicile",
        "hebergement_nuit",
        "hebergement_jour",
        "garde_domicile",
        "visite_sanitaire",
        "accompagnement_veterinaire",
      ],
      user_type: ["owner", "walker"],
    },
  },
} as const
