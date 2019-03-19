// pages/test/test.js
/*
const wx.onBackgroundAudioHanger = wx.getBackgroundAudioManager()
onBackgroundAudioHanger.title = '空白格'
onBackgroundAudioHanger.epname = '空白格'
onBackgroundAudioHanger.singer = '杨宗纬'
onBackgroundAudioHanger.src = 'https://i.y.qq.com/v8/playsong.html?songid=106708125&source=yqq#wechat_redirect'
*/
Page({

  /**
   * 页面的初始数据
   */
  data: 
  {
    No1:"back",
    No2: "clear",
    No3: "negative",
    No4: "+",
    No5: "9",
    No6: "8",
    No7: "7",
    No8: "-",
    No9: "6",
    No10: "5",
    No11: "4",
    No12: "x",
    No13: "3",
    No14: "2",
    No15: "1",
    No16: "/",
    No17: "0",
    No18: ".",
    No19: "history",
    No20: "=",
    screenData:"0",
    lastIsOperator:false,
    arr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  clickButton:function(event)
  {
    console.log(event.target.id);

    var id = event.target.id;
    
    if(id == this.data.No1)//退格
    {
      var data = this.data.screenData;
      if(data==0)
      {
        return;
      }
      data = data.substring(0,data.length-1);
      if(data==""||data=="-")
      {
        data=0;
      }
      this.setData({screenData:data});
      this.data.arr.pop();
    }
    else if(id == this.data.No2)//清屏
    {
      this.setData({screenData:"0"});
      this.data.arr.length=0;
    }
    else if(id == this.data.No3)//正负号
    {
      var data = this.data.screenData;
      if(data == 0 )
      {
        return;
      }
      var firstWord=data.substring(0,1);
      if(firstWord=="-")
      {
        data=data.substring(1,data.length);
        this.data.arr.shift();
      }
      else
      {
        data = "-"+data;
        this.data.arr.unshift("-");
      }
      this.setData({screenData:data});
    }
    else if(id == this.data.No20)//等于
    {
      var data=this.data.screenData;
      if(data == 0)
      {
        return;
      }
      var lastWord=data.substring(data.length-1,data.length);
      if(isNaN(lastWord))
      {
        return;
      }
      var num = "";
      var lastOperator;
      var arr = this.data.arr;
      var optarr=[];
      for (var i in arr)
      {
        if(isNaN(arr[i])==false||arr[i]==this.data.No18||arr[i]==this.data.id3)
        {
          num +=arr[i];
        }
        else
        {
          lastOperator=arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = "";
        }
      }
      optarr.push(Number(num));
      var result= Number(optarr[0])*1.0;
      console.log(result)
      for(var i =1;i<optarr.length;i++)
      {
        if(isNaN(optarr[i]))
        {
          if(optarr[1]==this.data.No4)
          {
            result+=Number(optarr[i+1]);
          }
          else if (optarr[1] == this.data.No8)
          {
            result -= Number(optarr[i + 1]);
          }
          else if (optarr[1] == this.data.No12)
          {
            result *= Number(optarr[i + 1]);
          }
          else if (optarr[1] == this.data.No16)
          {
            result /= Number(optarr[i + 1]);
          }
        }
      }
      this.data.arr.length=0;
      this.data.arr.push(result);
      this.setData({screenData:result+""});


    }
    else//数值输入
    {
      if (id == this.data.No4 || id == this.data.No8 || id == this.data.No12 || id == this.data.No16) 
      {
        if(this.data.lastIsOperator==true||this.data.screenData==0)
        {
          return;
        }
      }
      var sd = this.data.screenData;
      var data;
      if(sd==0)
      {
        data = id;
      }
      else
      {
        data = sd + id;
      }
      this.setData({screenData:data});
      this.data.arr.push(id);
      if(id==this.data.No4||id==this.data.No8||id==this.data.No12||id==this.data.No16)
      {
        this.setData({lastIsOperator:true});
      }
      else
      {
        this.setData({lastIsOperator:false});
      }
    }
  },

})