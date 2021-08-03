<template>
  <div class="container">
    <div
      style="
        position: absolute;
        width: 1920px;
        height: 1080px;
        left: 0px;
        top: 0px;
      "
    >
      <img id="containerBg" src="./images/bg.png" alt="" />
    </div>
    <!-- 左侧专辑列表 -->
    <div id="leftContainer">
      <div
        class="pic_div"
        style="left: 21px; top: 31px; width: 289px; height: 342px"
      >
        <img class="pic" src="./images/logo.png" alt="" />
      </div>
    </div>

    <div id="rightContainer">
      <!-- 专辑节目 -->
      <div class="pic_div" style="top: 59px; width: 917px; height: 129px">
        <img class="pic" src="./images/moco.png" alt="" />
      </div>

      <div class="area area_0">
        <template v-for="(item, key, i) in area0Data">
          <div :id="key" class="item" :style="item.style">
            <div class="left_txt" :id="['area0_left_txt_' + i]">
              {{ item.left.txt }}
            </div>
            <div class="right_txt" :id="['area0_right_txt_' + i]">
              <span v-html="item.right.txt"></span>
            </div>
            <div class="bottom_txt">
              <img
                class="bottom_pic"
                :id="['area0_bottom_pic_' + i]"
                src="./images/clock.png"
                v-show="item.bottom.clock.hidden"
              />
              <img
                class="bottom_pic_s"
                :id="['area0_bottom_pic_' + i]"
                src="./images/clock_s.png"
                v-show="item.bottom.clock_s.hidden"
              />
              <div class="txt" :id="['area0_bottom_txt_' + i]">
                {{ item.bottom.txt }}
              </div>
            </div>
            <div class="select">
              <img
                src="./images/bk.png"
                :id="['bk_' + i]"
                v-show="item.select"
              />
            </div>
          </div>
        </template>
      </div>
      <!-- 按钮合集-新 -->
      <div class="area area_1">
        <div id="area1_item_0" class="item" style="left: 76px">
          <img id="area1_pic_0" src="./images/left.png" alt="" />
        </div>
        <div id="area1_item_1" class="item" style="left: 217px">
          <img id="area1_pic_1" src="./images/play.png" alt="" />
        </div>
        <div id="area1_item_2" class="item" style="left: 358px">
          <img id="area1_pic_2" src="./images/right.png" alt="" />
        </div>
        <div id="area1_item_3" class="item" style="left: 494px">
          <img id="area1_pic_3" src="./images/random.png" alt="" />
        </div>
        <div id="area1_item_4" class="item" style="left: 687px">
          <img id="area1_pic_4" src="./images/loop.png" alt="" />
        </div>
        <div id="area1_item_5" class="item" style="left: 883px">
          <img id="area1_pic_5" src="./images/like.png" alt="" />
        </div>
        <div id="area1_item_6" class="item" style="left: 1080px">
          <img id="area1_pic_6" src="./images/videos.png" alt="" />
        </div>
      </div>
      <!-- 当前专辑CD -->
      <div
        class="pic_div"
        style="left: 633px; top: 214px; width: 703px; height: 571px"
      >
        <img src="./images/CD.png" />
      </div>
    </div>
    <div id="up" v-show="up">《</div>
    <div id="down" v-show="down">》</div>
    <!-- 底部滚动条 -->
    <div id="scroll_root">
      <div id="scroll_barbg">
        <img src="./images/scroll_bg.png" />
      </div>
      <div id="scroll_bar" :style="{ width: scroll_bar_width + '%' }">
        <img src="./images/scroll.png" />
      </div>
    </div>
    <div id="scroll_time">{{ scroll_time }}</div>
    <div id="scroll_times">{{ scroll_times }}</div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { countDown, newTime } from './tool/countDown'
export default {
  setup() {
    let URL = window.location.href
    const formconfig = reactive({
      //是否正在播放
      play: true,
      //当前是否是随机
      random: false,
      //当前是否上一首下一首
      song: false,
      //已播放时间
      time: 0,
      //进度条定时器
      timer: null,
      //暗焦点
      groupindex: !WkEpg.Util.getURLParameter('groupindex', URL)
        ? 0
        : parseInt(WkEpg.Util.getURLParameter('groupindex', URL)),
      indexid: !WkEpg.Util.getURLParameter('indexid', URL)
        ? 0
        : parseInt(WkEpg.Util.getURLParameter('indexid', URL)),
      areaid: !WkEpg.Util.getURLParameter('areaid', URL)
        ? 0
        : parseInt(WkEpg.Util.getURLParameter('areaid', URL))
    })

    const scroll = reactive({
      scroll_time: '00:00:00',
      scroll_times: '00:00:00',
      scroll_bar_width: 0,
      scrollWidth: 1221,
      secondArr: null,
      //总秒数
      seconds: null,
      //每卷
      perScroll: null
    })

    const area0Data = reactive({
      area0_item_0: {
        style: {
          top: '0px'
        },
        left: {
          txt: ''
        },
        right: {
          txt: ''
        },
        bottom: {
          txt: '',
          clock: {
            hidden: true
          },
          clock_s: {
            hidden: false
          }
        },
        select: true
      },
      area0_item_1: {
        style: {
          top: '105px'
        },
        left: {
          txt: ''
        },
        right: {
          txt: ''
        },
        bottom: {
          txt: '',
          clock: {
            hidden: true
          },
          clock_s: {
            hidden: false
          }
        },
        select: false
      },
      area0_item_2: {
        style: {
          top: '210px'
        },
        left: {
          txt: ''
        },
        right: {
          txt: ''
        },
        bottom: {
          txt: '',
          clock: {
            hidden: true
          },
          clock_s: {
            hidden: false
          }
        },
        select: false
      },
      area0_item_3: {
        style: {
          top: '315px'
        },
        left: {
          txt: ''
        },
        right: {
          txt: ''
        },
        bottom: {
          txt: '',
          clock: {
            hidden: true
          },
          clock_s: {
            hidden: false
          }
        },
        select: false
      },
      area0_item_4: {
        style: {
          top: '420px'
        },
        left: {
          txt: ''
        },
        right: {
          txt: ''
        },
        bottom: {
          txt: '',
          clock: {
            hidden: true
          },
          clock_s: {
            hidden: false
          }
        },
        select: false
      },
      area0_item_5: {
        style: {
          top: '525px'
        },
        left: {
          txt: ''
        },
        right: {
          txt: ''
        },
        bottom: {
          txt: '',
          clock: {
            hidden: true
          },
          clock_s: {
            hidden: false
          }
        },
        select: false
      }
    })

    //箭头
    const upDown = reactive({
      up: false,
      down: true
    })

    let data = Mock.mock({
      'data|200': [
        {
          'id|+1': 1,
          time: /^0[1-3]\.[0-5][0-9]$/,
          name: '@cname'
        }
      ]
    })

    let area0, area1

    // mounted
    onMounted(() => {
      area0 = WkEpg.AreaCreator(
        6,
        1,
        //上左下右
        [-1, -1, 1, -1],
        'area0_item_',
        'className:item item_focus',
        'className:item'
      )
      area1 = WkEpg.AreaCreator(
        1,
        7,
        //上左下右
        [0, -1, -1, -1],
        'area1_item_',
        'className:item item_focus',
        'className:item'
      )
      //保持初始焦点
      area0.areaStayInitFocus = false
      //翻页设置
      area0.setbroadwiseCrossturnpage(true)
      //设置页数
      area0.pagecount = 34

      //stablemoveindex 当前选中索引-目标区域>目标下标索引
      area0.stablemoveindex = [-1, -1, '5-1>1', -1]
      area1.stablemoveindex = [
        '0-0>5,1-0>5,2-0>5,3-0>5,4-0>5,5-0>5,6-0>5',
        -1,
        -1,
        -1
      ]
      //初始化    (目标区域，目标下标，[区域数量])
      window.pageobj = WkEpg.PageCreator(
        formconfig.areaid,
        formconfig.indexid,
        [area0, area1]
      )

      area0.setDarkfocus(
        0,
        formconfig.groupindex,
        ['className:item item_focus'],
        ['className:item item_active']
      ) //设置暗焦点
      area0.darkPage = 1
      area0.darkIndex = 0

      area0.areaOkEvent = function () {
        //播放同一首
        if (
          area0.darkIndex == area0.curindex &&
          area0.darkPage == area0.curpage
        ) {
          if (formconfig.play) {
            playStyle('暂停中')
            clearTimer()
            formconfig.play = false
          } else {
            if (scroll.scroll_time == scroll.scroll_times) formconfig.time = 0
            playStyle('播放中')
            changeScroll()
            formconfig.play = true
          }
        } else {
          formconfig.time = 0
          clearTimer()
          //还原原焦点样式
          unplayStyle()
          //设置暗焦点索引
          formconfig.groupindex = area0.curindex
          //设置滚动
          area0.doms[formconfig.groupindex].setScroll = true

          //取消原焦点滚动
          DarkfocusScroll(false)
          formconfig.play = true

          playStyle('播放中')
          changeScroll()
        }
        area0.lock = true
      }

      area1.areaOkEvent = function () {
        //取消原焦点滚动
        area1.curindex != 1 && DarkfocusScroll(false)
        area0.lock = false
        clearTimer()
        switch (area1.curindex) {
          //上一首
          case 0:
            formconfig.song = true
            unplayStyle()
            if (area0.darkIndex >= 1) {
              //当前页是否等于暗焦点页
              area0.darkPage != area0.curpage &&
                area0.pageturn(area0.darkPage - area0.curpage, area0)

              //设置暗焦点索引
              area0.darkIndex = area0.darkIndex - 1
              formconfig.groupindex = area0.darkIndex
            } else {
              //翻页
              if (area0.darkPage > 1) {
                //当前页是否等于暗焦点页

                area0.darkPage == area0.curpage
                  ? area0.pageturn(-1, area0)
                  : area0.pageturn(area0.darkPage - area0.curpage - 1, area0)

                //设置暗焦点索引
                formconfig.groupindex = area0.datanum - 1
                area0.darkIndex = area0.datanum - 1
                area0.darkPage = area0.darkPage - 1
              }
            }

            changeDarkFocusStyle()
            formconfig.song = false
            break
          //暂停/播放
          case 1:
            let play = formconfig.play
            play = !play
            //当前页是否等于暗焦点页
            area0.darkPage != area0.curpage &&
              area0.pageturn(area0.darkPage - area0.curpage, area0)

            if (scroll.scroll_time == scroll.scroll_times) formconfig.time = 0
            //是否正在播放
            !play ? playStyle('暂停中') : playStyle('播放中')

            formconfig.play = play

            break
          //下一首
          case 2:
            formconfig.song = true
            unplayStyle()
            if (area0.darkIndex < 5) {
              //当前页是否等于暗焦点页
              area0.darkPage != area0.curpage &&
                area0.pageturn(area0.darkPage - area0.curpage, area0)

              //设置暗焦点索引
              area0.darkIndex = area0.darkIndex + 1
              formconfig.groupindex = area0.darkIndex
            } else {
              //翻页
              if (area0.darkPage < area0.pagecount) {
                //当前页是否等于暗焦点页
                area0.darkPage == area0.curpage
                  ? area0.pageturn(1, area0)
                  : area0.pageturn(area0.darkPage - area0.curpage + 1, area0)

                //设置暗焦点索引
                formconfig.groupindex = 0
                area0.darkIndex = 0
                area0.darkPage = area0.darkPage + 1
              }
            }
            changeDarkFocusStyle()
            formconfig.song = false
            break
          //随机
          case 3:
            //开启随机
            formconfig.random = true
            let page = WkEpg.Util.getSjsz(area0.pagecount)[0]
            unplayStyle()
            //当前页是否等于暗焦点页
            area0.darkPage == area0.curpage
              ? area0.pageturn(page - area0.darkPage, area0)
              : area0.pageturn(page - area0.curpage, area0)

            let index = WkEpg.Util.getSjsz(area0.datanum)[0]

            //随机结束
            formconfig.random = false
            //设置暗焦点索引
            formconfig.groupindex = index - 1
            area0.darkIndex = index - 1
            area0.darkPage = page
            changeDarkFocusStyle()
            break
        }
        area0.lock = true
        area1.curindex != 1 && DarkfocusScroll(true)
        //解决第六首播放字体滚动
        area0.darkIndex != area0.curindex && area0.changeunfocusBeforeEvent()
      }

      //ok后
      area0.areaOkAfterEvent = WkEpg.Util.debounce(function () {
        area0.lock = false
      })

      area1.areaOkAfterEvent = WkEpg.Util.debounce(function () {
        //暂停播放按钮
        if (area1.curindex == 1) {
          formconfig.play && changeScroll()
        } else {
          formconfig.time = 0
          changeScroll()
        }
        area0.lock = false
      })

      //翻页事件
      area0.areaPageTurnEvent = function () {
        handleList(area0.curpage - 1)
        //当前页是否等于暗焦点页
        if (area0.curpage == area0.darkPage) {
          //是否随机 是否上一首下一首
          if (formconfig.random || formconfig.song) return
          DarkfocusScroll(true)
          //是否正在播放
          if (formconfig.play) {
            playStyle('播放中')
          } else {
            if (scroll.scroll_time != scroll.scroll_times) {
              playStyle('暂停中')
            } else {
              area0.datanum = area0.datanum ? area0.datanum : 6
              formconfig.groupindex < area0.datanum && playStyle('重播')
            }
          }
        } else {
          unplayStyle()
          //焦点翻页锁
          area0.pageTurnAndChangeFocus()
        }
      }

      //安装事件后焦点
      area0.changefocusAfterEvent = function () {
        //播放同一首直接返回
        if (
          area0.darkIndex == area0.curindex &&
          area0.doms[area0.curindex].setScroll
        )
          return false

        if (
          area0.doms[area0.curindex] != undefined &&
          WkEpg.Util.getStrRealLen(area0.doms[area0.curindex].contentName) > 4
        ) {
          area0Data[
            `area0_item_${area0.curindex}`
          ].right.txt = `<marquee direction='left' scrolldelay='100' style='width:400px'>
              ${area0.doms[area0.curindex].contentName}
              </marquee>`

          area0.doms[area0.curindex].setScroll = true
        }
      }

      area0.changeunfocusBeforeEvent = function () {
        //处于播放状态 播放同一首字体滚动不取消
        if (
          area0.darkIndex == area0.curindex &&
          area0.doms[area0.curindex].setScroll &&
          area0.curpage == area0.darkPage
        )
          return false

        if (
          area0.doms[area0.curindex] != undefined &&
          WkEpg.Util.getStrRealLen(area0.doms[area0.curindex].contentName) > 4
        ) {
          area0Data[`area0_item_${area0.curindex}`].right.txt =
            WkEpg.Util.getSubStr(
              area0.doms[area0.curindex].contentName,
              6,
              false
            )

          area0.doms[area0.curindex].setScroll = false
        }
      }
      //渲染列表
      handleList()
      //滚动条
      changeScroll()
      //焦点样式
      playStyle('播放中')
      //暗焦点滚动
      DarkfocusScroll(true)
    })

    //更改暗焦点
    function changeDarkFocusStyle() {
      playStyle('播放中')
      formconfig.play = true
      //设置暗焦点
      area0.changeDarkFocus()
    }

    //开始播放样式
    function playStyle(txt) {
      //开始初始化area.datanum值
      area0.datanum = area0.datanum ? area0.datanum : 6
      let groupindex = formconfig.groupindex
      if (groupindex < area0.datanum) {
        area0Data[`area0_item_${groupindex}`].bottom.clock.hidden = false //时钟图标
        area0Data[`area0_item_${groupindex}`].bottom.clock_s.hidden = true //耳机图标
        //
        area0Data[`area0_item_${groupindex}`].bottom.txt = `${txt}`
        //边框
        area0Data[`area0_item_${groupindex}`].select = true
      }
    }
    //取消播放样式
    function unplayStyle() {
      let groupindex = formconfig.groupindex
      if (groupindex < area0.datanum) {
        area0Data[`area0_item_${groupindex}`].bottom.clock.hidden = true //时钟图标
        area0Data[`area0_item_${groupindex}`].bottom.clock_s.hidden = false //耳机图标

        //时间
        if (area0.darkPage == area0.curpage)
          area0Data[`area0_item_${groupindex}`].bottom.txt =
            area0.doms[groupindex].contentTime

        //边框
        area0Data[`area0_item_${groupindex}`].select = false
      }
    }

    //暗焦点滚动
    function DarkfocusScroll(data) {
      switch (data) {
        case true:
          if (
            area0.doms[area0.darkIndex] != undefined &&
            WkEpg.Util.getStrRealLen(area0.doms[area0.darkIndex].contentName) >
              4
          ) {
            area0Data[
              `area0_item_${area0.darkIndex}`
            ].right.txt = `<marquee direction='left' scrolldelay='100' style='width:400px'>
              ${area0.doms[area0.darkIndex].contentName}
              </marquee>`

            area0.doms[area0.darkIndex].setScroll = true
          }
          break

        case false:
          //解决不同页 同索引的文字BUG
          if (area0.curpage == area0.darkPage) {
            if (
              area0.doms[area0.darkIndex] != undefined &&
              WkEpg.Util.getStrRealLen(
                area0.doms[area0.darkIndex].contentName
              ) > 4
            ) {
              area0Data[`area0_item_${area0.darkIndex}`].right.txt =
                WkEpg.Util.getSubStr(
                  area0.doms[area0.darkIndex].contentName,
                  6,
                  false
                )

              area0.doms[area0.darkIndex].setScroll = false
            }
          }
          break
      }
    }

    function clearTimer() {
      formconfig.timer && clearInterval(formconfig.timer)
    }

    function handleList(index) {
      let sum = (index ? index : 0) * 6

      upDown.up = sum > 0 ? true : false
      upDown.down = sum < 198 ? true : false

      for (let i = 0; i <= 5; i++) {
        if (data.data[sum + i]) {
          area0.datanum = i + 1
          //实际数据条目数
          area0Data[`area0_item_${i}`].left.txt = data.data[sum + i].id
          area0Data[`area0_item_${i}`].right.txt = data.data[sum + i].name
          area0Data[`area0_item_${i}`].bottom.txt = data.data[sum + i].time
          area0.doms[i].contentName = data.data[sum + i].name
          area0.doms[i].contentTime = data.data[sum + i].time
          area0Data[`area0_item_${i}`].bottom.clock.hidden = true
          area0Data[`area0_item_${i}`].bottom.clock_s.hidden = false
          area0.doms[i].setScroll = false //设置滚动
        } else {
          area0Data[`area0_item_${i}`].left.txt = ''
          area0Data[`area0_item_${i}`].right.txt = ''
          area0Data[`area0_item_${i}`].bottom.txt = ''
          area0.doms[i].contentName = ''
          area0.doms[i].contentTime = ''
          area0Data[`area0_item_${i}`].bottom.clock.hidden = false
          area0Data[`area0_item_${i}`].bottom.clock_s.hidden = false
          area0Data[`area0_item_${i}`].select = false
          area0.doms[i].setScroll = false
        }
      }
    }

    function changeScroll() {
      //解构使用要用toRefs保持响应式
      let {
        secondArr,
        seconds,
        perScroll,
        scroll_time,
        scroll_times,
        scroll_bar_width
      } = toRefs(scroll)

      secondArr.value = area0.doms[formconfig.groupindex].contentTime.split('.')
      seconds.value = secondArr.value[0] * 60 + parseInt(secondArr.value[1])
      perScroll.value = 100 / seconds.value

      scroll_times.value = newTime(secondArr.value)

      formconfig.timer = setInterval(() => {
        formconfig.time++
        scroll_time.value = newTime(countDown(formconfig.time))
        scroll_bar_width.value = perScroll.value * formconfig.time
        if (formconfig.time >= seconds.value) {
          clearTimer()
          if (area0.darkPage == area0.curpage)
            area0Data[`area0_item_${formconfig.groupindex}`].bottom.txt = '重播'
          formconfig.play = false
        }
      }, 1000)
    }

    const scrollToRefs = toRefs(scroll)
    const area0ToRefs = toRefs(area0Data)
    const upDownToRefs = toRefs(upDown)
    return {
      formconfig,
      ...scrollToRefs,
      ...area0ToRefs,
      area0Data,
      ...upDownToRefs
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.container {
  width: 1920px;
  height: 1080px;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
  #leftContainer,
  #rightContainer {
    height: 100%;
  }
  #leftContainer {
    width: 433px;
  }
  #rightContainer {
    width: 1487px;
    left: 433px;
    .area_0 {
      width: 550px;
      height: 630px;
      top: 194px;
      .item {
        height: 105px;
        width: 550px;

        .left_txt {
          height: 105px;
          width: 90px;
          line-height: 110px;
          font-size: 50px;
          text-align: center;
          color: white;
        }
        .right_txt {
          width: 460px;
          height: 68px;
          left: 90px;
          line-height: 80px;
          font-size: 30px;
          color: white;
        }
        .bottom_txt {
          width: 460px;
          height: 37px;
          left: 90px;
          top: 68px;
          font-size: 20px;
          color: white;
          .bottom_pic {
            left: 5px;
            top: 2px;
          }
          .bottom_pic_s {
            left: 5px;
            top: 2px;
          }
          .txt {
            left: 45px;
          }
        }
      }
      .item_focus .select {
        //display: block;
      }
      .item_active .select {
        //display: block !important;
      }
      .item_active div {
        color: #ffd83d !important;
      }
      .item_focus div {
        color: #ffd83d !important;
      }
    }

    .area_1 {
      top: 846px;
      height: 135px;
      width: 1330px;
      #area1_item_0,
      #area1_item_1,
      #area1_item_2 {
        width: 125px;
        height: 131px;
        text-align: center;
      }
      #area1_item_3,
      #area1_item_4,
      #area1_item_5 {
        top: 18px;
        width: 186px;
        height: 77px;
      }
      #area1_item_6 {
        top: 11px;
        width: 239px;
        height: 85px;
      }
      .item_focus {
        box-shadow: 1px 1px 8px 2px rgba(13, 128, 236, 0.84);
      }
    }
  }
  #up,
  #down {
    top: 740px;
    font-size: 45px;
    color: white;
    //border: 1px solid red;
  }
  #up {
    position: absolute;
    animation: bounce-up 3s 1s infinite;
    left: 335px;
  }
  @keyframes bounce-up {
    0% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-20px);
    }
    80% {
      transform: translateX(0);
    }
    to {
      transform: translateX(0);
    }
  }
  #down {
    position: absolute;
    animation: bounce-down 3s 1s infinite;
    left: 975px;
  }
  @keyframes bounce-down {
    0% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(20px);
    }
    80% {
      transform: translateX(0);
    }
    to {
      transform: translateX(0);
    }
  }

  /* 滚动条 */
  #scroll_root {
    position: absolute;
    left: 526px;
    top: 990px;
    width: 1237px;
    height: 44px;
    display: block;
    #scroll_bar {
      position: relative;
      top: 8px;
      left: 8px;
      width: 0px;
      height: 28px;
      z-index: 2;
      overflow: hidden;
    }
    #scroll_barbg {
      position: absolute;
      height: 28px;
      width: 1237px;
      height: 44px;
    }
  }
  //播放时间
  #scroll_time {
    position: absolute;
    width: 100px;
    height: 50px;
    left: 415px;
    top: 988px;
    font-size: 25px;
    color: #ffd83d;
    line-height: 50px;
  }
  //歌曲时间
  #scroll_times {
    position: absolute;
    width: 100px;
    height: 50px;
    left: 1777px;
    top: 988px;
    font-size: 25px;
    color: #ffd83d;
    line-height: 50px;
  }
}
.pic_div,
.area,
#rightContainer,
#leftContainer,
.item,
.left_txt,
.right_txt,
.bottom_txt,
.bottom_pic,
.bottom_pic_s,
.txt {
  position: absolute;
}
.pic {
  width: 100%;
  height: 100%;
}
</style>
