"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { logout } from "@/lib/auth-util";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TUser, useUser } from "@/hooks/use-user";
import { useImageUpload } from "@/hooks/use-image-upload";
import { CustomAvatar } from "@/components/custom/custom-avatar";

type UserDropdownMenuProps = {
  setOpen: (open: boolean) => void;
  user: TUser;
};

export function UserSection() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  if (!user) return null;

  return (
    <div>
      <UserDropdownMenu setOpen={setOpen} user={user} />
      <UserDialog open={open} setOpen={setOpen} user={user} />
    </div>
  );
}

export function UserDialog(
  props: Readonly<UserDropdownMenuProps & { open: boolean }>
) {
  const { open, setOpen, user } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            Edit profile
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set a
          username.
        </DialogDescription>
        <div className="overflow-y-auto">
          <ProfileBg defaultImage="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/03/what-is-a-blog-1.webp" />
          <Avatar defaultImage="https://s1.zerochan.net/Yagami.Light.600.4093947.jpg" />
          <div className="px-6 pb-6 pt-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`username`}>{user?.username}</Label>
                <div className="relative">
                  <Input
                    id={`username`}
                    className="peer pe-9"
                    placeholder="Username"
                    defaultValue="Khash-Erdene Bolor-Erdene"
                    type="text"
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={"email"}>Email</Label>
                <div className="flex rounded-lg shadow-sm shadow-black/5">
                  <Input
                    disabled
                    id={"email"}
                    className="-ms-px rounded-s-none shadow-none"
                    value={user?.email}
                    type="text"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter className="border-t border-border px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function UserDropdownMenu(props: Readonly<UserDropdownMenuProps>) {
  const { setOpen, user } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Open account menu">
          <CustomAvatar
            fallback="KB"
            image="https://s1.zerochan.net/Yagami.Light.600.4093947.jpg"
            imageAlt="KB"
            avatarClassname="w-8 h-8"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex flex-col">
          <span>Signed in as</span>
          <span className="text-xs font-normal text-foreground">
            {user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Add blogs</DropdownMenuItem>
          <DropdownMenuItem>My blogs</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Edit profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProfileBg({ defaultImage }: Readonly<{ defaultImage?: string }>) {
  return (
    <div className="h-32">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
        <img
          className="h-full w-full object-cover"
          src={defaultImage}
          alt={"Default profile background"}
          width={512}
          height={96}
        />
      </div>
    </div>
  );
}

function Avatar({ defaultImage }: Readonly<{ defaultImage?: string }>) {
  const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange } =
    useImageUpload();

  const currentImage = previewUrl ?? defaultImage;

  return (
    <div className="px-6 -mt-10">
      <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
        {currentImage && (
          <img
            src={currentImage}
            className="h-full w-full object-cover"
            width={80}
            height={80}
            alt={currentImage}
          />
        )}
        <button
          type="button"
          className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
          onClick={handleThumbnailClick}
          aria-label="Change profile picture"
        >
          <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          aria-label="Upload profile picture"
        />
      </div>
    </div>
  );
}
