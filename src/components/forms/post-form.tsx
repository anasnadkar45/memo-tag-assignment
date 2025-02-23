"use client"

import type React from "react"

import { useActionState, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Send, ImageIcon, Sparkle } from "lucide-react"
import { addNewPost } from "@/app/actions"
import { toast } from "sonner"
import { SubmitButton } from "../buttons/SubmitButton"
import { generatePostContent } from "@/lib/generatePostContent"

export default function PostForm() {
  const initialState = { message: "", status: undefined, errors: {} }
  const [state, formAction] = useActionState(addNewPost, initialState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message)
      setContent("")
    } else if (state.status === "error") {
      toast.error(state.message)
    }
  }, [state])

  const handleGenerateContent = async () => {
    if (!title) {
      toast.error("Please enter a title first");
      return;
    }
    setIsGeneratingDescription(true);
    try {
      const generatedDescription = await generatePostContent(title);
      setContent(generatedDescription);
      toast.success("Description generated successfully");
    } catch (error) {
      console.error("Error generating description:", error);
      toast.error("Failed to generate description. Please try again later.");
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create a New Post</CardTitle>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your post title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            {state?.errors?.title && (
              <p className="text-destructive">{state.errors.title}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your community post here..."
              name="content"
              value={content}
              rows={5}
            />
            {state?.errors?.content && (
              <p className="text-destructive">{state.errors.content}</p>
            )}
            <Button
              type="button"
              onClick={handleGenerateContent}
              disabled={isGeneratingDescription}
              variant={'secondary'}
            >
              <span><Sparkle /></span> {isGeneratingDescription ? "Generating..." : "Generate Description"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <SubmitButton text="Submit Post" />
        </CardFooter>
      </form>
    </Card>
  )
}

