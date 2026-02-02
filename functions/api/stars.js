const KEY = "all_stars";

export async function onRequestGet({ env }) {
  let stars = await env.STARS_KV.get(KEY, { type: "json" }) || [];
  return Response.json(stars);
}

export async function onRequestPost({ request, env }) {
  let stars = await env.STARS_KV.get(KEY, { type: "json" }) || [];

  const cf = request.cf || {};
  const city = cf.city || "某片星空";
  
  // 解析请求体，获取自定义设置
  let body = {};
  try {
    body = await request.json();
  } catch (e) {}
  
  const now = new Date();
  const time = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;

  const entry = { 
    time, 
    location: city,
    color: body.color || 'white',
    symbol: body.symbol || '✦',
    nickname: body.nickname || '匿名旅人',
    message: body.message || ''
  };
  stars.push(entry);

  if (stars.length > 2000) stars.shift();
  await env.STARS_KV.put(KEY, JSON.stringify(stars));

  return Response.json(entry);
}

// 新增：更新星星留言
export async function onRequestPatch({ request, env }) {
  let stars = await env.STARS_KV.get(KEY, { type: "json" }) || [];
  
  let body = {};
  try {
    body = await request.json();
  } catch (e) {
    return Response.json({ error: 'Invalid body' }, { status: 400 });
  }
  
  const { index, message } = body;
  if (index === undefined || index < 0 || index >= stars.length) {
    return Response.json({ error: 'Invalid star index' }, { status: 400 });
  }
  
  stars[index].message = message;
  await env.STARS_KV.put(KEY, JSON.stringify(stars));
  
  return Response.json(stars[index]);
}
