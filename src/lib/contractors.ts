import contractorsData from "@/data/contractors.json";

export interface Certification {
  name: string;
  issuer: string;
  /** externally-checkable claim — null/absent = not confirmed by CCA */
  confirmedAt: string | null;
}

export interface License {
  number: string;
  state: string;
  /** externally-checkable claim — null/absent = not confirmed by CCA */
  confirmedAt: string | null;
}

export interface Insurance {
  coverageLabel: string;
  carrierOnFile: boolean;
  /** externally-checkable claim — null/absent = not confirmed by CCA */
  confirmedAt: string | null;
}

export interface Contractor {
  slug: string;
  /** true only for the single template/QA sample profile — never a real business */
  isDemo?: boolean;
  businessName: string; // contractor-asserted
  serviceArea: string; // contractor-asserted
  yearsInBusiness: number; // contractor-asserted
  license: License; // externally-checkable
  insurance: Insurance; // externally-checkable
  certifications: Certification[]; // externally-checkable
  photos: string[]; // contractor-asserted
  phone: string; // contractor-asserted
  email: string; // contractor-asserted
  memberSince: string; // platform-generated
}

const allContractors = contractorsData as Contractor[];

export function getAllContractors(): Contractor[] {
  return allContractors;
}

/** Real, public directory listing — excludes the demo/QA profile. */
export function getListedContractors(): Contractor[] {
  return allContractors.filter((c) => !c.isDemo);
}

export function getContractorBySlug(slug: string): Contractor | null {
  return allContractors.find((c) => c.slug === slug) ?? null;
}
