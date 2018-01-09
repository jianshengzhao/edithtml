<template>
  <div id="calendar">
    
  </div>
</template>

<script>
  
  import $ from 'jquery'
  export default {
    name: 'calendar',
    data: function() {
      return { 
        lunarInfo:[
          0x4bd8, 0x4ae0, 0xa570, 0x54d5, 0xd260, 0xd950, 0x5554, 0x56af, 0x9ad0, 0x55d2,
          0x4ae0, 0xa5b6, 0xa4d0, 0xd250, 0xd295, 0xb54f, 0xd6a0, 0xada2, 0x95b0, 0x4977,
          0x497f, 0xa4b0, 0xb4b5, 0x6a50, 0x6d40, 0xab54, 0x2b6f, 0x9570, 0x52f2, 0x4970,
          0x6566, 0xd4a0, 0xea50, 0x6a95, 0x5adf, 0x2b60, 0x86e3, 0x92ef, 0xc8d7, 0xc95f,
          0xd4a0, 0xd8a6, 0xb55f, 0x56a0, 0xa5b4, 0x25df, 0x92d0, 0xd2b2, 0xa950, 0xb557,
          0x6ca0, 0xb550, 0x5355, 0x4daf, 0xa5b0, 0x4573, 0x52bf, 0xa9a8, 0xe950, 0x6aa0,
          0xaea6, 0xab50, 0x4b60, 0xaae4, 0xa570, 0x5260, 0xf263, 0xd950, 0x5b57, 0x56a0,
          0x96d0, 0x4dd5, 0x4ad0, 0xa4d0, 0xd4d4, 0xd250, 0xd558, 0xb540, 0xb6a0, 0x95a6,
          0x95bf, 0x49b0, 0xa974, 0xa4b0, 0xb27a, 0x6a50, 0x6d40, 0xaf46, 0xab60, 0x9570,
          0x4af5, 0x4970, 0x64b0, 0x74a3, 0xea50, 0x6b58, 0x5ac0, 0xab60, 0x96d5, 0x92e0,
          0xc960, 0xd954, 0xd4a0, 0xda50, 0x7552, 0x56a0, 0xabb7, 0x25d0, 0x92d0, 0xcab5,
          0xa950, 0xb4a0, 0xbaa4, 0xad50, 0x55d9, 0x4ba0, 0xa5b0, 0x5176, 0x52bf, 0xa930,
          0x7954, 0x6aa0, 0xad50, 0x5b52, 0x4b60, 0xa6e6, 0xa4e0, 0xd260, 0xea65, 0xd530,
          0x5aa0, 0x76a3, 0x96d0, 0x4afb, 0x4ad0, 0xa4d0, 0xd0b6, 0xd25f, 0xd520, 0xdd45,
          0xb5a0, 0x56d0, 0x55b2, 0x49b0, 0xa577, 0xa4b0, 0xaa50, 0xb255, 0x6d2f, 0xada0,
          0x4b63, 0x937f, 0x49f8, 0x4970, 0x64b0, 0x68a6, 0xea5f, 0x6b20, 0xa6c4, 0xaaef,
          0x92e0, 0xd2e3, 0xc960, 0xd557, 0xd4a0, 0xda50, 0x5d55, 0x56a0, 0xa6d0, 0x55d4,
          0x52d0, 0xa9b8, 0xa950, 0xb4a0, 0xb6a6, 0xad50, 0x55a0, 0xaba4, 0xa5b0, 0x52b0,
          0xb273, 0x6930, 0x7337, 0x6aa0, 0xad50, 0x4b55, 0x4b6f, 0xa570, 0x54e4, 0xd260,
          0xe968, 0xd520, 0xdaa0, 0x6aa6, 0x56df, 0x4ae0, 0xa9d4, 0xa4d0, 0xd150, 0xf252,
          0xd520
        ],
        getChinaDate: function (objDate) { // 农历, 传入日期控件, 返回农历日期控件
          let self = this 
          let cmonthName = new Array('正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '腊');
          let nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
          let nStr2 = new Array('初', '十', '廿', '卅', '□');
          let year
          let isLeap
          let month 
          let day
          var i, leap = 0,temp = 0;
          var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

          for (i = 1900; i < 2100 && offset > 0; i++) { temp = self.lYearDays(i);
              offset -= temp; }

          if (offset < 0) { offset += temp;
              i--; }

          year = i;

          leap = self.leapMonth(i); //闰哪个月
          isLeap = false;

          for (i = 1; i < 13 && offset > 0; i++) {
              //闰月
              if (leap > 0 && i == (leap + 1) && isLeap == false) {--i;
                  isLeap = true;
                  temp = self.leapDays(year); } else { temp = self.monthDays(year, i); }

              //解除闰月
              if (isLeap == true && i == (leap + 1)) isLeap = false;

              offset -= temp;
          }

          if (offset == 0 && leap > 0 && i == leap + 1)
              if (isLeap) { isLeap = false; } else { isLeap = true;--i; }

          if (offset < 0) { offset += temp;--i; }

          month = i;
          day = offset + 1;
          let cDay = ''         
          switch (day) {
            case 10:
              cDay = '初十';
              break;
            case 20:
              cDay = '二十';
              break;
            case 30:
              cDay = '三十';
              break;
            default:
              cDay = nStr2[Math.floor(day / 10)];
              cDay += nStr1[day % 10];
          }    

          return { 
            year: year,
            month: cmonthName[month - 1],
            day: cDay
          }
        },
        lYearDays: function (y) { // 返回农历 y年的总天数
          let self = this
          let i, sum = 348;
          for (i = 0x8000; i > 0x8; i >>= 1) sum += (self.lunarInfo[y - 1900] & i) ? 1 : 0;
          return (sum + self.leapDays(y));
        },        
        leapDays: function (y) { // 返回农历 y年闰月的天数
          let self = this
          if (self.leapMonth(y)) return ((self.lunarInfo[y - 1899] & 0xf) == 0xf ? 30 : 29);
          else return (0);
        },
        leapMonth: function (y) { // 返回农历 y年闰哪个月 1-12 , 没闰返回 0
          let self = this
          let lm = self.lunarInfo[y - 1900] & 0xf;
          return (lm == 0xf ? 0 : lm);
        },       
        monthDays: function (y, m) { // 返回农历 y年m月的总天数
          let self = this
          return ((self.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
        },
        getWorldDate: function (objDate) { // 返回阳历日期
          let year = objDate.getFullYear()
          let month = objDate.getMonth() + 1
          let week = objDate.getDay()          
          let day = objDate.getDate()       
          let weekdays = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]          
          return {
            year: year,
            month: month,
            week: weekdays[week],
            day: day
          }
        }
      }
    },
    created: function () {
      let self = this    
      let moduleData = self.$parent.datahtml    
    
      moduleData['toallGroup']['online'].push({
        name: 'calendar',
        icon: 'imgicon icon-calendar',
        text: '日历'
      })    
      moduleData['calendar'] = {
        style: 'width:180px; height:130px',
        tool: {
          private: {
            text: '',
            class: ''
          },
          public: ['d']
        },        
        createEvent: function (self, element, me) { // 添加元素时的回调，回调参数:self指向主实例, element当前添加的模块
          if (me.$('.calendar').length > 1) {
            self.$notify({
              title: '警告',
              message: '您已经添加过日历',
              type: 'warning'
            })
            element.remove()
          }else{
            self.$refs.calendar.getCalendar(element)
          }
        },
        html: '<div class="calendar module addmodule"  datatext="日历"><a class="picBox"><div class="worldDate">2018年1月(大)星期四</div><div class="numDay">18</div><div class="chinaDay">腊月初二</div></a></div>'
      }
    },
    methods: {
      getCalendar: function (element) { // 获取当前时间并转化农历 
        let self = this        
        let worldDate = element.find('.worldDate')
        let numDay = element.find('.numDay')
        let chinaDay = element.find('.chinaDay')
        let nowDate = new Date()
        let chinaTime = self.getChinaDate(nowDate)
        let worldTime = self.getWorldDate(nowDate)
        let bos = '小'
        let mymonth = worldTime.month
        if (mymonth == 1 || mymonth == 3 || mymonth == 5 || mymonth == 7 || mymonth == 8 || mymonth == 10 || mymonth == 12) {
          bos = "大"
        }
        worldDate.text(worldTime.year + '年' + worldTime.month + '月(' + bos + ')' + worldTime.week )
        numDay.text(worldTime.day)
        chinaDay.text(chinaTime.month + '月' + chinaTime.day)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
