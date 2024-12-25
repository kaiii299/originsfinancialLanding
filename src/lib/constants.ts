import img1 from "@/assets/images/Visionex_files/case_1.png";
import img2 from "@/assets/images/Visionex_files/case_2.png";
import img3 from "@/assets/images/Visionex_files/case_3.png";
import img4 from "@/assets/images/Visionex_files/case_4.png";
import img5 from "@/assets/images/Visionex_files/case_5.png";
import img6 from "@/assets/images/Visionex_files/case_6.png";

import heroImage1 from "@/assets/images/hero-img.png";


export const navItems = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about-us" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export const plans = [
  {
    name: "Basic Plan",
    price: "$19",
    frequency: "Monthly",
    description: [
      "Single User",
      "10,000 words per month",
      "Basic Writing Styles",
      "Plagiarism Checking",
      "Email Customer Support",
      "Basic API Access",
    ],
    highlight: false,
    icon: "LuSparkles", // You can replace this with an actual icon or image
  },
  {
    name: "Standard Plan",
    price: "$49",
    frequency: "Monthly",
    description: [
      "5 User",
      "100,000 words per month",
      "Advanced Writing Styles",
      "Plagiarism Checking",
      "Email + Chat Customer Support",
      "API Access",
    ],
    highlight: true,
    icon: "LuDiamond", // Replace with an icon/image
  },
  {
    name: "Golden Plan",
    price: "$119",
    frequency: "Monthly",
    description: [
      "Unlimited User",
      "Unlimited",
      "Advanced Writing Styles",
      "Plagiarism Checking",
      "Priority Support Customer Support",
      "Custom Solutions",
    ],
    highlight: false,
    icon: "LuCircle", // Replace with an icon/image
  },
];

export const services = [
  {
    title: "Writing Blog Content",
    description:
      "Consider what your readers are interested in, what problems they need solutions for, or what trends are currently relevant in your industry.",
    linkText: "Try Writing Blog Content",
    link: "#",
    image: img1, // Updated image path
  },
  {
    title: "Email Marketing",
    description:
      "Email can be used to inform subscribers about upcoming events, webinars, workshops, conferences, or product launches.",
    linkText: "Try Email Marketing",
    link: "#",
    image: img2, // Updated image path
  },
  {
    title: "News Article",
    description:
      "We denounce with righteous indignation dislike men who are so beguiled and demoralized by the charms of pleasure.",
    linkText: "Try News Article",
    link: "#",
    image: img3, // Updated image path
  },
  {
    title: "Social Media Content",
    description:
      "Could you please provide me with more information about the type of content you're looking to describe.",
    linkText: "Try Social Media Content",
    link: "#",
    image: img4, // Updated image path
  },
  {
    title: "SEO Content",
    description:
      "In order to have a result that is more in with the final result, the graphic designers report the typographers.",
    linkText: "Try SEO Content",
    link: "#",
    image: img5, // Updated image path
  },
  {
    title: "Technical Writing",
    description:
      "It provides feedback on style, readability, overused words, clichés, and more. It also offers integration with popular word processors.",
    linkText: "Try Technical Writing",
    link: "#",
    image: img6, // Updated image path
  },
];

export const testimonials = [
  {
    quote: "As an avid writer, I've always been on the lookout for tools that can elevate my writing experience and help me craft compelling content effortlessly. My search finally ended when I discovered the Writing AI Tool. This incredible AI.",
    name: "Jenna Knight",
    role: "Marketing Coordinator",
  },
  {
    quote: "In a world where content creation is paramount, this AI writing website has become my secret weapon. It consistently delivers outstanding content, saves me time, and empowers me to produce top-notch materials for various purposes.",
    name: "Max Brooks",
    role: "SEO Expert",
  },
  {
    quote: "The AI's ability to generate coherent and engaging content across a wide range of topics is nothing short of impressive. Whether I need a blog post, marketing copy, or even a complex research paper, the AI consistently delivers content that not only meets but often exceeds my expectations.",
    name: "Lily Morgan",
    role: "Product Designer",
  },
  {
    quote: "The time-saving aspect cannot be overstated. Instead of spending hours brainstorming, researching, and writing, I can now get a solid draft within minutes. This has allowed me to focus on other crucial aspects of my work.",
    name: "Ava Thompson",
    role: "Product Designer",
  },
  {
    quote: "But beyond its efficiency, the tool's ability to spark creativity is unparalleled. It acted as a reliable brainstorming partner, suggesting fresh ideas and unique angles to explore in my writing.",
    name: "Sophia Reed",
    role: "Product Designer",
  },
  {
    quote: "Moreover, I must commend the AI for its impressive research capabilities. Whenever I needed to include supporting facts or statistical data, the tool provided accurate and up-to-date information, saving me precious time.",
    name: "Ethan Parker",
    role: "Content Creator",
  },
  {
    quote: "The AI consistently delivers high-quality content that saves me time and ensures my success. The customer support team has been prompt, helpful, and dedicated to ensuring my satisfaction.",
    name: "Oliver Hayes",
    role: "Digital Marketer",
  },
  {
    quote: "As someone who often finds themselves grappling with writer's block, tight deadlines, and the need for high-quality content, this platform has been a true game-changer.",
    name: "Eleanor Pena",
    role: "SEO Expert",
  },
];


export const faqs = [
  {
    question: "Can I use Unwrapped for client projects?",
    answer:
      "Yes, Unwrapped can be used for any type of project, including client projects.",
  },
  {
    question: "Where is Unwrapped made?",
    answer:
      "Unwrapped is developed by a global team with a passion for innovation.",
  },
  {
    question: "What does 'free updates' include?",
    answer:
      "Free updates include bug fixes, performance improvements, and new features as they are released.",
  },
  {
    question: "Can I use Unwrapped for open source projects?",
    answer:
      "Absolutely! Unwrapped is designed to work seamlessly in open-source projects.",
  },
  {
    question: "Can I sell themes that I made with Unwrapped?",
    answer:
      "Yes, you can sell themes made with Unwrapped. Ensure you comply with the licensing terms.",
  },
];

export const aboutUs = [
  {
    image: heroImage1,
    title: "Section 1 Title",
    description:
      "This is the content for section 1. It appears on the right side on desktop and below the image on mobile.",
  },
  {
    image: heroImage1,
    title: "Section 2 Title",
    description:
      "This is the content for section 2. It appears on the left side on desktop and below the image on mobile.",
  },
  {
    image: heroImage1,
    title: "Section 3 Title",
    description:
      "This is the content for section 3. It appears on the right side on desktop and below the image on mobile.",
  },
];