import { DefaultSelection } from "@prisma/client/runtime/library";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSelection["user"];
    }
}