import { cn, formatCurrency } from "../../../lib/utils";

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  // Ensures two decimal places
  const stringValue = value.toFixed(2);
  // Split into integer and decimal parts
  const [intValue, floatValue] = stringValue.split(".");

  return (
    <p className={cn("text-xl", className)}>
      {formatCurrency(intValue)}
      {/* <span className="text-xs align-super">تومان</span> */}
      {/* <span className="text-xs align-super">.{floatValue}</span> */}
    </p>
  );
};

export default ProductPrice;
