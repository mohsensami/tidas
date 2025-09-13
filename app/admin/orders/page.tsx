import { auth } from "@/auth";
import { deleteOrder, getAllOrders } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { requireAdmin } from "@/lib/auth-guard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Pagination from "@/components/shared/pagination";
import DeleteDialog from "@/components/shared/delete-dialog";

export const metadata: Metadata = {
  title: "سفارشات",
};

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await requireAdmin();
  // const { page = "1" } = await props.searchParams;
  const { page = "1", query: searchText } = await props.searchParams;

  const session = await auth();
  if (session?.user.role !== "admin")
    throw new Error("admin permission required");

  const orders = await getAllOrders({
    page: Number(page),
    query: searchText,
  });

  console.log(orders);

  return (
    <div className="space-y-2">
      <h2 className="h3-bold">سفارشات</h2>
      {searchText && (
        <div>
          Filtered by <i>&quot;{searchText}&quot;</i>{" "}
          <Link href={`/admin/orders`}>
            <Button variant="outline" size="sm">
              Remove Filter
            </Button>
          </Link>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">تاریخ</TableHead>
              <TableHead className="text-right">خریدار</TableHead>
              <TableHead className="text-right">جمع</TableHead>
              <TableHead className="text-right">وضعیت پرداخت</TableHead>
              <TableHead className="text-right">وضعیت ارسال</TableHead>
              <TableHead className="text-right">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : "پرداخت نشده"}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : "تحویل داده نشده"}
                </TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/order/${order.id}`}>جزئیات</Link>
                  </Button>
                  {/* DELETE */}
                  <DeleteDialog id={order.id} action={deleteOrder} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={orders?.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
