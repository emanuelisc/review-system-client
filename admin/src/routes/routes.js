import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Notifications from "@/pages/Notifications.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
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

import MainLayout from "@/views/layout/MainLayout";
import Puslapis from "@/views/layout/Page";
import Administration from "@/views/layout/Administration";
import UserReviews from "@/views/layout/UserReviews";
import MainDashboard from "@/pages/DashboardMain";
import Kategorijos from "@/views/Reviews/Categories/ReviewCatsFront";
import Imones from "@/views/Providers/ProviderListFront";
import Imone from "@/views/Providers/ProviderFrontInfo";
import ImoneKategorijos from "@/views/Providers/Categories/ProviderCatsFront";
import Atsiliepimai from "@/views/Reviews/ReviewListFront";
import Atsiliepimas from "@/views/Reviews/ReviewFrontInfo";
import Naujas from "@/views/Reviews/ReviewFormFront";

const routes = [
    {
        path: "/",
        component: MainLayout,
        redirect: "/pagrindinis",
        children: [
            {
                path: "pagrindinis",
                name: "pats-pagrindinis",
                component: MainDashboard,
                meta: {
                    title: 'Pagrindinis'
                }
            },
            {
                path: "kategorijos",
                name: "kategorijos",
                component: Kategorijos,
                meta: {
                    title: 'Kategorijos'
                }
            },
            {
                path: "atsiliepimai",
                name: "atsiliepimai",
                component: Atsiliepimai,
                meta: {
                    title: 'Atsiliepimai'
                }
            },
            {
                path: "naujas",
                name: "naujas-atsiliepimas",
                component: Naujas,
                meta: {
                    title: 'Naujas atsiliepimas',
                    provider: 0
                }
            },
            {
                path: 'atsiliepimai/:id',
                name: 'atsiliepimai-vienas',
                component: Atsiliepimas,
                meta: {
                    title: 'Atsiliepimas'
                }
            },
            {
                path: "imoniu-kategorijos",
                name: "imoniu-kategorijos",
                component: ImoneKategorijos,
                meta: {
                    title: 'Kategorijos'
                }
            },
            {
                path: "imones",
                name: "imones",
                component: Imones,
                meta: {
                    title: 'Paslaugų tiekėjai'
                }
            },
            {
                path: 'imones/:id',
                name: 'imones-vienas',
                component: Imone,
                meta: {
                    title: 'Paslaugų tiekėjai'
                }
            },
            {
                path: 'naudotojas/:id',
                name: 'user-front-info',
                component: UserDetails,
                meta: {
                    requiresAuth: true,
                    title: 'Naudotojo informacija'
                }
            },
            {
                path: 'puslapis/:id',
                name: 'page',
                component: Puslapis,
                meta: {
                    title: 'Puslapis'
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
                path: "administravimas",
                name: "administravimas",
                component: Administration,
                meta: {
                    requiresAuth: true,
                    title: 'Administravimas'
                }
            },
            {
                path: "administravimas/atsiliepimai",
                name: "user-review",
                component: UserReviews,
                meta: {
                    requiresAuth: true,
                    title: 'Administravimas - Atsiliepimai'
                }
            },
            {
                path: "administravimas/atsiliepimai/:id",
                name: "atsiliepimai-redaguoti",
                component: Naujas,
                meta: {
                    requiresAuth: true,
                    title: 'Atsiliepimai - Redagavimas'
                }
            },
        ]
    },
    {
        path: "/company",
        component: DashboardLayout,
        redirect: "/company/pagrindinis",
        children: [
            {
                path: "pagrindinis",
                name: "company-main",
                component: Dashboard,
                meta: {
                    requiresAuth: true,
                    title: 'Pagrindinis'
                }
            },
            {
                path: "login",
                name: "Login",
                component: Login,
                meta: {
                    permission: 'Company'
                }
            },
            {
                path: "register",
                name: "Register",
                component: Register
            },
        ]
    },
    {
        path: "/admin/",
        component: DashboardLayout,
        redirect: "/admin/pagrindinis",
        children: [
            {
                path: "pagrindinis",
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
                name: "Login",
                component: Login,
                meta: {
                    permission: 'Staff'
                }
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
