<template>
  <div
    id="task"
    class="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4 border-l-transparent"
  >
    <div class="inline-flex items-center space-x-2">
      <div>
        <svg
          v-if="taskInfo.status"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-slate-500"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer"
          @click="setAsDone()"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div :class="isDoneClass(taskInfo.status)">
        {{ taskInfo.description }}
      </div>
    </div>
    <div class="columns-2">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
          @click="updateTask(_index, taskInfo)"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2"
          />
        </svg>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
          @click="deleteTask(_index)"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
    </div>
  </div>

  <div
    v-show="updateModalOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Update Task</h3>
        <svg
          @click="updateModalOpen = false"
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8 text-red-900 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div class="mt-4">
        <div class="flex flex-row justify-between items-center mt-5">
          <div class="inline-flex space-x-2 items-center"></div>
        </div>
        <p class="text-slate-500">Enter your task description:</p>
        <div class="column-2">
          <div>
            <input
              ref="txtTaskDesc"
              type="text"
              name="task_desc"
              placeholder="Enter short description of your task"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              v-model="taskDetails.description"
            />
            <label class="inline-flex items-center mt-3">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-indigo-600"
                :checked="taskDetails.urgent"
                v-model="taskDetails.urgent"
                @change="toggleUrgency()"
              /><span class="ml-2 text-gray-700">Set as Urgent</span>
            </label>
          </div>
          <div class="float-right">
            <button
              @click="cancelUpdate()"
              class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              Cancel
            </button>
            <button
              class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded"
              @click="saveUpdateTask()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PlusIcon } from '@heroicons/vue/24/solid'
import { mapState, mapActions } from 'pinia'
import { useTodoStore } from '@/stores/todo'

export default {
  component: [PlusIcon],
  props: {
    _index: Number,
    taskInfo: {
      description: String,
      urgent: Number,
      status: Number
    }
  },
  data() {
    return {
      todoStore: useTodoStore(),
      updateModalOpen: false,
      taskDetails: {
        description: '',
        urgent: '',
        status: ''
      }
    }
  },
  methods: {
    ...mapActions(useTodoStore, ['updateTodo', 'removeTodo', 'toggleAsDone']),
    isDoneClass(status) {
      return {
        'text-slate-500 line-through': status,
        '': !status
      }
    },
    updateTask() {
      this.updateModalOpen = true
      Object.keys(this.taskInfo).forEach((key) => {
        this.taskDetails[key] = this.taskInfo[key]
      })
    },
    saveUpdateTask() {
      this.todoStore.updateTodo(this._index, this.taskDetails).then((res) => {
        console.log(res)
        this.todoStore.$patch((state) => {
          Object.keys(this.taskDetails).forEach((key) => {
            state.todoList[this._index][key] = this.taskDetails[key]
          })
        })
      })
      this.updateModalOpen = false
    },
    setAsDone() {
      this.taskDetails.status = !this.taskDetails.status ? 1 : 0
      console.log(this.taskDetails.status)
      this.todoStore.toggleAsDone(this._index, this.taskDetails['status']).then((res) => {
        console.log(res)
        this.todoStore.$patch((state) => {
          state.todoList[this._index]['status'] = this.taskDetails['status']
        })
      })
      this.updateModalOpen = false
    },
    cancelUpdate() {
      this.updateModalOpen = false
    }, //end fnm,
    deleteTask(index) {
      this.todoStore.removeTodo(index).then((res) => {
        console.log(res)
        this.todoStore.$patch((state) => {
          state.todoList.splice(index, 1)
        })
      })
    },
    toggleUrgency() {
      this.taskDetails.urgent = !this.taskDetails.urgent ? false : true
    }
  },
  computed: {
    ...mapState(useTodoStore, ['todoList'])
  }
}
</script>
