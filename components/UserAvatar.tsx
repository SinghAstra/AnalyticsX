import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SessionContext } from "@/context/SessionContext";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useContext } from "react";

export function UserAvatar() {
  const { session, isAuthenticating } = useContext(SessionContext);

  if (isAuthenticating) {
    return (
      <div className="rounded-full w-8 h-8 animate-pulse bg-slate-500"></div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {session?.user?.name && session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={32}
            height={32}
            className="rounded-full hidden md:block border-2 border-primary"
          />
        ) : (
          <span className="w-8 h-8 rounded-full flex items-center justify-center bg-primary">
            {session?.user?.name?.charAt(0)}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 cursor-pointer m-2">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
