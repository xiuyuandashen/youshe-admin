import request from '@/utils/request'

export default {

    getAnnouncementList(page,size){
        return request({
            url:`mcp/announcement/findAnnouncement/${page}/${size}`,
            method:"get"
        })
    },
    update(announcement){
        return request({
            url:"mcp/announcement/update",
            method:"post",
            data:announcement
        })
    },
    selectById(id){
        return request({
            url:`mcp/announcement/${id}`,
            method:"get"
        })
    },
    saveByUserId(userId,announcement){
        return request({
            url:`mcp/announcement/save/${userId}`,
            method:'post',
            data: announcement
        })
    },
    delete(id){
        return request({
            url:`mcp/announcement/delete/${id}`,
            method:'delete'
        })
    }
}