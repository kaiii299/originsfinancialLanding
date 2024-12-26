import type { IconType } from 'react-icons/lib';
import * as LuReactIcons from 'react-icons/lu'
import * as BiReactIcons from "react-icons/bi";
import * as FaReactIcons from "react-icons/fa"
import * as IoReactIcons from "react-icons/io"
import * as SlReactIcons from "react-icons/sl"
import * as MdReactIcons from "react-icons/md"
import * as PiReactIcons from "react-icons/pi"
import * as Fa6ReactIcons from "react-icons/fa6"

type props = {
  iconName?: string
  classname? : string
  size?:string
}

export const CustomIcon = ({iconName, classname, size}: props) => {

  const DisplayIcons = (iconName: string): IconType | null => {
    // Lucide icon
    if (iconName in LuReactIcons) {
      return LuReactIcons[iconName as keyof typeof LuReactIcons];
    }
    // Box icons
    if (iconName in BiReactIcons){
      return BiReactIcons[iconName as keyof typeof BiReactIcons];
    }
    if (iconName in FaReactIcons ){
      return FaReactIcons[iconName as keyof typeof FaReactIcons];
    }
    if (iconName in IoReactIcons ){
      return IoReactIcons[iconName as keyof typeof IoReactIcons];
    }
    if (iconName in SlReactIcons ){
      return SlReactIcons[iconName as keyof typeof SlReactIcons];
    }
    if (iconName in MdReactIcons ){
      return MdReactIcons[iconName as keyof typeof MdReactIcons];
    }
    if (iconName in PiReactIcons ){
      return PiReactIcons[iconName as keyof typeof PiReactIcons];
    }
    if (iconName in Fa6ReactIcons ){
      return Fa6ReactIcons[iconName as keyof typeof Fa6ReactIcons];
    }
    else {
      return null;
    }
  };

  const IconComponent = DisplayIcons(iconName!);

  return (
    <>
    {IconComponent && (
      <span>
        <IconComponent className={classname} size={size} />
      </span>
    )}
  </>
  )
}
