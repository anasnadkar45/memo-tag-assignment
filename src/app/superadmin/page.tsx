import { Topbar } from "@/components/global/Topbar"
import { Wrapper } from "@/components/global/Wrapper"
import PostTable from "@/components/superadmin/PostTable"
import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { Post } from "@/lib/types"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Manage Posts | Modern Community Post System",
}

const getPosts = async () => {
  const data = await prisma.post.findMany({
    include: {
      User: true
    }
  })
  return data
}
export default async function SuperAdminPanel() {
  const posts = await getPosts();
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <>
      <Topbar>
        <h1 className="text-3xl font-bold">Manage Posts</h1>
      </Topbar>
      <Wrapper>
        <PostTable posts={posts as Post[]} />
      </Wrapper>
    </>
  )
}

