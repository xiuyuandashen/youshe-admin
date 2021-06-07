<template>
  <div class="housing-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>添加房屋信息</h3>
      </div>
      <div>
        <el-form ref="form" :model="housing" label-width="150px">
          <el-form-item label="选择房屋所在楼房" label-width="150px">
            <el-select
              v-model="housing.buildingId"
              placeholder="请选择房屋所在的楼房"
              v-select-scroll="getBuildingList"
            >
              <el-option
                v-for="(item, index) in buildingVos"
                :label="item.name"
                :value="item.id"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房屋单元号" label-width="150px">
            <el-input
              v-model="housing.roomNumber"
              placeholder="请输入房屋单元号"
              style="width: 203.8px"
            ></el-input>
          </el-form-item>
          <el-form-item label="房主" label-width="150px">
            <el-select
              v-model="housing.userId"
              placeholder="请选择房主(可以不选)"
            >
              <el-option
                v-for="(item, index) in userList"
                :label="item.name"
                :value="item.id"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button v-if="isSave" type="primary" @click="onSave"
              >添加</el-button
            >
            <el-button v-if="isUpdate" type="primary" @click="onUpdate"
              >修改</el-button
            >
            <el-button @click="clearForm">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import buildingApi from "@/api/building/buildingApi";
import userApi from "@/api/user/userApi";

export default {
  data() {
    return {
      housing: {},
      buildingVos: [],
      userList: [],
      userRole: "",
      page: 1,
      limit: 3,
      isSave: true,
      isUpdate: false,
    };
  },
  created() {
    // 判断是超级管理员 还是楼房管理员
    this.userRole = this.$store.state.user.roles[0];
    // console.log(this.userRole);
    if (this.userRole == "ROLE_ADMIN") {
      // console.log("-- --");
      this.getBuildingList();
    } else {
    }
  },
  methods: {
    getBuildingList() {
      buildingApi.getBuildingList(this.page, this.limit).then((res) => {
        // this.buildingVos.push(res.data.buildingList);
        let arr = res.data.buildingList;
        // for (let i = 0; i < arr.length; i++) {
        //   this.buildingVos.push(arr[i]);
        // }
        this.buildingVos.push(...arr);

        // this.buildingVos = res.data.buildingList;
        this.page++;
      });
    },
    onSave() {},
    onUpdate() {},
    clearForm() {},
  },
};
</script>

<style>
</style>