import { CometChat } from '@cometchat-pro/chat'

const appID = '248578fefa7610c9'
const region = 'REGION'

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build()

CometChat.init(appID, appSetting).then(
  () => {
    console.log('Initialization completed successfully')
  },
  (error) => {
    console.log('Initialization failed with error:', error)
  },
)
