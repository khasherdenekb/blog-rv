import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircleIcon } from "lucide-react";

type CustomAvatarProps = {
  fallback: string;
  image: string;
  imageAlt: string;
  author?: string;
  commentCount?: number;
};

export function CustomAvatar({
  fallback,
  image,
  author,
  imageAlt,
  commentCount,
}: CustomAvatarProps) {
  return (
    <div className={"flex gap-2"}>
      <Avatar>
        <AvatarImage src={image} alt={imageAlt} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      {author ? (
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{author}</p>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span>
              <MessageCircleIcon className="w-3 h-3" />
            </span>
            <p>{commentCount} comments</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
