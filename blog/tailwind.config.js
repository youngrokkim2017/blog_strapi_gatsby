module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    typography: {
      default: {
        css: {
          color: 'rgb(51,51,51)',
          // blockquote: {
          //   fontWeight: '500',
          //   fontSize: 'rem(10)',
          //   fontStyle: null,
          //   borderLeftWidth: null,
          //   borderLeftColor: null,
          //   quotes: null,
          // },
          // 'blockquote p:first-of-type::before': {
          //   content: null,
          // },
          // 'blockquote p:last-of-type::after': {
          //   content: null,
          // },
        },
      },
      // 'lg': {
      //   css: {
      //     blockquote: {
      //       padding: '0',
      //     },
      //   },
      // },
    },
  },
  variants: {},
  important: true,
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
