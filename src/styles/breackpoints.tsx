const sizes = {
  mobile: "320px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1440px",
} as const;

export const Device = {
  mobile: `(min-width: ${sizes.mobile})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  desktop: `(min-width: ${sizes.desktop})`,
} as const;

// Alternative: More comprehensive breakpoints
export const Breakpoints = {
  // Min-width (mobile-first approach)
  mobile: `(min-width: ${sizes.mobile})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  desktop: `(min-width: ${sizes.desktop})`,

  // Max-width (desktop-first approach)
  mobileMax: `(max-width: ${sizes.tablet})`,
  tabletMax: `(max-width: ${sizes.laptop})`,
  laptopMax: `(max-width: ${sizes.desktop})`,

  // Between ranges
  mobileOnly: `(min-width: ${sizes.mobile}) and (max-width: ${sizes.tablet})`,
  tabletOnly: `(min-width: ${sizes.tablet}) and (max-width: ${sizes.laptop})`,
} as const;
