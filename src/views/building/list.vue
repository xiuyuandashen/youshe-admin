<template>
  <div class="building-container">
      <el-card class="box-card" >
        <div slot="header" class="clearfix" >
            <h3>楼房列表</h3>
        </div>
        <div>
            <el-table
              v-loading="loading"
              :data="buildingVos"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="楼房名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="buildingName"
                label="楼房管理员名称"
                width="200">
              </el-table-column>
             <el-table-column
                prop="gmtModified"
                label="更新时间"
                width="200">
              </el-table-column>

              <el-table-column
                
                label="操作">
                    <template slot-scope="scope">
                            <router-link :to="'/admin/building/update/'+scope.row.id">
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
              @current-change="getBuildingList"
            /> 
      </div>
      </el-card>
  </div>
</template>

<script>
import buildingApi from '@/api/building/buildingApi' 
export default {
  data(){
    return {
            buildingVos:null,
            total:null,
            current:null,
            limit:3,
            page:1,
            loading:true
    }
  },
  created(){
    this.getBuildingList(this.page,this.limit)
  },
  methods:{
    getBuildingList(page=1,size=2){
      buildingApi.getBuildingList(page,size)
      .then(res=>{
        this.buildingVos = res.data.buildingList
        this.total = res.data.total
        this.loading = false    
      })
    },
    handleDelete(id){
      console.log("-- --- 删除")
    }
  }
}
</script>

<style>
    .building-container{
        margin: 30px;
    }
</style>