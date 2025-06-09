export type Database = {
  public: {
    Tables: {
      profiles?: {
        Row: {
          id: string
          email?: string
          full_name?: string
          avatar_url?: string
        }
        Insert: {
          id: string
          email?: string
          full_name?: string
          avatar_url?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}