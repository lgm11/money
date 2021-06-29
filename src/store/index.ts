import clone from '@/lib/clone';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList : [] as RecordItem[]
  },
  mutations: {
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList')||'[]')as RecordItem[]
    },
    createRecord(state,record){
      const record2 :RecordItem = clone(record);
      record2.createAt = new Date()
      state.recordList.push(record2)
      //data?.push(record2)这是新写法,叫做可选链写法
      store.commit('saveRecords')
    },
    saveRecords(state){
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList))
    }
  }
})
export default store