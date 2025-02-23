"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import { Post } from "@/lib/types"

export const PostCard = ({ post }: { post: Post }) => {
    return (
        <Card key={post.id} className="overflow-hidden transition-shadow hover:shadow-lg">
            <CardHeader className="pb-0">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage
                            src={post.User?.image}
                            alt={post.User?.name}
                            width={100}
                            height={100}
                        />
                        <AvatarFallback>
                            {post.User?.name}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            {post.User?.name} • {post.createdAt.toISOString()}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <p className="text-muted-foreground line-clamp-1">{post.content}</p>
            </CardContent>
        </Card>
    )
}
