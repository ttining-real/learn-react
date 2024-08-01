import { createElement as h } from "https://esm.sh/react";
import ButtonListPage from "./ButtonListPage.js";
import CardListPage from "./CardListPage.js";

function Layout() {
  return h(
    "div",
    { className: "Layout" },
    h(
      "section",
      {
        className: "component-section",
        "aria-label": "버튼 컴포넌트 리스트",
      },
      h("h1", { className: "heading-title" }, "버튼 컴포넌트"),
      h(ButtonListPage)
    ),
    h(
      "section",
      {
        className: "component-section",
        "aria-label": "카드 컴포넌트 리스트",
      },
      h("h1", { className: "heading-title" }, "카드 컴포넌트"),
      h(CardListPage)
    )
  );
}

export default Layout;
