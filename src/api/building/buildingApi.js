import request from '@/utils/request'

export default {
    // 获取楼房信息列表
    getBuildingList(page,size){
        return request({
            url:`mcp/building/findBuilding/${page}/${size}`,
            method:"get",
        })
    },
    // 根据楼房管理员id获取楼房信息 
    findBuildingByUserId(userId){
        return request({
            url:`mcp/building/findByBuildingManagerId`,
            method:"get",
            params:{
                id:userId
            }
        })
    },
    getBuildingManagerIdList(){
        return request({
            url:'mcp/user/getBuildingManagerIdList',
            method:'get'
        })
    },
    SaveBuilding(building){
        return request({
            url:'mcp/building/addBuilding',
            method:'post',
            data:building
        })
    }

}