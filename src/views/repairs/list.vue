<template>
  <div class="repairs-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>报修列表</h3>
      </div>
      <div>
        <el-table v-loading="loading" :data="repairsVos" style="width: 100%">
          <el-table-column prop="userName" label="报修人" width="180">
          </el-table-column>
          <el-table-column prop="roomNumber" label="报修房屋地址" width="200">
          </el-table-column>
          <el-table-column prop="gmtModified" label="更新时间" width="200">
          </el-table-column>
          <el-table-column label="是否维修成功" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.isComplete == '1'">是</span>
              <span v-if="scope.row.isComplete == '0'">否</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="'/admin/repairs/update/' + scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit"
                  >修改</el-button
                >
              </router-link>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
              <!-- @hide="clearView" -->
              <el-popover placement="top" width="400" trigger="click">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <h3>{{ scope.row.userName }}</h3>
                  </div>
                  <div v-html="scope.row.content"></div>
                </el-card>
                <el-button slot="reference" size="mini" type="success"
                  >预览</el-button
                >
              </el-popover>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :current-page="page"
          :page-size="limit"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, prev, pager, next, jumper"
          @current-change="getRepairsList"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import repairs from "@/api/repairs/repairs";

export default {
  data() {
    return {
      repairsVos: null,
      limit: 3,
      total: null,
      page: 1,
      loading: true,
    };
  },
  created() {
    this.getRepairsList(this.page, this.limit);
  },
  methods: {
    getRepairsList(page, limit) {
      repairs.getRepairsList(page, this.limit).then((res) => {
        this.repairsVos = res.data.repairsVos;
        this.total = res.data.total;
        this.loading = false;
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