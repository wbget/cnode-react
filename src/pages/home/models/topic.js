import * as service from '../services/topic';
import { tabs } from '../../../utils/constant';

const initPage = tabs.reduce((pre, cur) => {
  pre[cur.key + 'Page'] = 0;
  return pre;
}, {});
const initList = tabs.reduce((pre, cur) => {
  pre[cur.key + 'List'] = [];
  return pre;
}, {});
export default {
  namespace: 'topic',
  state: {
    ...initList,
    ...initPage,
    limit: 10,
    current: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *onPage({ payload }, { put }) {
      const { page, tab } = payload;
      const pageKey = tab.key + 'Page';
      yield put({
        type: 'update',
        payload: { [pageKey]: page },
      });
      yield put({
        type: 'topics',
        payload: {
          page,
          tab,
        },
      });
    },
    *topics({ payload }, { call, put, select }) {
      const { page, tab } = payload;
      const topic = yield select(state => state.topic);
      const { limit } = topic;
      const listKey = tab.key + 'List';
      const list = topic[listKey];
      const { data } = yield call(service.topics, { page, limit, mdrender: false, tab: tab.tab });
      const newList = [...list, ...data.data];
      yield put({
        type: 'update',
        payload: { [listKey]: newList },
      });
    },
    *topic({ payload }, { call, put }) {
      const { id } = payload;
      const { data } = yield call(service.topic, { id });
      yield put({
        type: 'update',
        payload: { current: data.data },
      });
    },
  },
};
