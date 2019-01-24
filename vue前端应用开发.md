# vue 前端开发

####  简介：[v2](https://cn.vuejs.org/v2/guide/)、[v3](https://cn.vuejs.org/v3/guide/) <br>

> `组件`：分为 `路由`、`业务`、`基础` 三类组件；三个api：`props`、`event`、`slot`构成了组件的核心。<br>
　　`路由`：用于接收参数、获取数据、可视化、用户交互等常规业务；无`props`、`event`，不复用，不对外提供api；<br>
　　`业务`：用于多页面复用，一般不跨项目；往往集成了数据的输入输出、校验、事件、生命周期`钩子`、用户交互；<br>
　　`基础`：用于功能单一、能大量复用的组件，能通过配置实现不同的功能，注重api的设计、兼容性、性能、高可用；

~~~vue
  <template>
    <button ref="btn1" :class="'btn' + btnCls1" @click.native="handleClick"></button>
    <i-button ref="ibtn1" @eventName="handleClick"></i-button>
  </template>
  <script>
  export default {
    components: {}, // 组件-输入: 依赖的子组件
    name: 'iComponent', // 组件-输出: <i-component/> - this.$options.name
    props:{}, data(){}, methods:{}, // 组件-输出属性: props, -内部属性: data, -内部方法: methods
    mixins:[], provide:{}, inject:[], // 组件-结合扩展: mixins, -对内提供: provide, -依赖注入: inject
    // 生命周期钩子：创建组件实例
    created(){
      // 创建事件、依赖对象等
    },
    // 生命周期钩子：创建组件后进行渲染时
    mounted(){
      this.$options; // 可选项
      this.$emit('eventName', eventArgs); // 自定义事件
      this.$refs; this.$parent; this.$children; // 访问组件/通信
    },
    // 生命周期钩子：组件销毁前
    beforeDestroy(){
      // 销毁事件、依赖对象等
    }
  }
  </script>
~~~

