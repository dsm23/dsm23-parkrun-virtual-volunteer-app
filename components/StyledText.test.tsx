import { render, screen } from "@testing-library/react-native";
import { MonoText } from "./StyledText";

describe("components", () => {
  describe("MonoText", () => {
    it(`it renders`, () => {
      render(<MonoText>Hello, World!</MonoText>);

      expect(screen.getByText("Hello, World!")).toBeOnTheScreen();
    });
  });
});
