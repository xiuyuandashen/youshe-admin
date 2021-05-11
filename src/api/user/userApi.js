import request from '@/utils/request'

export default {

    getUserList(page,size){
        return request({
            url:`mcp/user/findUser/${page}/${size}`,
            method:"get",
        })
    },
    addUser(user){
        return request({
            url:"mcp/user/addUser",
            method:"post",
            data: user
        })
    },
    getUserInfo(id){
        return request({
            url:`mcp/user/getUserById/${id}`,
            method:"get",
        })
    },
    updateUser(user){
        return request({
            url:"mcp/user/update",
            method:"post",
            data: user
        })
    },
    removeById(id){
        return request({
            url:`mcp/user/delete`,
            method:"Delete",
            params:{
                id
            }
        })
    }


}