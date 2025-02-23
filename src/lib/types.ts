
export type UserRole = "USER" | "SUPERADMIN";
export type PostStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  posts: Post[];
}

export interface Post {
    id: string;
    title: string;
    content: string;
    User?: User;
    userId?: string;
    status: PostStatus;
    createdAt: Date;
    updatedAt: Date;
  }