/**
 * Netlify edge function: serve Hugo-generated markdown files when a client
 * signals it wants markdown (via Accept header or ?format=markdown query param).
 *
 * Behaviour mirrors Cloudflare's markdown return capability:
 *   - Request: GET /blog/my-post/  with  Accept: text/markdown
 *   - Response: raw markdown content with Content-Type: text/markdown; charset=utf-8
 *
 * Hugo must be configured with the Markdown output format so that
 * /blog/my-post/index.md is present in the published output alongside
 * the normal /blog/my-post/index.html.
 */
export default async function handler(request, context) {
  const acceptHeader = request.headers.get("Accept") ?? "";
  const url = new URL(request.url);

  const wantsMarkdown =
    acceptHeader.includes("text/markdown") ||
    url.searchParams.get("format") === "markdown";

  if (!wantsMarkdown) {
    return context.next();
  }

  // Build the URL for the corresponding .md file Hugo generated
  let mdPath = url.pathname;
  if (mdPath.endsWith("/")) {
    mdPath = mdPath + "index.md";
  } else if (!mdPath.endsWith(".md")) {
    mdPath = mdPath + "/index.md";
  }

  const mdURL = new URL(mdPath, url.origin);
  const mdResponse = await context.fetch(mdURL.toString());

  if (!mdResponse.ok) {
    // No markdown file found; fall through to normal HTML response
    return context.next();
  }

  const markdown = await mdResponse.text();

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Vary": "Accept",
    },
  });
}
