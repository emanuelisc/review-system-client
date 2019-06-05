import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Notifications from "@/pages/Notifications.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import AddProvider from "@/views/AddProvider.vue";
import Users from "@/views/Users/Users.vue";
import UserDetails from "@/views/Users/UserDetails.vue";
import UserForm from "@/views/Users/UserForm.vue";
import Tickets from "@/views/Tickets/Tickets";
import TicketForm from "@/views/Tickets/TicketForm";
import Pages from "@/views/Pages/Pages";
import PageForm from "@/views/Pages/PageForm";
import PageCats from "@/views/Pages/Categories/PageCats";
import PageCatForm from "@/views/Pages/Categories/PageCatForm";
import Providers from "@/views/Providers/Providers";
import ProviderForm from "@/views/Providers/ProviderForm";
import ProviderCats from "@/views/Providers/Categories/ProviderCats";
import ProviderCatForm from "@/views/Providers/Categories/ProviderCatForm";
import About from "@/views/About.vue";

import Reviews from "@/views/Reviews/Reviews";
import ReviewInfo from "@/views/Reviews/ReviewInfo";
import ReviewForm from "@/views/Reviews/ReviewForm";
import ReviewCats from "@/views/Reviews/Categories/ReviewCats";
import ReviewCatForm from "@/views/Reviews/Categories/ReviewCatForm";
import ReviewTags from "@/views/Reviews/Tags/ReviewTags";
import ReviewTagForm from "@/views/Reviews/Tags/ReviewTagForm";

const routes = [
    {
        path: "/",
        component: DashboardLayout,
        redirect: "/pagrindinis",
        children: [
            {
                path: "pagrindinis",
                name: "Pagrindinnis",
                component: Dashboard,
                meta: {
                    title: 'Pagrindinis'
                }
            },
            {
                path: "profilis",
                name: "profilis",
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
                path: "atsiliepimai",
                name: "review-list",
                component: Reviews,
                meta: {
                    requiresAuth: true,
                    title: 'Visi atsiliepimai'
                }
            },
            {
                path: "atsiliepimai/:id",
                name: "review-info",
                component: ReviewInfo,
                meta: {
                    requiresAuth: true,
                    title: 'Atsiliepimo informacija'
                }
            },
            {
                path: "imones",
                name: "provider-list",
                component: Providers,
                meta: {
                    requiresAuth: true,
                    title: 'Visos įmonės'
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
                path: 'atsiliepimai/kategorijos',
                name: 'review-cat-list',
                component: ReviewCats,
                meta: {
                    requiresAuth: true,
                    title: 'Atsiliepimų kategorijų sąrašas'
                }
            },
            {
                path: 'atsiliepimai/kategorijos/naujas',
                name: 'review-cat-new',
                component: ReviewCatForm,
                meta: {
                    requiresAuth: true,
                    title: 'Pridėti kategoriją'
                }
            },
            {
                path: 'atsiliepimai/kategorijos/:id/',
                name: 'review-cat-edit',
                component: ReviewCatForm,
                meta: {
                    requiresAuth: true,
                    title: 'Redaguoti kategoriją'
                }
            },
            {
                path: 'atsiliepimai/tagai',
                name: 'review-tag-list',
                component: ReviewTags,
                meta: {
                    requiresAuth: true,
                    title: 'Atsiliepimų tagų sąrašas'
                }
            },
            {
                path: 'atsiliepimai/tagai/naujas',
                name: 'review-tag-new',
                component: ReviewTagForm,
                meta: {
                    requiresAuth: true,
                    title: 'Pridėti naują tagą'
                }
            },
            {
                path: 'atsiliepimai/tagai/:id/',
                name: 'review-tag-edit',
                component: ReviewTagForm,
                meta: {
                    requiresAuth: true,
                    title: 'Redaguoti tagą'
                }
            },
            {
                path: 'atsiliepimai/:id/redaguoti',
                name: 'review-edit',
                component: ReviewForm,
                meta: {
                    requiresAuth: true,
                    title: 'Redaguoti atsiliepimą'
                }
            },
            {
                path: 'atsiliepimai/naujas',
                name: 'review-new',
                component: ReviewForm,
                meta: {
                    requiresAuth: true,
                    title: 'Naujas atsiliepimas'
                }
            },
            {
                path: 'imones/kategorijos',
                name: 'provider-cat-list',
                component: ProviderCats,
                meta: {
                    requiresAuth: true,
                    title: 'Paslaugų tiekėjų kategorijų sąrašas'
                }
            },
            {
                path: 'imones/kategorijos/naujas',
                name: 'provider-cat-new',
                component: ProviderCatForm,
                meta: {
                    requiresAuth: true,
                    title: 'Pridėti paslaugų tiekėjų kategoriją'
                }
            },
            {
                path: 'imones/kategorijos/:id/',
                name: 'provider-cat-edit',
                component: ProviderCatForm,
                meta: {
                    requiresAuth: true,
                    title: 'Redaguoti kategoriją'
                }
            },
            {
                path: 'imones/:id/redaguoti',
                name: 'provider-edit',
                component: ProviderForm,
                meta: {
                    requiresAuth: true,
                    title: 'Redaguoti paslaugų tiekėją'
                }
            },
            {
                path: 'imones/naujas',
                name: 'provider-new',
                component: ProviderForm,
                meta: {
                    requiresAuth: true,
                    title: 'Naujas paslaugų tiekėjas'
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
                name: "login",
                component: Login
            },
            {
                path: "registruotis",
                name: "register",
                component: Register
            },
            {
                path: "naujas",
                name: "naujas",
                component: AddProvider
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
