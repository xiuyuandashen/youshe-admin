<template>
  <div class="user-container">

<el-card class="box-card" >
  <div slot="header" class="clearfix" >
    <h3>用户列表</h3>
  </div>
  <div>
    <el-table
      v-loading="loading"
      :data="userList"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="头像"
        width="500">
      </el-table-column>
      <el-table-column
        width="180"
        label="权限">
        <template slot-scope="scope">
            <span v-if="scope.row.level == '1'">业主</span>
            <span v-if="scope.row.level == '2'">楼房管理员</span>
            <span v-if="scope.row.level == '3'">超级管理员</span>
        </template>
      </el-table-column>

      <el-table-column
        
        label="操作">
            <template slot-scope="scope">
                    <router-link :to="'/admin/user/update/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.id)">删除</el-button>
                </template>

      </el-table-column>

    </el-table>
    
   <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getUserList"
    /> 
  </div>
</el-card>

      <!-- <h3>用户列表</h3> -->
      

     

  </div>
</template>

<script>
import userApi from '@/api/user/userApi'
export default {
    data(){
        return {
            userList:null,
            total:null,
            current:null,
            limit:2,
            page:1,
            loading:true
        }
    },
    created(){
        this.getUserList(this.page,this.limit)
    }
    ,
    methods:{
        getUserList(page=1,size=2){
            userApi.getUserList(page,size).then(res=>{
                // console.log(res.data)
                this.userList = res.data.userList
                this.total = res.data.total
                this.current = res.data.current
                this.loading = false
            }).catch(e=>{
                console.log("获取用户列表失败！")
            })
        },
        handleEdit(id){
            console.log(id)
        },
        handleDelete(id){
            userApi.removeById(id).then(res=>{
              
               this.$message({
                    message: res.message,
                    type: 'success'
                });
              this.getUserList(this.page,this.limit)
            })
            
        }
    }
}
</script>

<style>
.user-container{
    margin: 30px;
}
</style>