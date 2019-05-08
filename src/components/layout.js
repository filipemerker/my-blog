import React from "react"

import { rhythm } from "../utils/typography"
import Header from "./header"

class Layout extends React.Component {
  state = {
    permission: 'default'
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      this.OneSignal = window.OneSignal || []
      this.setupOneSignal()
    }
  }

  onSubscriptionBtnClick = event => {
    this.getSubscriptionState().then(state => {
      if (state.isPushEnabled) {
        /* Subscribed, opt them out */
        this.OneSignal.setSubscription(false)
      } else {
        if (state.isOptedOut) {
          /* Opted out, opt them back in */
          this.OneSignal.setSubscription(true)
        } else {
          /* Unsubscribed, subscribe them */
          this.OneSignal.registerForPushNotifications()
        }
      }
    })

    event.preventDefault()
  }

  setupOneSignal = () => {
    this.OneSignal.push(() => {
      if (!this.OneSignal.isPushNotificationsSupported()) {
        return;
      }

      this.OneSignal.init({
        appId: '05ed30f9-2445-4669-9e62-bbfcbe47b70a',
        autoResubscribe: true,
        notifyButton: {
          enable: true,
          colors: {
            'circle.background': 'rgb(127, 158, 142)',
            'badge.background': 'rgb(127, 158, 142)',
            'dialog.button.background': 'rgb(127, 158, 142)',
          },
          text: {
              'tip.state.unsubscribed': 'Ativar notificação de novos posts',
              'tip.state.subscribed': "Avisaremos você sobre novos posts!",
              'tip.state.blocked': "Você bloqueou as notificações",
              'message.prenotify': 'Ativar notificação de novos posts',
              'message.action.subscribed': "Obrigado por se inscrever!",
              'message.action.resubscribed': "Avisaremos você sobre novos posts!",
              'message.action.unsubscribed': "Você não receberá mais notificações.",
              'dialog.main.title': 'Gerenciar notificações.',
              'dialog.main.button.subscribe': 'ATIVAR',
              'dialog.main.button.unsubscribe': 'DESATIVAR',
              'dialog.blocked.title': 'Desbloquear notificações',
              'dialog.blocked.message': "Siga essas instruçoões para ativar as notificações:"
          }
        },
      })

      this.updateManageWebPushSubscriptionButton()

      this.OneSignal.on('subscriptionChange',() => {
        this.updateManageWebPushSubscriptionButton()
      })
    })
  }

  updateManageWebPushSubscriptionButton = async () => {
    try {
      const state = await this.OneSignal.getNotificationPermission()

      this.setState({
        permission: state,
      })
    } catch (error) {
      console.error('Error getting notification status', error);
    }
  }

  async getSubscriptionState() {
    const result = await Promise.all([
      this.OneSignal.isPushNotificationsEnabled(),
      this.OneSignal.isOptedOut(),
    ])

    const [isPushEnabled, isOptedOut] = result

    return {
      isPushEnabled: isPushEnabled,
      isOptedOut: isOptedOut,
    }
  }

  render() {
    const { location, title, children, category } = this.props

    return (
      <div>
        <Header {...{ location, title, category }} />
        <main
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(26),
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
