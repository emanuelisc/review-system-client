import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Notifications from "@/pages/Notifications.vue";
import Login from "@/views/Login.vue";
import Users from "@/views/Users/Users.vue";
import UserDetails from "@/views/Users/UserDetails.vue";
import UserForm from "@/views/Users/UserForm.vue";
import Tickets from "@/views/Tickets/Tickets";
import TicketForm from "@/views/Tickets/TicketForm";
import Pages from "@/views/Pages/Pages";
import PageForm from "@/views/Pages/PageForm";
import PageCats from "@/views/Pages/Categories/PageCats";
import PageCatForm from "@/views/Pages/Categories/PageCatForm";
import About from "@/views/About.vue";

const routes = [
    {
        path: "/",
        component: DashboardLayout,
        redirect: "/dashboard",
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: Dashboard,
                meta: {
                    requiresAuth: true,
                    title: 'Pagrindinis'
                }
            },
            {
                path: "pagrindinis",
                name: "pagrindinis",
                component: Dashboard,
                meta: {
                    requiresAuth: true,
                    title: 'Pagrindinis'
                }
            },
            {
                path: "vartotojai",
                name: "user-list",
                component: Users,
                meta: {
                    requiresAuth: true,
                    title: 'Visi vartotojai'
                }
            },
            {
                path: 'vartotojai/:id',
                name: 'user-info',
                component: UserDetails,
                meta: {
                    requiresAuth: true,
                    title: 'Vartotojo informacija'
                }
            },
            {
                path: 'vartotojai/:id/redaguoti',
                name: 'user-edit',
                component: UserForm,
                meta: {
                    requiresAuth: true,
                    title: 'Redaguoti vartotoją'
                }
            },
            {
                path: 'vartotojai/naujas',
                name: 'user-new',
                component: UserForm,
                meta: {
                    requiresAuth: true,
                    title: 'Naujas vartotojas'
                }
            },
            {
                path: "puslapiai",
                name: "page-list",
                component: Pages,
                meta: {
                    requiresAuth: true,
                    title: 'Visi puslapiai'
                }
            },
            {
                path: "pranesimai",
                name: "ticket-list",
                component: Tickets,
                meta: {
                    requiresAuth: true,
                    title: 'Visi pranešimai'
                }
            },
            {
                path: 'pranesimai/:id/',
                name: 'page-details',
                component: TicketForm,
                meta: {
                    requiresAuth: true,
                    title: 'Pranešimo informacija'
                }
            },
            {
                path: 'puslapiai/kategorijos',
                name: 'page-cat-list',
                component: PageCats,
                meta: {
                    requiresAuth: true,
                    title: 'Puslapių kategorijų sąrašas'
                }
            },
            {
                path: 'puslapiai/kategorijos/naujas',
                name: 'page-cat-new',
                component: PageCatForm,
                meta: {
                    requiresAuth: true,
                    title: 'Pridėti puslapių kategoriją'
                }
            },
            {
                path: 'puslapiai/kategorijos/:id/',
                name: 'page-cat-edit',
                component: PageCatForm,
                meta: {
                    requiresAuth: true,
                    title: 'Redaguoti kategoriją'
                }
            },
            {
                path: 'puslapiai/:id/redaguoti',
                name: 'page-edit',
                component: PageForm,
                meta: {
                    requiresAuth: true,
                    title: 'Redaguoti puslapį'
                }
            },
            {
                path: 'puslapiai/naujas',
                name: 'page-new',
                component: PageForm,
                meta: {
                    requiresAuth: true,
                    title: 'Naujas puslapis'
                }
            },
            {
                path: "table",
                name: "Table List",
                component: TableList,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "typography",
                name: "Typography",
                component: Typography,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "icons",
                name: "Icons",
                component: Icons,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "notifications",
                name: "Notifications",
                component: Notifications,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "login",
                name: "Login",
                component: Login
            },
            // {
            //     path: "register",
            //     name: "Register",
            //     component: Register
            // },
            {
                path: "about",
                name: "About",
                component: About
            },
        ]
    }
];

export default routes;
