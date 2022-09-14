<template>
  <section class="books-list">
    <div class="columns is-variables is-multiline">
      <div v-for="book in books" :key="book.id" class="column is-3">
        <router-link :to="{ name: 'book detail', params: { id: book.id } }">
          <div class="card">
            <div class="card-content has-text-centered">
              <p class="title">{{ book.name }}</p>
              <p>{{ book.description }}</p>
              <p>{{ book.createdAt | moment("from") }}</p>
            </div>
            <div class="card-footer">
              <a href="" class="card-footer-item">공부시작</a>
              <a href="" class="card-footer-item">단어관리</a>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebaseInit";

export default {
  data() {
    return {
      books: [],
    };
  },
  methods: {
    async getBooksList() {
      try {
        const q = query(collection(db, "books"), orderBy("createdAt", "desc"));
        const qs = await getDocs(q);
        qs.forEach((doc) => {
          this.books.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            createdAt: doc.data().createdAt.toDate(),
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getBooksList();
  },
};
</script>

<style lang="scss" scoped>
.books-list {
  .card {
    .card-content {
      .title {
        font-size: 1.3rem;
      }
      p {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
