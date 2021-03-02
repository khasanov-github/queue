import {changeActive, getCompanies} from "../service";

export default ({
  namespace: 'companyModel',
  state: {
    companies:[],
    page: 0,
    size: 4,
    totalElements: 0,
    totalPages: 0,
    showModal:false,
    currentCom:'',
    active:false,
    filter:''
  },
  subscriptions: {},
  effects: {
    *changeActive({payload},{call,put}){
     const res =  yield call(changeActive,payload);
      if (res.success) {
        yield put({
          type:'updateState',
          payload:{
            showModal: false
          }
        })
      }
    },
    *getCompanies({payload},{call,put,select}) {
      try {
        if (!payload) {
          let {page, size} = yield select(_ => _.companyModel);
          payload = {page, size}
        }
        let res = yield call(getCompanies, payload);
        console.log(res);
        if (res.success) {
          yield put({
            type: 'updateState',
            payload: {
              companies: res.object,
              page: res.page,
              size: res.size,
              totalElements: res.totalElements,
              totalPages: res.totalPages
            }
          })
        }
      } catch (e) {

      }
    }
  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
})
