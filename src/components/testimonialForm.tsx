import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Zod Schema for validation
const testimonialSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  testimonialFor: z.string().min(1, "Testimonial For is required"),
});

type TestimonialFormInputs = z.infer<typeof testimonialSchema>;

const TestimonialForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TestimonialFormInputs>({
    resolver: zodResolver(testimonialSchema), // Use Zod resolver
  });

  const onSubmit: SubmitHandler<TestimonialFormInputs> = (data) => {
    console.log("Form Data: ", data);
  };

  return (
    <div className="my-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            {...register("title")}
            className="mt-1"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={4}
            {...register("description")}
            className="mt-1"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            {...register("name")}
            className="mt-1"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            onValueChange={(value) => setValue("role", value)}
          >
            <SelectTrigger>
              <span>Select Role</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Client">Client</SelectItem>
              <SelectItem value="Partner">Partner</SelectItem>
              <SelectItem value="Team Member">Team Member</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div> 

        {/* Submit Button */}
        <Button type="submit" className="w-1/4 bg-main">
          Submit Testimonial
        </Button>
      </form>
    </div>
  );
};

export default TestimonialForm;