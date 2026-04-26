/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SubCategoryMenu {
  name: string;
  tags?: string[];
}

export interface CategoryMenu {
  name: string;
  subCategories?: SubCategoryMenu[];
}
export interface PhotographyGroup {
  id: string;
  title: string;
  category: string;
  subCategory?: string; // e.g. "Indoor", "Outdoor"
  tags?: string[]; // e.g. ["Studio", "Lifestyle"]
  imageUrl: string;
  images: string[];
  description: string;
  year: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  redBook: string;
  tiktok: string;
}
