import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'mei5tdsl',
    dataset: 'production'
  },
  // Hosted Studio address: https://rekonstech.sanity.studio
  studioHost: 'rekonstech',
  deployment: {
    appId: 'i4qtnqubv5g21zja93rtbah3',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
