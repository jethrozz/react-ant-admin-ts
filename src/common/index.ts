import { getLocalMenu, saveLocalMenu } from "../utils";
import { getMenu } from "@/api";
import { DealMenuList } from "@/types/menu"

const RouterBasename: string = "/react-ant-admin";
function getMenus(): Promise<DealMenuList> {
  return new Promise((res, rej) => {
    let localMenu = getLocalMenu();
    if (localMenu) {
      return res(localMenu);
    }
    getMenu()
      .then((result) => {
        saveLocalMenu(result);
        res(result);
      })
      .catch((err) => {
        res([]);
      });
  });
}

export { getMenus, RouterBasename, };
