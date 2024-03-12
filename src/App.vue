<script setup>
import TaskItem from './components/todo/TaskItem.vue'
</script>
<template>
  <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
    <div class="flex flex-row justify-between items-center">
      <div>
        <h1 class="text-3xl font-medium">Tasks list</h1>
      </div>
      <div class="inline-flex space-x-2 items-center">
        <a
          href="#"
          class="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center hover:bg-slate-200"
          @click="toggleUrgentTaskOnly()"
        >
          <StarIcon class="h-6 w-6 text-yellow-500" v-if="toggleUrgentTasks" />
          <StarIcon class="h-6 w-6" v-else />
          <span class="text-sm hidden md:block">Toggle Urgent Tasks</span>
        </a>
      </div>
    </div>
    <p class="text-slate-500">Hello, here are your latest tasks</p>

    <p v-if="current_tasks.length == 0" class="mt-5 text-xs text-slate-500 text-center">
      Task List is empty
    </p>
    <div id="tasks" class="my-5" v-else>
      <TaskItem
        v-for="(task, index) in current_tasks"
        :key="index"
        :taskInfo="task"
        :_index="index"
      />
    </div>

    <div class="flex flex-row justify-between items-center mt-10">
      <div>
        <h1 class="text-3xl font-medium">Add Task</h1>
      </div>
      <div class="inline-flex space-x-2 items-center"></div>
    </div>
    <p class="text-slate-500">Enter your task description:</p>
    <div class="column-2">
      <input
        ref="txtTaskDesc"
        type="text"
        name="task_desc"
        placeholder="Enter short description of your task"
        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        v-model="taskForm.description"
      />
      <label class="inline-flex items-center mt-3">
        <input
          type="checkbox"
          class="form-checkbox h-5 w-5 text-indigo-600"
          :checked="taskForm.urgent"
          v-model="taskForm.urgent"
          @change="toggleUrgency()"
        /><span class="ml-2 text-gray-700">Set as Urgent</span>
      </label>
      <a
        href="#"
        @click="addNewTask()"
        class="float-end mt-2 p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-indigo-200 hover:text-white bg-indigo-600 hover:bg-indigo-500"
      >
        <PlusIcon class="h-6 w-6 text-red-500" />
        <span class="text-sm font-medium hidden md:block">Add New Task</span>
      </a>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import { PlusIcon, StarIcon, HashtagIcon } from '@heroicons/vue/24/solid'
import { mapState, mapActions } from 'pinia'
import { useTodoStore } from '@/stores/todo'

export default {
  component: [PlusIcon, StarIcon, HashtagIcon],
  data() {
    return {
      current_tasks: [],
      taskForm: {
        description: '',
        urgent: 0,
        status: 0
      },
      toggleUrgentTasks: false,
      todoStore: useTodoStore()
    }
  },
  mounted() {
    this.$refs.txtTaskDesc.focus()
    this.current_tasks = this.todoListState
  },
  methods: {
    ...mapActions(useTodoStore, ['fetchTodoList', 'createTodoList']),
    fetchTodoList() {
      this.todoStore.fetchTodoList().then(() => {})
    },
    addNewTask() {
      if (this.taskForm.description != '') {
        var copyForm = {}
        Object.keys(this.taskForm).forEach((key) => {
          copyForm[key] = this.taskForm[key]
          this.taskForm[key] = ''
          if (key == 'urgent') {
            this.taskForm[key] = 0
          }
        })
        this.todoStore.createTodoList().then(() => {
          this.todoStore.$patch((state) => {
            state.todoList.unshift(copyForm)
          })
          this.$refs.txtTaskDesc.focus()
        })
      } else {
        alert('Please enter a task description')
        this.$refs.txtTaskDesc.focus()
      } //end if
    },
    toggleUrgency() {
      this.taskForm.urgent = !this.taskForm.urgent ? false : true
    },
    toggleUrgentTaskOnly() {
      if (this.toggleUrgentTasks) {
        this.toggleUrgentTasks = false
        this.current_tasks = this.todoListState
      } else {
        this.current_tasks = this.urgentOnlyState
        this.toggleUrgentTasks = true
      } //end if
      console.log(this.current_tasks)
    }
  },
  computed: {
    ...mapState(useTodoStore, ['todoList']),
    todoListState() {
      return this.todoStore.getTodoList
    },
    urgentOnlyState() {
      return this.todoStore.getUrgentTaskOnly
    }
  }
}
</script>
