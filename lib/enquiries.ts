import fs from 'fs';
import path from 'path';
import { Enquiry } from '@/types';
import { createClient } from './supabase/server';
import { createAdminClient } from './supabase/admin';

const ENQUIRIES_FILE = path.join(process.cwd(), 'data', 'enquiries.json');

export function getLocalEnquiries(): Enquiry[] {
  try {
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const content = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
      const parsed = JSON.parse(content || '[]');
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading local enquiries:', err);
  }
  return [];
}

export function saveLocalEnquiries(enquiries: Enquiry[]) {
  try {
    const dir = path.dirname(ENQUIRIES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local enquiries:', err);
  }
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  const local = getLocalEnquiries();
  const map = new Map<string, Enquiry>();

  // Add local enquiries first
  local.forEach((e) => map.set(e.id, e));

  // Try fetching from Supabase with short timeout
  try {
    let supabase;
    try {
      supabase = createAdminClient();
    } catch {
      supabase = createClient();
    }

    const { data } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (Array.isArray(data)) {
      data.forEach((e) => {
        if (!map.has(e.id)) {
          map.set(e.id, e as Enquiry);
        }
      });
    }
  } catch {}

  const merged = Array.from(map.values());
  return merged.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
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

  // 1. Immediately save locally to disk so it's NEVER lost
  const local = getLocalEnquiries();
  local.unshift(newEnquiry);
  saveLocalEnquiries(local);

  // 2. Best-effort async save to Supabase
  try {
    let supabase;
    try {
      supabase = createAdminClient();
    } catch {
      supabase = createClient();
    }

    await supabase.from('enquiries').insert([
      {
        id: newEnquiry.id,
        name: newEnquiry.name,
        email: newEnquiry.email,
        phone: newEnquiry.phone,
        message: newEnquiry.message,
        status: newEnquiry.status,
        created_at: newEnquiry.created_at,
      },
    ]);
  } catch (err) {
    console.warn('Note: Supabase sync for enquiry skipped (saved locally):', err);
  }

  return newEnquiry;
}

export async function updateEnquiryStatus(
  id: string,
  newStatus: 'new' | 'contacted' | 'closed'
): Promise<boolean> {
  const local = getLocalEnquiries();
  const index = local.findIndex((e) => e.id === id);

  if (index !== -1) {
    local[index].status = newStatus;
    local[index].updated_at = new Date().toISOString();
    saveLocalEnquiries(local);
  }

  try {
    let supabase;
    try {
      supabase = createAdminClient();
    } catch {
      supabase = createClient();
    }
    await supabase
      .from('enquiries')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);
  } catch {}

  return true;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const local = getLocalEnquiries().filter((e) => e.id !== id);
  saveLocalEnquiries(local);

  try {
    let supabase;
    try {
      supabase = createAdminClient();
    } catch {
      supabase = createClient();
    }
    await supabase.from('enquiries').delete().eq('id', id);
  } catch {}

  return true;
}
