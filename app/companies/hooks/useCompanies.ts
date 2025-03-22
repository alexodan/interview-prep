import { useState, useCallback } from 'react';
import { Company } from '../types';

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/companies");
      if (!response.ok) throw new Error("Failed to fetch companies");
      const data = await response.json();
      setCompanies(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const addCompany = useCallback(async (company: Omit<Company, "id">) => {
    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company),
      });
      
      if (!response.ok) throw new Error("Failed to add company");
      await fetchCompanies();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add company");
      return false;
    }
  }, [fetchCompanies]);

  const updateCompany = useCallback(async (company: Company) => {
    try {
      const response = await fetch("/api/companies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company),
      });
      
      if (!response.ok) throw new Error("Failed to update company");
      await fetchCompanies();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update company");
      return false;
    }
  }, [fetchCompanies]);

  return {
    companies,
    loading,
    error,
    fetchCompanies,
    addCompany,
    updateCompany,
  };
}
