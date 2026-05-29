"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  CircleUser,
  LogIn,
  LogOut,
  Monitor,
  Moon,
  Star,
  Sun,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { features, testimonials } from "@/constant";
import { createClient } from "@/supabase/client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import MotionWrapper from "./MotionWrapper";
import { useMouseMove } from "@/hooks/useMouseMove";

export default function Home({
  userSession,
}: {
  userSession: string | undefined;
}) {
  const { rotate, handleMouseMove } = useMouseMove();
  const [isHovered, setIsHovered] = useState(false);
  const { setTheme } = useTheme();
  const router = useRouter();

  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.refresh();
    router.push("/");
  };

  return (
    <div className="min-h-screen">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center  sticky top-0 h-16  gap-4 border-b bg-background  md:px-6 z-50">
        <Link
          href="/"
          className="text-xl border-2 border-black/50 dark:border-white/50  font-bold bg-green-500 rounded-full p-1"
        >
          SG
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div>
              {userSession && (
                <>
                  <Link
                    href="/admin/dashboard"
                    className="block rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground w-full"
                  >
                    Dashboard
                  </Link>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </>
              )}
              {!userSession && (
                <Link
                  href="/auth"
                  className="rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground w-full flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" /> Login
                </Link>
              )}
            </div>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Sun className="h-4 w-4" /> Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="h-4 w-4" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="h-4 w-4" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="h-4 w-4" /> System
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-24">
          <div className="flex flex-col justify-between md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <MotionWrapper>
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  Discover Gadgets on the Go
                </h2>
              </MotionWrapper>
              <MotionWrapper delay={0.2}>
                <p className="text-xl  mb-6">
                  Shop the latest tech right from your pocket with our
                  innovative mobile app.
                </p>
              </MotionWrapper>
              <MotionWrapper delay={0.4}>
                <Button size="lg" className="bg-[#1BC464] hover:bg-[#1bc464d7]">
                  Download Now <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </MotionWrapper>
            </div>

            <div className="w-2/3 sm:w-1/3 ">
              <motion.div
                className="relative"
                style={{ perspective: 1000 }}
                animate={{
                  rotateX: isHovered ? rotate.rotateX : 0,
                  rotateY: isHovered ? rotate.rotateY : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onMouseMove={handleMouseMove}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <Image
                  width={1331}
                  height={888}
                  src="/app-pics.png"
                  alt="GadgetApp Screenshot"
                  className="rounded-3xl object-cover shadow-2xl mx-auto h-[500px] w-full"
                />
                <Badge className="absolute top-4 right-4 bg-[#ffee02] text-black">
                  New Release
                </Badge>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h3 className="text-3xl font-bold mb-8 text-center">App Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <MotionWrapper key={index} delay={index * 0.1}>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <feature.icon className="h-12 w-12  mb-4" />
                    <h4 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h4>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              </MotionWrapper>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <Card className="bg-[#1BC464] text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-4">
                Download GadgetApp Today
              </h3>
              <p className="text-xl mb-6">
                Experience the future of gadget shopping at your fingertips.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-0 md:flex-nowrap md:space-x-4">
                <Button size="lg" className="bg-white hover:bg-indigo-100">
                  <Image
                    src="/apple.jpeg"
                    alt="App Store"
                    className="mr-2 h-6 w-6"
                    height={24}
                    width={24}
                  />
                  App Store
                </Button>
                <Button size="lg" className="bg-white hover:bg-indigo-100">
                  <Image
                    src="/google-play.png"
                    alt="Google Play"
                    className="mr-2 h-6 w-full"
                    height={24}
                    width={24}
                  />
                  Google Play
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-24">
          <h3 className="text-3xl font-bold mb-8 text-center">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <MotionWrapper key={index} delay={index * 0.1}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={`https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww`}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                        width={48}
                        height={48}
                      />

                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <div className="flex text-[#1BC464]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="italic">
                      &quot; {testimonial.comment} &quot;
                    </p>
                  </CardContent>
                </Card>
              </MotionWrapper>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Gadget Shopping?
          </h3>
          <p className="text-xl  mb-8">
            Download GadgetApp now and get 20% off your first in-app purchase!
          </p>
          <Button size="lg" className="bg-[#1BC464] hover:bg-[#1bc464d7]">
            Get Started <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </section>
      </main>

      <footer className="bg-[#1BC464] text-white">
        <Link
          href={`#`}
          target="_blank"
          className="container mx-auto px-4 text-center"
        >
          <p>{new Date().getFullYear()} &copy; Shopgadgets</p>
        </Link>
      </footer>
    </div>
  );
}
