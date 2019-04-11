import React from "react"

import { rhythm } from "../utils/typography"
import Header from "./header"

class Layout extends React.Component {
  render() {
    const { location, title, children, category } = this.props

    return (
      <div>
        <Header {...{ location, title, category }} />
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
        </footer>
      </div>
    )
  }
}

export default Layout
