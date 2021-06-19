<template>
  <!-- green #07c160 -->
  <div
    id="app"
    v-cloak
  >
    <transition :name="transitionName">
      <router-view v-if="isRouterAlive" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      transitionName: '',
      isRouterAlive: true //控制视图是否显示的变量
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true //再打开
      })
    }
  },
  // 监听,当路由发生变化的时候执行
  watch:{
      $route(to, from, savedPosition){
          //实现路由跳转动画
          if (to.meta.index > from.meta.index)  
            this.transitionName = "slide-left";
          if (to.meta.index < from.meta.index)
            this.transitionName = "slide-right";
          return savedPosition || { x: 0, y: 0 }
      }
  }
}
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
* {
  margin: 0;
  padding: 0;
  /* css3盒子模型 */
  box-sizing: border-box;
}
#app {
  font-family: Microsoft YaHei, Helvetica, Arial, sans-serif; // Avenir
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #323233;
}
// 动画
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.icon-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
::v-deep .van-nav-bar__title {
  font-weight: bold;
}
::v-deep .van-icon-arrow-left::before {
  color: black;
}
.van-submit-bar__bar {
  border-top: 1px #f4f4f4 solid;
}
// .van-tag--primary.van-tag--plain {
//   color: #07c160;
// }

// 动画
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate(-100%);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
