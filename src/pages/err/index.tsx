import { Result, Button } from "antd";
import { connect } from "react-redux";
import { getDefaultMenu, } from "@/utils";
import { filterOpenKey } from "@/store/menu/action";
import { State, Dispatch, History } from "@/types"
const mapStateToProps = (state: State) => ({
  openMenus: state.menu.openedMenu,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  filterOpenKeyFn: (key: string) => dispatch(filterOpenKey(key)),
});

interface ErrProps {
  openMenus: State["menu"]["openedMenu"]
  history: History
  filterOpenKeyFn: (key: string) => void
  status: 403 | 404 | 500 | '403' | '404' | '500'
  errTitle: string
  subTitle: string
  [name: string]: any
}

function useErrorPage(props: ErrProps) {
  const {
    openMenus,
    history,
    filterOpenKeyFn,
    status = "404",
    errTitle = "404",
    subTitle = "Sorry, the page you visited does not exist.",
    location
  } = props;
  const back = async () => {
    const url =
      location.pathname +
      (location.hash || location.search);
    // 顶部一个或以下被打开
    if (openMenus.length <= 1) {
      filterOpenKeyFn(url);
      const defaultMenu = await getDefaultMenu();
      if (defaultMenu.openedMenu.length === 0) return history.replace("/");
      let { parentPath = '', path } = defaultMenu.openedMenu[0];
      history.replace(parentPath + path);
      return;
    }
    // 从顶部打开的路径，再去跳转
    const menuList = openMenus.filter((i) => i.path !== url);
    filterOpenKeyFn(url);
    const next = menuList[menuList.length - 1];
    history.replace(next.path);
  };
  return { status, errTitle, subTitle, back };
}

function ErrorPage(props: ErrProps) {
  const { status, errTitle, subTitle, back } = useErrorPage(props);
  return (
    <Result
      status={status}
      title={errTitle}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={back}>
          Go Back
        </Button>
      }
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
