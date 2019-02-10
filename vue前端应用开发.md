# vue 前端开发

####  简介：[`v2`](https://cn.vuejs.org/v2/guide/)、[`v3`](https://cn.vuejs.org/v3/guide/)<br>
　`UI库`：[`element`](https://github.com/ElemeFE/element)、
[`quasarchs`](http://www.quasarchs.com/guide/opening-dev-server-to-public.html)、
[`vuetify`](https://github.com/vuetifyjs/vuetify)、
[`vant`](https://github.com/youzan/vant)、
[`vue-material`](https://github.com/vuematerial/vue-material)<br>
　　[`iview`](https://www.iviewui.com/docs/guide/start)、
[`组件精讲`](https://juejin.im/book/5bc844166fb9a05cd676ebca/section/5bc844166fb9a05cf52af65f)、
[`组件代码`](https://github.com/angenal/vue-component-book) 

> `安装`: [@vue/cli@3.x](https://cli.vuejs.org/zh/guide/installation.html)

~~~
> npm install -g @vue/cli
> yarn global add @vue/cli
~~~

> `组件`：分为 `路由`、`业务`、`基础` 三类组件；三个api：`props`、`event`、`slot`构成了组件的核心。<br>
　　`路由`：用于接收参数、获取数据、可视化、用户交互等常规业务；无`props`、`event`，不复用，不对外提供api；<br>
　　`业务`：用于多页面复用，一般不跨项目；往往集成了数据的输入输出、校验、事件、生命周期`钩子`、用户交互；<br>
　　`基础`：用于功能单一、能大量复用的组件，能通过配置实现不同的功能，注重api的设计、兼容性、性能、高可用；<br>

~~~vue
  <template>
    <button ref="btn1" v-bind:title="btn1Title" :class="'btn' + btnCls1" @click.native="handleClick">
      <slot name="icon"><i class="icon-default"></i></slot>
      <span class="lbl"><slot>按钮默认文本</slot></span>
    </button>
    <i-button ref="ibtn1" @eventName="handleClick"><i slot="btn-icon" class="icon-ok"></i>按钮文本</i-button>
  </template>
  <script>
  // 导入第三方库
  import AsyncValidator from 'async-validator'; // 数据校验: https://github.com/yiminghe/async-validator
  // 导入组件库
  //----------------------------
  import iView from 'iview'; // 第三方组件库 iview: https://www.iviewui.com/docs/guide/start
  import 'iview/dist/styles/iview.css'; // 第三方组件库相关样式
  //----------------------------
  import { Button, ... } from 'element-ui' // 第三方组件库 element: https://github.com/ElemeFE/element
  Vue.component(Button.name, Button); // 注册Vue全局组件，一般写在根组件App.vue(根组件只创建一次)
  //----------------------------
  import iButton from '../components/i-button.vue'; // 自定义组件
  // Vue.component(iButton.name, iButton); // 注册Vue全局组件(使用场景比较多时)
  //----------------------------
  // 导入扩展功能
  import session from '../mixins/session.js';
  import userProvider from '../providers/user.js';
  
  // 组件设计、功能描述、版本说明 ^ import Component1 from '../components/component1.vue'
  export default {
    /* el: document.getElementById('app'), // el: '#app', 
    * render: h => h(App) // 组件渲染
    * 1.自动挂载: 将组件渲染后自动挂载到DOM元素上 ^ <div id="app">...
    * 2.手动挂载: 组件类型变量用大写+实例用小写
    ----方式一 -------------------------------------------
    import Vue from 'vue';
    const Component1 = Vue.extend({
      template: '<div>{{ message }}</div>',
      data () {
        return {
          message: 'Hello, Vue'
        };
      },
    });
    const component1 = new Component1().$mount(); document.body.appendChild(component1.$el);
    // new Component1().$mount('#app');
    // new Component1({ el: '#app' });
    ----方式二 -------------------------------------------
    import Component1 from '../components/component1.vue';
    const Instance1 = new Vue({
      render (h) => h(Component1, { props: { vid: 1 } }) // 这里可以传入一些组件的 props 选项
    });
    const component1 = Instance1.$mount(); document.body.appendChild(component1.$el);
    //let component1 = Instance1.$children[0]; // 因为 Instance 下只 Render 了 component 一个子组件
    // $mount渲染组件 ~ $destroy销毁实例+removeChild(把节点从DOM中移除)
    */
    
    name: 'iComponent',      // 组件类名: <i-component>... this.$options.name
    components: { iButton }, // 组件依赖: 模板中的子组件 + 模板中的slot:处理内容分发

    // 组件-输入属性: props
    props: {
      /* 传递数据 vid */
      vid: {
        type: Number, default: 0,
        validator (v) { return (0 <= v && v <= 100) }
      }
    },
    // 组件-内部属性: data
    data () {
      return {
        vidValue: this.vid,
        btn1Title: '点击我!'
      }
    },
    // 组件-计算属性: computed
    computed: {
      // 查找上级组件:form (当使用频率太高时,考虑写在mixins文件[混合&扩展vm])
      form () {
        let parent = this.$parent, name = 'Form';
        while (parent.$options.name!==name && (parent=parent.$parent));
        return (parent.$options.name!==name ? null : parent);
      },
    },
    // 组件-监听属性: watch
    watch: {
      // 监听数据变化
      vid (v) { this.vidValue = v }
    },
    // 组件-混合|扩展(实例this上下文中扩展了session的属性与方法): mixins
    mixins: [session], // (e.g.) export default { data(){}, methods:{}, mounted(){}, ... }
    // 组件-对内提供(下级组件可inject:['user']): provide, +依赖注入(根组件实例app,用户角色roles): inject
    provide: { user: userProvider }, inject: ['app','roles'], // [跨级通信]root|parent: provide objects
    
    // 组件-内部方法: methods
    methods: {
      handleClick (event) {
        const btn = event.target, eventArgs = btn;
        // 自定义事件+监听template: <i-component @eventName="handleClick">...
        this.$emit('eventName', eventArgs);
      },
      onBlur (event) {
        // 数据校验
        const descriptor = { email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]}, validator = new AsyncValidator(descriptor);
        validator.validate({email:this.vidValue+'@qq.com'},{firstFields:true},(errors,fields)=>{return !errors})
      }
    },
    
    // 生命周期钩子：组件初始化之前
    beforeCreate () {
    },
    // 生命周期钩子：创建组件实例后，会开始渲染模板。
    created () {
      // 创建事件、对象依赖、预加载等任务
      // 自定义事件+监听script: this.$on('eventName', (eventArgs) => { return true;/*~返回false可阻止冒泡*/});
    },
    // 生命周期钩子：组件渲染前(vm.$mount([el]).$el > Html元素[DOM节点])
    beforeMount () {
    },
    // 生命周期钩子：组件渲染后，会挂载到DOM节点上。
    mounted () {
      // this.$_? Vue的内置方法
      this.$options; // 组件实例的可选项
      this.$refs.ibtn1; this.$parent.$options.name; this.$root; this.$children; // 组件实例之间的通信
    },
    // 生命周期钩子：数据更新之前
    beforeUpdate () {
    },
    // 生命周期钩子：数据更新之后
    updated () {
    },
    // 生命周期钩子：组件销毁前
    beforeDestroy () {
      // 处理销毁事件、对象依赖、从DOM节点移除组件等任务
    },
    // 生命周期钩子：组件销毁后
    destroyed () {
    }
  };
  
  // 组件-混合|扩展: '../mixins/emitter.js' > import emitter from '../mixins/emitter.js';
  // v1.x : $dispatch(向上级派发任务结果) + $broadcast(向下级广播通知事件) > v2.x : $emit(触发事件) + $on(监听事件)
  exports default {
    methods: {
      dispatch(componentName, eventName, params) {
        let parent = this.$parent || this.$root, name = parent.$options.name, level = 10;
        while (parent&&(name!==componentName)&&(0<level--)&&(parent=parent.$parent)&&(name=parent.$options.name));
        if (parent) parent.$emit.apply(parent, [eventName].concat(params));
      },
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };
  function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
      if (componentName === child.$options.name) {
        child.$emit.apply(child, [eventName].concat(params))
      } else {
        broadcast.apply(child, [componentName, eventName].concat([params]))
      }
    })
  }
  </script>
~~~

