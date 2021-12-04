import HttpService from "@/services/HttpService";

const favoriteBooks = {
  state() {
    return {
      books: [],
    };
  },
  mutations: {
    setBooks(state, books) {
      state.books = books;
    },
    createFavoriteBook(state, book) {
      const index = state.books.findIndex((b) => b.id === book.id);

      if (index !== -1) {
        state.books[index].is_favorite = true;
      }

      state.books = [...state.books];
    },
    destroyFavoriteBook(state, book) {
      const index = state.books.findIndex((b) => b.id === book.id);

      if (index !== -1) {
        state.books[index].is_favorite = false;
      }

      state.books = [...state.books];
    },
  },
  actions: {
    loadBooks({ commit }) {
      commit("startLoading");
      return HttpService.get("books", (status, response) => {
        commit("setBooks", response.data);
        commit("stopLoading");
      });
    },
    removeFavoriteBook({ commit }, book) {
      HttpService.delete(`/user_books/${book.id}`, () => {
        commit("destroyFavoriteBook", book);
      });
    },
    setFavoriteBook({ commit }, book) {
      HttpService.post("/user_books", { book_id: book.id }, () => {
        commit("createFavoriteBook", book);
      });
    },
  },
};

export default favoriteBooks;
