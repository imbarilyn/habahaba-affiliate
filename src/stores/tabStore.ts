import { defineStore } from 'pinia'

export const useTabStore = defineStore({
  id: 'tabStore',
  state: ()=>({
    tabs: [
      'alerts',
      'overview',
      'statistics',
      'reports',
      'transactions',
      'createLink',
      'viewLink'
    ] as string[],
    activeTab: 'overview' as string
  }),

  getters: {
    getActiveTab: (state)=>state.activeTab,
    getTabs: (state)=>state.tabs
  },

 actions:{
    setActiveTab(tab: string){
      if(this.tabs.includes(tab)){
        this.activeTab = tab
      }
      else{
        console.log(`${tab} not found`)
      }
    }
  }
})
