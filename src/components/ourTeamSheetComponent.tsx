import type { IOurTeam, ITestimonials } from "@/lib/interface";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import type { ReactNode } from "react";
import type { Entry, EntryCollection } from "contentful";
import { slugify } from "@/lib/slugify";
import { useState, useEffect } from "react";
import MarkdownComponent from "./markDownComponents";
import TestimonialForm from "./testimonialForm";
import TestimonialComponent from "@/components/sections/testimonialComponent";

type Props = {
  children: ReactNode;
  ourTeamMemberData: Entry<IOurTeam, "WITHOUT_UNRESOLVABLE_LINKS", string>;
  testimonialData: EntryCollection<
    ITestimonials,
    "WITHOUT_UNRESOLVABLE_LINKS",
    string
  >;
};

const OurTeamSheetComponent = ({
  ourTeamMemberData,
  children,
  testimonialData,
}: Props) => {
  const {
    name,
    profileImage,
    awards,
    certifications,
    description,
    group,
    otherSpecialization,
    role,
  } = ourTeamMemberData.fields;

  const [isOpen, setIsOpen] = useState(false);

  // State to force re-render
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Parse the query parameter 'name' from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const queryName = urlParams.get("name");

    // Check if the name matches the team member's name
    if (queryName && queryName === slugify(name)) {
      setIsOpen(true);
    }
  }, [name]);

  const handleSheetOpen = (name: string | undefined) => {
    // Update the URL with the name as a query parameter
    const url = new URL(window.location.href);
    url.searchParams.set("name", name!);
    window.history.pushState({}, "", url.toString());

    // Open the sheet
    setIsOpen(true);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Profile cards */}
      <SheetTrigger onClick={() => handleSheetOpen(slugify(name))}>
        {children}
      </SheetTrigger>

      <SheetContent
        onInteractOutside={(event) => event.preventDefault()}
        className="bg-whitesmoke md:p-8 p-5 overflow-auto "
      >
        <SheetHeader >
          <SheetTitle className="space-y-3 mb-2">
            <div className="flex md:flex-row  md:items-center flex-col justify-start items-start  gap-5">
              <div>
                <img
                  className="w-28 h-28 object-cover rounded-full"
                  src={profileImage?.fields.file?.url}
                  alt={name}
                  title={name}
                />
              </div>

              <div className="text-start md:space-y-1">
                <h2 className="font-bold text-3xl">{name}</h2>
                <div>
                  <div className="flex md:flex-row flex-col gap-2 text-sm  items-start justify-start">
                    <span>{role}</span>
                    {group && (
                      <span className="text-gray-400 hidden md:flex">|</span>
                    )}
                    {group && (
                      <div className="text-sm">
                        <span>{group}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SheetTitle>
          <MarkdownComponent
            className="font-light text-start mb-5"
            markdown={description}
          />

          {/* Don't remove if not will have missing description warning warning  */}
          <SheetDescription></SheetDescription>

          <hr />

          <div className="space-y-5 text-start">
            <div className="space-y-2 mt-3">
              <h2 className="font-bold text-lg capitalize">Certifications</h2>
              <MarkdownComponent markdown={certifications} />
            </div>

            <div className="space-y-2">
              {awards && <h2 className="font-bold text-lg capitalize">Awards</h2>}
              <MarkdownComponent markdown={awards} />
            </div>

            <div className="space-y-2">
              {otherSpecialization && <h2 className="font-bold text-lg capitalize">
                Other Specialization
              </h2>}
              <MarkdownComponent markdown={otherSpecialization} />
            </div>
          </div>

          {/* Form */}
          <div className="text-start">
            <h2 className="font-bold text-2xl capitalize mt-10">
              Say something nice about {name}
            </h2>
            <div>
              <TestimonialForm testimonialFor={name.toLowerCase()} />
            </div>

            {/* Testimonials */}
            <div className="md:my-10">
              <h2 className="font-bold text-2xl capitalize mt-10">
                What others say about {name}
              </h2>
            </div>
            <div>
              <TestimonialComponent  testimonialsData={testimonialData} />
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default OurTeamSheetComponent;
