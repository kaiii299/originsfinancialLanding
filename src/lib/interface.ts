import type { EntryFieldTypes, EntrySkeletonType } from "contentful";

export interface Ihero extends EntrySkeletonType {
  sys: {
    id: EntryFieldTypes.Symbol;
  };
  fields: {
    title: EntryFieldTypes.Symbol;
    subtitle: EntryFieldTypes.Symbol;
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
