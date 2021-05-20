<template>
  <div class="announcement-container">
      <el-card class="box-card" >
        <div slot="header" class="clearfix" >
            <h3>{{title}}</h3>
        </div>
        <div>
            <el-form ref="form" :model="announcement" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="announcement.title" style="width: 500px;"></el-input>
                </el-form-item>
                <el-form-item label="公告内容">
                    <!-- <el-input v-model="announcement.content" type="text" style="width: 300px;"></el-input> -->
                    <vue-tinymce
                      v-model="announcement.content" 
                      :setting="setting" />
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
import announcementApi from '@/api/announcement/announcementApi'
export default {
    data(){
      return {
        title:"添加公告",
        announcement:{},
        isSave:true,
        isUpdate:false,
        setting:{
          menubar: false,
          toolbar: "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
          toolbar_drawer: "sliding",
          quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
          plugins: "link image media table lists fullscreen quickbars",
          language: 'zh_CN', //本地化设置
          height: 350
        }
      }
    },
    created(){
      if(this.$route.params && this.$route.params.id){
        this.title = this.$route.meta.title
        this.isSave = false
        this.isUpdate = true
        announcementApi.selectById(this.$route.params.id)
        .then(res=>{
          this.announcement = res.data.announcementVo
        })
      }
    },
    methods:{
      onSave(){
        announcementApi.saveByUserId( this.$store.state.user.userId,this.announcement)
        .then(res=>{
          this.$message({
                    message: res.message,
                    type: 'success'
                });
                this.$router.push("/admin/announcement/list") 
        })
      },
      onUpdate(){
        announcementApi.update(this.announcement)
        .then(res=>{
          this.$message({
                    message: res.message,
                    type: 'success'
                });
                this.$router.push("/admin/announcement/list") 
        })
      },
      clearForm(){
        this.announcement = {}
      }
    }
}
</script>

<style>
    .announcement-container{
        margin: 30px;
    }
</style>