import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
} from "lucide-react";
import contactData from "./contactData.json";

gsap.registerPlugin(ScrollTrigger);

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  project: z.string().min(1, "Please select a class type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use data from JSON
  const data = contactData;

  // Helper function to get the correct icon
  const getSocialIcon = (iconName: string) => {
    const icons: {
      [key: string]: React.ComponentType<{
        className?: string;
        size?: string | number;
      }>;
    } = {
      Instagram,
      Facebook,
    };
    return icons[iconName] || null;
  };

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      project: "",
      message: "",
    },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned large heading that zooms
      gsap.fromTo(
        headingRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".contact-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (values: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);

    const btn = document.querySelector(".submit-btn") as HTMLButtonElement;
    if (btn) {
      gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    }

    try {
      const templateParams = {
        name: values.name,
        email: values.email,
        class_type: values.project,
        message: values.message,
        to_email: "sara.osama.mowafy@gmail.com",
      };

      await emailjs.send(
        "service_a43meg2",
        "template_zntra6r",
        templateParams,
        "-Ol3m9zZfU8e9QJAJ",
      );

      // Success feedback using toast
      toast.success("Message sent successfully! I'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error(
        "Failed to send message. Please try again or contact me directly at sara.osama.mowafy@gmail.com",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 px-8 relative overflow-hidden"
      style={{ background: "hsl(222 25% 4%)" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, hsl(185 100% 55% / 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="section-label mb-6">{data.contact.title}</p>
          <h2
            ref={headingRef}
            className="display-text"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 700,
              opacity: 0,
              lineHeight: "1",
            }}
          >
            {data.contact.mainTitle}
            <br />
            <span className="gradient-text">{data.contact.subtitle}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="contact-item" style={{ opacity: 0 }}>
              <p className="section-label mb-3">Email</p>
              <a
                href={`mailto:${data.info.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:text-[hsl(var(--primary))] transition-colors duration-300 cursor-none flex items-center gap-3"
              >
                <Mail size={20} className="flex-shrink-0" />
                {data.info.email}
              </a>
            </div>
            <div className="contact-item" style={{ opacity: 0 }}>
              <p className="section-label mb-3">WhatsApp</p>
              <a
                href={`https://wa.me/${data.info.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:text-[hsl(var(--primary))] transition-colors duration-300 cursor-none flex items-center gap-3"
              >
                <MessageCircle size={20} className="flex-shrink-0" />
                {data.info.phone}
              </a>
            </div>
            <div className="contact-item" style={{ opacity: 0 }}>
              <p className="section-label mb-3">Location</p>
              <p className="text-[hsl(var(--muted-foreground))]">
                {data.info.location.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < data.info.location.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <div className="contact-item" style={{ opacity: 0 }}>
              <p className="section-label mb-3">Follow</p>
              <div className="flex gap-6">
                {data.info.social.map((social) => {
                  const Icon = getSocialIcon(social.icon);
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300 cursor-none flex items-center gap-2"
                    >
                      {Icon && <Icon size={16} />}
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Decorative element */}
            <div
              className="contact-item hidden lg:block"
              style={{ opacity: 0 }}
            >
              <div
                className="h-40 w-full relative overflow-hidden"
                style={{ borderRadius: "4px", background: "hsl(222 25% 7%)" }}
              >
                <div
                  className="absolute top-6 left-6 w-8 h-8 border border-[hsl(var(--primary)/0.3)]"
                  style={{ borderRadius: "2px" }}
                />
                <div className="absolute bottom-6 right-6 w-6 h-6 rounded-full border border-[hsl(var(--accent)/0.3)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xs text-[hsl(var(--muted-foreground))] tracking-widest uppercase text-center px-8">
                    "{data.decorative.quote}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="contact-form space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="contact-item" style={{ opacity: 0 }}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="section-label block mb-3">
                            {data.form.fields.name.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={data.form.fields.name.placeholder}
                              className="form-input focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 rounded-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="contact-item" style={{ opacity: 0 }}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="section-label block mb-3">
                            {data.form.fields.email.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={data.form.fields.email.placeholder}
                              className="form-input focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 rounded-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="contact-item" style={{ opacity: 0 }}>
                  <FormField
                    control={form.control}
                    name="project"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="section-label block mb-3">
                          {data.form.fields.project.label}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className="form-input focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 rounded-none"
                              style={{
                                background: "transparent",
                                cursor: "none",
                              }}
                            >
                              <SelectValue
                                placeholder={
                                  data.form.fields.project.placeholder
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data.form.fields.project.options.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="contact-item" style={{ opacity: 0 }}>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="section-label block mb-3">
                          {data.form.fields.message.label}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={data.form.fields.message.placeholder}
                            className="form-input focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 rounded-none"
                            rows={data.form.fields.message.rows}
                            style={{ resize: "none" }}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="contact-item" style={{ opacity: 0 }}>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 text-center">
                    {data.contact.description}
                  </p>
                  <Button
                    type="submit"
                    className="btn-primary submit-btn w-full justify-center py-4"
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting
                        ? data.form.submit.loadingText
                        : data.form.submit.text}
                    </span>
                    <span className="text-lg anima-spin transition-all duration-300">
                      {isSubmitting
                        ? data.form.submit.loadingIcon
                        : data.form.submit.icon}
                    </span>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
