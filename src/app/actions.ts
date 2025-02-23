"use server"
import { auth, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { PostStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type State = {
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
    updatedStatus?: PostStatus;
};

const postSchema = z.object({
    title: z
        .string()
        .min(3, { message: "The title has to be a minimum character length of 3" }),
    content: z
        .string()
        .min(3, { message: "The content has to be a minimum character length of 3" }),
})

export async function addNewPost(prevState: any, formData: FormData) {
    const session = await auth()
    const user = session?.user

    if (!user?.id) {
        return {
            status: "error",
            message: "User not found. Please log in to add a new posts."
        };
    }

    const validateFields = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    })

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Validation failed.",
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    try {
        const data = await prisma.post.create({
            data: {
                title: validateFields.data.title,
                content: validateFields.data.content,
                userId: user.id
            }
        })

        if (data) {
            return {
                status: "success",
                message: "Your post have been created successfully."
            };
        }

        const state: State = {
            status: "success",
            message: "Your post have been created successfully.",
        };
        return state;
    } catch (err) {
        return {
            status: "error",
            message: "An error occurred while creating the post. Please try again later."
        };
    }
}

export async function updatePostStatus(prevState: any, formData: FormData) {
    const session = await auth();
    const user = session?.user;

    if (!user?.id) {
        return {
            status: "error",
            message: "User not found. Please log in to update post status."
        };
    }

    const postId = formData.get("postId") as string;
    const status = formData.get("status") as PostStatus;

    if (!postId || !status) {
        return {
            status: "error",
            message: "Invalid data. Post ID or Status is missing."
        };
    }

    console.log("Updating Post:", postId, "New Status:", status);

    try {
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { status },
        });

        if (updatedPost) {
            revalidatePath("/superadmin");

            return {
                status: "success",
                message: "Your post status has been updated successfully.",
                updatedStatus: status, // Send back updated status for UI
            };
        }

        const state: State = {
            status: "success",
            message: "Your post status have been updated successfully.",
            updatedStatus:status
        };
        return state;
    } catch (err) {
        console.error("Error updating post:", err);
        return {
            status: "error",
            message: "An error occurred while updating the post status. Please try again later."
        };
    }
}

export async function handleSignOut() {
    await signOut()
}