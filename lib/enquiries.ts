import { Enquiry } from '@/types';
import { createClient } from './supabase/server';
import { createAdminClient } from './supabase/admin';

async function getSupabase() {
  try {
    return createAdminClient();
  } catch {
    return createClient();
  }
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching enquiries from Supabase:', error.message);
      return [];
    }

    return (data as Enquiry[]) || [];
  } catch (err: any) {
    console.error('Error in getAllEnquiries:', err?.message);
    return [];
  }
}

export async function addEnquiry(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<Enquiry> {
  const newEnquiry: Enquiry = {
    id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    message: data.message.trim(),
    status: 'new',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const supabase = await getSupabase();
  const { error } = await supabase.from('enquiries').insert([
    {
      id: newEnquiry.id,
      name: newEnquiry.name,
      email: newEnquiry.email,
      phone: newEnquiry.phone,
      message: newEnquiry.message,
      status: newEnquiry.status,
      created_at: newEnquiry.created_at,
      updated_at: newEnquiry.updated_at,
    },
  ]);

  if (error) {
    console.error('Error saving enquiry to Supabase:', error.message);
    throw new Error('Failed to save enquiry. Please try again.');
  }

  return newEnquiry;
}

export async function updateEnquiryStatus(
  id: string,
  newStatus: 'new' | 'contacted' | 'closed'
): Promise<boolean> {
  try {
    const supabase = await getSupabase();
    const { error } = await supabase
      .from('enquiries')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating enquiry in Supabase:', error.message);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  try {
    const supabase = await getSupabase();
    const { error } = await supabase.from('enquiries').delete().eq('id', id);

    if (error) {
      console.error('Error deleting enquiry from Supabase:', error.message);
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
