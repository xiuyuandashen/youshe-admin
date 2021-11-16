<template>
  <div class="parkingspace-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>车位列表</h3>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="6" id="map-container" style="height: 500px"></el-col>
          <el-col :span="16" :offset="1">
            <el-table v-loading="loading" :data="mapData" style="width: 100%">
              <el-table-column
                prop="parkingSpaceName"
                label="车位名称"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="latitudeAndLongitude"
                label="经纬度"
                width="200"
              >
              </el-table-column>
              <el-table-column label="停车用户姓名" width="180">
                <template slot-scope="scope">
                  <span
                    v-if="
                      scope.row.userName == null || scope.row.userName == ''
                    "
                    >未有用户停车</span
                  >
                  <span v-else>{{ scope.row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="是否停车" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.isStop == 0">否</span>
                  <span v-else>是</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="edit(scope.row.id)"
                  ></el-button>

                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteById(scope.row.id)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              :current-page="page"
              :page-size="limit"
              :total="total"
              style="padding: 30px 0; text-align: center"
              layout="total, prev, pager, next, jumper"
              @current-change="getList"
            />
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-dialog
      title="添加车位"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-position="left" label-width="80px" :model="parkingSpace">
        <el-form-item label="车位名称">
          <el-input
            v-model="latitudeAndLongitude.parkingSpaceName"
            placeholder="例如：车位1"
          ></el-input>
        </el-form-item>
        <el-form-item label="经纬度">
          <el-input
            v-model="latitudeAndLongitude.lng + ',' + latitudeAndLongitude.lat"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="addParkingSpace()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改车位"
      :visible.sync="updatedialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-position="left" label-width="80px" :model="parkingSpace">
        <el-form-item label="车位名称">
          <el-input
            v-model="updateParkingSpace.parkingSpaceName"
            :placeholder="tempParkingSpace.parkingSpaceName"
          ></el-input>
        </el-form-item>
        <el-form-item label="经纬度">
          <el-input
            v-model="updateParkingSpace.latitudeAndLongitude"
            :placeholder="tempParkingSpace.latitudeAndLongitude"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否停车">
          <el-input
            v-model="updateParkingSpace.isStop"
            :placeholder="tempParkingSpace.isStop"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdate">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MapLoader from "@/assets/js/AMap.js";
import parkingSpaceApi from "@/api/ParkingSpace/ParkingSpace.js";
export default {
  data() {
    return {
      map: null,
      mapData: [],
      mapDataAll: [],
      limit: 5,
      total: null,
      page: 1,
      loading: true,
      dialogVisible: false,
      parkingSpace: {},
      latitudeAndLongitude: {},
      timer: "",
      updatedialogVisible: false,
      // 打算更新到后端的
      updateParkingSpace: {},
      // 后端查出的
      tempParkingSpace: {},
    };
  },
  async created() {
    await this.getList(this.page, this.limit);
    await this.getListAll();
    this.loadMap();
  },
  mounted() {
    //this.timer = setTimeout(this.a, 3000);
  },
  methods: {
    loadMap() {
      let that = this;
      MapLoader()
        .then((res) => {
          let position = new AMap.LngLat(118.47928, 25.03379);
          that.map = new AMap.Map("map-container", {
            resizeEnable: true,
            center: position,
            zooms: [4, 18],
            zoom: 18,
            zoomEnable: true,
          });
          //console.log("map : ", that.map);
          //实时路况图层
          let trafficLayer = new AMap.TileLayer.Traffic({
            zIndex: 10,
          });
          that.map.add(trafficLayer); //添加图层到地图

          // var endIcon = new AMap.Icon({
          //   size: new AMap.Size(25, 34),
          //   image:
          //     "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
          //   imageSize: new AMap.Size(135, 40),
          //   imageOffset: new AMap.Pixel(-95, -3),
          // });

          for (let i = 0; i < that.mapDataAll.length; i++) {
            let str = that.mapDataAll[i].latitudeAndLongitude;

            let marker = new AMap.Marker({
              position: new AMap.LngLat(
                parseFloat(str.substring(0, str.indexOf(","))),
                parseFloat(str.substring(str.indexOf(",") + 1, str.length))
              ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: that.mapDataAll[i].parkingSpaceName,
              //icon: endIcon, // 添加 Icon 图标 URL
              // content: "<h3>4栋205</h3>",
            });
            that.map.add(marker);
          }

          // // 信息窗体
          var infoWindow = new AMap.InfoWindow({
            anchor: "top-center",
            content: "这是4栋",
          });
          // infoWindow.open(that.map,[118.480924, 25.03415])
          // that.positioning()

          that.map.on("click", (ev) => {
            // 触发事件的对象
            let target = ev.target;
            // 触发事件的地理坐标，AMap.LngLat 类型
            let lnglat = ev.lnglat;
            console.log(lnglat);
            // 打开 信息窗体
            //infoWindow.open(that.map, lnglat);
            // 纬度
            that.latitudeAndLongitude.lat = lnglat.lat;
            // 经度
            that.latitudeAndLongitude.lng = lnglat.lng;
            that.dialogVisible = true;
          });
        })
        .catch((e) => {
          console.log(e);
          console.log("地图加载失败");
        });
    },
    getList(page, limit) {
      return new Promise((resolve, reject) => {
        parkingSpaceApi.getList(page, this.limit).then((res) => {
          let data = res.data;
          this.mapData = res.data.parkingSpaceList;
          this.total = res.data.total;
          //console.log(this.mapData);
          this.loading = false;
          resolve();
        });
      });
    },
    edit(id) {
      parkingSpaceApi.getById(id).then((res) => {
        this.tempParkingSpace = res.data.parkingSpace;
        this.updateParkingSpace.id = this.tempParkingSpace.id;
      });
      this.updatedialogVisible = true;
    },
    deleteById(id) {
      parkingSpaceApi.deleteById(id).then((res) => {
        console.log(res);
        this.$message({
          message: res.message,
          type: "success",
        });
        this.show();
      });
    },
    addParkingSpace() {
      let lnglat =
        this.latitudeAndLongitude.lng + "," + this.latitudeAndLongitude.lat;

      // add parkingSpace
      let data = {
        parkingSpaceName: this.latitudeAndLongitude.parkingSpaceName,
        latitudeAndLongitude: lnglat,
      };
      this.saveParkingSpace(data);

      this.latitudeAndLongitude = {};
      this.dialogVisible = false;
    },
    cancelAdd() {
      this.latitudeAndLongitude = {};
      this.dialogVisible = false;
    },
    cancelUpdate() {
      this.tempParkingSpace = {};
      this.updateParkingSpace = {};
      this.updatedialogVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 保存车位坐标
    saveParkingSpace(data) {
      parkingSpaceApi.save(data).then((res) => {
        console.log(res);
        this.$message({
          message: res.message,
          type: "success",
        });
        this.show();
      });
    },
    // 更新
    async update() {
      await this.findName(this.updateParkingSpace.parkingSpaceName);

      parkingSpaceApi.update(this.updateParkingSpace).then((res) => {
        console.log(res);
        this.$message({
          message: res.message,
          type: "success",
        });
        this.updatedialogVisible = false;
        this.updateParkingSpace = {};
        this.tempParkingSpace = {};
        this.show();
      });
    },
    getListAll() {
      return new Promise((resolve, reject) => {
        parkingSpaceApi.getListAll().then((res) => {
          this.mapDataAll = res.data.parkingSpaceList;
          resolve();
        });
      });
    },
    findName(name) {
      return new Promise((resolve, reject) => {
        parkingSpaceApi
          .findName(name)
          .then((res) => {
            //console.log(res);
            resolve();
          })
          .catch((err) => {
            //console.log(err);
            reject();
          });
      });
    },
    // 重新渲染
    async show() {
      this.page = 1;
      await this.getList(1, this.limit);
      await this.getListAll();
      this.loadMap();
    },

    a() {
      let that = this;
      MapLoader().then((res) => {
        console.log(that.map);
        that.map.plugin("AMap.Walking", function () {
          //步行导航
          let walking = new AMap.Walking({
            map: that.map,
            panel: "panel",
          });
          //根据起终点坐标规划步行路线
          walking.search(
            [118.479387, 25.033986],
            [118.480036, 25.033317],
            function (status, result) {
              // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
              if (status === "complete") {
                console.log("绘制步行路线完成");
              } else {
                console.log("步行路线数据查询失败" + result);
              }
            }
          );
        });
      });
    },
  },
};
</script>

<style>
.parkingspace-container {
  margin: 30px;
}
</style>