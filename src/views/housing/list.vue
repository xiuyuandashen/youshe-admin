<template>
  <div class="housing-container">
      <el-card class="box-card" >
        <div slot="header" class="clearfix" >
            <h3>房屋列表</h3>
        </div>
        <div>
            <el-table
              v-loading="loading"
              :data="housingVos"
              style="width: 100%">
              <el-table-column
                prop="roomNumber"
                label="房屋单元号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="buildName"
                label="所属的楼房名称"
                width="200">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="房主名称"
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
                            <router-link :to="'/admin/housing/update/'+scope.row.id">
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
              @current-change="getHousingList"
            />
        </div>
      </el-card>
  </div>
</template>

<script>
import housing from '@/api/housing/housing'
export default {
  data(){
    return {
      housingVos:null,
      total:null,
      limit:3,
      page:1,
      loading:true
    }
  },
  created(){
    this.getHousingList(this.page,this.limit)
  },
  methods:{
    getHousingList(page,limit){
      console.log("limit :",limit)
      housing.getHousingVoList(page,this.limit)
      .then(res=>{
        this.housingVos = res.data.list;
        this.total = res.data.total;
        this.loading = false
      })
    }
  }
  
}
</script>

<style>
    .housing-container{
        margin: 30px;
    }
</style>