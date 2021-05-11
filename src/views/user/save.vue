<template>
  <div class="user-container">

    <el-card class="box-card" >
        <div slot="header" class="clearfix" >
            <h3>{{title}}</h3>
        </div>
        <div>
            <el-form ref="form" :model="user" label-width="80px">
                <el-form-item label="用户名称">
                    <el-input v-model="user.name" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="user.password" type="password" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="用户权限">
                    <el-select v-model="user.level" placeholder="请选择用户角色">
                        <el-option label="业主" :value=1 ></el-option>
                        <el-option label="楼房管理员" :value=2 ></el-option>
                        <el-option label="超级管理员" :value=3 ></el-option>
                    </el-select>
                </el-form-item>
                
                <!-- 用户头像 -->
                <el-form-item label="用户头像">

                    <!-- 头衔缩略图 -->
                    <pan-thumb :image="user.avatar"  />
                    <!-- 文件上传按钮 -->
                    <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
                    </el-button>

                    <!--
                        v-show：是否显示上传组件
                        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                        :url：后台上传的url地址
                        @close：关闭上传组件
                        @crop-upload-success：上传成功后的回调 -->
                    <image-cropper
                                    v-show="imagecropperShow"
                                    :width="300"
                                    :height="300"
                                    :key="imagecropperKey"
                                    :url="'/mcp/user/uploadAvatar'"
                                    field="file"
                                    @close="close"
                                    @crop-upload-success="cropSuccess"/>

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
import userApi from '@/api/user/userApi'
import ImageCropper from "@/components/ImageCropper"
import PanThumb from "@/components/PanThumb"
export default {
    components:{
        ImageCropper,
        PanThumb
    },
    data(){
        return {
            title:"保存用户",
            user:{
                avatar:"https://youshe-xiuyuan.oss-cn-beijing.aliyuncs.com/2021/05/10/b2e889f50d7248b4b906154be7ebdb82file.png"
            },
            isSave:true,
            isUpdate:false,
            id:"",
            imagecropperShow:false,
            imagecropperKey:0,
            BASE_API:"localhost:8001",
            
        }
    },
    created(){
        //判断路径是否有id值
        if(this.$route.params && this.$route.params.id){
            this.title = "修改用户"
            this.isSave = false
            this.isUpdate = true
            this.id = this.$route.params.id
            userApi.getUserInfo(this.$route.params.id)
            .then(res=>{
                console.log(res.data)
                this.user = res.data.userInfo
                // this.role = this.getRole(this.user.level,this)
                
            }).catch(e=>{
                console.log("获取用户信息失败")
            })

        }
    },
    watch:{
        $route(to, from) {//监听路由的变化
            console.log('watch $route')
            this.init()
        }
    },
    methods:{
        init(){
            this.title = "保存用户"
            this.isUpdate = false
            this.isSave = true
            this.user = {
                avatar : "https://youshe-xiuyuan.oss-cn-beijing.aliyuncs.com/2021/05/10/b2e889f50d7248b4b906154be7ebdb82file.png"
            }
            
            // this.role = ""
        },
        clearForm(){
            this.user = {
                avatar : "https://youshe-xiuyuan.oss-cn-beijing.aliyuncs.com/2021/05/10/b2e889f50d7248b4b906154be7ebdb82file.png"
            }
        },
        onSave(){
            console.log(this.user)
            // this.user.level = parseInt(this.user.level)
            // console.log("typeof user.level",typeof this.user.level)
            userApi.addUser(this.user).then(res=>{
                this.$message({
                    message: res.message,
                    type: 'success'
                });
                this.$router.push("/admin/user/table") 
            }).catch(e=>{
                console.log("添加失败")
            })
        },
        onUpdate(){
            userApi.updateUser(this.user)
            .then(res=>{
                this.$message({
                    message: res.message,
                    type: 'success'
                });
                this.$router.push("/admin/user/table")  
            })
        },
        close(){ //关闭上传弹窗
            this.imagecropperShow = false;
            // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
            this.imagecropperKey = this.imagecropperKey + 1
        },
        cropSuccess(data){
            //上传之后接口返回图片地址
            console.log(data)
            this.user.avatar = data.url;
            // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
            this.imagecropperKey = this.imagecropperKey + 1
        },
        getRole(level,that){
            console.log(level)
            switch(level){
                case 1 : that.role = "业主";break;
                case 2 : that.role = "楼房管理员";break;
                case 3 : that.role = "超级管理员";break;
            }
            console.log(this.role)         
        }
    }
}
</script>

<style>

</style>