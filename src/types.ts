/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PhotographyGroup {
  id: string;
  title: string;
  category: string;
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
