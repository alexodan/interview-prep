import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Interview } from "@/app/interviews/types";

const dataFilePath = path.join(
  process.cwd(),
  "app/interviews/data/interviews.json"
);

async function getInterviews(): Promise<Interview[]> {
  const fileContents = await fs.readFile(dataFilePath, "utf8");
  const data = JSON.parse(fileContents);
  return data.interviews;
}

async function saveInterviews(interviews: Interview[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify({ interviews }, null, 2));
}

export async function GET() {
  try {
    const interviews = await getInterviews();
    return NextResponse.json({ interviews });
  } catch (error) {
    console.error("Error reading interviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const interviews = await getInterviews();

    // Add the new interview
    interviews.push({
      ...data,
      id: crypto.randomUUID(),
    });

    await saveInterviews(interviews);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving interview:", error);
    return NextResponse.json(
      { error: "Failed to save interview" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, updates } = await req.json();
    const interviews = await getInterviews();

    const index = interviews.findIndex((interview) => interview.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    interviews[index] = { ...interviews[index], ...updates };
    await saveInterviews(interviews);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating interview:", error);
    return NextResponse.json(
      { error: "Failed to update interview" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const interviews = await getInterviews();

    const filteredInterviews = interviews.filter(
      (interview) => interview.id !== id
    );
    if (filteredInterviews.length === interviews.length) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    await saveInterviews(filteredInterviews);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting interview:", error);
    return NextResponse.json(
      { error: "Failed to delete interview" },
      { status: 500 }
    );
  }
}
