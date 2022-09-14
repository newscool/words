<template>
  <section class="book-detail">
    <!-- comp: words list -->
    <div class="word-list">
      <p v-if="!words.length">입력된 단어가 없습니다.</p>
      <ul v-else>
        <li v-for="word in words" :key="word.id">
          <div class="word">{{ word.word }}</div>
          <div class="phonetic">{{ word.phonetic }}</div>
        </li>
      </ul>
    </div>
    <hr />
    <h3>공부 시작</h3>
    <div class="buttons">
      <a href="" class="button">전체</a>
      <a href="" class="button">약한</a>
      <a href="" class="button">중간</a>
      <a href="" class="button">강한</a>
      <a href="" class="button">즐겨찾기</a>
    </div>
    <hr />
    <!-- words to save -->
    <div class="word-to-save">
      <ul>
        <li v-for="word in wordsToSave" :key="word.word">
          {{ word.word }}
        </li>
      </ul>
      <a @click="saveWords" class="button is-dark mt-3">단어 저장하기</a>
    </div>
    <!-- comp: add words -->
    <div class="add-words mt-5">
      <h3>단어를 추가하세요</h3>
      <!-- <p>단어를 입력하고 엔터를 치세요</p> -->
      <input
        v-model="wordToSearch"
        @keydown.enter="searchWord()"
        type="text"
        class="input"
      />
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseInit";

export default {
  data() {
    return {
      bookId: "",
      words: [],
      wordToSearch: "",
      wordsToSave: [],
    };
  },
  methods: {
    async getWords() {
      const qs = query(
        collection(db, "words"),
        where("book", "==", `${this.bookId}`)
      );
      try {
        const ss = await getDocs(qs);
        ss.forEach((doc) => {
          this.words.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.log(error);
      }
    },
    async searchWord() {
      try {
        const { data } = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${this.wordToSearch}`
        );
        console.log(data);
        const word = {
          word: data[0].word,
          phonetic: data[0].phonetic,
          phonetics: data[0].phonetics,
          meanings: data[0].meanings,
        };
        this.wordsToSave.push(word);
        this.wordToSearch = "";
      } catch (error) {
        console.log(error);
      }
    },
    saveWords() {
      this.wordsToSave.forEach(async (word) => {
        console.log(word.word);
        try {
          const docRef = await addDoc(collection(db, "words"), {
            word: word.word,
            book: this.bookId,
            phonetic: word.phonetic,
            phonetics: word.phonetics,
            meanings: word.meanings,
          });
          console.log(docRef);
        } catch (error) {
          console.log(error);
        }
      });
      this.wordsToSave = [];
    },
  },
  created() {
    this.bookId = this.$route.params.id;
    this.getWords();
  },
};
</script>

<style lang="scss" scoped>
.book-detail {
  .word-to-save {
    ul {
      display: flex;
      gap: 10px;
      li {
        background-color: #f5f5f5;
        padding: 1rem;
      }
    }
  }
}
</style>
