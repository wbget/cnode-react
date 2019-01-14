import request from '../../../utils/request';
import lodash from 'lodash';

export const topics = ({ page, limit, tab, mdrender }) =>
  request(
    `/topics?page=${page}&limit=${limit}&mdrender=${mdrender}` +
      (lodash.isString(tab) ? `&tab=${tab}` : '')
  );
