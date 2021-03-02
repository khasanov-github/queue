import {getQueues, setStatus} from "../../service";

export default ({
  namespace: 'queueModel',
  state: {
    waiting: [],
    delaying: [],
    queueId: '',
    userPhoneNumber: '',
    queueNumber: '',
    status: '',
    showModal: false,
    item: '',
    isAccepted: false,
    delay: false

  },
  subscriptions: {
    getQueue({dispatch, history}, {select}) {
      history.listen((location) => {
        dispatch({
          type: 'getQueues',
          payload: {
            status: 'DELAY',
            id: 1
          }
        });
      })
    }
  },
  effects: {

    * getQueues({payload}, {call, put, select}) {

      const res = yield call(getQueues, payload);
      if (payload.status === 'WAITING') {
        if (res.success) {
          yield put({
            type: 'updateState',
            payload: {
              waiting: res.object
            }
          })
        }
      } else if (payload.status === 'DELAY') {
        if (res.success) {
          yield put({
            type: 'updateState',
            payload: {
              delaying: res.object
            }
          });
          if (res.object.length > 0) {
            yield put({
              type: 'updateState',
              payload: {
                delay: true,
                delaying: res.object
              }
            })
          }

        }
      }
    },
    * setStatus({payload}, {call, put, select}) {
      let {directionId} = yield select(_ => _.globalModel);
      const res = yield call(setStatus, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {}
        });
        yield put({
          type: 'getQueues',
          payload: {
            status: 'WAITING',
            id: directionId
          }
        });
        yield put({
          type: 'getQueues',
          payload: {
            status: 'DELAY',
            id: directionId
          }
        })
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
});
/////100
