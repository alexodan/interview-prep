export interface CompanyManager {
  id: string;
  name: string;
  role: string;
  linkedin?: string;
  email?: string;
}

export interface CompanyValue {
  title: string;
  description: string;
}

export interface CompanyFinancial {
  revenue?: string;
  employees?: string;
  founded?: string;
  headquarters?: string;
  stockSymbol?: string;
}

export interface CompanyTechnology {
  name: string;
  category: "language" | "framework" | "database" | "cloud" | "tool";
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  website: string;
  values: CompanyValue[];
  managers: CompanyManager[];
  financials: CompanyFinancial;
  technologies: CompanyTechnology[];
  interviewProcess: string[];
  benefits: string[];
  culture: string;
  notes?: string;
}
