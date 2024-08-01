import { createElement as h } from "https://esm.sh/react";

/* 
  <figure class='card-thumbnail'>
    <img src="onepiece/thumbnail-01.jpg" alt="" width='260' height='410' />
    <figcaption class='a11yHidden'>원피스 에그헤드 편 썸네일</figcaption>
  </figure>
*/

/* 
  props: { 
    id,
    text,
    width,
    height
  }
*/
function Thumbnail({ id, text, width = 260, height = 410 }) {
  return h(
    "figure",
    {
      className: "card-thumbnail",
      "aria-label": "썸네일 이미지",
    },
    h("img", {
      src: `onepiece/thumbnail-${id}.jpg`,
      alt: ``,
      width: `${width}`,
      height: `${height}`,
    }),
    h("figcaption", { className: "a11yHidden" }, `${text}`)
  );
}

export default Thumbnail;
