"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Github, Loader2 } from "lucide-react";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface iAppProps {
  text: string;
  variant?:
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;
  className?: string;
}

export function SubmitButton({ text, variant,className }: iAppProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className={cn("w-fit", className)} variant={variant}>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className={cn("w-fit", className)} variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
    const { pending } = useFormStatus();
    return (
      <>
        {pending ? (
          <Button variant="outline" className="w-full" disabled>
            <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button variant="outline" className="w-full">
            <FaGoogle />
            Sign in with Google
          </Button>
        )}
      </>
    );
  }