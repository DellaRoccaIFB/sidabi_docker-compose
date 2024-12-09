import Vue from "vue";
import VueRouter from "vue-router";
import Base from "../views/Base/BaseComponent.vue";
import CardSelectionView from "../views/CardSelectionView.vue";
import ScaleSelectionView from "../views/ScaleSelectionView.vue";
import GeneralDataScaleView from "../views/GeneralDataScaleView.vue";
import LoginView from "../views/LoginView.vue";
import PatientsListView from "../views/PatientsListView.vue";
import PatientsListViewScale from "../views/PatientsListViewScale.vue";
import ResultsView from "../views/ResultsView.vue";
import ScaleView from "../views/ScaleView.vue";
import SensorView from "../views/SensorView.vue";
import store from "../store";
// import App from '../App.vue'
import ScaleViewSam from "../views/ScaleViewSam.vue";
import ScaleViewMca from "../views/ScaleViewMca.vue";
import ScaleViewAes from "../views/ScaleViewAes.vue";
import ScaleViewMbss from "../views/ScaleViewMbss.vue";
import ScaleViewSfss from "../views/ScaleViewSfss.vue";
import ScaleViewStai from "../views/ScaleViewStai.vue";



//import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    meta: { guest: true }
  },
  {
    path: "/patients",
    name: "patients",
    component: Base,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/",
        component: CardSelectionView,
        name: "card_selection",
        meta: { requiresAuth: true }
      },
      {
        path: "updrs_patients",
        component: PatientsListView,
        name: "updrs_patients",
        meta: { requiresAuth: true }
      },
      {
        path: "sensor_patients",
        component: PatientsListView,
        name: "sensor_patients",
        meta: { requiresAuth: true }
      },
      {
        path: "scale_patients",
        component: ScaleSelectionView,
        name: "scale_patients",
        meta: { requiresAuth: true }
      },
      {
        path: "general_data_scale",
        component: GeneralDataScaleView,
        name: "general_data_scale",
        meta: { requiresAuth: true }
      },
      {
        path: "scale_patients/aes",
        component: PatientsListView,
        name: "aes",
        meta: { requiresAuth: true }
      },
      {
        path: "scale_patients/mbss",
        component: PatientsListView,
        name: "mbss",
        meta: { requiresAuth: true }
      },
      {
        path: "scale_patients/sam",
        component: PatientsListView,
        name: "sam",
        meta: { requiresAuth: true }
      },
      {
        path: "scale_patients/cma",
        component: PatientsListView,
        name: "cma",
        meta: { requiresAuth: true }
      },
      {
        path: "scale_patients/sfss",
        component: PatientsListView,
        name: "sfss",
        meta: { requiresAuth: true }
      },
      {
        path: "scale_patients/stai",
        component: PatientsListView,
        name: "stai",
        meta: { requiresAuth: true }
      },

      {
        path: "updrs",
        component: ResultsView,
        name: "updrsResult",
        meta: { requiresAuth: true }
      },
      {
        path: "sensor",
        component: SensorView,
        name: "sensor",
        meta: { requiresAuth: true }
      },
      {
        path: "scale",
        component: ScaleView,
        name: "scale",
        meta: { requiresAuth: true }
      },
      {
        path: "scale/cma",
        component: ScaleViewMca,
        name: "scaleMca",
        meta: { requiresAuth: true }
      },
      {
        path: "scale/sam",
        component: ScaleViewSam,
        name: "scaleSam",
        meta: { requiresAuth: true }
      },
      {
        path: "scale/aes",
        component: ScaleViewAes,
        name: "scaleAes",
        meta: { requiresAuth: true }
      },
      {
        path: "scale/mbss",
        component: ScaleViewMbss,
        name: "scaleMbss",
        meta: { requiresAuth: true }
      },
      {
        path: "scale/Sfss",
        component: ScaleViewSfss,
        name: "scaleSfss",
        meta: { requiresAuth: true }
      },
      {
        path: "scale/stai",
        component: ScaleViewStai,
        name: "scaleStai",
        meta: { requiresAuth: true }
      }
    ]
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["session/isAuthenticated"]) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.guest)) {
    if (store.getters["session/isAuthenticated"]) {
      next("/patients");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;