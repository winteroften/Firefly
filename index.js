export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Astro 静态资源处理逻辑
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

    return new Response("404 Not Found", { status: 404 });
  },
};