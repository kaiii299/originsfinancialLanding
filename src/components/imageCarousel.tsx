import { motion, useScroll, useTransform } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { useRef } from "react";

type Asset = {
  fields: {
    file: {
      url: string;
    };
    title?: string;
    description?: string;
  };
};

type Props = {
  images: Asset[];
};

const ImageCarousel = ({ images }: Props) => {
  const targetRef = useRef<HTMLDivElement>(null);
  // Get scrollYprogress
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 2], ["-90%", "-10%"]);
  
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {images.map((image, index) => {
          const imageUrl = image?.fields?.file?.url;
          const imageTitle = image?.fields?.title || "Image";
          const imageAlt = image?.fields?.description || imageTitle;

          return (
            <CarouselItem key={index} className="basis-[670px]">
              <div className="p-1 md:p-0">
                <motion.div
                  style={{ x }}
                  ref={targetRef}
                  transition={{ duration: 0.5 }}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      title={imageTitle}
                      alt={imageAlt}
                      width={500}
                      height={500}
                      className="rounded-md w-full object-cover h-[450px]"
                    />
                  )}
                </motion.div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious variant={"none"} className="md:flex hidden" />
      <CarouselNext variant={"none"} className="md:flex hidden"/>
    </Carousel>
  );
};

export default ImageCarousel;
