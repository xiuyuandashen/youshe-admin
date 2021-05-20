import request from '@/utils/request'

export default {

    getHousingVoList(page,size){
        return request({
            url :`mcp/housing/findAll/${page}/${size}`,
            method:'get'
        })
    }
}