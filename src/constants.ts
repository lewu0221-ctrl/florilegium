/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhotographyWork, ContactInfo } from './types';
import img1 from '../images/IMG_3004.JPG'
import img2 from '../images/IMG_3010.JPG'
import img3 from '../images/IMG_3007.JPG'
import img4 from '../images/IMG_3009.JPG'
import img5 from '../images/IMG_3005.JPG'
import img6 from '../images/IMG_3016.jpg'
import img7 from '../images/IMG_3042.JPG'







export const PHOTOGRAPHY_WORKS: PhotographyWork[] = [
  {
    id: '1',
    title: 'Minimalist Architecture',
    category: 'Architecture',
    imageUrl: img1,
    description: 'Exploring the interplay of light and concrete in modern structural design.',
    year: '2025'
  },
  {
    id: '2',
    title: 'Urban Solitude',
    category: 'Street',
    imageUrl: img2,
    description: 'A quiet moment captured amidst the bustling city transit.',
    year: '2025'
  },
  {
    id: '3',
    title: 'Dune Textures',
    category: 'Nature',
    imageUrl: img3,
    description: 'The rhythmic patterns of sand dunes under the morning sun.',
    year: '2025'
  },
  {
    id: '4',
    title: 'Shadow Portrait',
    category: 'Portrait',
    imageUrl: img4,
    description: 'Defining character through high-contrast lighting and subtle expressions.',
    year: '2025'
  },
  {
    id: '5',
    title: 'Zen Objects',
    category: 'Minimalist',
    imageUrl: img5,
    description: 'The beauty of everyday simplicity captured in soft natural light.',
    year: '2025'
  },
  {
    id: '6',
    title: 'Light Trails',
    category: 'Abstract',
    imageUrl: img6,
    description: 'Long exposure photography capturing the ethereal flow of lights.',
    year: '2025'
  },
  {
    id: '7',
    title: 'Light Trails',
    category: 'Abstract',
    imageUrl: img7,
    description: 'Long exposure photography capturing the ethereal flow of lights.',
    year: '2025'
  }
];

export const CONTACT_INFO: ContactInfo = {
  email: 'remenber_wl@163.com',
  phone: '13581802297',
  location: '北京',
  redbook: 'Wu55555uu',
  tiktok: '杨枝甘霸'
};
