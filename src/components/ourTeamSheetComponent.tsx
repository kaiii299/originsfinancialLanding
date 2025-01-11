import type { IOurTeam } from "@/lib/interface";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import type { ReactNode } from "react";
import type { Entry } from "contentful";
import { slugify } from "@/lib/slugify";

type Props = {
  children: ReactNode;
  ourTeamMemberData: Entry<IOurTeam,"WITHOUT_UNRESOLVABLE_LINKS",string>
};

const OurTeamSheetComponent = ({ ourTeamMemberData,children }: Props) => {
  const handleSheetOpen = (name: string | undefined) => {
    // Update the URL with the ID as a query parameter
    const url = new URL(window.location.href);
    url.searchParams.set("name", name!);
    window.history.pushState({}, "", url.toString());
  };
  return (
    <Sheet>
      {/* Profile cards */}
      <SheetTrigger onClick={() => handleSheetOpen(slugify(ourTeamMemberData.fields.name))}>
        {children}
      </SheetTrigger>

      <SheetContent className="bg-whitesmoke">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default OurTeamSheetComponent;
