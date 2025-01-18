import { PageBody } from "@/components/custom/page-body";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/custom/page-header";
import { AdminPageContents } from "./_components/admin-page-contents";
import { getCategory } from "@/actions/category.actions";

const AdminPage = async () => {
  const categories = await getCategory();
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
        <AdminPageContents categories={categories?.data} />
      </PageBody>
    </div>
  );
};

export default AdminPage;
