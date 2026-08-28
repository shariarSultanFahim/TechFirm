export interface TeamSkill {
  name: string;
  percentage: number;
}

export interface TeamMemberDetails {
  id: string;
  name: string;
  role: string;
  badgeRole?: string;
  image: string;
  bio: string;
  competencies: string[];
  experienceYears: number | string;
  email: string;
  phone: string;
  signatureName?: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    globe?: string;
    instagram?: string;
  };
  skills: TeamSkill[];
  experienceDescription: string[];
}

export const teamMembersData: TeamMemberDetails[] = [
  {
    id: "megan-palms",
    name: "Megan Palms",
    role: "Online Director",
    badgeRole: "ONLINE DIRECTOR",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    bio: "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, TechFirm can get you back on track. A professionally managed services provider can give you the decisive edge to keep your technology running flawlessly.",
    competencies: [
      "Data Security",
      "Indoor Apps",
      "Information Technology",
      "Commercial Technology",
      "IT Management",
      "Multifunctional Technology"
    ],
    experienceYears: "5 Years",
    email: "prothems@gmail.com",
    phone: "888-555-3535",
    signatureName: "Megan Palms",
    socials: {
      facebook: "#",
      twitter: "#",
      globe: "#",
      instagram: "#"
    },
    skills: [
      { name: "DevOps Architecture", percentage: 80 },
      { name: "Cloud Infrastructure", percentage: 90 },
      { name: "Zero Trust Security", percentage: 60 },
      { name: "AI Automation", percentage: 70 }
    ],
    experienceDescription: [
      "Arcu vitae elementum curabitur vitae nunc sed. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Sed tempus urna et pharetra pharetra. Tempus iaculis urna id volutpat. At volutpat diam ut venenatis. Adipiscing sit in tellus integer. Semper auctor neque vitae tempus quam pellentesque nec nam.",
      "In vitae turpis massa sed elementum tempus egestas. Varius sit amet mattis vulputate enim nulla aliquet porttitor. Urna nunc id cursus metus aliquam. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Pellentesque eu tincidunt tortor aliquam nulla."
    ]
  },
  {
    id: "michael-carter",
    name: "Michael Carter",
    role: "Senior Designer",
    badgeRole: "SENIOR DESIGNER",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    bio: "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, TechFirm can get you back on track. A professionally managed services provider can give you the decisive edge to keep your technology running flawlessly.",
    competencies: [
      "Data Security",
      "Indoor Apps",
      "Information Technology",
      "Commercial Technology",
      "IT Management",
      "Multifunctional Technology"
    ],
    experienceYears: "6 Years",
    email: "m.carter@techfirm.com",
    phone: "888-555-3535",
    signatureName: "Michael Carter",
    socials: {
      facebook: "#",
      twitter: "#",
      globe: "#",
      instagram: "#"
    },
    skills: [
      { name: "UI/UX Architecture", percentage: 85 },
      { name: "Design Systems", percentage: 95 },
      { name: "Frontend Prototyping", percentage: 75 },
      { name: "Interaction Motion", percentage: 80 }
    ],
    experienceDescription: [
      "Arcu vitae elementum curabitur vitae nunc sed. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Sed tempus urna et pharetra pharetra. Tempus iaculis urna id volutpat. At volutpat diam ut venenatis.",
      "In vitae turpis massa sed elementum tempus egestas. Varius sit amet mattis vulputate enim nulla aliquet porttitor. Urna nunc id cursus metus aliquam."
    ]
  },
  {
    id: "david-thompson",
    name: "David Thompson",
    role: "Senior Designer",
    badgeRole: "SENIOR DESIGNER",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    bio: "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, TechFirm can get you back on track. A professionally managed services provider can give you the decisive edge to keep your technology running flawlessly.",
    competencies: [
      "Data Security",
      "Indoor Apps",
      "Information Technology",
      "Commercial Technology",
      "IT Management",
      "Multifunctional Technology"
    ],
    experienceYears: "5 Years",
    email: "d.thompson@techfirm.com",
    phone: "888-555-3535",
    signatureName: "David Thompson",
    socials: {
      facebook: "#",
      twitter: "#",
      globe: "#",
      instagram: "#"
    },
    skills: [
      { name: "Donations", percentage: 80 },
      { name: "Volunteers", percentage: 90 },
      { name: "Sociability", percentage: 60 },
      { name: "Medicine", percentage: 70 }
    ],
    experienceDescription: [
      "Arcu vitae elementum curabitur vitae nunc sed. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Sed tempus urna et pharetra pharetra. Tempus iaculis urna id volutpat. At volutpat diam ut venenatis.",
      "In vitae turpis massa sed elementum tempus egestas. Varius sit amet mattis vulputate enim nulla aliquet porttitor. Urna nunc id cursus metus aliquam."
    ]
  },
  {
    id: "james-anderson",
    name: "James Anderson",
    role: "Senior Designer",
    badgeRole: "SENIOR DESIGNER",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    bio: "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, TechFirm can get you back on track.",
    competencies: [
      "Data Security",
      "Indoor Apps",
      "Information Technology",
      "Commercial Technology",
      "IT Management",
      "Multifunctional Technology"
    ],
    experienceYears: "7 Years",
    email: "j.anderson@techfirm.com",
    phone: "888-555-3535",
    signatureName: "James Anderson",
    skills: [
      { name: "Donations", percentage: 80 },
      { name: "Volunteers", percentage: 90 },
      { name: "Sociability", percentage: 60 },
      { name: "Medicine", percentage: 70 }
    ],
    experienceDescription: [
      "Arcu vitae elementum curabitur vitae nunc sed. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Sed tempus urna et pharetra pharetra.",
      "In vitae turpis massa sed elementum tempus egestas. Varius sit amet mattis vulputate enim nulla aliquet porttitor."
    ]
  },
  {
    id: "robert-mitchell",
    name: "Robert Mitchell",
    role: "Senior Designer",
    badgeRole: "SENIOR DESIGNER",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    bio: "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, TechFirm can get you back on track.",
    competencies: [
      "Data Security",
      "Indoor Apps",
      "Information Technology",
      "Commercial Technology",
      "IT Management",
      "Multifunctional Technology"
    ],
    experienceYears: "8 Years",
    email: "r.mitchell@techfirm.com",
    phone: "888-555-3535",
    signatureName: "Robert Mitchell",
    skills: [
      { name: "Donations", percentage: 80 },
      { name: "Volunteers", percentage: 90 },
      { name: "Sociability", percentage: 60 },
      { name: "Medicine", percentage: 70 }
    ],
    experienceDescription: [
      "Arcu vitae elementum curabitur vitae nunc sed. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Sed tempus urna et pharetra pharetra.",
      "In vitae turpis massa sed elementum tempus egestas. Varius sit amet mattis vulputate enim nulla aliquet porttitor."
    ]
  },
  {
    id: "david-smith",
    name: "David Smith",
    role: "Senior Designer",
    badgeRole: "SENIOR DESIGNER",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
    bio: "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, TechFirm can get you back on track.",
    competencies: [
      "Data Security",
      "Indoor Apps",
      "Information Technology",
      "Commercial Technology",
      "IT Management",
      "Multifunctional Technology"
    ],
    experienceYears: "4 Years",
    email: "d.smith@techfirm.com",
    phone: "888-555-3535",
    signatureName: "David Smith",
    skills: [
      { name: "Donations", percentage: 80 },
      { name: "Volunteers", percentage: 90 },
      { name: "Sociability", percentage: 60 },
      { name: "Medicine", percentage: 70 }
    ],
    experienceDescription: [
      "Arcu vitae elementum curabitur vitae nunc sed. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Sed tempus urna et pharetra pharetra.",
      "In vitae turpis massa sed elementum tempus egestas. Varius sit amet mattis vulputate enim nulla aliquet porttitor."
    ]
  },
  {
    id: "matthew-scott",
    name: "Matthew Scott",
    role: "Senior Designer",
    badgeRole: "SENIOR DESIGNER",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    bio: "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, TechFirm can get you back on track.",
    competencies: [
      "Data Security",
      "Indoor Apps",
      "Information Technology",
      "Commercial Technology",
      "IT Management",
      "Multifunctional Technology"
    ],
    experienceYears: "5 Years",
    email: "m.scott@techfirm.com",
    phone: "888-555-3535",
    signatureName: "Matthew Scott",
    skills: [
      { name: "Donations", percentage: 80 },
      { name: "Volunteers", percentage: 90 },
      { name: "Sociability", percentage: 60 },
      { name: "Medicine", percentage: 70 }
    ],
    experienceDescription: [
      "Arcu vitae elementum curabitur vitae nunc sed. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Sed tempus urna et pharetra pharetra.",
      "In vitae turpis massa sed elementum tempus egestas. Varius sit amet mattis vulputate enim nulla aliquet porttitor."
    ]
  },
  {
    id: "daniel-walker",
    name: "Daniel Walker",
    role: "Senior Designer",
    badgeRole: "SENIOR DESIGNER",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    bio: "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, TechFirm can get you back on track.",
    competencies: [
      "Data Security",
      "Indoor Apps",
      "Information Technology",
      "Commercial Technology",
      "IT Management",
      "Multifunctional Technology"
    ],
    experienceYears: "9 Years",
    email: "d.walker@techfirm.com",
    phone: "888-555-3535",
    signatureName: "Daniel Walker",
    skills: [
      { name: "Donations", percentage: 80 },
      { name: "Volunteers", percentage: 90 },
      { name: "Sociability", percentage: 60 },
      { name: "Medicine", percentage: 70 }
    ],
    experienceDescription: [
      "Arcu vitae elementum curabitur vitae nunc sed. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Sed tempus urna et pharetra pharetra.",
      "In vitae turpis massa sed elementum tempus egestas. Varius sit amet mattis vulputate enim nulla aliquet porttitor."
    ]
  },
  {
    id: "william-harris",
    name: "William Harris",
    role: "Senior Designer",
    badgeRole: "SENIOR DESIGNER",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1000&auto=format&fit=crop",
    bio: "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, TechFirm can get you back on track.",
    competencies: [
      "Data Security",
      "Indoor Apps",
      "Information Technology",
      "Commercial Technology",
      "IT Management",
      "Multifunctional Technology"
    ],
    experienceYears: "6 Years",
    email: "w.harris@techfirm.com",
    phone: "888-555-3535",
    signatureName: "William Harris",
    skills: [
      { name: "Donations", percentage: 80 },
      { name: "Volunteers", percentage: 90 },
      { name: "Sociability", percentage: 60 },
      { name: "Medicine", percentage: 70 }
    ],
    experienceDescription: [
      "Arcu vitae elementum curabitur vitae nunc sed. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Sed tempus urna et pharetra pharetra.",
      "In vitae turpis massa sed elementum tempus egestas. Varius sit amet mattis vulputate enim nulla aliquet porttitor."
    ]
  }
];

export function getTeamMember(slug: string): TeamMemberDetails {
  return (
    teamMembersData.find((m) => m.id.toLowerCase() === slug.toLowerCase()) || teamMembersData[0]!
  );
}
