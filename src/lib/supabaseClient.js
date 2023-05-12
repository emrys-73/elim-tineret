import { createClient } from '@supabase/supabase-js'
// import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private'

const sbUrl = import.meta.env.VITE_PUBLIC_SB_URL
const sbKey = import.meta.env.VITE_PUBLIC_SB_KEY

export const supabase = createClient(sbUrl, sbKey)