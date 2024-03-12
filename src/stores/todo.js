import { defineStore } from 'pinia'
import axios from 'axios';

export const useTodoStore = defineStore('todo', {
  state: () => {
    return { 
        todoList: [
          { description: 'YT Intro remix', status: 1, urgent: 0 },
          { description: 'Twitter News', status: 1, urgent: 0 },
          { description: 'Magic stuff', status: 1, urgent: 0 },
          { description: 'Edit Images on Project 1', status: 0, urgent: 1 },
          { description: 'Edit Images on Project 2', status: 0, urgent: 1 },
          { description: 'Training', status: 0, urgent: 1 }
        ],
    }
  },
  getters: {
    getTodoList: (state) => state.todoList,
    getUrgentTaskOnly: (state) => state.todoList.filter((x) => x.urgent == 1),
  },
  actions: {
    async fetchTodoList() {
        /* const url = import.meta.env.VITE_BASE_BACKEND_URL + 'v1/todo';
        return await axios.get(url).then(function (data) {
            return data;
        }).catch(function (error) {
            return error;
        }); */
    },
    async createTodoList(params = {}) {
       /*  const url = import.meta.env.VITE_BASE_BACKEND_URL + 'v1/todo/create';
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
        }); */
    },
    async updateTodo(params = {}) {
  /*       const url = import.meta.env.VITE_BASE_BACKEND_URL + 'v1/todo/update';
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
        }); */
    },
    async toggleAsDone(params = {}) {
  /*       const url = import.meta.env.VITE_BASE_BACKEND_URL + 'v1/todo/update';
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
        }); */
    },
    async removeTodo(params = {}) {
        /* const url = import.meta.env.VITE_BASE_BACKEND_URL + 'v1/todo/remove';
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
        }); */
    },
  },
  //persist: true,
/*   persist: {
    storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
  }, */
})