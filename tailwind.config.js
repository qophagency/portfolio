const tokens = require('@contentful/f36-tokens');
const { fontFamily } = require('tailwindcss/defaultTheme');

const colorsF36 = Object.entries(tokens).reduce((acc, [key, value]) => {
  if (/^#[0-9A-F]{6}$/i.test(value)) {
    acc[key] = value;
  }
  return acc;
}, {});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colorsF36,
        brand: {
          primary: {
            "25": "#E0EAE9",
            "50": "#D1E7E5",
            "100": "#AFCFCD",
            "200": "#94C8C2",
            "300": "#74A9A3",
            "400": "#50817B",
            "500": "#2D7169",
            "600": "#235851",
            "700": "#1D4944",
            "800": "#173A36",
            "900": "#112C29",
          },
          cta: {
            "25": "#FFF5E8",
            "50": "#FFE8C8",
            "100": "#F8CE94",
            "200": "#F8C279",
            "300": "#FFCC86",
            "400": "#FFBA59",
            "500": "#F6B04E",
            "600": "#E49D39",
            "700": "#E79625",
            "800": "#C97D14",
            "900": "#9F6009",
          },
        },
        neutrals: {
          "25": "#FCFCFD",
          "50": "#F5F5F5",
          "100": "#E0E0E0",
          "200": "#CDCDCD",
          "300": "#ADADAD",
          "400": "#858585",
          "500": "#5C5C5C",
          "600": "#474747",
          "700": "#333333",
          "800": "#292929",
          "900": "#121212",
        },
        feedback: {
          informative: {
            "25": "#D6E4FF",
            "50": "#D6E4FF",
            "100": "#85AFFF",
            "200": "#5C95FF",
            "300": "#4788FF",
            "400": "#0A60FF",
            "500": "#0047CC",
            "600": "#0039A3",
            "700": "#00328F",
            "800": "#002466",
            "900": "#00153D",
          },
          destructive: {
            "25": "#FFF3F2",
            "50": "#F3BBB9",
            "100": "#F0AAA8",
            "200": "#EA8885",
            "300": "#E46662",
            "400": "#D12923",
            "500": "#A72420",
            "600": "#8C1C18",
            "700": "#7A1815",
            "800": "#57110F",
            "900": "#340A09",
          },
          warning: {
            "25": "#FFDBC2",
            "50": "#FFC499",
            "100": "#FFB885",
            "200": "#FFA05C",
            "300": "#FF7C1F",
            "400": "#E05E00",
            "500": "#B84D00",
            "600": "#A34400",
            "700": "#7A3300",
            "800": "#662B00",
            "900": "#3D1A00",
          },
          success: {
            "25": "#EDFFF4",
            "50": "#DCFFDF",
            "100": "#9CFAA5",
            "200": "#70EF7D",
            "300": "#25BF35",
            "400": "#018D0F",
            "500": "#01650B",
            "600": "#015109",
            "700": "#013D07",
            "800": "#002804",
            "900": "#001402",
          },
        },
      },
      maxWidth: {
        '8xl': '90rem',
      },
      letterSpacing: {
        snug: '-0.011em',
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xl': '1.75rem',
        '4xl': '2.5rem',
      },
      lineHeight: {
        tighter: 1.1,
      },
      fontFamily: {
        // Define as famílias de fontes 'heading' e 'body'
        heading: ['"Open Sans"', ...fontFamily.sans], // Open Sans para títulos
        body: ['"Open Sans"', ...fontFamily.sans], // Urbanist para o corpo, com fallback para as fontes sans padrão
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addComponents }) {
      addComponents({
        ".bodySection": {
          "@apply font-body text-lg font-bold text-neutrals-900": {},
        },
        ".bodyPrimary": {
          "@apply font-body text-xl text-neutrals-800 leading-[1.2] space-y-4": {},
        },
        ".bodySecondary": {
          "@apply font-body text-lg text-neutrals-800": {},
        },
        ".bodyTertiary": {
          "@apply font-body text-base text-neutrals-800": {},
        },
        ".bodyContent": {
          "@apply font-body text-xl text-neutrals-900 leading-[1.2] space-y-8": {},
        },
        ".textSubtle": {
          "@apply text-neutrals-600": {},
        },
        ".textAlert": {
          "@apply text-feedback-destructive-600": {},
        },
      });
    },
  ],
};
