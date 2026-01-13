const KEY = "all_stars";

export async function onRequestGet({ env }) {
  let stars = await env.STARS_KV.get(KEY, { type: "json" }) || [];
  return Response.json(stars);
}

export async function onRequestPost({ request, env }) {
  let stars = await env.STARS_KV.get(KEY, { type: "json" }) || [];

  const cf = request.cf || {};
  const city = cf.city || "某片星空";
  
  const now = new Date();
  const time = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;

  const entry = { time, location: city };
  stars.push(entry);

  if (stars.length > 2000) stars.shift();
  await env.STARS_KV.put(KEY, JSON.stringify(stars));

  return Response.json(entry);
}