<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来要做什么"
            @keyup.enter="addTodo"
        />
        <Item
                :todo="todo"
                v-for="todo in fiteredTodos"
                :key="todo.id"
                @del="deleteTodo"
        />
        <Tabs
                :filter="filter"
                :todos="todos"
                @toggle="toggleFilter"
                @clearAllCompleted="clearAllCompleted"
        />
    </section>
</template>

<script>
    import Item from './item.vue';
    import Tabs from './tabs.vue';
    let id = 0;
    export default {
        data(){
          return{
              todos: [],
              filter: 'all'
          }
        },
        components: {
            Item,
            Tabs
        },
        computed: {
          fiteredTodos(){
              if(this.filter == 'all'){
                  return this.todos;
              }
              const completed = this.filter === 'completed';
              return this.todos.filter(todo => todo.completed === completed);
          }
        },
        methods:{
            addTodo(e){
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                });
                e.target.value = '';
            },
            deleteTodo(id){
                this.todos.splice(this.todos.findIndex(todo => todo.id === id),1);
            },
            toggleFilter(state){
                this.filter = state;
            },
            clearAllCompleted(){
                this.todos = this.todos.filter(todo => !todo.completed);
            }
        }
    }
</script>

<style lang="less" scoped>
    .real-app{
        width:1000px;
        margin:0 auto;
        background-color:#fff;
        padding: 10px;
        box-shadow: 0 0 20px;
    }
    .add-input {
        height: 38px;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }
</style>