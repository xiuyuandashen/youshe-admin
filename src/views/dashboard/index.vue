<template>
  <div class="dashboard-container">

    <el-card class="box-card" >
      <div slot="header" class="clearfix" >
        <h2>欢迎，{{name}} 使用优社管理系统 &nbsp <span style="font-size:12px;font-weight:200">您的用户角色 roles:<span v-for="role in roles" :key="role">{{ role }}</span></span></h2> 
        <!-- {{time}} -->
      </div>
        <div>
          
    
        </div>
    </el-card>
    
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data(){
    return {
      // time:new Date(),
      // timeString:""
    }
  },
  mounted(){
    // let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    // this.timer = setInterval(() => {
    //   _this.time =  new Date(); // 修改数据date
    // }, 1000)
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
    // timeString(){
    //   return this.getTime(this.time)
    // }

  },
  watch:{
    // time: function(newTime,oldTime){
    //   this.timeString = this.getTime(newTime)
    //   console.log(this.timeString)
    // }
  }
  ,
  created(){
    
  },
  methods:{
    getTime(now){
        
        // let now = date;
        let year = now.getFullYear(); //获取年份
        let month = now.getMonth(); //获取月份
        let date = now.getDate(); //获取日期
        let day = now.getDay(); //获取星期
        let hour = now.getHours(); //获取小时
        let minute = now.getMinutes(); //获取分钟
        let seconds = now.getSeconds(); //获取秒
        month = month + 1;
        let arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        let week = arr_week[day];
        return time = year + "年" + month + "月" + date + "日 " + week + " " + hour + ":" + minute + ":" + seconds;
    }
  },
   beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
