<template>
  <div class="building-container">
      <el-card class="box-card" >
        <div slot="header" class="clearfix" >
            <h3>保存楼房信息</h3>
        </div>
        <div>
          <el-form ref="form" :model="building" label-width="80px">
            <el-form-item label="楼房名称" >
              <el-input v-model="building.name" placeholder="请输入楼房名称" style="width:250px"></el-input>
            </el-form-item>

            <el-form-item label="楼房管理员">
                <el-select v-model="building.buildingManagerId" placeholder="请选择楼房管理员">
                    <el-option v-for="item in buildingManagerList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                    <el-button v-if="isSave" type="primary" @click="onSave">添加</el-button>
                    <el-button v-if="isUpdate" type="primary" @click="onUpdate">修改</el-button>
                    <el-button @click="clearForm">清空</el-button>
                </el-form-item>

          </el-form>
        </div>
      </el-card>
      
  </div>
</template>

<script>
import buildingApi from '@/api/building/buildingApi'

export default {
  data(){
    return {
      building:{},
      buildingManagerList:[],
      isSave:true,
      isUpdate:false
    }
  },
  created(){
    this.getBuildingManagerIdList()
  },
  methods:{
    onSave(){
      buildingApi.SaveBuilding(this.building)
      .then(res=>{
        this.$message({
          type:'success',
          message:res.message
        })
        this.$router.push("/admin/building/list")
      })
    },
    onUpdate(){

    },
    getBuildingManagerIdList(){
      buildingApi.getBuildingManagerIdList()
      .then(res=>{
        this.buildingManagerList = res.data.list
      })
    },
    clearForm(){
      this.building = {}
    }
  }
}
</script>

<style>

</style>