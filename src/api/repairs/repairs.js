import request from '@/utils/request'

export default {

    getRepairsList(page,size){
        return request({
            url: `mcp/repairs/find/${page}/${size}`,
            method:'get'
        })
    }

}