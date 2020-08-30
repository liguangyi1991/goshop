<template>
  <!--首页外卖-->
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <template #left>
        <span class="header_search">
          <i class="iconfont icon-sousuo"></i>
        </span>
      </template>
      <template #right>
        <span class="header_login">
          <span class="header_login_text">登录|注册</span>
        </span>
      </template>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <swiper class="swiper" :options="swiperOption" v-if="categorysArr.length">
        <swiper-slide v-for="(categorys,index) in categorysArr" :key="index">
          <a
            href="javascript:"
            class="link_to_food"
            v-for="(category,index) in categorys"
            :key="index"
          >
            <div class="food_container">
              <img :src="baseImageUrl + category.image_url" />
            </div>
            <span>{{category.title}}</span>
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <img src="./images/msite_back.svg" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
    </div>
    <shop-list></shop-list>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import ShopList from '../../components/ShopList/ShopList'
export default {
  computed: {
    ...mapState(['address', 'categorys', 'shops']),
    categorysArr() {
      const { categorys } = this
      const arr = []
      let minArr = []
      categorys.forEach((c, i) => {
        if (minArr.length === 8) {
          minArr = []
        }
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        minArr.push(c)
      })
      return arr
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    HeaderTop,
    ShopList,
  },
  directives: {
    swiper: directive,
  },
  data() {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com',
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
        },
        observer: true,
        observeParents: true,
      },
    }
  },
  mounted() {
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixins.styl';

.msite {
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;
            text-decoration: none;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
