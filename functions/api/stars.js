const KEY = "all_stars";

export async function onRequestGet({ env }) {
  let stars = await env.STARS_KV.get(KEY, { type: "json" }) || [];
  return Response.json(stars);
}

export async function onRequestPost({ request, env }) {
  let stars = await env.STARS_KV.get(KEY, { type: "json" }) || [];
  
  const body = await request.json();
  
  const entry = {
    ip_hash: body.ip_hash || 'unknown',
    city: body.city || '未知',
    country: body.country || '',
    color: body.color || 'white',
    symbol: body.symbol || '✦',
    size: body.size || 1.0,
    blinkSpeed: body.blinkSpeed || 'normal',
    blinkDuration: body.blinkDuration || 4000,
    glow: body.glow || 'medium',
    x: body.x || 50,
    y: body.y || 50,
    label: body.label || '星夜来客',
    created_at: body.created_at || new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)
  };
  
  stars.push(entry);

  if (stars.length > 2000) stars.shift();
  await env.STARS_KV.put(KEY, JSON.stringify(stars));

  return Response.json(entry);
}
