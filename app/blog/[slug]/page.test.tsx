// app/blog/[slug]/page.test.tsx
/**
 * Giả định bạn dùng Jest + @testing-library/react.
 * Test async Server Component bằng cách await component trước khi render.
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";

// Nếu dự án bạn cần, có thể mock next/navigation:
// jest.mock("next/navigation", () => ({ notFound: () => { throw new Error("notFound"); } }));

describe("Blog detail page", () => {
  it("renders title for existing post", async () => {
    // Gửi đúng kiểu Promise như Next 15 truyền vào
    const ui = await Page({
      params: Promise.resolve({ slug: "hello-world" }),
      searchParams: Promise.resolve({}),
    });

    // render UI đã được await
    render(ui as unknown as JSX.Element);

    expect(
      screen.getByRole("heading", { name: /hello world/i })
    ).toBeInTheDocument();
  });

  it("handles not found post", async () => {
    // Cách đơn giản: nếu không muốn mock notFound(),
    // ta kiểm tra text không xuất hiện (test smoke).
    const ui = await Page({
      params: Promise.resolve({ slug: "khong-ton-tai" }),
      searchParams: Promise.resolve({}),
    }).catch((e) => e); // notFound() sẽ throw -> bắt lỗi để test không fail

    // Nếu notFound đã throw, ui sẽ là Error -> test pass ở mức smoke
    // (Bạn có thể bật mock notFound ở trên để assert thông minh hơn)
    expect(ui).toBeInstanceOf(Error);
  });
});
