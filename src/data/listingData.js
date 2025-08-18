import {
  listing1,
  listing2,
  listing3,
  listing4,
  listing5,
  listing6,
  listing7,
  listing8,
  listing9,
  listing10,
  listing11,
  listing12,
  listing13,
  listing14,
  listing15,
  listing16,
  listing17,
  listing18,
} from "../assets/images/listing/listingImages";

import category1 from "../assets/images/categories/category1.png";
import category2 from "../assets/images/categories/category2.png";
import category3 from "../assets/images/categories/category3.png";
import category4 from "../assets/images/categories/category4.png";
import category5 from "../assets/images/categories/category5.png";
import category6 from "../assets/images/categories/category6.png";
import category7 from "../assets/images/categories/category7.png";
import category8 from "../assets/images/categories/category8.png";

export const listings = [
  {
    id: "08110",
    image: [listing1, listing2, listing3],
    title: "Oakview Villa",
    price: 120000000,
    featured: true,
    address: "Plot 16, Guzape Luxury-Estate",
    state: "Abuja-FCT",
    location: "Guzape",
    country: "Nigeria",
    description:
      "A modern villa designed with a sleek minimalistic touch. Featuring spacious living areas, large windows for natural light, and a serene environment within a secure estate in Guzape.",
    bathroom: 5,
    bedroom: 4,
    squareMeters: "20 × 24 m²",
    category: "Luxury-Estate",
  },
  {
    id: "08111",
    image: [listing4, listing5, listing6],
    title: "Palmcrest Residence",
    price: 95000000,
    featured: false,
    address: "Old GRA, Ikoyi",
    state: "Lagos",
    location: "Ikoyi",
    country: "Nigeria",
    description:
      "A stylish contemporary home located in the heart of Ikoyi. Perfect for modern living with premium finishes, an open-plan kitchen, and elegant bedrooms.",
    bathroom: 5,
    bedroom: 4,
    squareMeters: "18 × 23 m²",
    category: "Residential",
  },
  {
    id: "08112",
    image: [listing7, listing8, listing9],
    title: "Emerald Court",
    price: 68000000,
    featured: true,
    address: "Adjacent Plus Centre, Birnin Kebbi",
    state: "Kebbi",
    country: "Nigeria",
    location: "Birnin Kebbi",
    description:
      "An elegant home designed for comfort and sophistication. With spacious rooms, private balconies, and modern interiors, this residence redefines classy living in Kebbi.",
    bathroom: 6,
    bedroom: 6,
    squareMeters: "22 × 25 m²",
    category: "Residential",
  },
  {
    id: "08113",
    image: [listing10, listing11, listing12],
    title: "Skyline Manor",
    price: 110000000,
    featured: true,
    address: "26, Maitama Hills Estate",
    state: "Abuja-FCT",
    location: "Maitama",
    country: "Nigeria",
    description:
      "A premium home situated in Maitama, offering stunning city views, a large living area, modern finishes, and a private garden for relaxation.",
    bathroom: 5,
    bedroom: 5,
    squareMeters: "25 × 26 m²",
    category: "Luxury-Estate",
  },
  {
    id: "08114",
    image: [listing13, listing14, listing15],
    title: "Maplewood Duplex",
    price: 75000000,
    featured: true,
    address: "Brains & Hammers Estate, Gwarimpa",
    state: "Abuja-FCT",
    location: "Gwarimpa",
    country: "Nigeria",
    description:
      "A well-crafted duplex that blends elegance with functionality. Located in the popular Gwarimpa district, this home features expansive bedrooms and modern interiors.",
    bathroom: 4,
    bedroom: 5,
    squareMeters: "19 × 21 m²",
    category: "New-Construction",
  },
  {
    id: "08115",
    image: [listing16, listing17, listing18],
    title: "Grand Pearl Villa",
    price: 60000000,
    featured: true,
    address: "130, GRA, Benin City",
    state: "Edo",
    country: "Nigeria",
    location: "GRA Benin City",
    description:
      "A luxury villa in Benin’s exclusive GRA area. Comes with spacious bedrooms, a private garden, and top-class finishing suitable for a family seeking comfort and security.",
    bathroom: 4,
    bedroom: 5,
    squareMeters: "17 × 20 m²",
    category: "Residential",
  },
];


export const categories = [
  { id: "cat0001", name: "Residential", image: category1 },
  { id: "cat0002", name: "Apartment", image: category2 },
  { id: "cat0003", name: "Vacation-&-Resort", image: category3 },
  { id: "cat0004", name: "The-Land", image: category4 },
  { id: "cat0005", name: "New-Construction", image: category5 },
  { id: "cat0006", name: "Luxury-Estate", image: category6 },
  { id: "cat0007", name: "Eco-Friendly", image: category7 },
  { id: "cat0008", name: "Commercial", image: category8 },
];
