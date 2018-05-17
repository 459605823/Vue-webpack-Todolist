<template>
  <div class="helper">
    <span class="left">{{unFinishedTodoLength}} items left</span>
    <span class="tabs">
      <span
      v-for="state in states"
      :key="state"
      :class="[state,filter === state ? 'actived' : '']"
      @click="toggleFilter(state)"
      >
        {{state}}
      </span>
    </span>
    <span class="clear" @click="clearAllCompleted">清除所有已完成选项</span>
  </div>
</template>

<script>
   export default{
     props:{
       filter:{
         type:String,
         required:true
       },
       todos:{
         type:Array,
         required:true
       }
     },
     data(){
       return{
         states:['全部','未完成','已完成']
       }
     },
    computed:{
      //未完成项目的个数
      unFinishedTodoLength(){
        return(this.todos.filter(todo => !todo.completed).length);
      }
    },
    methods:{
      //子组件仅完成触发事件，操作数据在父组件中完成
     clearAllCompleted(){
       this.$emit('clearAll');
     },
     toggleFilter(state){
       this.$emit('toggle',state);
     }
    }
   }
</script>

<style>
.helper{
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  line-height: 30px;
  background-color: #ffffff;
  font-size: 14px;
}
.left,.clear,.tabs{
  padding :0px 10px;
  box-sizing: border-box;
}
.left,.clear{
  width: 150px;
}
.left{
  text-align: left;
}
.clear {
  text-align:right;
  cursor: pointer;
}
.tabs{
  width: 200px;
  display: flex;
  justify-content: space-around;
}
.tabs > *{
  display: inline-block;
  padding: 0px 10px;
  cursor: pointer;
  border: 1px solid rgba(175,47,47,0);
}
 .actived{
   border-color: rgba(175,47,47,0.4);
   border-radius: 5px;
 }
</style>
