import Home from "~/pages/Home";
import Product from "~/pages/Card";
import Cart from "~/pages/Cart";
import Login from "~/pages/Login";
import Pay from "~/pages/Pay";
import { HeaderOnly } from "~/components/Layout";
import Register from "~/pages/Register";
import News from "~/pages/News/News";
import Chat from "~/pages/Chat";
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
        path: '/product',
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
    }

]
const privateRoutes = [

]
export { privateRoutes, publicRoutes }