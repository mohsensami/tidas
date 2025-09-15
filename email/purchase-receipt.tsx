import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { formatCurrency } from "@/lib/utils";
import { Order } from "@/types";
import sampleData from "@/db/sample-data";
require("dotenv").config();

type OrderInformationProps = {
  order: Order;
};

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export default function PurchaseReceiptEmail({ order }: { order: Order }) {
  return <Html></Html>;
}
