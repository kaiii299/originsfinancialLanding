import type { EntryFieldTypes, EntrySkeletonType } from "contentful";

export interface iBreadCrumbItems {
  name: string,
  href: string,
  current: boolean,
}

export interface Ihero extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    title: EntryFieldTypes.Symbol;
    subTitle: EntryFieldTypes.Symbol;
    buttonText: EntryFieldTypes.Symbol;
  }
}

export interface IFaq extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    question: EntryFieldTypes.Symbol;
    answer: EntryFieldTypes.Symbol;
  };
}

export interface IVisionMission extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    image: EntryFieldTypes.AssetLink,
    missionTitle: EntryFieldTypes.Symbol;
    missionText: EntryFieldTypes.Symbol;
    visionTitle: EntryFieldTypes.Symbol;
    visionText: EntryFieldTypes.Symbol;
  };
}

export interface IService extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    title: EntryFieldTypes.Symbol;
    index: EntryFieldTypes.Integer;
    image: EntryFieldTypes.AssetLink;
    cardColor: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text
  };
}

export interface IWhyUs extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    title: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    cardColor?: EntryFieldTypes.Symbol;
    index?: EntryFieldTypes.Integer;
    image?: EntryFieldTypes.AssetLink;
    icon?: EntryFieldTypes.Symbol;

  };
}

export interface ICareer extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.RichText;
    buttonText: EntryFieldTypes.Symbol;
    shortDescription: EntryFieldTypes.Text;
    images: EntryFieldTypes.AssetLink[];
  };
}


export interface IOurTeam extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    name: EntryFieldTypes.Text;
    role: EntryFieldTypes.Text;
    group: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    profileImage: EntryFieldTypes.AssetLink;
    testimonials: EntryFieldTypes.Symbol;
    certifications: EntryFieldTypes.Text;
    awards: EntryFieldTypes.Text;
    otherSpecialization: EntryFieldTypes.Text;
    featured: EntryFieldTypes.Boolean;
  };
}

export interface IBlogs extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    slug: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    category: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    featured: EntryFieldTypes.Boolean;
    description: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
  };
}

export interface IEvents extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    slug: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    images: EntryFieldTypes.AssetLink[];
    location: EntryFieldTypes.Symbol; 
    when: EntryFieldTypes.Date;
    featured: EntryFieldTypes.Boolean;
    shortDescription: EntryFieldTypes.Text;
    description: EntryFieldTypes.RichText;
  };
}

export interface IProducts extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    slug: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    category: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    type: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    productDescription: EntryFieldTypes.RichText;
  };
}

export interface ITestimonials extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    description: EntryFieldTypes.Text;
    name: EntryFieldTypes.Symbol;
    // ratings: EntryFieldTypes.Number;
    role: EntryFieldTypes.Symbol;
    testimonialFor: EntryFieldTypes.Symbol;
  } 
}

export interface ICTA extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    buttonText: EntryFieldTypes.Symbol;
    link: EntryFieldTypes.Symbol;
  };
}

export interface IMisc extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    longDescription: EntryFieldTypes.Text;
    login: EntryFieldTypes.Symbol;
  };
}