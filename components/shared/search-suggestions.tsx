"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Search, TrendingUp, Clock, X } from "lucide-react";
import Link from "next/link";

interface SearchSuggestionsProps {
  query: string;
  onClose: () => void;
}

const SearchSuggestions = ({ query, onClose }: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(recent);

    // Mock trending searches
    setTrendingSearches([
      "گوشی موبایل",
      "لپ‌تاپ",
      "هدفون",
      "ساعت هوشمند",
      "تبلت",
    ]);

    // Mock suggestions based on query
    if (query.length > 1) {
      const mockSuggestions = [
        `${query} ارزان`,
        `${query} جدید`,
        `${query} اصل`,
        `خرید ${query}`,
        `${query} با تخفیف`,
      ];
      setSuggestions(mockSuggestions);
    }
  }, [query]);

  const handleSearch = (searchTerm: string) => {
    // Add to recent searches
    const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    const updatedRecent = [
      searchTerm,
      ...recent.filter((item: string) => item !== searchTerm),
    ].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));

    // Navigate to search
    window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
  };

  const clearRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  if (!query && recentSearches.length === 0 && trendingSearches.length === 0) {
    return null;
  }

  return (
    <Card className="absolute top-full left-0 right-0 z-50 mt-2 shadow-lg">
      <CardContent className="p-4 space-y-4">
        {/* Search Suggestions */}
        {suggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
              <Search className="w-4 h-4" />
              پیشنهادات جستجو
            </h4>
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="block w-full text-right p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                جستجوهای اخیر
              </h4>
              <button
                onClick={clearRecentSearches}
                className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                پاک کردن
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleSearch(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Trending Searches */}
        {trendingSearches.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              جستجوهای پرطرفدار
            </h4>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleSearch(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchSuggestions;

