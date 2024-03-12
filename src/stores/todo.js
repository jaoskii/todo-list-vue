import { defineStore } from 'pinia'
import axios from 'axios';

export const useTodoStore = defineStore('todo', {
  state: () => {
    return { 
        todoList: [],
    }
  },
  getters: {
    getTodoList: (state) => state.todoList,
    getUrgentTaskOnly: (state) => state.todoList.filter((x) => x.urgent == 1),
  },
  actions: {
    async fetchTodoList() {
        const url = import.meta.env.VITE_BASE_BACKEND_URL + '/todo';
        return await axios({
          method: 'get',
          url: url,
        }).then(function (response) {
          return response;
        }).catch(function (error) {
            return error;
        })
    },
    async createTodoList(params = {}) {
        const url = import.meta.env.VITE_BASE_BACKEND_URL + '/todo/add';
        let config = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
        };
        console.log(params);
        return await axios.post(url, params, config).then(function (data) {
            return data;
        }).catch(function (error) {
            return error;
        });
    },
    async updateTodo(index, params = {}) {
        const url = import.meta.env.VITE_BASE_BACKEND_URL + '/todo/update/' + index;
        let config = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
        };
        return await axios.post(url, params, config).then(function (data) {
            return data;
        }).catch(function (error) {
            return error;
        });
    },
    async toggleAsDone(index, status) {
        const url = import.meta.env.VITE_BASE_BACKEND_URL + '/todo/tag-done/'+index;
        let config = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
        };
        return await axios.post(url, { 'status': status }, config).then(function (data) {
            return data;
        }).catch(function (error) {
            return error;
        });
    },
    async removeTodo(index) {
        const url = import.meta.env.VITE_BASE_BACKEND_URL + '/todo/delete/' + index;
        let config = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
        };
        return await axios.post(url, {}, config).then(function (data) {
            return data;
        }).catch(function (error) {
            return error;
        });
    },
  },
  //persist: true,
/*   persist: {
    storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
  }, */
})