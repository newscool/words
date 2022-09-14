<template>
  <div>test</div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseInit";

export default {
  async created() {
    console.log("test");
    try {
      const docRef = await addDoc(collection(db, "tests"), {
        title: "test 1",
        content: "test test 111",
      });
      console.log(docRef);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped></style>
