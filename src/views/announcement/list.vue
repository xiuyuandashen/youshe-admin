<template>
  <div class="announcement-container">
      <el-card class="box-card" >
        <div slot="header" class="clearfix" >
            <h3>公告列表</h3>
        </div>
        <div>
              <el-table
              v-loading="loading"
              :data="announcementList"
              style="width: 100%">
              <el-table-column
                prop="title"
                label="标题"
                width="180">
              </el-table-column>
              <el-table-column
                prop="authorName"
                label="发布者"
                width="180">
              </el-table-column>
              <el-table-column
                width="180"
                label="更新时间"
                prop="gmtModified">
               
              </el-table-column>

              <el-table-column
                
                label="操作">
                    <template slot-scope="scope">
                            <router-link :to="'/admin/announcement/update/'+scope.row.id">
                                <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                            </router-link>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>

                              <!-- @show="handleView(scope.row.id)" -->
                              <!-- @hide="clearView" -->
                            <el-popover
                            placement="right"
                            width="400"
                            
                            
                            trigger="click">
                              <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                  <h3>{{scope.row.title}}</h3>
                                </div>
                                <div v-html="scope.row.content"></div>
                              </el-card>
                              <el-button slot="reference" size="mini" type="success">预览</el-button>
                            </el-popover>
                        </template>

              </el-table-column>

            </el-table>
            
          <el-pagination
              :current-page="page"
              :page-size="limit"
              :total="total"
              style="padding: 30px 0; text-align: center;"
              layout="total, prev, pager, next, jumper"
              @current-change="getAnnouncementList"
            /> 
          </div>
      </el-card>
  </div>
</template>

<script>
import announcementApi from '@/api/announcement/announcementApi'
export default {
    data(){
      return {
        announcementList:null,
        page:1,
        limit: 3,
        total:null,
        loading:true,
        announcement:{}
      }
    },
    created(){
      this.getAnnouncementList(this.page,this.limit)
    },
    watch:{
      // $route(to, from) {//监听路由的变化
      //       console.log('watch $route')
      //       this.getAnnouncementList()
      //   }
    },
    methods:{
      getAnnouncementList(page=1,limit=3){
        announcementApi.getAnnouncementList(page,limit)
        .then(res=>{
          // console.log(res)
          this.announcementList = res.data.announcementVos;
          this.total = res.data.total
          this.loading = false
        })
      },
      handleView(id){
        announcementApi.selectById(id)
        .then(res=>{
          this.announcement = res.data.announcementVo
        })
      },
      clearView(){
        this.announcement = {}
      },
      handleDelete(id){
        announcementApi.delete(id)
        .then(res=>{
          this.$message({
                    message: res.message,
                    type: 'success'
          })
          this.$router.push("/admin/announcement/list")
          this.getAnnouncementList()
        })
      }
    }
}
</script>

<style>
    .announcement-container{
        margin: 30px;
    }
</style>