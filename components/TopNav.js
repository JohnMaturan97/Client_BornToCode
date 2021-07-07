import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  CodeSandboxOutlined,
  InstagramOutlined,
  CoffeeOutlined,
  CommentOutlined,
  ClusterOutlined,
  LogoutOutlined,
  UserAddOutlined,
  AppleOutlined,
  VideoCameraAddOutlined,
  BugOutlined,
  BarsOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast.success(data.message);
    router.push("/login");
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[current]}
      className="mb-2"
    >
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        className="float-left"
        icon={<CodeSandboxOutlined className="text-info" />}
      >
        <Link href="/">
          <a className="text-info">BornToCode Academy</a>
        </Link>
      </Item>

      {user && user.role && user.role.includes("Instructor") ? (
        <Item
          key="/instructor/course/create"
          onClick={(e) => setCurrent(e.key)}
          className="float-left"
          icon={<VideoCameraAddOutlined className="text-info" />}
        >
          <Link href="/instructor/course/create">
            <a className="text-info">Content Creation</a>
          </Link>
        </Item>
      ) : (
        <Item
          key="/user/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          className="float-left"
          icon={<AppleOutlined className="text-info" />}
        >
          <Link href="/user/become-instructor">
            <a className="text-info">Become an Instructor</a>
          </Link>
        </Item>
      )}

      {user === null && (
        <>
          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            className="float-right"
            icon={<UserAddOutlined className="text-info" />}
          >
            <Link href="/register">
              <a className="text-info">Register</a>
            </Link>
          </Item>

          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            className="float-right"
            icon={<CoffeeOutlined className="text-info" />}
          >
            <Link href="/login">
              <a className="text-info">Login</a>
            </Link>
          </Item>
        </>
      )}
      {user !== null && (
        <SubMenu
          icon={<BarsOutlined className="text-info" />}
          title={user && user.name}
          className="float-right text-info"
        >
          <ItemGroup>
            <Item key="/user" icon={<ClusterOutlined className="text-info" />}>
              <Link href="/user">
                <a className="text-info">DashBoard</a>
              </Link>
            </Item>

            <Item
              onClick={(e) => setCurrent(e.key)}
              icon={<InstagramOutlined className="text-info" />}
              className="float-center"
            >
              <Link href="https://codeverse-network-site.herokuapp.com/login">
                <a className="text-info" target="_blank">
                  Codverse
                </a>
              </Link>
            </Item>

            <Item
              onClick={(e) => setCurrent(e.key)}
              icon={<CommentOutlined className="text-info" />}
              className="float-center"
            >
              <Link href="https://bugchat.netlify.app/">
                <a className="text-info" target="_blank">
                  BugChat
                </a>
              </Link>
            </Item>

            <Item
              onClick={(e) => setCurrent(e.key)}
              icon={<ShoppingCartOutlined className="text-info" />}
              className="float-center"
            >
              <Link href="https://latenight-30minutesorless.herokuapp.com/">
                <a className="text-info" target="_blank">
                  Pizza | Wings{" "}
                </a>
              </Link>
            </Item>

            <Item
              onClick={logout}
              className="float-center text-info"
              icon={<LogoutOutlined className="text-info" />}
            >
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
      {user && user.role && user.role.includes("Instructor") && (
        <Item
          key="/instructor"
          onClick={(e) => setCurrent(e.key)}
          className="float-right"
          icon={<AppleOutlined className="text-info" />}
        >
          <Link href="/instructor">
            <a className="text-info">Instructor</a>
          </Link>
        </Item>
      )}
    </Menu>
  );
};

export default TopNav;
