import type { EntryFieldTypes, EntrySkeletonType } from "contentful";

export interface Ihero extends EntrySkeletonType {
  title: EntryFieldTypes.Symbol;
  subtitle: EntryFieldTypes.Symbol;
  buttonText: EntryFieldTypes.Symbol;
}
