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
import { TUser, UseUser } from "@/hooks/use-user";
import { useImageUpload } from "@/hooks/use-image-upload";
import { CustomAvatar } from "@/components/layout/custom/custom-avatar";
import Link from "next/link";
import { updateUserProfile } from "@/actions/users.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { TUsersSchema, usersSchema } from "@/schemas/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleUploadFile } from "@/lib/file-util";
import { toast } from "sonner";

type UserDropdownMenuProps = {
  setOpen: (open: boolean) => void;
  user: TUser;
};

export function UserSection() {
  const [open, setOpen] = useState(false);
  const { user, updateUser } = UseUser();

  if (!user) return null;

  return (
    <div>
      <UserDropdownMenu setOpen={setOpen} user={user} />
      <UserDialog
        open={open}
        setOpen={setOpen}
        user={user}
        updateUser={updateUser}
      />
    </div>
  );
}

export function UserDialog(
  props: Readonly<
    UserDropdownMenuProps & { open: boolean; updateUser: (user: TUser) => void }
  >
) {
  const { open, setOpen, user, updateUser } = props;

  const form = useForm<TUsersSchema>({
    resolver: zodResolver(usersSchema),
    defaultValues: {
      username: user.username,
      avatarUrl: user.avatarUrl,
    },
  });

  const onSubmit = async () => {
    const avatarUrl = await handleUploadFile(form.getValues().avatarUrl);
    const result = await updateUserProfile({
      data: {
        avatarUrl,
        username: form.getValues().username,
      },
    });
    if (result?.status === 200) {
      toast.success(result?.data?.message);
      setOpen(false);
      const updatedUser = {
        ...user,
        username: form.getValues().username,
        avatarUrl: avatarUrl || user.avatarUrl,
      };
      updateUser(updatedUser);
    } else {
      toast.error(result?.data?.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="space-y-0 text-left contents">
          <DialogTitle className="px-6 py-4 text-base border-b border-border">
            Edit profile
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set a
          username.
        </DialogDescription>
        <div className="overflow-y-auto">
          <ProfileBg defaultImage="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/03/what-is-a-blog-1.webp" />
          <Avatar form={form} defaultImage={form.getValues().avatarUrl} />
          <div className="px-6 pt-4 pb-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={`username`}>
                          {user?.username}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              id={`username`}
                              className="peer pe-9"
                              placeholder="Username"
                              type="text"
                              {...field}
                            />
                            <div className="absolute inset-y-0 flex items-center justify-center pointer-events-none end-0 pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                              <Check
                                size={16}
                                strokeWidth={2}
                                className="text-emerald-500"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={"email"}>Email</Label>
                  <div className="flex rounded-lg shadow-sm shadow-black/5">
                    <Input
                      disabled
                      id={"email"}
                      className="shadow-none -ms-px rounded-s-none"
                      value={user?.email}
                      type="text"
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <DialogFooter className="px-6 py-4 border-t border-border">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            Save changes
          </Button>
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
            image={user?.avatarUrl ?? ""}
            imageAlt={`${user?.username?.[0]}${user?.username?.[1]}`}
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
          <Link href={"/admin"}>
            <DropdownMenuItem>Admin</DropdownMenuItem>
          </Link>
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
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-muted">
        <img
          className="object-cover w-full h-full"
          src={defaultImage}
          alt={"Default profile background"}
          width={512}
          height={96}
        />
      </div>
    </div>
  );
}

function Avatar({
  defaultImage,
  form,
}: Readonly<{ defaultImage?: string; form: UseFormReturn<TUsersSchema> }>) {
  const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange } =
    useImageUpload();

  const currentImage = previewUrl ?? defaultImage;

  return (
    <div className="px-6 -mt-10">
      <div className="relative flex items-center justify-center overflow-hidden border-4 rounded-full shadow-sm size-20 border-background bg-muted shadow-black/10">
        {currentImage && (
          <img
            src={currentImage}
            className="object-cover w-full h-full"
            width={80}
            height={80}
            alt={currentImage}
          />
        )}
        <button
          type="button"
          className="absolute flex items-center justify-center text-white transition-colors rounded-full cursor-pointer size-8 bg-black/60 outline-offset-2 hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
          onClick={handleThumbnailClick}
          aria-label="Change profile picture"
        >
          <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            handleFileChange(e);
            form.setValue("avatarUrl", e.target.files?.[0]);
          }}
          className="hidden"
          accept="image/*"
          aria-label="Upload profile picture"
        />
        {form.formState.errors.avatarUrl && (
          <p className="text-destructive text-[13px] font-medium">
            {form.formState.errors.avatarUrl.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
