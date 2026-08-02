"use client";
import { useLang } from "@/components/CurrencyProvider";
import { CONTENT, type SiteContent } from "@/lib/content";

// Returns the site copy for the current language (Danish when DKK is chosen).
export function useContent(): SiteContent {
  return CONTENT[useLang()];
}
