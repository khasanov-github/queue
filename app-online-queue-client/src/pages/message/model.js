import {toast} from "react-toastify";
import {getMessages, viewChange, addComplain, gotComplains, deleteComplain} from "../service";

export default ({
  namespace: 'messageModel',
  state: {
    views: [],
    unViews: [],
    array: [],
    complains: [],
    isOpen: false,
    messageId: '',
    isOpenMessagePopover: false
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
      let res = yield call(viewChange, payload.id);
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

    * createComplain({payload}, {call, put}) {
      let res = yield call(addComplain, payload);
      if (res.success) {
        document.getElementById('val').value = null;
        toast.success(`Qo'shildi`);
      } else {
        toast.error(`Xatolik`);
      }
    },

    * getComplains({}, {call, put}) {
      let res = yield call(gotComplains);
      if (res.success) {
        let complain = res.object;
        let arrComplain = complain.split(' , ');

        if (arrComplain.length === 1 && arrComplain[0] === "") {
          arrComplain = null;
        } else {
        }

        yield put({
          type: 'updateState',
          payload: {
            complains: arrComplain
          }
        });

      } else {
        toast.error(`Xatolik`);
      }
    },

    * deleteComplain({payload}, {call, put}) {
      console.log(payload);
      let res = yield call(deleteComplain, payload);

      if (res.success) {
        yield put({
          type: 'getComplains',
          payload: {}
        });
        toast.success(`O'chirildi`);
      } else {
        yield put({
          type: 'getComplains',
          payload: {}
        });
      }
    },


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
