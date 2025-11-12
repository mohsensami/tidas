import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";

interface ProductHeaderProps {
  name: string;
  category: string;
}

const ProductHeader = ({ name, category }: ProductHeaderProps) => {
  return (
    <div className="wrapper py-4 border-b">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>خانه</span>
        </Link>
        <ChevronLeft className="w-4 h-4 rotate-180" />
        <Link
          href={`/search?category=${encodeURIComponent(category)}`}
          className="hover:text-foreground transition-colors"
        >
          {category}
        </Link>
        <ChevronLeft className="w-4 h-4 rotate-180" />
        <span className="text-foreground font-medium line-clamp-1">{name}</span>
      </nav>
    </div>
  );
};

export default ProductHeader;
