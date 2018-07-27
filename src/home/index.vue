<template>
  <div>
    <div  v-for="(ads, ads_key) in advertisings" :key="ads_key" class="hot-company__row-container">
      <div  v-for="(ad, ad_key) in ads" :key="ad_key" class="hot-company__column-container">
          <img :src="ad.url"
        :class="ad.size===1?'hot-company__single-size':'hot-company__double-size'">
        <div class="mask" v-if="ad.maskShow"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {sg,db,bw} from "./data.json"
export default {
  data () {
    return {
      adTotalSizes: 0,
      singleAds: [],
      doubleAds: [],
      advertisings: [],
      hotComponies: [
        {
          size: 2,
          url: db,
          description:'时代峰峻拉法基多少啦暗室逢灯静安寺的房间卡士大夫阿萨德飞机阿斯蒂芬金坷垃第三方阿斯蒂芬'
        },{
          size: 2,
          url: db,
          description:'时代峰峻拉法基多少啦暗室逢灯静安寺的房间卡士大夫阿萨德飞机阿斯蒂芬金坷垃第三方阿斯蒂芬'
        },{
          size: 2,
          url: db,
          description:'时代峰峻拉法基多少啦暗室逢灯静安寺的房间卡士大夫阿萨德飞机阿斯蒂芬金坷垃第三方阿斯蒂芬'
        },{
          size: 2,
          url: db,
          description:'时代峰峻拉法基多少啦暗室逢灯静安寺的房间卡士大夫阿萨德飞机阿斯蒂芬金坷垃第三方阿斯蒂芬'
        },{
          size: 2,
          url: db,
          description:'时代峰峻拉法基多少啦暗室逢灯静安寺的房间卡士大夫阿萨德飞机阿斯蒂芬金坷垃第三方阿斯蒂芬'
        },{
          size: 2,
          url: db,
          description:'时代峰峻拉法基多少啦暗室逢灯静安寺的房间卡士大夫阿萨德飞机阿斯蒂芬金坷垃第三方阿斯蒂芬'
        },
         {
          size: 1,
          url: sg,
        },{
          size: 1,
          url: sg,
        },{
          size: 1,
          url: sg,
        },{
          size: 1,
          url: sg,
        },{
          size: 1,
          url: sg,
        },{
          size: 1,
          url: sg,
        },{
          size: 1,
          url: sg,
        },{
          size: 1,
          url: sg,
        },{
          size: 1,
          url: sg,
        },{
          size: 1,
          url: sg,
        },{
          size: 1,
          url: sg,
        },{
          size: 1,
          url: sg,
        },{
          size: 1,
          url: sg,
        }
      ],
      coverAds: [
        {
          size: 1,
          url: bw,
        }, {
          size: 1,
          url: bw,
        }, {
          size: 1,
          url: bw,
        }, {
          size: 1,
          url: bw,
        }, {
          size: 1,
          url: bw,
        }, {
          size: 1,
          url: bw,
        }, {
          size: 1,
          url: bw,
        }, {
          size: 1,
          url: bw,
        }, {
          size: 1,
          url: bw,
        }, {
          size: 1,
          url: bw,
        },
      ],
    }
  },
  methods: {
    analysis () { // 单双尺寸数组
      this.singleAds = []
      this.doubleAds = []
      this.hotComponies.forEach((company, i) => {
        company.maskShow = false
        if (company.size % 2 === 0) {
          this.doubleAds.push(company)
        } else {
          this.singleAds.push(company)
        }
      })
    },
    concatFunc (base, data) {
      return base.concat(data)
    },
    totalSize () { // 后端返回广告图总尺寸
      let totalSizeOfAds = 0
      this.hotComponies.forEach((company, i) => {
        totalSizeOfAds += company.size
      })
      // 初始化总广告
      if (totalSizeOfAds < 12) {
        const hotEp = this.coverAds.slice(0, 12 - totalSizeOfAds)
        this.hotComponies = this.concatFunc(this.hotComponies, hotEp)
      } else if (totalSizeOfAds % 6 !== 0) {
        const hotCover = this.coverAds.slice(0, 6 - (totalSizeOfAds % 6))
        this.hotComponies = this.concatFunc(this.hotComponies, hotCover)
      }
    },
    randomNum () { // 返回随机数
      const array = [0, 1, 2, 3]
      return parseInt(array[Math.round(Math.random() * (array.length - 1))])
    },
    randomCombine (listOne, listTwo) { // 组合展示数据
      let copyOfListOne = [...listOne]
      let copyOfListTwo = [...listTwo]
      const rowsLength = Math.floor((listOne.length + 2*listTwo.length) / 6)
      const result = []
      for (let row = 0; row < rowsLength; row++) {
        let random = this.randomNum()
        if (random > copyOfListTwo.length || copyOfListTwo.length === 0) { // 出现双尺寸不足以补全
          random = copyOfListTwo.length
        }

        const remainLengthOfcopyListOne = copyOfListOne.length
        const remaincopyOfListOne = [...copyOfListOne]
        const remaincopyOfListTwo = [...copyOfListTwo]
        let currentRowArr = copyOfListTwo.splice(0, random)
          .concat(copyOfListOne.splice(0, (6 - 2 * random)))
        let columnsOfRow = 0
        currentRowArr.forEach((el) => { columnsOfRow += el.size })
        if (columnsOfRow < 6 && remainLengthOfcopyListOne < 6 - 2 * random) { // 出现单倍不足以补全
          currentRowArr = currentRowArr.concat(copyOfListTwo.splice(0, (6 - columnsOfRow) / 2))
        }

        columnsOfRow = 0
        currentRowArr.forEach((el) => { columnsOfRow += el.size })
        if (columnsOfRow !==6 && row>=0) { 
          row--; 
          copyOfListOne= [...remaincopyOfListOne]
          copyOfListTwo = [...remaincopyOfListTwo]
          continue 
        }
        result.push(currentRowArr)
      }
      return { result, lastRow: copyOfListOne.concat(copyOfListTwo) }
    },
    concatLastRow ({ result, lastRow }) {
      this.advertisings = result
      if(lastRow.length!==0) {
        let totalSizeOfLastRow = 0
        lastRow.forEach((last, i) => {
          totalSizeOfLastRow += last.size
        })

        lastRow = lastRow.concat(this.coverAds.slice(0, 6 - totalSizeOfLastRow))
        this.advertisings.push(lastRow)
      }

      let lengthOfAdvertisings = this.advertisings.length
      for(var i=0; i<2-lengthOfAdvertisings; i++){
        this.advertisings.push(this.coverAds.slice(0, 6))
      }
    },
    sortAds (result) {
      result.forEach((ads, t) => {
        ads.sort(() => 0.5 - Math.random())
      })
    },
    adsRender () {
      // this.totalSize()
      this.analysis()
      const { result, lastRow } = this.randomCombine(this.singleAds, this.doubleAds)
      this.concatLastRow({ result, lastRow })
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
  &__column-container{
    display: inline-block;
    position: relative;
  }
  &__row-container{
    img{
      &:hover{
        cursor: pointer;
      }
    }
  }
  &__single-size{
    width: 200px;
    height: 200px;
  }
  &__double-size{
    width: 400px;
    height: 200px;
  }
}
.mask{
  position: absolute;
  z-index: 10;
  top: -1;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
}
</style>
