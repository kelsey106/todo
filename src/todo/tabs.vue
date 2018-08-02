<template>
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} items left</span>
        <span class="tabs">
            <a href="javascript:;" v-for="state in states"
                  :key="state"
                  :class="[state,filter === state ? 'actived' : '']"
                  @click="toggleFilter(state)"
            >
                {{state}}
            </a>
        </span>
        <a href="javascript:;" class="clear" @click="clearAllCompleted">clear Completed</a>
    </div>
</template>

<script>
    export default {
        props: {
          filter: {
              type: String,
              required: true
          },
          todos: {
               type: Array,
                required: true
           }
        },
        data() {
            return {
                states : ['all','active','completed']
            }
        },
        computed: {
            unFinishedTodoLength(){
                return this.todos.filter(todo => !todo.completed).length;
            }
        },
        methods: {
            toggleFilter(state){
                this.$emit('toggle',state);
            },
            clearAllCompleted(){
                this.$emit('clearAllCompleted');
            }
        }
    }
</script>

<style lang="less" type="text/less" scoped>
    a{
        color:#333;
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    }
    .tabs{
        margin:0 100px;
        a{
            margin:0 10px;
        }
        a.actived{
            color: red;
         }
    }
</style>