import { render, screen } from "./test-utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { SAMPLE_MODULES } from "@/lib/constants";

describe("sidebar-nav", () => {
  describe("correct-grouping", () => {
    beforeEach(() => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // Deprecated
          removeListener: jest.fn(), // Deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should only show the module for the current page - Cloud Security", async () => {
      render(
        <Sidebar
          modules={SAMPLE_MODULES}
          currentPageId="p6"
          currentLearningPath="Cloud Security Development"
        />,
      );

      const headings = screen.getAllByRole("heading", { level: 3 });
      expect(headings.length).toEqual(2);
      expect(headings[0].innerHTML).toContain("Cloud Security Development");
      expect(headings[1].innerHTML).toContain("Cloud Security Development");
    });

    it("should-only-show-devsecops", async () => {
      render(
        <Sidebar
          modules={SAMPLE_MODULES}
          currentPageId="p3"
          currentLearningPath="DevSecOps"
        />,
      );

      const headings = screen.getAllByRole("heading", { level: 3 });
      expect(headings.length).toEqual(2);
      expect(headings[0].innerHTML).toContain("DevSecOps");
      expect(headings[1].innerHTML).toContain("DevSecOps");
    });
  });
});
