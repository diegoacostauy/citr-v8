import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "../Carousel";

test("Let's users click on thumbnails to make them hero", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />)

  const hero = await carousel.findByTestId("hero");
  expect(hero.src).toContain(images[0]);

  for (let idx in images) {
    const img = images[idx];
    const thumb = await carousel.findByTestId(`thumb-${idx}`);
    await thumb.click();
    expect(hero.src).toContain(img);
    expect(Array.from(thumb.classList)).toContain('active');
  }
  carousel.unmount();
})
