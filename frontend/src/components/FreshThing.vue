<template>
  <div>
    <h3>经典之作</h3>
    <div
      class="wrapper"
      ref="wrapper"
      v-if="show"
    >
      <!-- /* 这里是父盒子*/ -->
      <ul
        class="cont"
        ref="cont"
      >
        <!-- /* 这里是子盒子，即滚动区域*/ -->
        <li
          class="cont-item"
          v-for="item in freshList"
          @click="onDetail(item.id)"
        >
          <div class="cont-img">
            <img
              width="100"
              class="img"
              :src="item.pic_url"
              :alt="item.book_name"
            />
          </div>
          <div class="cont-dest">{{ item.book_name }}</div>
          <div class="cont-price">
            <span class="price">￥{{ item.price }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="else"
      v-else
    ></div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  inject: ['reload'],
  name: 'FreshThing',
  props: {
    // freshList: {
    //   type: Array,
    //   required: true,
    // },
  },
  components: {},
  data() {
    return {
      freshList: [],
      show: false
    }
  },
  methods: {
    verScroll() {
      let width = this.freshList.length * 110 // 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
      this.$refs.cont.style.width = width + 'px' // 修改滚动区域的宽度
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh() //如果dom结构发生改变调用该方法
        }
      })
    },
    onDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          goodsId: id
        }
      })
    }
  },
  beforeCreate() {
    this.$ajax
      .get('api/book/sales')
      .then(res => {
        if (res.data.status == '200') {
          this.freshList = res.data.data.slice(8, 16)
          this.show = true
        }
      })
      .catch(err => {
        console.log('尝鲜好物获取失败', err)
      })
    this.$nextTick(() => {
      let timer = setTimeout(() => {
        // 其实我也不想写这个定时器的，这相当于又嵌套了一层$nextTick，但是不这么写会失败
        if (timer) {
          clearTimeout(timer)
          this.verScroll()
        }
      }, 500)
    })
  }
}
</script>

<style scoped>
h3 {
  display: flex;
  margin: 5px 0 0 12px;
}
.wrapper {
  background-color: white;
}
.cont {
  list-style: none;
  overflow-x: scroll;
  white-space: nowrap;
  font-size: 12px;
  text-align: center;
  display: flex;
  justify-content: row;
  padding-left: 12px;
}
.cont-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* padding: 0.06rem 0 0.2rem; */
  width: 100px;
  /* height: 160px; */
  margin: 8px 8px 8px 0;
  border: 2px solid #e27b01;
  border-radius: 5px;
  box-shadow: 2px 2px #af8d60;
  padding: 0px 3px 3px 3px;
}
.cont-img {
  width: 100%;
  height: 75%;
  margin-bottom: 5px;
  margin-top: 8px;
}
.img {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.cont-dest {
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  margin: 0.1rem 0;
  height: 30px;
  line-height: 15px;
}
.cont-price {
  width: 100%;
  /* padding-top: 3px; */
  color: #e27b01;
  font-size: 12px;
  text-align: start;
}
.else {
  height: 140px;
}
</style>
