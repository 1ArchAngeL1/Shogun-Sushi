import { NextResponse, type NextRequest } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import { getMenuData, saveMenuData } from "@/lib/menu-store";
import { validateMenuData } from "@/lib/menu-validate";

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getMenuData();
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  let clean;
  try {
    clean = validateMenuData(payload);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Invalid menu data.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    await saveMenuData(clean);
  } catch (err) {
    console.error("[admin/menu] save failed:", err);
    const code = (err as NodeJS.ErrnoException)?.code;
    const detail =
      err instanceof Error ? `${code ? code + ": " : ""}${err.message}` : "";
    const hint =
      code === "EACCES"
        ? " The app's user can't write to the data directory — fix its ownership/permissions or set MENU_DATA_DIR to a writable path."
        : code === "EROFS"
          ? " The server's filesystem is read-only, so menu edits can't be persisted here. Set MENU_DATA_DIR to a writable volume."
          : code === "ENOSPC"
            ? " The disk is full."
            : "";
    return NextResponse.json(
      { error: `Failed to save menu to disk.${detail ? " " + detail : ""}${hint}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, data: clean });
}
