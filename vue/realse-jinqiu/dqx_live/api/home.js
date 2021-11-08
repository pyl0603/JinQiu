import request from '@/utils/request'

/**
 * banner
 */
export function banner() {
    return request({
        url: '/settings/streamer-banners',
        method: 'get'
    })
}

/**
 * 最近赛程
 */
export function schedule(category, params) {
	return request({
		url: `/categories/${category}/recent-schedule`,
        method: 'get',
        params
	})
}

/**
 * 明星主播
 */
export function anchor(params) {
	return request({
			url: '/streamer/hot/list',
			method: 'get',
			params
	})
}

/**
 * 根据比赛随机获取直播间id
 */
export function scheduleRoomId(category, matchId) {
	return request({
		url: `/categories/${category}/matches/${matchId}/random-roomId`,
		method: 'get'
	})
}
