import { PageBody } from "@/components/layout/custom/page-body";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/custom/page-header";
import { AdminPageContents } from "./_components/admin-page-contents";
import { getCategory } from "@/actions/category.actions";
import { checkAdmin } from "@/lib/auth-util";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const { data } = await getCategory();
  if (!checkAdmin) return redirect("/");

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Welcome admin</PageHeaderHeading>
        <PageHeaderDescription>
          Here you can add a new blog post and select a category for it. Use the
          options below to customize your content and ensure it fits within the
          selected category.
        </PageHeaderDescription>
      </PageHeader>
      <PageBody>
        <AdminPageContents categories={data} />
      </PageBody>
    </div>
  );
};

export default AdminPage;
