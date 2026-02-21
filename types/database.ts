/**
 * Supabase Database Types
 * Auto-generate with: npx supabase gen types typescript --project-id YOUR_ID > types/database.ts
 * This is the manual version matching our schema.
 */

export type OrderStatus =
  | 'pending'
  | 'payment_processing'
  | 'payment_approved'
  | 'payment_rejected'
  | 'fulfillment_pending'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type SubscriptionStatus =
  | 'active'
  | 'paused'
  | 'cancelled'
  | 'past_due'

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          first_name: string
          last_name: string
          phone: string | null
          address_street: string | null
          address_city: string | null
          address_province: string | null
          address_postal_code: string | null
          mp_customer_id: string | null
          total_orders: number
          total_spent_ars: number
        }
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at' | 'updated_at' | 'total_orders' | 'total_spent_ars'>
        Update: Partial<Database['public']['Tables']['customers']['Insert']>
      }
      orders: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          customer_id: string
          status: OrderStatus
          mp_preference_id: string | null
          mp_payment_id: string | null
          mp_external_reference: string
          items: OrderItem[]
          subtotal_ars: number
          shipping_ars: number
          discount_ars: number
          total_ars: number
          is_subscription: boolean
          subscription_id: string | null
          notes: string | null
          shipping_address: ShippingAddress | null
        }
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
      subscriptions: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          customer_id: string
          status: SubscriptionStatus
          mp_subscription_id: string | null
          pack_ids: string[]
          amount_ars: number
          next_billing_date: string | null
          paused_at: string | null
          cancelled_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      order_status: OrderStatus
      subscription_status: SubscriptionStatus
    }
  }
}

export interface OrderItem {
  pack_id: string
  pack_name: string
  quantity: number
  unit_price_ars: number
  is_subscription: boolean
}

export interface ShippingAddress {
  street: string
  city: string
  province: string
  postal_code: string
  country: 'AR'
}
