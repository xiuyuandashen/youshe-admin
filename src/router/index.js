import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: "/admin/user",
    component: Layout,
    redirect: "/admin/user/table",
    name: "用户管理",
    meta: { title: "用户管理", icon: "user"},
    children: [{
        path: "table",
        name: "用户列表",
        component: () => import( "@/views/user/table" ),
        meta:{ title: '用户列表', icon: "table" }

      },{
        path: "update/:id",
        name: "修改用户",
        component:()=>import("@/views/user/save"),
        meta:{ title: '修改用户', icon: "table" },
        hidden: true //隐藏路由
      },
      {
        path: "save",
        name: "保存用户",
        component:()=>import("@/views/user/save"),
        meta:{ title: '保存用户', icon: "save" },
        
      }
    ]

  },
  {
    path:"/admin/building",
    redirect:"/admin/building/list",
    component: Layout,
    meta:{title:"楼房管理",icon:"building"},
    name:"楼房管理",
    children:[
      {
        path:"list",
        name:"楼房列表",
        component:()=>import("@/views/building/list"),
        meta:{title:"楼房列表",icon:"table"}
      },
      {
        path:"save",
        name:"添加楼房信息",
        component:()=>import("@/views/building/save"),
        meta:{title:"添加楼房信息",icon:"save"}

      }
    ]
  }
  ,{
    path:"/admin/repairs",
    redirect:"/admin/repairs/list",
    component: Layout,
    meta:{title:"报修管理",icon:"repairs"},
    name:"报修管理",
    children:[
      {
        path:"list",
        name:"报修列表",
        component:()=>import("@/views/repairs/list"),
        meta:{title:"报修列表",icon:"table"}
      },
      {
        path:"save",
        name:"添加报修信息",
        component:()=>import("@/views/repairs/save"),
        meta:{title:"添加报修信息",icon:"save"}

      }
    ]
  },{
    path:"/admin/housing",
    redirect:"/admin/housing/list",
    component: Layout,
    meta:{title:"房屋管理",icon:"housing"},
    name:"房屋管理",
    children:[
      {
        path:"list",
        name:"房屋列表",
        component:()=>import("@/views/housing/list"),
        meta:{title:"房屋列表",icon:"table"}
      },
      {
        path:"save",
        name:"添加房屋信息",
        component:()=>import("@/views/housing/save"),
        meta:{title:"添加房屋信息",icon:"save"}

      }
    ]
  },{
    path:"/admin/announcement",
    redirect:"/admin/announcement/list",
    component: Layout,
    meta:{title:"公告管理",icon:"announcement"},
    name:"公告管理",
    children:[
      {
        path:"list",
        name:"公告列表",
        component:()=>import("@/views/announcement/list"),
        meta:{title:"公告列表",icon:"table"}
      },
      {
        path:"save",
        name:"添加公告",
        component:()=>import("@/views/announcement/save"),
        meta:{title:"添加公告",icon:"save"}

      },
      {
        path:"update/:id",
        name:"修改公告",
        component:()=>import("@/views/announcement/save"),
        meta:{title:"修改公告",icon:"save"},
        hidden:true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
