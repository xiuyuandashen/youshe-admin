<template>
  <div class="repairs-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>添加报修信息</h3>
      </div>
      <div>
        <el-form ref="form" :model="repairs" label-width="100px">
          <el-form-item label="报修内容">
            <el-input
              type="textarea"
              v-model="repairs.content"
              style="width: 500px"
            ></el-input>
          </el-form-item>

          <el-form-item label="报修房屋地址" label-width="100px">
            <el-select v-model="addressId" placeholder="请选择报修的房屋号">
              <el-option
                v-for="(item, index) in HousingVos"
                :label="item.roomNumber"
                :value="item.id"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="维修状态">
            <el-select
              v-model="repairs.isComplete"
              placeholder="请选择维修状态"
            >
              <el-option label="未维修" :value="0"></el-option>
              <el-option label="维修成功" :value="1"></el-option>
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
import housing from "@/api/housing/housing";
import repairs from "@/api/repairs/repairs";
export default {
  data() {
    return {
      loading: true,
      repairs: {},
      isSave: true,
      isUpdate: false,
      HousingVos: [],
      userId: "",
      addressId: "",
    };
  },
  created() {
    this.userId = this.$store.state.user.userId;
    this.getHousingVoByUserId();
  },
  methods: {
    clearForm() {
      this.repairs = {};
      this.HousingVos = [];
      this.userId = "";
    },
    onSave() {
      repairs
        .saveByUserId(this.userId, this.addressId, this.repairs)
        .then((res) => {
          console.log(res);
        });
    },
    onUpdate() {},
    getHousingVoByUserId() {
      housing.findByUserId(this.userId).then((res) => {
        // console.log(res);
        this.HousingVos = res.data.housingVos;
      });
    },
  },
};
</script>

<style>
.repairs-container {
  margin: 30px;
}
</style>