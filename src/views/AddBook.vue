<template>
  <section class="add-group">
    <form @submit.prevent="addGroup">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="name" type="text" class="input" />
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea
            v-model="description"
            class="textarea"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <input type="submit" class="button is-link" value="Add Book" />
    </form>
  </section>
</template>

<script>
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseInit";

export default {
  name: "AddBook",
  data() {
    return {
      name: "",
      description: "",
    };
  },
  methods: {
    async addGroup() {
      try {
        const docRef = await addDoc(collection(db, "books"), {
          name: this.name,
          description: this.description,
          createdAt: Timestamp.now(),
        });
        console.log(docRef);
        this.name = "";
        this.description = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
