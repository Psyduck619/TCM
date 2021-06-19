<template>
  <div class="sort">
    <div class="sidebar">
      <van-sidebar
        v-model="activeKey"
        @change="onChange"
      >
        <van-sidebar-item title="中医理论" />
        <van-sidebar-item title="中医针灸" />
        <van-sidebar-item title="中草药" />
        <van-sidebar-item title="伤寒杂病论" />
      </van-sidebar>
    </div>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="已全部加载完毕"
        @load="onLoad"
        :key="componentKey"
      >
        <van-cell
          v-for="(item, index) in list"
          :key="index"
        >
          <van-card
            :price="item.price"
            :title="item.book_name"
            :thumb="item.pic_url"
            :origin-price="item.origin_price"
            @click="onDetail(item.id)"
          ><template #tags>
              <van-tag
                plain
                type="primary"
                class="tag1"
              >{{'作者：' + item.author}}</van-tag>
            </template></van-card>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  inject: ['reload'],
  data() {
    return {
      activeKey: 0,
      componentKey: 0,
      list: [],
      listAll: [],
      listAll0: [],
      listAll1: [],
      loading: false,
      finished: false,
      index: 0
    }
  },
  methods: {
    onChange(index) {
      if (index === 0) {
        this.componentKey = index
        this.$ajax
          .get('api/book/category/1')
          .then(res => {
            if (res.data.status === '200') {
              this.list = res.data.data
            } else {
              this.list = []
            }
          })
          .catch(err => {
            console.log('分类1获取失败', err)
          })
      } else if (index === 1) {
        this.componentKey = index
        this.$ajax
          .get('api/book/category/2')
          .then(res => {
            if (res.data.status === '200') {
              this.list = res.data.data
            } else {
              this.list = []
            }
          })
          .catch(err => {
            console.log('分类2获取失败', err)
          })
      } else if (index === 2) {
        this.componentKey = index
        this.$ajax
          .get('api/book/category/3')
          .then(res => {
            if (res.data.status === '200') {
              this.list = res.data.data
            } else {
              this.list = []
            }
          })
          .catch(err => {
            console.log('分类3获取失败', err)
          })
      } else if (index === 3) {
        this.componentKey = index
        this.$ajax
          .get('api/book/category/4')
          .then(res => {
            if (res.data.status === '200') {
              this.list = res.data.data
            } else {
              this.list = []
            }
          })
          .catch(err => {
            console.log('分类4获取失败', err)
          })
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 300
        })
        for (let i = 0; i < 5; i++) {
          if (this.index >= this.listAll.length) {
            break
          } else {
            this.list.push(this.listAll[this.index++])
          }
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.index === this.listAll.length) {
          this.finished = true
        }
      }, 800)
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
  computed: {
    modeName() {
      return id => {
        return id <= 2 ? (id == 1 ? '中医理论' : '中医针灸') : id == 3 ? '中草药' : '伤寒杂病论'
      }
    }
  },
  mounted() {
    this.activeKey = this.$store.state.sys.nowSort - 1
    this.$ajax
      .get(
        `api/book/category/${this.$store.state.sys.nowSort}`
      )
      .then(res => {
        this.list = res.data.data
      })
      .catch(err => {
        console.log('分类页获取失败', err)
      })
  },
  watch: {
    activeKey() {
      this.$store.commit('setNowSort', this.activeKey + 1);
    }
  }
}
</script>

<style scoped>
.sort {
  background-color: #f7f8fa;
  display: flex;
  flex-direction: row;
  padding-left: 80px;
  height: 90vh;
}
.sidebar {
  position: fixed;
  float: left;
  background-color: #f7f8fa;
  width: 80px;
  margin-left: -80px;
  height: 100%;
}
.content {
  /* flex-grow: 1; */
  /* width: 70%; */
  float: right;
  width: 100%;
  /* padding-bottom: 100px; */
}
.van-list {
  margin-bottom: 50px;
  padding-bottom: 50px;
}
.van-card {
  border-radius: 5px;
  padding: 8px 12px;
}
.van-cell {
  padding: 10px 12px;
}
::v-deep .van-sidebar {
  position: fixed;
}
::v-deep .van-list__finished-text {
  background-color: white;
}
.van-card__title[data-v-dfab6a88] {
  padding-bottom: 5px;
}
.van-tag--plain {
  padding: 3px 4px 2px 4px;
}
.van-card__title {
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
::v-deep .van-sidebar-item__text {
  font-weight: bold;
  font-size: 16px;
}
.van-card__title[data-v-dfab6a88][data-v-dfab6a88][data-v-dfab6a88] {
  line-height: 16px;
  font-size: 13px;
}
.tag1 {
  margin-right: 5px;
}
.van-tag--primary.van-tag--plain {
  color: white;
}
</style>
