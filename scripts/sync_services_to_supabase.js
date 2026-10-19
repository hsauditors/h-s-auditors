const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Read .env.local
const envFile = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const idx = line.indexOf('=');
  if (idx > 0) env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncServices() {
  const overridesPath = path.join(process.cwd(), 'data', 'cms_overrides.json');
  if (!fs.existsSync(overridesPath)) {
    console.error('data/cms_overrides.json not found!');
    process.exit(1);
  }

  const overrides = JSON.parse(fs.readFileSync(overridesPath, 'utf8'));
  const services = overrides.services || {};

  console.log(`Found ${Object.keys(services).length} services in local cms_overrides.json\n`);

  for (const [key, item] of Object.entries(services)) {
    if (item._deleted) {
      console.log(`[DELETED] Deactivating deleted service: ${key}`);
      await supabase.from('services').update({ is_active: false }).eq('id', key);
      continue;
    }

    const payload = {
      id: item.id || key,
      title: item.title,
      slug: item.slug,
      short_description: item.short_description || '',
      long_description: item.long_description || '',
      icon: item.icon || 'FileText',
      image_url: item.image_url || '',
      cta_text: item.cta_text || 'Learn More',
      cta_url: item.cta_url || `/services/${item.slug}`,
      benefits: item.benefits || [],
      process_steps: item.process_steps || [],
      display_order: item.display_order ?? 99,
      is_active: item.is_active !== false,
      seo_title: item.seo_title || `${item.title} | H&S Auditors`,
      seo_description: item.seo_description || item.short_description || '',
      sub_services: item.sub_services || [],
      updated_at: new Date().toISOString(),
    };

    const cardCount = payload.sub_services.length;
    console.log(`Syncing: "${payload.title}" (${payload.id}) -> ${cardCount} cards...`);

    // Check if exists by ID
    const { data: existing } = await supabase
      .from('services')
      .select('id')
      .eq('id', payload.id)
      .maybeSingle();

    if (existing) {
      const { error: updateErr } = await supabase
        .from('services')
        .update(payload)
        .eq('id', payload.id);

      if (updateErr) {
        console.error(`  ❌ Update failed for ${payload.title}:`, updateErr.message);
      } else {
        console.log(`  ✅ Updated in Supabase with ${cardCount} cards`);
      }
    } else {
      const { error: insertErr } = await supabase
        .from('services')
        .insert([payload]);

      if (insertErr) {
        console.error(`  ❌ Insert failed for ${payload.title}:`, insertErr.message);
      } else {
        console.log(`  ✅ Inserted in Supabase with ${cardCount} cards`);
      }
    }
  }

  console.log('\nSync process completed!');
}

syncServices().catch(console.error);
