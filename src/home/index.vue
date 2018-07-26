<template>
  <div>
    <div v-for="(ads, ads_key) in advertisings" :key="ads_key">
      <img  v-for="(ad, ad_key) in ads" :key="ad_key" :src="ad.url" :class="ad.size===1?'hot-company__single-size':'hot-company__double-size'">
    </div>
  </div>
</template>

<script>
import {sg,db} from "./data.json"
export default {
  data () {
    return {
      adTotalSizes: 0,
      singleAds: [],
      doubleAds: [],
      advertisings: [],
      hotEnterprises: [
        {
          size: 2,
          url: db,
        }, {
          size: 2,
          url: db,
        }, {
          size: 1,
          url: sg,
        }, {
          size: 2,
          url: db,
        }, {
          size: 1,
          url: sg,
        }, {
          size: 2,
          url: db,
        }, {
          size: 1,
          url: sg,
        }, {
          size: 2,
          url: db,
        }, {
          size: 1,
          url: sg,
        },
      ],
      coverAds: [
        {
          size: 1,
          url: sg,
        }, {
          size: 1,
          url: sg,
        }, {
          size: 1,
          url: sg,
        }, {
          size: 1,
          url: sg,
        }, {
          size: 1,
          url: sg,
        }, {
          size: 1,
          url: sg,
        }, {
          size: 1,
          url: sg,
        }, {
          size: 1,
          url: sg,
        }, {
          size: 1,
          url: sg,
        }, {
          size: 1,
          url: sg,
        },
      ],
    }
  },
  methods: {
    analsys () { // 单双尺寸数组
      this.singleAds = []
      this.doubleAds = []
      this.hotEnterprises.forEach((hot, i) => {
        if (hot.size % 2 === 0) {
          this.doubleAds.push(hot)
        } else {
          this.singleAds.push(hot)
        }
      })
    },
    concatFunc (base, data) {
      return base.concat(data)
    },
    totalSize () { // 后端返回总尺寸
      this.adTotalSizes = 0
      this.hotEnterprises.forEach((hot, i) => {
        this.adTotalSizes += hot.size
      })
      // 初始化总广告
      if (this.adTotalSizes < 12) {
        const hotEp = this.coverAds.slice(0, 12 - this.adTotalSizes)
        this.hotEnterprises = this.concatFunc(this.hotEnterprises, hotEp)
        this.adTotalSizes += 12 - this.adTotalSizes
      } else if (this.adTotalSizes % 6 !== 0) {
        const hotCover = this.coverAds.slice(0, 6 - (this.adTotalSizes % 6))
        this.hotEnterprises = this.concatFunc(this.hotEnterprises, hotCover)
        this.adTotalSizes += 6 - (this.adTotalSizes % 6)
      }
    },
    randomNum () { // 返回随机数
      const array = [0, 1, 2, 3]
      return parseInt(array[Math.round(Math.random() * (array.length - 1))])
    },
    randomCombine (totalSizes, slSize, dlSize) { // 组合展示数据
      const sl = [...slSize]
      const dl = [...dlSize]
      const size = totalSizes / 6
      const result = []
      for (let t = 0; t < size; t++) {
        let rd = this.randomNum()
        if (rd > dl.length || dl.length === 0) { // 出现双尺寸不足以补全
          rd = dl.length
        }

        const lastSl = sl.length
        let arr = dl.splice(0, rd)
          .concat(sl.splice(0, (6 - 2 * rd)))
        let total = 0
        arr.forEach(ar => total += ar.size)
        if (total < 6 && lastSl < 6 - 2 * rd) { // 出现单倍不足以补全
          arr = arr.concat(dl.splice(0, (6 - total) / 2))
        }
        result.push(arr)
      }
      return result
    },
    sortAds (result) {
      result.forEach((ads, t) => {
        ads.sort(() => 0.5 - Math.random())
      })
    },
    adsRender () {
      this.totalSize()
      this.analsys()
      this.advertisings = this.randomCombine(this.adTotalSizes, this.singleAds, this.doubleAds)
      this.sortAds(this.advertisings)
    },
    setInterValFunc () {
      setInterval(() => this.adsRender(), 10000)
    },
  },
  mounted () {
    this.adsRender()
    this.setInterValFunc()
  },
}
</script>

<style lang="scss">
.hot-company{
  &__single-size{
    width: 200px;
    height: 200px;
  }
  &__double-size{
    width: 400px;
    height: 200px;
  }
}
</style>
