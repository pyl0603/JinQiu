import request from '@/utils/request'

/**
 * 首页长图广告
 */
export function getHome() {
    return request({
        url: '/unbelievable/streamer_pc/home/area',
        method: 'get'
    })
}


/**
 * 首页左侧广告
 */
export function getHomeLeft() {
  return request({
      url: '/unbelievable/streamer_pc/overall/left',
      method: 'get'
  })
}


/**
 * 首页右侧广告
 */
export function getHomeRight() {
  return request({
      url: '/unbelievable/streamer_pc/overall/right',
      method: 'get'
  })
}



/**
 * 获取直播列表的广告区域的广告
 */
export function getLive() {
  return request({
      url: '/unbelievable/streamer_pc/streamer_list/area',
      method: 'get'
  })
}


/**
 * 获取直播列表的广告区域的广告
 */
export function getCatLive(category) {
  return request({
      url: `/unbelievable/streamer_pc/categories/${category}/streamer_room_list/area`,
      method: 'get'
  })
}


/**
 * 获取直播间的暂停广告
 */
export function getCatStop(category) {
  return request({
      url: `/unbelievable/streamer_pc/categories/${category}/streamer_room_suspend`,
      method: 'get'
  })
}