import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/product.actions";
import { SearchIcon } from "lucide-react";

const Search = async () => {
  const categories = await getAllCategories();

  return (
    <form action="/search" method="GET">
      <div dir="rtl" className="flex w-full max-w-sm items-center space-x-2">
        <Select name="category">
          <SelectTrigger dir="rtl" className="w-[180px]">
            <SelectValue placeholder="همه" />
          </SelectTrigger>
          <SelectContent dir="rtl">
            <SelectItem key={"All"} value={"all"}>
              همه
            </SelectItem>
            {categories.map((x) => (
              <SelectItem key={x.category} value={x.category}>
                {x.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name="q"
          type="text"
          placeholder="جستجو ..."
          className="md:w-[100px] lg:w-[300px] border border-gold placeholder:text-gold"
        />
        <Button>
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};

export default Search;
