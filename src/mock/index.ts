import dayjs from "dayjs";
import { message } from "antd";
import { PowerApi, LoginApi, ResponseData, MenuInfoApi, MessageList, MessageAPi } from "@/types"

interface MockMenuItem {
  title: string
  path: string
  key: string
  parentKey: string,
  icon: string,
  type: string,
  order: number,
  parentPath?: string
  keepAlive?: string
  children?: MockMenuItem[]
}

type MockDataType = {
  "/getmenu": MockMenuItem[]
  "/getpower": PowerApi
  "/login": LoginApi
  "/addmenu": ResponseData
  "/addmessage": ResponseData
  "/getmessage": MessageAPi
  "/delmenu": ResponseData
  "/getmenuinfo": ResponseData & { data: MockMenuItem | null }
  "/editmenuinfo": ResponseData
  "/getvisitordata": ResponseData
  [key: string]: ResponseData | MockMenuItem[] | PowerApi | LoginApi | MenuInfoApi
}

let menu: MockMenuItem[] = [
  {
    title: "详情页",
    path: "/details",
    key: "details",
    parentKey: "",
    icon: "icon_edit",
    type: "1,0",
    order: 3,
  },
  {
    title: "个人中心",
    path: "/person",
    key: "detailsPerson",
    parentKey: "details",
    icon: "icon_infopersonal",
    type: "0,1",
    order: 2,
  },
  {
    title: "403",
    path: "/403",
    key: "error403",
    parentKey: "result",
    icon: "",
    type: "1,0",
    order: 1,
  },
  {
    title: "404",
    path: "/404",
    key: "error404",
    parentKey: "result",
    icon: "",
    type: "1,0",
    order: 2,
  },
  {
    title: "500",
    path: "/500",
    key: "error500",
    parentKey: "result",
    icon: "",
    type: "1,0",
    order: 3,
  },
  {
    title: "基础表单",
    path: "/index",
    key: "formIndex",
    parentKey: "from",
    icon: "",
    type: "1,0",
    order: 2,
  },
  {
    title: "表单页",
    path: "/form",
    key: "from",
    parentKey: "",
    icon: "icon_form",
    type: "0,1",
    order: 2,
  },
  {
    title: "列表页",
    path: "/list",
    key: "list",
    parentKey: "",
    icon: "icon_list",
    type: "0,1",
    order: 1,
  },
  {
    title: "卡片列表",
    path: "/card",
    key: "listCard",
    parentKey: "list",
    icon: "",
    type: "0,1",
    order: 2,
  },
  {
    title: "查询列表",
    path: "/search",
    key: "listSearch",
    parentKey: "list",
    icon: "",
    type: "0,1",
    order: 1,
  },
  {
    title: "权限管理",
    path: "/power",
    key: "power",
    parentKey: "",
    icon: "icon_set",
    type: "0",
    order: 888,
  },
  {
    title: "菜单管理",
    path: "/menu",
    key: "powerMenu",
    parentKey: "power",
    icon: "icon_menu",
    type: "0",
    order: 1,
  },
  {
    title: "结果页",
    path: "/result",
    key: "result",
    parentKey: "",
    icon: "icon_voiceprint",
    type: "1,0",
    order: 4,
  },
  {
    icon: "icon_MTR",
    keepAlive: "true",
    key: "statistics",
    parentKey: "",
    path: "/statistics",
    title: "统计",
    type: "0",
    order: 6,
  },
  {
    icon: "icon_addresslist",
    keepAlive: "true",
    key: "visitor",
    parentKey: "statistics",
    path: "/visitor",
    title: "访客统计",
    type: "0",
    order: 2,
  },
  {
    title: "用户管理",
    path: "/user",
    key: "powerUser",
    parentKey: "power",
    icon: "icon_infopersonal",
    type: "0",
    keepAlive: "true",
    order: 2,
  },
  {
    icon: "icon_safety",
    keepAlive: "true",
    key: "powerType",
    order: 8888,
    parentKey: "power",
    path: "/type",
    title: "权限管理",
    type: "0",
  },
  {
    icon: "icon_safety",
    keepAlive: "true",
    key: "icons",
    order: 8887,
    parentKey: "",
    path: "/icons",
    title: "图标库",
    type: "0,1",
  },
];

const power = {
  status: 0,
  data: [
    { type: "0", name: "超级管理员" },
    { type: "1", name: "普通用户" },
  ],
  mapKey: [
    { title: "权限代号", dataIndex: "type", key: "type" },
    { title: "权限简称", dataIndex: "name", key: "name" },
  ],
  msg: ""
};

const userInfo = {
  msg: "登录成功",
  status: 0,
  token: "12323",
  data: { user_id: 1, username: "超级管理员", account: "admin", type: "0", isLogin: true },
};

const addMenu = {
  msg: "添加成功,菜单栏需要关闭页面重新打开即可生效！",
  status: 0,
};
const addMsg = { msg: "添加成功", status: 0 };

const msgList: MessageList = [
  {
    m_id: 1,
    name: "第一条消息",
    description: "我创建的第一天消息",
    creator: "超级管理员",
    add_time: "2021-04-20 17:01:09",
  },
  {
    m_id: 2,
    name: "RegExp",
    description:
      "RegExp 对象表示正则表达式,它是对字符串执行模式匹配的强大工具。 ",
    creator: "超级管理员",
    add_time: "2021-04-20 17:48:42",
  },
  {
    m_id: 3,
    name: "Ant Design",
    description:
      "antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。",
    creator: "超级管理员",
    add_time: "2021-04-20 17:46:44",
  },
  {
    m_id: 4,
    name: "react-ant-admin",
    description:
      "此框架使用与二次开发，前端框架使用react，UI框架使用ant-design，全局数据状态管理使用redux，ajax使用库为axios。用于快速搭建中后台页面。",
    creator: "超级管理员",
    add_time: "2021-04-20 17:28:45",
  },
];
const msg: MessageAPi = {
  status: 0,
  data: {
    mapKey: [
      { title: "消息id", dataIndex: "m_id", key: "m_id" },
      { title: "消息名称", dataIndex: "name", key: "name" },
      { title: "消息描述词", dataIndex: "description", key: "description" },
      { title: "创建人", dataIndex: "creator", key: "creator" },
      { title: "创建时间", dataIndex: "add_time", key: "add_time" },
    ],
    list: msgList,
    total: 4,
  },

  msg: "",
};
const delMenu = { msg: "操作成功", status: 0 };

const MockData: MockDataType = {
  "/getmenu": menu,
  "/getpower": power,
  "/login": userInfo,
  "/addmenu": addMenu,
  "/addmessage": addMsg,
  "/getmessage": msg,
  "/delmenu": delMenu,
  "/getmenuinfo": { status: 0, msg: '', data: null },
  "/editmenuinfo": { status: 0, msg: "修改成功！" },
  "/getvisitordata": { status: 1, msg: "暂无" },
};
type UrlType = keyof MockDataType
function get(url: UrlType) {
  return new Promise((res) => {
    setTimeout(() => {
      if (url === "/getmenu") {
        return res(formatMenu(MockData[url]));
      } else {
        let resData = MockData[url]
        res(resData || { status: 1, msg: "暂无" });
      }
    }, 500);
  }).then((res) => (res ? res : message.error("接口暂未配置")));
}

interface PostData extends MockMenuItem {
  account: string
  name: string
  description: string
}

function post(url: UrlType, data: PostData) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      switch (url) {
        case "/login":
          userInfo.data.account = data.account;
          if (data.account.indexOf("admin") === -1) {
            userInfo.data.type = "1";
            userInfo.data.username = "普通用户";
          }
          return res(userInfo);
        case "/addmenu":
          menu.push(data);
          return res(MockData[url]);
        case "/addmessage":
          msgList.push({
            ...data,
            m_id: Math.random(),
            creator: userInfo.data.username,
            add_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          });
          if (msg.data) {
            msg.data.total = msgList.length;
          }
          return res(MockData[url]);
        case "/delmenu":
          let newMenu = menu.filter((i) => i.key !== data.key);
          menu = newMenu.filter((i) => i.parentKey !== data.key);
          return res(MockData[url]);
        case "/getmenuinfo": {
          const findInfo = menu.find((i) => i.key === data.key);
          if (findInfo) {
            MockData[url].data = findInfo;
          }
          return res(MockData[url]);
        }
        case "/editmenuinfo":
          menu = menu.map((item) => {
            if (item.key === data.key) {
              return data;
            }
            return item;
          });
          return res(MockData[url]);
        case "/getmessage":
          let list = [...msgList];
          if (data.name) {
            list = list.filter((i) => i.name.includes(data.name));
          }
          if (data.description) {
            list = list.filter((i) => i.description.includes(data.description));
          }

          if (msg.data) {
            msg.data.total = list.length;
            msg.data.list = list;
          }
          return res(msg);
        default:
          res({ status: 1, msg: "暂无" });
          break;
      }
    }, 100);
  }).then((res: any) => (res.status === 0 ? res : message.error("接口暂未配置")));
}

function formatMenu(list: MockMenuItem[]): MockMenuItem[] | [] {
  list.sort((a: MockMenuItem, b: MockMenuItem) => a.order - b.order);
  let data = list.map((i) => ({ ...i }));
  if (Array.isArray(list)) {
    let praentList: MockMenuItem[] = [],
      childList: MockMenuItem[] = [];
    data.forEach((item) => {
      (item.type as unknown as string[]) = Array.isArray(item.type) ? item.type : item.type.split(",");
      if (item.parentKey) {
        childList.push(item);
        return;
      }
      praentList.push(item);
    });
    childList.forEach((item) => {
      let find = praentList.find((p) => p.key === item.parentKey);
      if (!find) {
        return praentList.push(item);
      }
      item.parentPath = find.path;
      if (find.children) {
        return find.children.push(item);
      }
      find.children = [item];
    });
    return praentList;
  }
  return [];
}
const mock = { get, post };

export default mock;
