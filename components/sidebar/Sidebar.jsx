import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  LocalOffer,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Store } from "../../context/Store";
import { useStyles } from "../../utils/styles";
import NextLink from 'next/link'
import dynamic from "next/dynamic";

function Sidebar({ currentSection }) {
  // 'currentSection' comes from LayoutAdmin
  const router = useRouter()
  const classes = useStyles();
  // Context-API Access
  const { state } = useContext(Store)
  const { userInfo } = state;
  // console.log('userInfo:', userInfo)
  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin === false) {
        router.push('/')
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={classes.sidebar}>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          {/* VERIFY 'isAdmin' property */}
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NextLink href="/admin/" className="link" passHref>
              <a>
                <li className={`sidebarListItem ${currentSection === "Home" && 'active'} `}>
                  <LineStyle className="sidebarIcon" />
                  Home
                </li>
              </a>
            </NextLink>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
          <NextLink href="/admin/allProducts" passHref>
              <a >
                <li className={`sidebarListItem ${currentSection === "Products" && 'active'} `}>
                  <LocalOffer className="sidebarIcon" />
                  Products
                </li>
              </a>
            </NextLink>
            <NextLink href="/admin/allUsers" passHref>
              <a >
                <li className={`sidebarListItem ${currentSection === "Users" && 'active'} `}>
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </a>
            </NextLink>
            <NextLink href="/admin/allOrders" passHref>
              <a >
                <li className={`sidebarListItem ${currentSection === "Orders" && 'active'} `}>
                  <Storefront className="sidebarIcon" />
                  Orders
                </li>
              </a>
            </NextLink>
        
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Sidebar), { ssr: false })
