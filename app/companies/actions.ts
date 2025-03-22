'use server';

import { Company, CompanyValue, CompanyManager, CompanyTechnology } from "./types";

export async function saveCompany(formData: FormData) {
  try {
    const { promises: fs } = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'app/companies/data/companies.json');
    
    // Read existing companies
    const fileContents = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileContents);
    const companies = jsonData.companies;

    // Convert FormData to object
    const rawData = Object.fromEntries(formData.entries());
    const companyData: Company = {
      id: rawData.id as string || Math.random().toString(36).slice(2),
      name: rawData.name as string,
      description: rawData.description as string,
      website: rawData.website as string,
      logo: rawData.logo as string || undefined,
      values: JSON.parse(rawData.values as string) as CompanyValue[],
      managers: JSON.parse(rawData.managers as string) as CompanyManager[],
      technologies: JSON.parse(rawData.technologies as string) as CompanyTechnology[],
      interviewProcess: JSON.parse(rawData.interviewProcess as string) as string[],
      benefits: JSON.parse(rawData.benefits as string) as string[],
      financials: JSON.parse(rawData.financials as string),
      culture: rawData.culture as string,
      notes: rawData.notes as string || undefined,
    };

    if (rawData.id) {
      // Update existing company
      const index = companies.findIndex((c: Company) => c.id === rawData.id);
      if (index !== -1) {
        companies[index] = companyData;
      }
    } else {
      // Add new company
      companies.push(companyData);
    }

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify({ companies }, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving company:', error);
    return { success: false, error: 'Failed to save company' };
  }
}
