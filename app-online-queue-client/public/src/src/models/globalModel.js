import {OPEN_PAGES, OPEN_PAGES2, TOKEN_NAME} from "../constants/constants";
import router from "umi/router";
import {toast} from "react-toastify";
import {
  deleteZone, saveZone, login, userMe,
  getRegions, getDistricts, getCategories, save, deleteItem, getItems, getDistrictsByRegion, getQueue
} from "../pages/service";

export default ({
  namespace: 'globalModel',
  state: {
    categories: [],
    regions: [],
    districts: [],
    directions: [],
    moderators: [],
    regionId: '',
    awares: [],
    showModal: false,
    showDeleteModal: false,
    currentItem: '',
    currentUser: '',
    photoUrl: '',
    isAdmin: false,
    isModer: false,
    isDirector: false,
    isOperator: false,
    isReception: false,
    message: 0,
    popoverOpen: false,
    isMenu: true,
    ///operator start
    directionId: '',
    countAllQueue: '',
    durationTime: '',
    lastQueueNumber: '',
    ///operator end
  },
  subscriptions: {
    ///operator start
    getQueue({dispatch, history}) {
      history.listen((location) => {
        dispatch({
          type: 'getQueue',
        })
      })
    },
    ///operator end
    setupHistory({dispatch, history}) {
      history.listen((location) => {
        if (!OPEN_PAGES.includes(location.pathname)) {
          dispatch({
            type: 'userMe',
            payload: {
              pathname: location.pathname
            }
          })
        }
      })
    }
  },
  effects: {
    ///operator start
    * getQueue({}, {call, put}) {
      const res = yield call(getQueue);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            directionId: res.directionId,
            countAllQueue: res.countAllQueue,
            durationTime: res.durationTime,
            lastQueueNumber: res.lastQueueNumber,
          }
        })
      }
    },
    ///operator end
    * userMe({payload}, {call, put}) {
      const res = yield call(userMe);
      if (!res.success) {
        if (!OPEN_PAGES2.includes(payload.pathname)
          && !OPEN_PAGES2.includes('/' + payload.pathname.split('/')[1])) {
          localStorage.removeItem(TOKEN_NAME);
          router.push('/auth/login')
        }
      } else {
        yield put({
          type: 'updateState',
          payload: {
            currentUser: res,
            isAdmin: res.roles.filter(item => item.roleName === 'ADMIN').length > 0 ? "ADMIN" : '',
            isModer: !!res.roles.filter(item => item.roleName === 'MODERATOR').length ? "MODERATOR" : '',
            isDirector: !!res.roles.filter(item => item.roleName === 'DIRECTOR').length ? "DIRECTOR" : '',
            isOperator: !!res.roles.filter(item => item.roleName === 'OPERATOR').length ? "OPERATOR" : '',
            isReception: !!res.roles.filter(item => item.roleName === 'RECEPTION').length ? "RECEPTION" : '',
          }
        })
      }
    },
    * login({payload}, {call, put}) {
      const res = yield call(login, payload);
      if (res.success) {
        localStorage.setItem(TOKEN_NAME, res.tokenType + res.token);
        router.push('/admin');
      } else {
        toast.error("Telefon raqam yoki parol noto'g'ri!")
      }
    },

    * getItems({payload}, {call, put, select}) {
      const res = yield call(getItems, payload);
      let itemsList;
      switch (payload.type) {
        default:
          itemsList = '';
          break;
        case 'region':
          itemsList = "regions";
          break;
        case 'direction':
          itemsList = "directions";
          break;
        case 'district':
          itemsList = "districts";
          break;
        case 'category':
          itemsList = "categories";
          break;
        case 'moderator':
          itemsList = "moderators";
          break;
      }
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            [itemsList]: (itemsList === "moderators" || "directions" ? res[0] : res._embedded.list),
          }
        })
      }
    },
    * getRegions({payload}, {call, put, select}) {
      const res = yield call(getRegions, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            regions: res._embedded.list,
          }
        })
      }
    },
    * getDistrictsByRegion({payload}, {call, put, select}) {
      const res = yield call(getDistrictsByRegion, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            districts: res._embedded.list,
          }
        })
      }
    },
    * getCategories({}, {call, put}) {
      const res = yield call(getCategories);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            categories: res._embedded.list
          }
        })
      }
    },
    * getModerators({}, {call, put}) {
      let payload = {'role_id': "user/byRole/5"};
      const res = yield call(getItems, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            moderators: res[0]
          }
        })
      }
    },
    * getDistricts({}, {call, put}) {
      const res = yield call(getDistricts);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            districts: res._embedded.list
          }
        })
      }
    },
    * save({payload}, {call, put}) {
      const res = yield call(save, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            showModal: false
          }
        });
        let type;
        switch (payload.type) {
          default:
            type = '';
            break;
          case 'region':
            type = "getRegions";
            break;
          case 'district':
            type = "getDistricts";
            break;
          case 'category':
            type = "getCategories";
            break;
          case 'moderator':
            type = "getModerators";
            break;
        }
        yield put({
          type: type
        });
        toast.success(payload.id ? "Tahrirlandi" : "Qo'shildi");
      } else {
        toast.error(res.message);
      }
    },
    * deleteItem({payload}, {call, put}) {
      const res = yield call(deleteItem, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            showDeleteModal: false
          }
        });
        let type;
        switch (payload.type) {
          default:
            type = '';
            break;
          case 'region':
            type = "getRegions";
            break;
          case 'district':
            type = "getDistricts";
            break;
          case 'category':
            type = "getCategories";
            break;
          case 'moderator':
            type = "getModerators";
            break;
        }
        yield put({
          type: type
        });
        toast.success("O'chirildi");
      } else {
        toast.error("O'chirishda xatolik!");
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
