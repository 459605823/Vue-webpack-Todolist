<template>
  <section class="real-app">
    <input
    type="text"
    class="add-input"
    autofocus="autofocus"
    placeholder="接下去要做什么？"
    @keyup.enter="addTodo"
    >
    <item
    v-for="todo in filteredTodos"
    :todo="todo"
    :key="todo.id"
    @del="deleteTodo"
    >
    </item>
    <tabs
    :filter="filter"
    :todos="todos"
    @toggle="toggleFilter"
    @clearAll="clearAllCompleted"
    >
    </tabs>
  </section>
</template>

<script>
let id = 0;
import item from './item.vue'
import tabs from './tabs.vue'
  export default{
    data(){
      return{
       todos:[],
       filter:'全部'
      }
    },
    components:{
      item,tabs
    },
    computed:{
      //过滤后的todos数组
      filteredTodos(){
        if(this.filter === '全部'){
          return this.todos;
        }
        let completed = this.filter === '已完成';//true or false
        //返回todo.completed与completed对应的项目
        return this.todos.filter(todo => completed === todo.completed);
      }
    },
    methods:{
      addTodo(e){
        if(e.target.value === ''){
          alert("给自己安排一下");
        }else{
          this.todos.unshift({
            id:id++,
            content:e.target.value.trim(),
            completed:false
          })
          e.target.value = '';
        }
      },
      deleteTodo(id){
        this.todos.splice(this.todos.findIndex(todo => todo.id === id),1);
      },
      toggleFilter(state){
        this.filter = state;
      },
      clearAllCompleted(){
        //过滤掉已完成即todo.completed为true的项目
        this.todos = this.todos.filter(todo => !todo.completed);
      }
    }
  }
</script>

<style>
.real-app{
    width: 600px;
    margin:50px auto;
    box-shadow :0px 0px 5px #666;
}
.add-input{
    position:relative;
    margin: 0px;
    width: 100%;
    font-size: 24px;
    font-family:  inherit;
    font-weight:inherit;
    line-height: 1.4rem;
    outline :none;
    color :inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0);
    box-sizing: border-box;
    padding: 16px 16px 16px 60px;
}
</style>
