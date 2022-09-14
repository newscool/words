import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/books",
  },
  {
    path: "/books",
    name: "books",
    component: () =>
      import(/* webpackChunkName: "books" */ "@/views/BooksList.vue"),
  },
  {
    path: "/books/add",
    name: "add book",
    component: () =>
      import(/* webpackChunkName: "add book" */ "@/views/AddBook.vue"),
  },
  {
    path: "/books/:id",
    name: "book detail",
    component: () =>
      import(/* webpackChunkName: "book detail" */ "@/views/BooksDetail.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
