import React from "react"

import { rhythm } from "../utils/typography"
import Header from "./header"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props

    return (
      <div>
        <Header {...{ location, title }} />
        <main
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {children}
        </main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
