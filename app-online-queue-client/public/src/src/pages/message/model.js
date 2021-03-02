import {toast} from "react-toastify";
import {getMessages, viewChange} from "../service";

export default ({
  namespace: 'messageModel',
  state: {
    views: [],
    unViews: [],
    isOpen: false,
    messageId: ''
  },
  subscriptions: {},
  effects: {
    * getMessages({}, {call, put}) {
      let res = yield call(getMessages);
      const resMessage = res.object;
      const views = [];
      const unViews = [];
      for (let key in resMessage) {
        if (resMessage[key].view) {
          views.push(resMessage[key]);
        } else {
          unViews.push(resMessage[key]);
        }
      }

      yield put({
        type: 'updateState',
        payload: {
          views: views
        }
      });

      yield put({
        type: 'updateState',
        payload: {
          unViews: unViews
        }
      });
    },

    * isViewChange({payload}, {call, put}) {
      let res = yield call(viewChange, payload);
      if (res.success === true) {
        document.getElementById('message').style.display.blink();
        toast.success("Tasdiqlandi");
        yield put({
          type: 'getMessages',
          payload: {}
        });
      } else {
        toast.error("Xatolik");
      }
    },

    // * createComplain({payload}, {call, put}) {
    //   let res = yield call();
    // }

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
