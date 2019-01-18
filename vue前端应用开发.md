# vue前端

> 简介：[v2](https://cn.vuejs.org/v2/guide/)、[v3](https://cn.vuejs.org/v3/guide/) <br>

> 组件：分为 `路由`、`业务`、`基础` 三类组件；组件的三个api：`props`、`event`、`slot`构成组件的核心。<br>
  　　　路由组件：用于接收参数、获取数据、可视化、用户交互等常规业务；无`props`、`event`，不复用，不对外提供api；<br>
  　　　业务组件：用于业务中多页面复用，一般不跨项目；往往集成了数据的输入输出、校验、事件、生命周期`钩子`、用户交互；<br>
  　　　基础组件：用于功能单一、能大量复用的组件，能通过不同的配置实现不同的功能，注重api的设计、兼容性、性能、高可用；
~~~vue
  # Vue组件：
  <template>
    <button ref="btn1" :class="'btn' + btnCls1" @click.native="handleClick"></button>
    <i-button ref="ibtn1" @eventName="handleClick"></i-button>
  </template>
  <script>
  export default {
    props:{}, data(){}, methods:{},
    mixins:[], provide:{}, inject:[],
    mounted(){
      this.$options; // 可选项
      this.$emit('eventName', eventArgs); // 自定义事件
      this.$refs; this.$parent; this.$children; // 访问组件/通信
    },
  }
  </script>
~~~

