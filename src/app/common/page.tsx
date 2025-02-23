import { PostCard } from "@/components/common/PostCard"
import { Topbar } from "@/components/global/Topbar"
import { Wrapper } from "@/components/global/Wrapper"
import PostTable from "@/components/superadmin/PostTable"
import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { Post } from "@/lib/types"
import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Manage Posts | Modern Community Post System",
}

const getPosts = async () => {
  const data = await prisma.post.findMany({
    where: {
      status: "APPROVED"
    },
    include: {
      User: true
    }
  })
  return data
}
export default async function Common() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const posts = await getPosts();
  console.log(posts)
  return (
    <>
      <Topbar>
        <h1 className="text-3xl font-bold">Manage Posts</h1>
      </Topbar>
      <Wrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link href={`/common/${post.id}`}>
              <PostCard post={post as Post} key={post.id} />
            </Link>
          ))}
        </div>
      </Wrapper>
    </>
  )
}

