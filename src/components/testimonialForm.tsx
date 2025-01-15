import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LuStar } from "react-icons/lu";
import { useState } from "react";

// Zod Schema for validation
const testimonialSchema = z.object({
  description: z.string().min(1, "Description is required"),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  ratings: z.number().min(1, "Rating is required"),
  testimonialFor: z.string().min(1, "Testimonial For is required"),
});

type TestimonialFormInputs = z.infer<typeof testimonialSchema>;

type Props = {
  testimonialFor: string;
};

const TestimonialForm = ({ testimonialFor }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TestimonialFormInputs>({
    resolver: zodResolver(testimonialSchema), // Use Zod resolver
    defaultValues: {
      testimonialFor: `${testimonialFor}`,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [starState, setStarState] = useState<number>();

  const onSubmit: SubmitHandler<TestimonialFormInputs> = async (data) => {
    console.log(data);

    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setResponseMessage("Testimonial submitted successfully!");
        reset(); 
        setStarState(undefined); 
      } else {
        const errorResponse = await response.json();
        setResponseMessage(
          `Failed to submit testimonial: ${
            errorResponse.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      setResponseMessage("An error occurred while submitting the testimonial.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleStarClick(e: React.MouseEvent<SVGElement>): void {
    const index = parseInt(e.currentTarget.dataset.index || "0", 10);
    if (index + 1 == starState) return;
    setValue("ratings", (index + 1)); 
    setStarState(index + 1);
  }

  return (
    <div className="my-5 ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-start">
        <div className="grid md:grid-cols-2 gap-5 md:justify-center md:items-center ">
          {/* Name */}
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <Label htmlFor="role">Your Role</Label>
            <Select onValueChange={(value) => setValue("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Your Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Role</SelectLabel>
                  <SelectItem value="Client">Client</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Business Partner">
                    Business Partner
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-2">{errors.role.message}</p>
            )}
          </div>
        </div>

        {/* Rating */}
        <div>
          <Label htmlFor="ratings">Ratings</Label>
          <div className="flex gap-2 text-3xl text-gray-300">
            {[...new Array(5)].map((_, index) => (
              <LuStar
                className={`cursor-pointer ${
                  starState && index < starState && "text-main"
                }`}
                key={index}
                onClick={(e) => {
                  handleStarClick(e); 
                  setValue("ratings", index  ); 
                }}
                data-index={index}
                style={{
                  fill: starState && index < starState ? "#8dabcd" : "none", 
                  stroke: "#8dabcd", 
                }}
              />
            ))}
          </div>
          <input
            type="hidden"
            {...register("ratings", { required: "Rating is required" })}
          />
          {errors.ratings && (
            <p className="text-red-500 text-sm mt-2">
              {errors.ratings.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Additional feedback</Label>
          <Textarea
            id="description"
            rows={6}
            {...register("description")}
            className="mt-1 resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-max bg-main">
          Submit Testimonial
        </Button>
      </form>
    </div>
  );
};

export default TestimonialForm;
