<template>
    <div :class="['todo-item',todo.completed ? 'completed' : '']">
        <input
            type="checkbox"
            class="toggle"
            v-model="todo.completed"
        >
        <label>{{todo.content}}</label>
        <button class="destroy" @click="deleteTodo">X</button>
    </div>
</template>

<script>
    export default {
        props: {
            todo: {
                type: Object,
                required: true,
            }
        },
        methods: {
            deleteTodo(){
                this.$emit('del',this.todo.id);
            }
        }
    }
</script>

<style lang="less" scoped>
    .todo-item {
        line-height: 40px;
    }
    .completed{
        color:#999;
        text-decoration: underline;
    }
</style>