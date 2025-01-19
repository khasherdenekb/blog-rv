import React from "react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CustomAvatar } from "../layout/custom/custom-avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ArrowUpRightFromCircleIcon, CalendarDaysIcon } from "lucide-react";

export const BlogCards = () => {
  return (
    <div>
      <Card className="h-full min-h-[400px]">
        <CardHeader className="p-0 h-48">
          <Image
            unoptimized
            src={
              "https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171862_l7yZ0wujj8o2SowiKTUsfLEEx8KunYNd.jpg"
            }
            alt="dev"
            width="0"
            height="0"
            className="w-full h-full object-cover rounded-tl-md rounded-tr-md"
          />
        </CardHeader>
        <CardContent className="h-[60%] p-3">
          <div className="flex justify-between items-center">
            <Badge>Productivity</Badge>
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="h-4 w-4" />
              <span className="text-xs font- text-muted-foreground">
                2025/01/01
              </span>
            </div>
          </div>
          <div className="pt-2">
            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
              10 Essential tips for Productive Remote Work
            </h4>
            <p className="leading-7 [&:not(:first-child)]:mt-2 line-clamp-3">
              The king, seeing how much happier his subjects were, realized the
              error of his ways and repealed the joke tax.
            </p>
          </div>
          <CardFooter className="flex flex-col p-0 pt-5 items-start w-full">
            <div className="flex gap-2 items-center">
              <CustomAvatar
                imageAlt="KB"
                fallback="KB"
                image="https://avatars.githubusercontent.com/u/98733664?v=4"
                author="Khash-Erdene"
                commentCount={12}
              />
            </div>
            <div className="pt-2 w-full">
              <Button variant={"outline"} className="w-full">
                <p>Read More</p>
                <span>
                  <ArrowUpRightFromCircleIcon className="w-3 h-3" />
                </span>
              </Button>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};
