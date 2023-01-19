interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

export interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface PageInfo extends Sanitybody {
  _type: "pageInfo";
  address: string;
  backgroundInformation: string;
  email: string;
  role: string;
  heroImage: Image;
  name: string;
  phoneNumber: string;
  profilePic: Image;
}

export interface Skill extends Sanitybody {
  _id: Key | null | undefined;
  _type: "skill";
  image: Image;
  progress: number;
  title: string;
}
export interface Technology extends Sanitybody {
  _id: Key | null | undefined;
  _type: "skill";
  image: Image;
  progress: number;
  title: string;
}

export interface Experience extends Sanitybody {
  _id: Key | null | undefined;
  _type: "experience";
  company: string;
  companyImage: Image;
  dateStarted: date;
  dateEnded: date;
  isCurrentlyWorkingHere: boolean;
  jobTitle: string;
  points: string[];
  technologies: Technology[];
}
export interface Project extends Sanitybody {
  title: string;
  _type: "project";
  image: Image;
  linkToBuild: string;
  summary: string;
  technologies: Technology[];
}
export interface Social extends Sanitybody {
  _id: Key | null | undefined;
  _type: "social";
  title: string;
  url: string;
}
