import { GoogleAuthButton } from "@/components/buttons/SubmitButton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { auth, signIn } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Login() {
  const session = await auth()

  if (session?.user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen w-full flex">

      {/* Right side - Login form */}
      <div className="w-full flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md border-2 bg-card">
          <CardHeader className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">Unlock the Possibilities</h1>
            <h2 className="text-4xl font-bold tracking-tight">of Generative AI</h2>
          </CardHeader>
          <CardContent className="mt-8">
            <div className="flex flex-col gap-4">
              <form
                className="w-full"
                action={async () => {
                  "use server"
                  await signIn("google")
                }}
              >
                <GoogleAuthButton  />
              </form>

            </div>

            <div className="mt-6 text-center text-sm text-gray-400">
              By signing in, you agree to our{" "}
              <a href="#" className="underline hover:text-muted-foreground">
                Terms of Service
              </a>
              ,{" "}
              <a href="#" className="underline hover:text-muted-foreground">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-muted-foreground">
                Data Usage Properties
              </a>
              .
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
