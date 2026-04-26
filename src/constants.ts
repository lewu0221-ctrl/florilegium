/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhotographyGroup, ContactInfo,CategoryMenu } from './types';

const DATA_SCHEMA = {
  PORTRAIT: {
     name: 'Portrait',
     subs: {
      INDOOR: { name: '室内', tags:{tagsname1:"纪实",tagsname2:"情绪氛围",tagsname3:"时尚/审美"}},
      OUTDOOR: { name: '室外', tags: { outdoor1: '自然环境',
                                      outdoor2: '城市街头', outdoor3: '建筑/场景', outdoor4: '旅拍' ,
                                      outdoor5: '情绪氛围'} },
      WEDDING: { name: '婚礼', tags: { wending1: '胶片', wending2: '数码' } }

    }
  }
}as const;

// Short-hand reference
const c = DATA_SCHEMA;

export const NAV_MENU: CategoryMenu[] = Object.values(DATA_SCHEMA).map(cat => ({
  name: cat.name,
  subCategories: Object.values(cat.subs).map(sub => ({
    name: sub.name,
    tags: Object.values(sub.tags)
  }))
}));

export const  PHOTOGRAPHY_GROUPS: PhotographyGroup[] = [
  {
    id: '1',
    title: '生日写真part1',
    category: 'Portrait',
    subCategory: c.PORTRAIT.subs.INDOOR.name,
    tags: [c.PORTRAIT.subs.OUTDOOR.tags.outdoor1,c.PORTRAIT.subs.INDOOR.tags.tagsname2],
    imageUrl: "https://cdn.phototourl.com/free/2026-04-24-fc42a203-b153-4b4e-a2e4-db0e8263991b.jpg",
    images: [
      'https://cdn.phototourl.com/free/2026-04-24-fc42a203-b153-4b4e-a2e4-db0e8263991b.jpg',
      'https://cdn.phototourl.com/free/2026-04-24-a394ba30-2788-47d1-aa8d-8eb038c66d3e.jpg',
      'https://cdn.phototourl.com/free/2026-04-24-026b56b1-8455-47cb-85ca-b0f74b601b03.jpg',
      'https://cdn.phototourl.com/free/2026-04-24-09268930-e2e0-4328-b260-d18bb6e9dc02.jpg',
      'https://cdn.phototourl.com/free/2026-04-24-57571065-3b74-4afc-9f9c-f38a9527c6f3.jpg'
    ],
    description: 'Exploring the interplay of light and concrete in modern structural design.',
    year: '2025'
  },
  {
    id: '2',
    title: '生日写真part2',
    category: 'Portrait',
    subCategory: c.PORTRAIT.subs.INDOOR.name,
    tags: [c.PORTRAIT.subs.INDOOR.tags.tagsname1,c.PORTRAIT.subs.INDOOR.tags.tagsname2],
    imageUrl: "https://cdn.phototourl.com/free/2026-04-24-474c8f1e-e080-4879-aee5-91ccc849062c.jpg",
    images: [
      'https://cdn.phototourl.com/free/2026-04-24-474c8f1e-e080-4879-aee5-91ccc849062c.jpg',
      'https://cdn.phototourl.com/free/2026-04-24-d651a87a-b9c2-4dfa-8a42-c5b23a81158e.jpg'
    ],
    description: 'Long exposure photography capturing the ethereal flow of lights.',
    year: '2025'
  },
    {
    id: '3',
    title: '秋天银杏',
    category: 'Portrait',
    subCategory: c.PORTRAIT.subs.OUTDOOR.name,
    tags: [c.PORTRAIT.subs.OUTDOOR.tags.outdoor1],
    imageUrl: "https://cdn.phototourl.com/free/2026-04-24-2933d341-ebdb-4a4d-8684-995c57b17e13.jpg",
    images: [
      'https://cdn.phototourl.com/free/2026-04-24-2933d341-ebdb-4a4d-8684-995c57b17e13.jpg',
      'https://cdn.phototourl.com/free/2026-04-24-bb67dc8a-9600-4b6a-9046-7a7430f3eebe.jpg',
      'https://cdn.phototourl.com/member/2026-04-24-39f1ca39-394e-44e0-ade1-7a132cfa78fd.jpg'
    ],
    description: 'Long exposure photography capturing the ethereal flow of lights.',
    year: '2025'
  },
  {
    id: '4',
    title: '电视塔',
    category: 'Portrait',
    subCategory: c.PORTRAIT.subs.OUTDOOR.name,
    tags: [c.PORTRAIT.subs.OUTDOOR.tags.outdoor3],
    imageUrl: "./compress_image/movietv/002.jpg",
    images: [
      './compress_image/movietv/001.jpg',
      './compress_image/movietv/003.jpg',
      './compress_image/movietv/002.jpg',
      './compress_image/movietv/004.jpg',
      './compress_image/movietv/005.jpg',
      './compress_image/movietv/006.jpg'
    ],
    description: 'Long exposure photography capturing the ethereal flow of lights.',
    year: '2025'
  },
  {
    id: '5',
    title: '白衬衫',
    category: 'Portrait',
    subCategory: c.PORTRAIT.subs.OUTDOOR.name,
    tags: [c.PORTRAIT.subs.OUTDOOR.tags.outdoor1],
    imageUrl: "./compress_image/white_shirt/white1.jpg",
    images: [
      './compress_image/white_shirt/white1.jpg',
      './compress_image/white_shirt/white2.jpg',
      './compress_image/white_shirt/white3.jpg',
      './compress_image/white_shirt/white4.jpg',
      './compress_image/white_shirt/white5.jpg',
      './compress_image/white_shirt/white6.jpg'
    ],
    description: 'Long exposure photography capturing the ethereal flow of lights.',
    year: '2025'
  },
  {
    id: '6',
    title: '在北海',
    category: 'Portrait',
    subCategory: c.PORTRAIT.subs.OUTDOOR.name,
    tags: [c.PORTRAIT.subs.OUTDOOR.tags.outdoor1],
    imageUrl: "./compress_image/coat/coat1.jpg",
    images: ['./compress_image/coat/coat1.jpg'],
    description: 'Long exposure photography capturing the ethereal flow of lights.',
    year: '2025'
  },
  {
    id: '7',
    title: '是好朋友！',
    category: 'Portrait',
    subCategory: c.PORTRAIT.subs.OUTDOOR.name,
    tags: [c.PORTRAIT.subs.OUTDOOR.tags.outdoor3],
    imageUrl: "./compress_image/ancient_costume/ancient1.jpg",
    images: [
    './compress_image/ancient_costume/ancient1.jpg',
    './compress_image/ancient_costume/ancient2.jpg',
    './compress_image/ancient_costume/ancient3.jpg',
    './compress_image/ancient_costume/ancient4.jpg',
    './compress_image/ancient_costume/ancient5.jpg',
    './compress_image/ancient_costume/ancient6.jpg'
    ],
    description: 'Long exposure photography capturing the ethereal flow of lights.',
    year: '2025'
  },
  {
    id: '8',
    title: '旗袍',
    category: 'Portrait',
    subCategory: c.PORTRAIT.subs.OUTDOOR.name,
    tags: [c.PORTRAIT.subs.OUTDOOR.tags.outdoor1],
    imageUrl: "./compress_image/qipao/qipao1.jpg",
    images: [
    './compress_image/qipao/qipao1.jpg',
    './compress_image/qipao/qipao2.jpg',
    './compress_image/qipao/qipao3.jpg',
    './compress_image/qipao/qipao4.jpg',
    './compress_image/qipao/qipao5.jpg',
    './compress_image/qipao/qipao6.jpg'
    ],
    description: 'Long exposure photography capturing the ethereal flow of lights.',
    year: '2025'
  },
  {
    id: '9',
    title: '雨滴',
    category: 'Portrait',
    subCategory: c.PORTRAIT.subs.OUTDOOR.name,
    tags: [c.PORTRAIT.subs.OUTDOOR.tags.outdoor5],
    imageUrl: "./compress_image/rain/rain8.jpg",
    images: [
    './compress_image/rain/rain8.jpg',
    './compress_image/rain/rain2.jpg',
    './compress_image/rain/rain3.jpg',
    './compress_image/rain/rain4.jpg',
    './compress_image/rain/rain5.jpg',
    './compress_image/rain/rain6.jpg',
    './compress_image/rain/rain7.jpg',
    './compress_image/rain/rain1.jpg'
    ],
    description: 'Long exposure photography capturing the ethereal flow of lights.',
    year: '2025'
  },
  {
    id: '10',
    title: '故宫-与六百年时光合影',
    category: 'Portrait',
    subCategory: c.PORTRAIT.subs.OUTDOOR.name,
    tags: [c.PORTRAIT.subs.OUTDOOR.tags.outdoor3],
    imageUrl: "./compress_image/gugong/gugong1.JPG",
    images: [
    './compress_image/gugong/gugong1.JPG',
    './compress_image/gugong/gugong2.JPG',
    './compress_image/gugong/gugong3.JPG',
    './compress_image/gugong/gugong4.JPG',
    './compress_image/gugong/gugong5.JPG'
    ],
    description: 'Long exposure photography capturing the ethereal flow of lights.',
    year: '2025'
  }

];

export const CONTACT_INFO: ContactInfo = {
  email: 'remenber_wl@163.com',
  phone: '13581802297',
  location: '北京',
  redBook: 'Wu55555uu',
  tiktok: '杨枝甘霸'
};



