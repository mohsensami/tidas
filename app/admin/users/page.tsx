import { Metadata } from "next";
import { getAllUsers } from "@/lib/actions/user.actions";
import { requireAdmin } from "@/lib/auth-guard";

import { auth } from "@/auth";
import DeleteDialog from "@/components/shared/delete-dialog";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatId } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "کاربران",
};

const AdminUserPage = async (props: {
  searchParams: Promise<{
    page: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const { page = "1" } = searchParams;

  const users = await getAllUsers({ page: Number(page) });

  return (
    <div className="space-y-2">
      <h1 className="h3-bold">کاربران</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">نام و نام خانوادگی</TableHead>
              <TableHead className="text-right">ایمیل</TableHead>
              <TableHead className="text-right">نقش</TableHead>
              <TableHead className="text-right">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{formatId(user.id)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/users/${user.id}`}>ویرایش</Link>
                  </Button>
                  {/* DELETE DIALOG HERE */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users?.totalPages && users.totalPages > 1 && (
          <Pagination page={page} totalPages={users.totalPages} />
        )}
      </div>
    </div>
  );
};

export default AdminUserPage;
