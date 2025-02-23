"use client";
import { updatePostStatus } from "@/app/actions";
import { toast } from "sonner";
import { PostStatus } from "@prisma/client";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function Status({ postStatus, postId }: { postStatus: PostStatus; postId: string }) {
    const initialState = { message: "", status: undefined, updatedStatus: postStatus };
    const [state, formAction, pending] = useActionState(updatePostStatus, initialState);
    const [status, setStatus] = useState<PostStatus>(postStatus);
    const [clickedButton, setClickedButton] = useState<string | null>(null);

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
            setStatus(state.updatedStatus as PostStatus); 
            setClickedButton(null); 
        } else if (state.status === "error") {
            toast.error(state.message);
            setClickedButton(null); 
        }
    }, [state]);

    return (
        <div>
            {status === "PENDING" && (
                <form action={formAction} className="flex gap-2">
                    <input type="hidden" name="postId" value={postId} />
                    
                    <Button
                        type="submit"
                        name="status"
                        size="sm"
                        value="APPROVED"
                        disabled={pending}
                        onClick={() => setClickedButton("APPROVED")}
                    >
                        {pending && clickedButton === "APPROVED" ? (
                            <>
                                <Loader2 className="size-4 mr-2 animate-spin" />
                                Approving...
                            </>
                        ) : (
                            "Accept"
                        )}
                    </Button>

                    <Button
                        type="submit"
                        name="status"
                        size="sm"
                        variant="destructive"
                        value="REJECTED"
                        disabled={pending}
                        onClick={() => setClickedButton("REJECTED")}
                    >
                        {pending && clickedButton === "REJECTED" ? (
                            <>
                                <Loader2 className="size-4 mr-2 animate-spin" />
                                Rejecting...
                            </>
                        ) : (
                            "Reject"
                        )}
                    </Button>
                </form>
            )}

            {status === "APPROVED" && (
                <form action={formAction} className="relative gap-2 w-full">
                    <input type="hidden" name="postId" value={postId} />
                    <Button
                        type="submit"
                        name="status"
                        value="REJECTED"
                        size="sm"
                        variant="destructive"
                        disabled={pending}
                        onClick={() => setClickedButton("REJECTED")}
                    >
                        {pending && clickedButton === "REJECTED" ? (
                            <>
                                <Loader2 className="size-4 mr-2 animate-spin" />
                                Rejecting...
                            </>
                        ) : (
                            "Reject"
                        )}
                    </Button>
                </form>
            )}

            {status === "REJECTED" && (
                <form action={formAction} className="relative flex gap-2">
                    <input type="hidden" name="postId" value={postId} />
                    <Button
                        type="submit"
                        name="status"
                        value="APPROVED"
                        size="sm"
                        disabled={pending}
                        onClick={() => setClickedButton("APPROVED")}
                    >
                        {pending && clickedButton === "APPROVED" ? (
                            <>
                                <Loader2 className="size-4 mr-2 animate-spin" />
                                Approving...
                            </>
                        ) : (
                            "Accept"
                        )}
                    </Button>
                </form>
            )}
        </div>
    );
}
