import "styled-components";
import type { ITheme } from "./theme.types";

/**
 * TypeScript declaration merging for styled-components
 * This extends the DefaultTheme interface to include our custom theme properties
 * Now TypeScript will provide autocomplete and type checking for theme properties
 * when using styled-components
 */
declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
