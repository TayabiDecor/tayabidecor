import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Phone, Instagram, Loader2 } from "lucide-react";
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

// Local validation schema (no longer relying on the Replit backend)
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "8d1f9128-ac4a-4dc2-b8d2-1e7af9088cba",
          subject: "New Inquiry from Tayabi Decor Website",
          from_name: data.name,
          ...data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent",
          description:
            "Thank you for reaching out. We will get back to you shortly.",
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary tracking-widest uppercase text-sm font-semibold mb-4 block">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
              Let's build your{" "}
              <span className="italic font-light">dream space.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 text-balance">
              Whether you have a clear vision or need expert guidance, our
              master artisans are ready to bring your ideas to life. Contact us
              today for a consultation.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-foreground mb-1">
                    Phone
                  </h4>
                  <p className="text-muted-foreground">+971 50 426 6813</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-8 md:p-12 rounded-2xl shadow-xl shadow-black/5 border border-border/50"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium uppercase tracking-wider text-xs">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          className="bg-transparent border-0 border-b-2 border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors text-base py-4 h-auto placeholder:text-muted-foreground/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium uppercase tracking-wider text-xs">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          type="email"
                          className="bg-transparent border-0 border-b-2 border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors text-base py-4 h-auto placeholder:text-muted-foreground/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium uppercase tracking-wider text-xs">
                        Project Details
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your vision..."
                          className="bg-transparent border-0 border-b-2 border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors text-base py-4 min-h-[120px] resize-none placeholder:text-muted-foreground/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8 group relative px-8 py-4 bg-foreground text-background font-medium tracking-widest uppercase text-sm hover:bg-primary transition-colors duration-500 overflow-hidden flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>

      {/* Footer Minimal */}
      <div className="max-w-7xl mx-auto px-6 mt-32 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-muted-foreground text-sm font-medium">
          © {new Date().getFullYear()} Tayabi Decor. All rights reserved.
        </p>
        <div className="flex gap-6 text-muted-foreground">
          <a
            href="#"
            className="hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
          >
            <Instagram size={18} /> Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
