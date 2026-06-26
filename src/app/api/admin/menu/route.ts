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
  } catch {
    return NextResponse.json(
      { error: "Failed to save menu to disk." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, data: clean });
}
