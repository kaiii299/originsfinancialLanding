import type { IOurTeam } from "@/lib/interface";
import type { Entry } from "contentful";

type Props = {
  memberData: Entry<IOurTeam, "WITHOUT_UNRESOLVABLE_LINKS", string>;
};

// Team member

const OurTeamComponent = ({ memberData }: Props) => {
  const { name, group, role, profileImage } = memberData.fields;
  return (
    <div>
      <div className="space-y-4">
        <div>
          <img
            src={profileImage?.fields.file?.url}
            alt={profileImage?.fields.title}
            title={profileImage?.fields.title}
            width={400}
            height={800}
            draggable={false}
            loading="lazy"
            className="md:h-[500px] h-[200px] rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col text-start justify-start items-start">
          <h2 className="font-semibold">{name}</h2>
          <span className="text-sm">{role}</span>
        </div>
      </div>
    </div>
  );
};

export default OurTeamComponent;
