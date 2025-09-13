import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import UpdateUserForm from "./update-user-form";

export const metadata: Metadata = {
  title: "ویرایش کاربر",
};

const UpdateUserPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const user = await getUserById(id);

  if (!user) notFound();

  console.log(user);

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h1 className="h3-bold">ویرایش کاربر</h1>
      {/* FORM HERE */}
      <UpdateUserForm user={user} />
    </div>
  );
};

export default UpdateUserPage;
