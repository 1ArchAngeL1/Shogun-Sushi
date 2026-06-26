import { NextResponse, type NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/**
 * Serves images uploaded through the admin panel.
 *
 * Uploaded files live in `data/uploads` (outside `public/`) because `next start`
 * snapshots the `public/` directory at boot and won't serve files added later.
 * This handler streams them at request time instead.
 */

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");

const CONTENT_TYPE: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
};

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/uploads/[name]">,
) {
  const { name } = await ctx.params;

  // Reject anything that isn't a plain filename (no path traversal).
  if (!/^[a-zA-Z0-9._-]+$/.test(name) || name.includes("..")) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const ext = path.extname(name).toLowerCase();
  const type = CONTENT_TYPE[ext];
  if (!type) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const bytes = await fs.readFile(path.join(UPLOAD_DIR, name));
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
