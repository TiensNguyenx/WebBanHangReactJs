import Home from "~/pages/Home";
import Product from "~/pages/Card";
import Cart from "~/pages/Cart";
import Login from "~/pages/Login";
import Pay from "~/pages/Pay";
import { HeaderOnly } from "~/components/Layout";
import Register from "~/pages/Register";
import News from "~/pages/News/News";
import Chat from "~/pages/Chat";
import Profile from "~/pages/Profile";
import ProfileNoti from "~/pages/ProfileNoti";
import ProfileOrder from "~/pages/ProfileOrder";
import ProfilePassword from "~/pages/ProfilePassWord";
import ProfileInformation from "~/pages/ProfileInformation";
const publicRoutes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/cart',
        component: Cart,
        layout: HeaderOnly
    },
    {
        path: '/card',
        component: Product,
        layout: HeaderOnly
    },
    {
        path: '/login',
        component: Login,
        layout: HeaderOnly
    },
    {
        path: '/register',
        component: Register,
        layout: HeaderOnly
    },
    {
        path: '/pay',
        component: Pay,
        layout: HeaderOnly
    },
    {
        path: '/news',
        component: News,
        layout: HeaderOnly
    },
    {
        path: '/chat',
        component: Chat,
        layout: HeaderOnly
    },
    {
        path: '/profile',
        component: Profile,
        layout: HeaderOnly

    },
    {
        path: '/noti',
        component: ProfileNoti,
        layout: HeaderOnly

    },
    {
        path: '/order',
        component: ProfileOrder,
        layout: HeaderOnly

    },
    {
        path: '/password',
        component: ProfilePassword,
        layout: HeaderOnly

    },
    {
        path: '/information',
        component: ProfileInformation,
        layout: HeaderOnly
    }

]
const privateRoutes = [

]
export { privateRoutes, publicRoutes }