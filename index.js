export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;

    // 自动补齐 Astro 的路径 (例如把 /about 变成 /about/index.html)
    if (path.endsWith("/")) {
      path += "index.html";
    } else if (!path.includes(".")) {
      path += "/index.html";
    }

    if (env.ASSETS) {
      const assetUrl = new URL(path, request.url);
      const res = await env.ASSETS.fetch(new Request(assetUrl, request));
      if (res.status !== 404) return res;
    }

    // 如果找不到文件，最后尝试一次原始请求（处理图片等静态资源）
    return env.ASSETS ? await env.ASSETS.fetch(request) : new Response("Not Found", { status: 404 });
  },
};