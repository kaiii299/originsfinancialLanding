import type { iBreadCrumbItems } from "@/lib/interface";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";

type Props = {
  breadCrumbsItems: iBreadCrumbItems[];
  className? : string
};

const BreadCrumbComponent = ({ breadCrumbsItems, className }: Props) => {
  /*
   *Takes in An array of items [name, href]
   *Will determin how many links are there, by the array.
   */

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="text-subTitle md:text-base text-sm font-[satoshi-bold]">
        {breadCrumbsItems.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {!item.current ? (
                <>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={item.href}>
                      {item.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbComponent;
