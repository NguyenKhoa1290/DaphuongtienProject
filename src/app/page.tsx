// ================================================================
// ROOT PAGE - Redirect thẳng vào trang Bạn bè
// ================================================================

import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/friends");
}
