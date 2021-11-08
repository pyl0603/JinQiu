import request from '@/utils/request'

/**
 * 房间id
 * @param {*} params
 */
export function getRoom(params) {
    return request({
      url: `/streamer-room`,
      method: 'get'
    })
  }

/**
 * 直播间详情
 */
export function getLive(roomId, params) {
	return request({
	url: `/streamer-rooms/${roomId}`,
    method: 'get',
    params
	})
}


/**
 * 主播预约的赛程
 */
export function getPreMatches(streamerId, params) {
	return request({
	url: `/streamers/${streamerId}/predict-matches`,
    method: 'get',
    params
	})
}


/**
 * 直播列表-频道列表
 */
export function getChannels(params) {
	return request({
	url: `/channels/all`,
    method: 'get',
    params
	})
}



/**
 * 首页-直播赛事列表
 */
export function getPre(params) {
	return request({
	url: `/predict-matches`,
    method: 'get',
    params
	})
}



/**
 * 直播列表-频道的直播赛事列表
 */
export function getChannelLive(channelId,params) {
	return request({
	url: `/channels/${channelId}/streamer-rooms/on-live`,
    method: 'get',
    params
	})
}


/**
 * 添加关注
 */
export function attention(data) {
	return request({
		url: '/user-att',
    method: 'post',
    data
	})
}

/**
 * 取消关注
 */
export function cancelAttention(params) {
	return request({
		url: '/user-att',
    method: 'delete',
    params
	})
}


/**
 * 获取指定比赛的直播中的直播间
 */
export function getMatchLive(category,matchId,params) {
	return request({
	url: `/categories/${category}/matches/${matchId}/onlive-streamers`,
    method: 'get',
    params
	})
}
