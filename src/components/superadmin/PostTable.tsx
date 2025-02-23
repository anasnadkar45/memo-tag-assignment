import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/lib/types";
import Status from "./Status";


export default function PostTable({ posts }: { posts: Post[] }) {
    return (
        <Table>
            <TableHeader className="border">
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="border">
                {posts.map((post) => (
                    <TableRow key={post.id}>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.User?.name || "Unknown"}</TableCell>
                        <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    post.status === "APPROVED"
                                        ? "default"
                                        : post.status === "REJECTED"
                                            ? "destructive"
                                            : "secondary"
                                }
                            >
                                {post.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Status postStatus={post.status} postId={post.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}