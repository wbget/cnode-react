import * as service from '../services/topic';

export default {
  namespace: 'topic',
  state: {
    list: [],
    page: 0,
    limit: 20,
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *topics(action, { call, put, select }) {
      const { page, limit, list } = yield select(state => state.topic);
      const { data } = yield call(service.topics, { page, limit, mdrender: false });
      const newList = [...list, ...data.data];
      yield put({
        type: 'update',
        payload: { list: newList },
      });
    },
  },
};
