export default {
  namespace: 'user',
  state: {},
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
