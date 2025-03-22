import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { Company } from "@/app/companies/types";

const dataPath = path.join(process.cwd(), "app/companies/data/companies.json");

async function readCompanies(): Promise<Company[]> {
  try {
    const fileContents = await fs.readFile(dataPath, "utf8");
    const data = JSON.parse(fileContents);
    return data.companies;
  } catch (error) {
    console.error("Error reading companies:", error);
    return [];
  }
}

async function writeCompanies(companies: Company[]): Promise<void> {
  try {
    await fs.writeFile(dataPath, JSON.stringify({ companies }, null, 2));
  } catch (error) {
    console.error("Error writing companies:", error);
    throw new Error("Failed to write companies data");
  }
}

export async function GET() {
  try {
    const companies = await readCompanies();
    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const company = await request.json();
    const companies = await readCompanies();
    
    // Generate a new ID for the company
    const id = Math.random().toString(36).slice(2);
    const companyWithId = { ...company, id };
    
    companies.push(companyWithId);
    await writeCompanies(companies);
    
    return NextResponse.json(companyWithId);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add company" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedCompany = await request.json();
    const companies = await readCompanies();
    
    // Find and update the company
    const index = companies.findIndex((c) => c.id === updatedCompany.id);
    if (index === -1) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }
    
    companies[index] = updatedCompany;
    await writeCompanies(companies);
    
    return NextResponse.json(updatedCompany);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update company" }, { status: 500 });
  }
}
