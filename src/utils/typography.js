import Typography from 'typography'
import Github from 'typography-theme-github'

Github.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    a: {
      textDecoration: `none`,
      cursor: `pointer`,
    },
    blockquote: {
      marginBottom: `40px`,
    },
    body: {
      background: `#F8F8F8`,
    },
  }
}

const typography = new Typography(Github)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
