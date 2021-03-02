import {isHave, register, uploadFile} from "../../service";
import {toast} from "react-toastify";
import {router} from "umi";

export default ({
  namespace: 'registerModel',
  state: {
    isNext: false,
    checked: false,
    activeStep: 1,
    photoId: '',
    logoUrl: '',
    currentRegUser: [],
    coords: [41.369037, 69.299512]
  },
  subscriptions: {},
  effects: {
    * isHave({payload}, {call, put, select}) {
      let contentType = payload.contentType;
      const res = yield call(isHave, payload);
      let {activeStep} = yield select(_ => _.registerModel);
      if (res.success) {
        if (contentType == "phoneNumber" || contentType == "companyName") {
          yield put({
            type: "updateState",
            payload: {
              activeStep: activeStep + 1
            }
          });
        }
      } else {
        if (contentType == "phoneNumber") {
          toast.error("Bunday telefon raqam mavjud!");
        } else if (contentType == "companyName") {
          toast.error("Bunday Kompaniya nomi mavjud!");
        } else {
          toast.error("Bunday kompaniya inn mavjud!")
        }
      }

    },
    * downloadPhoto({payload}, {call, put}) {
      const res = yield call(uploadFile, payload);
      console.log(res);
      if (res.statusCode === 200) {
        yield put({
          type: "updateState",
          payload: {
            logoUrl: res[0]
          }
        });
      }
    },
    * register({payload}, {call, put, select}) {
      console.log(payload);
      const res = yield call(register, payload);
      let {activeStep} = yield select(_ => _.registerModel);
      console.log(res);
      if (res.success) {
        toast.success("Online Navbatga xush kelibsiz!\n " +
          "Ro'yhatdan o'tganingiz bilan tabriklaymiz!")
        router.push("/auth/login");
      } else {
        toast.error(res.messageUzb ? res.messageUzb : "Xatolik, Qaytadan urinib ko'ring!")
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
