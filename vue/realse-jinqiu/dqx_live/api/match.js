import request from '@/utils/request'


/**
 * 房间id
 * @param {*} params
 */
export function getPreMatch(category,params) {
  return request({
    url: `/categories/${category}/predict-matches`,
    method: 'get',
    params
  })
}

/**
 * 本场统计
 * @param {*} params
 */
export function getTotal(id) {
  return request({
    url: `/basketball/matches/${id}/statistics`,
    method: 'get'
  })
}


/**
 * 足球-首发阵容
 * @param {*} params
 */
export function getLineup(id) {
  return request({
    url: `/football/matches/${id}/lineup`,
    method: 'get'
  })
}


/**
 * 足球-事件
 * @param {*} params
 */
export function getIncidents(id) {
  return request({
    url: `/football/matches/${id}/incidents`,
    method: 'get'
  })
}



/**
 * 足球-文字直播
 * @param {*} params
 */
export function getFbTlive(id) {
  return request({
    url: `/football/matches/${id}/tlive`,
    method: 'get'
  })
}


/**
 * 篮球-文字直播
 * @param {*} params
 */
export function getBkTlive(id) {
  return request({
    url: `/basketball/matches/${id}/text-lives`,
    method: 'get'
  })
}



/**
 * 篮球-赛况
 * @param {*} params
 */
export function getBkAna(id) {
  return request({
    url: `/basketball/matches/${id}/data`,
    method: 'get'
  })
}



/**
 * 足球-赛况
 * @param {*} params
 */
export function getFbAna(id) {
  return request({
    url: `/football/matches/${id}/data`,
    method: 'get'
  })
}