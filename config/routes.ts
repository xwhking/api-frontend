export default [
  { name: '登录', path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { name: '欢迎页面', path: '/welcome', icon: 'smile', component: './Welcome' },
  { name: '接口信息', path: '/index', icon: 'smile', component: './Index' },
  { name: '接口信息', path: '/interfaceDetail/:id', icon: 'smile', component: './InterfaceDetail' ,hideInMenu:true},
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理员页面',
    routes: [
      { icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo', name: '接口管理' },
      // { path: '/admin', redirect: '/admin/sub-page' },
      // { path: '/admin/sub-page', component: './Admin' },
    ],
  },
  // { icon: 'table', path: '/list', component: './InterfaceInfo', name: '表格页' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
