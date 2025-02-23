import PostForm from "@/components/forms/post-form";
import { Topbar } from "@/components/global/Topbar";
import { Wrapper } from "@/components/global/Wrapper";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <>
      <Topbar>
        <section className="text-left space-y-2 animate-fade-in">
          <h1 className="text-2xl text-foreground/80 font-extrabold tracking-tight lg:text-3xl">
            Welcome to Our <span className="text-primary">Community</span>
          </h1>
          <p className="text-lg font-medium text-muted-foreground">
            Share your thoughts and connect with others in our vibrant community.
          </p>
        </section>
      </Topbar>
      <Wrapper className="max-w-5xl mx-auto">
        <PostForm />
      </Wrapper>
    </>
  );
}
