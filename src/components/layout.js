import React from "react"

import { rhythm } from "../utils/typography"
import Header from "./header"

class Layout extends React.Component {
  state = {
    permission: 'default'
  }

  render() {
    const { location, title, children, category, isPost } = this.props

    return (
      <div>
        <Header {...{ location, title, category }} />
        <main
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(isPost ? 37 : 27),
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
