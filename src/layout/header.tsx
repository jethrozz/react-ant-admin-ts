import { Layout, Menu, Dropdown } from "antd";
import logo from "@/assets/images/logo.svg";
import MyIcon from "@/components/icon/";
import { connect } from "react-redux";
import { clearUser } from "@/store/user/action";
import { clearSessionUser, setKey, USER_INFO, saveToken } from "@/utils";
import { State, Dispatch } from "@/types"
const { Header } = Layout;

const mapStateToProps = (state: State) => ({
  userInfo: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userOut: (info: State["user"]) => {
    clearSessionUser();
    if (info) {
      info.isLogin = false;
    }
    saveToken(null);
    setKey(true, USER_INFO, info);
    dispatch(clearUser());
  },
});

const RightMenu = ({ logout }: {
  logout: () => void;
}) => (
  <Menu className="right-down">
    <Menu.Item
      key="logout"
      onClick={logout}
      icon={<MyIcon type="icon_disconnectdevice" />}
    >
      退出登录
    </Menu.Item>
  </Menu>
);

const getPopupContainer = (HTMLElement: HTMLElement) => HTMLElement;

const HeaderDom = ({ userInfo, userOut, children }: {
  userInfo: State["user"];
  userOut: (u: State["user"]) => void;
  children: JSX.Element | null
}) => {
  return (
    <Header className="header">
      <div className="logo">
        <img src={logo} alt="logo"></img>
        <span>react-ant-admin</span>
      </div>
      {children}
      <div className="right">
        <Dropdown
          placement="bottomCenter"
          getPopupContainer={getPopupContainer}
          overlay={<RightMenu logout={() => userOut(userInfo)} />}
        >
          <div>管理员：{userInfo && userInfo.username}</div>
        </Dropdown>
      </div>
    </Header>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderDom);
