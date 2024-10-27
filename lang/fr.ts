import error from "@/lang/fr/error.json";
import pages from "@/lang/fr/pages.json";
import toast from "@/lang/fr/toast.json";
import rules from "@/lang/fr/rules.json";
import card from "@/lang/fr/components/card.json";

export default defineI18nLocale((_locale) => {
  return {
    pages,
    toast,
    error,
    rules,
    components: {
      card
    }
  };
});
