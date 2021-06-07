import request from '@/utils/request'

export default {

    getRepairsList(page, size) {
        return request({
            url: `mcp/repairs/find/${page}/${size}`,
            method: 'get'
        })
    },
    saveByUserId(userId, addressId, repairs) {
        return request({
            url: `mcp/repairs/save/${userId}/${addressId}`,
            method: 'post',
            data: repairs
        })
    }


}