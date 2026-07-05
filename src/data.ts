import { Service, Project, Testimonial, FAQItem, BlogPost } from './types';

export const servicesData: Service[] = [
  {
    id: 'create',
    title: 'EXTRUDE',
    description: 'Lead-free, architectural-grade uPVC profile extrusion designed for extreme climates.',
    iconName: 'create',
    pillText: '100% Lead-Free',
    detailedHeadline: 'uPVC PROFILE EXTRUSION',
    longDescription: 'We manufacture premium architectural uPVC profiles stabilized with eco-friendly Calcium-Zinc. Designed to resist extreme UV radiation and structural wind pressure up to 3000 Pa, our profiles ensure lifetime durability and pristine color retention.',
    fullDetails: [
      'Calcium-Zinc Stabilized (100% Lead-Free)',
      'EN 12608 Class-B European Standard Compliant',
      'High Titanium Dioxide (Advanced Anti-Yellowing)',
      'Engineered Multi-Chamber Heat & Sound Insulation'
    ]
  },
  {
    id: 'engage',
    title: 'FABRICATE',
    description: 'Custom-dimension sliding, casement, and high-performance fenestration systems.',
    iconName: 'engage',
    pillText: 'Custom Fabrication',
    detailedHeadline: 'ARCHITECTURAL WINDOWS & DOORS',
    longDescription: 'Our advanced fabrication division builds high-precision, custom-engineered windows and doors. Incorporating heavy-duty galvanized steel reinforcements and multi-point locks, we deliver watertight, secure systems for any facade.',
    fullDetails: [
      '60mm, 80mm, 88mm & 112mm Track Systems',
      'Multi-point Security Locking Configurations',
      'Co-extruded TPE Gaskets for Absolute Water-Tightness',
      'Luxurious Hot-Melt Lamination (Slate Gray & Oak)'
    ]
  },
  {
    id: 'grow',
    title: 'SHIELD',
    description: 'Advanced soundproof barriers and thermal blocks for maximum energy savings.',
    iconName: 'grow',
    pillText: 'Acoustic & Thermal Shield',
    detailedHeadline: 'ENERGY-SAVING BARRIERS',
    longDescription: 'Engineered with optimized thermal breaks, our uPVC profiles accommodate double and triple glazing with ease. Our systems deliver up to 40 dB noise reduction and lower heat transfer, cutting heating and cooling power costs by up to 30%.',
    fullDetails: [
      'Sound Attenuation up to 40 dB Noise Cut',
      'Extremely Low Thermal Conductivity (U-Value)',
      'Green Building Council Certified Materials',
      'High Impact Strength and Wind Load Deflection'
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: 'high-rise',
    title: 'Aurelia Sky Towers',
    subtitle: 'Premium Wind-Resistant 3-Track Sliding Systems',
    description: 'A high-altitude coastal residential development utilizing custom-reinforced amTOP sliding systems designed to withstand extreme cyclonic wind loads up to 3000 Pa.',
    imageSrc: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
    tag: 'Wind-Shield Sliding',
    year: '2026'
  },
  {
    id: 'villa',
    title: 'The Oakridge Villas',
    subtitle: 'Elegant Golden Oak Laminated Casement Series',
    description: 'Luxury residential estate utilizing dual-color laminated profile systems, delivering natural wood grain warmth inside paired with clean white profiles on the exterior.',
    imageSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    tag: 'Wood Grain Casement',
    year: '2025'
  },
  {
    id: 'corporate',
    title: 'Zenith Biotech Park',
    subtitle: 'Acoustic Soundproofing Double-Glazed System',
    description: 'Modern commercial laboratory and office cluster utilizing amTOP multi-chamber uPVC profiles to achieve up to 40dB soundproofing, creating a focused working environment.',
    imageSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    tag: 'Double-Glazed Acoustic',
    year: '2026'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    quote: 'amTOP changed how we specify openings in our high-end structures. Their lead-free, Calcium-Zinc profiles are ecologically responsible and incredibly weather-stable. Even in high UV zones, we see zero color degradation.',
    author: 'Ar. Rajesh Malhotra',
    role: 'Principal Architect',
    company: 'Malhotra Associates',
    stat: '<0.1%',
    statLabel: 'Thermal Expansion'
  },
  {
    id: 't2',
    quote: 'We partner with amTOP for high-precision uPVC window systems. Their multi-chamber profile designs and co-extruded TPE gaskets deliver exceptional soundproofing and complete water-tightness during intense monsoon seasons.',
    author: 'Vikramjit Singh',
    role: 'Managing Director',
    company: 'Skyline Infrastructures',
    stat: '-40 dB',
    statLabel: 'Noise Reduction'
  },
  {
    id: 't3',
    quote: 'By switching to amTOP’s multi-chamber thermal shield profiles, our commercial projects have cut down heating and cooling loads by almost 30%. They are the absolute benchmark for sustainable green-building materials.',
    author: 'Dr. Evelyn D’Souza',
    role: 'Sustainability Lead',
    company: 'GreenSpace Developers',
    stat: '30%',
    statLabel: 'Power Savings'
  }
];

export const faqData: FAQItem[] = [
  {
    question: 'What makes amTOP uPVC profiles eco-friendly?',
    answer: 'All amTOP profiles are manufactured using 100% lead-free raw materials. We utilize premium Calcium-Zinc stabilizers, which are non-toxic, eco-friendly, and completely safe for residential, school, and healthcare environments.'
  },
  {
    question: 'How do your profiles withstand extreme sun and UV rays?',
    answer: 'amTOP profiles contain a high percentage of Titanium Dioxide (TiO2) and premium UV-stabilizers. This ensures that the profiles resist UV degradation, prevent brittleness, and do not discolour or turn yellow, even under the harshest Indian summer heat.'
  },
  {
    question: 'Do you offer lamination and colour choices?',
    answer: 'Yes. Besides our high-gloss Pristine White profiles, we offer premium hot-melt lamination in luxurious textures, including Slate Gray, Charcoal Black, Golden Oak, Dark Oak, and Walnut, using weather-resistant European foils.'
  },
  {
    question: 'How do amTOP profiles perform under heavy monsoon winds?',
    answer: 'Our profiles are designed with distinct internal chambers to accommodate heavy-duty galvanized steel reinforcements. This structural skeleton, combined with multi-point locks, allows our windows to withstand high wind pressures up to 3000 Pa, perfect for coastal high-rises.'
  },
  {
    question: 'What is the acoustic soundproofing performance?',
    answer: 'Our multi-chamber profile architecture, when combined with double or triple glazing and high-grade co-extruded TPE gaskets, provides superior sound insulation that can reduce external ambient noise by up to 40 dB.'
  },
  {
    question: 'Are amTOP profiles low maintenance?',
    answer: 'Extremely. Unlike wood or aluminium, amTOP uPVC profiles do not warp, rot, rust, or corrode. They require no painting or polishing — a simple wipe-down with mild soapy water keeps them looking brand-new for over 25-30 years.'
  },
  {
    question: 'Which standards and certifications do amTOP profiles meet?',
    answer: 'We manufacture in strict compliance with European standard EN 12608 Class-B, with rigorous in-house testing for impact strength, heat reversion, tensile behavior, and dimensional stability.'
  },
  {
    question: 'Can you supply custom profile shapes and auxiliary sections?',
    answer: 'Yes. Along with standard sliding and casement series, we manufacture a wide range of auxiliary profiles, coupling joints, bay pole connectors, and custom glazing beads to support complex architectural designs.'
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Silent Threat: Why Lead-Free uPVC is Crucial for Modern Home Health',
    category: 'Sustainability',
    readTime: '6 min read',
    date: 'Jul 2026',
    imageSrc: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'b2',
    title: 'Architectural Guide: Designing Fenestration for Coastal High-Rise Wind Loads',
    category: 'Engineering',
    readTime: '5 min read',
    date: 'Jun 2026',
    imageSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'b3',
    title: 'Thermal Efficiency in Green Architecture: Cutting Energy Bills by 30%',
    category: 'Innovation',
    readTime: '7 min read',
    date: 'May 2026',
    imageSrc: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400&auto=format&fit=crop'
  }
];
