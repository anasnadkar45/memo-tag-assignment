import { Topbar } from '@/components/global/Topbar';
import { Wrapper } from '@/components/global/Wrapper';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/db';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Markdown from 'react-markdown'
import React from 'react';

const getPost = async (postId: string) => {
    const data = await prisma.post.findUnique({
        where: { id: postId },
        include: { User: true },
    });
    return data;
};

const Page = async ({ params }: { params: { id: string } }) => {
    const post = await getPost(params.id);

    if (!post) {
        return (
            <>
                <Topbar>
                    <h1 className="text-3xl font-bold">Post Not Found</h1>
                </Topbar>
                <Wrapper>
                    <p className="text-gray-600">Sorry, the post you are looking for does not exist.</p>
                </Wrapper>
            </>
        );
    }

    return (
        <>
            <Topbar>
                <Link href={'/common'}>
                    <ArrowLeft />
                </Link>
                <h1 className="text-3xl font-bold">{post.title}</h1>
            </Topbar>
            <Wrapper>
                <div className="max-w-5xl mx-auto bg-card shadow-lg rounded-lg p-6">
                    <div className="mb-4">
                        <Markdown>
                            {post.content || "No content available."}
                        </Markdown>
                    </div>
                    <div className="mt-6 flex items-center gap-3 border-t pt-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold">
                            {post.User?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                            <p className="font-semibold">{post.User?.name || "Unknown User"}</p>
                            <p className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

export default Page;
