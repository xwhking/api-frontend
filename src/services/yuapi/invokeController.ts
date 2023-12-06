// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getDaily GET /api/invoke/daily */
export async function getDailyUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseDaily>('/api/invoke/daily', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getExpression GET /api/invoke/getExpression */
export async function getExpressionUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getExpressionUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListstring>('/api/invoke/getExpression', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getOneSentence GET /api/invoke/getOneSentence */
export async function getOneSentenceUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOneSentenceUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseSentences>('/api/invoke/getOneSentence', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getQrCode GET /api/invoke/getQrCode */
export async function getQrCodeUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQrCodeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/invoke/getQrCode', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
