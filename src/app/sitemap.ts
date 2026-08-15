import type { MetadataRoute } from "next";

const baseUrl = "https://skalekraft.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/contact", "/join", "/services", "/work", "/portfolio", "/privacy", "/terms"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-08-04"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
