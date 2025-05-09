import Mock from 'mockjs';
import chinaMapData from './data/china.json';

Mock.mock('/mock/42601/amis-chart/shop/chart3', {
  status: 0,
  data: [
    {
      name: '浙江',
      value: 51200630
    },
    {
      name: '江苏',
      value: 45600500
    },
    {
      name: '广东',
      value: 40508100
    },
    {
      name: '福建',
      value: 36309000
    },
    {
      name: '河北',
      value: 35500000
    },
    {
      name: '北京',
      value: 30000000
    },
    {
      name: '上海',
      value: 28800000
    },
    {
      name: '天津',
      value: 26600000
    },
    {
      name: '湖北',
      value: 21500000
    },
    {
      name: '香港',
      value: 7500600
    },
    {
      name: '澳门',
      value: 6500600
    }
  ]
});

Mock.mock('/mock/42601/amis-chart/shop/chart2', {
  status: 0,
  data: [
    {
      name: '北京',
      value: 5110000
    },
    {
      name: '天津',
      value: 3210600
    },
    {
      name: '上海',
      value: 4300100
    },
    {
      name: '重庆',
      value: 3100000
    },
    {
      name: '河北',
      value: 710000
    },
    {
      name: '河南',
      value: 830000
    },
    {
      name: '云南',
      value: 510000
    },
    {
      name: '辽宁',
      value: 199000
    },
    {
      name: '黑龙江',
      value: 135000
    },
    {
      name: '湖南',
      value: 99000
    },
    {
      name: '安徽',
      value: 82000
    },
    {
      name: '山东',
      value: 53000
    },
    {
      name: '新疆',
      value: 31000
    },
    {
      name: '江苏',
      value: 920000
    },
    {
      name: '浙江',
      value: 8230000
    },
    {
      name: '江西',
      value: 920000
    },
    {
      name: '湖北',
      value: 623000
    },
    {
      name: '广西',
      value: 81000
    },
    {
      name: '甘肃',
      value: 70400
    },
    {
      name: '山西',
      value: 65542
    },
    {
      name: '内蒙古',
      value: 9770
    },
    {
      name: '陕西',
      value: 52235
    },
    {
      name: '吉林',
      value: 22351
    },
    {
      name: '福建',
      value: 52111
    },
    {
      name: '贵州',
      value: 61420
    },
    {
      name: '广东',
      value: 122120
    },
    {
      name: '青海',
      value: 11056
    },
    {
      name: '西藏',
      value: 1530
    },
    {
      name: '四川',
      value: 311123
    },
    {
      name: '宁夏',
      value: 21140
    },
    {
      name: '海南',
      value: 23452
    },
    {
      name: '台湾',
      value: 50150
    },
    {
      name: '香港',
      value: 66503
    },
    {
      name: '澳门',
      value: 81200
    }
  ]
});

Mock.mock('/mock/42601/amis-chart/shop/chart1', {
  status: 0,
  data: {
    chartLegend: '电商数据',
    pv: 3386097,
    uv: 865533,
    totalSales: 98086802,
    orders: 51162,
    conversionRate: 15.26,
    growthRate: 39,
    man: 153322,
    woman: 212211,
    newUsers: 180133,
    oldUsers: 275100,
    userRepurchaseRate: 65.6,
    date: '20250509'
  }
});

Mock.mock('/mock/42601/amis-chart/shop/chart6', {
  status: 0,
  data: [
    {
      datetime: '2025-03-16',
      date: '3月16日',
      man: 15820,
      woman: 26820
    },
    {
      datetime: '2025-03-17',
      date: '3月17日',
      man: 17820,
      woman: 29820
    },
    {
      datetime: '2025-03-18',
      date: '3月18日',
      man: 19520,
      woman: 31820
    },
    {
      datetime: '2025-03-19',
      date: '3月19日',
      man: 25520,
      woman: 51582
    },
    {
      datetime: '2025-03-20',
      date: '3月20日',
      man: 19820,
      woman: 30582
    },
    {
      datetime: '2025-03-21',
      date: '3月21日',
      man: 31520,
      woman: 51582
    },
    {
      datetime: '2025-03-22',
      date: '8月22日',
      man: 26520,
      woman: 53582
    }
  ]
});

Mock.mock('/mock/42601/amis-chart/shop/chart7', {
  status: 0,
  data: [
    {
      datetime: '03-16',
      man: 23810,
      woman: 43820,
      membership: 67630
    },
    {
      datetime: '03-17',
      man: 20820,
      woman: 45820,
      membership: 66640
    },
    {
      datetime: '03-18',
      man: 28820,
      woman: 41582,
      membership: 70402
    },
    {
      datetime: '03-19',
      man: 21520,
      woman: 48582,
      membership: 70102
    },
    {
      datetime: '03-20',
      man: 33520,
      woman: 39820,
      membership: 73340
    },
    {
      datetime: '03-21',
      man: 35520,
      woman: 42582,
      membership: 78102
    },
    {
      datetime: '03-22',
      man: 36520,
      woman: 44582,
      membership: 810102
    },
    {
      datetime: '03-23',
      man: 37810,
      woman: 33520,
      membership: 71330
    },
    {
      datetime: '03-24',
      man: 36820,
      woman: 45820,
      membership: 82640
    },
    {
      datetime: '03-25',
      man: 38820,
      woman: 51582,
      membership: 97640
    },
    {
      datetime: '03-26',
      man: 41520,
      woman: 50582,
      membership: 80402
    },
    {
      datetime: '03-27',
      man: 63520,
      woman: 59820,
      membership: 123340
    },
    {
      datetime: '03-28',
      man: 65521,
      woman: 71582,
      membership: 137103
    },
    {
      datetime: '03-29',
      man: 66521,
      woman: 63582,
      membership: 130103
    }
  ]
});

Mock.mock('/mock/42601/amis-chart/shop/chart8', {
  status: 0,
  data: [
    {
      platform: '微信',
      uv: 33820
    },
    {
      platform: '京东',
      uv: 53820
    },
    {
      platform: '美团',
      uv: 23820
    },
    {
      platform: '头条',
      uv: 33820
    },
    {
      platform: '淘宝',
      uv: 26620
    },
    {
      platform: '快手',
      uv: 10520
    },
    {
      platform: '滴滴',
      uv: 22110
    }
  ]
});

Mock.mock('/mock/42601/amis-chart/chart/wordcloud', [
  {
    value: 33319,
    name: 'iPhone16'
  },
  {
    value: 32319,
    name: 'huawei'
  },
  {
    value: 27319,
    name: '三星'
  },
  {
    value: 20319,
    name: 'vivo'
  },
  {
    value: 16819,
    name: '小米'
  },
  {
    value: 5819,
    name: '美图'
  },
  {
    value: 5719,
    name: '魅族'
  },
  {
    value: 8619,
    name: '红手'
  },
  {
    value: 1219,
    name: '诺基亚'
  },
  {
    value: 3119,
    name: '锤子'
  },
  {
    value: 1019,
    name: '大疆'
  },
  {
    value: 1809,
    name: '361'
  },
  {
    value: 719,
    name: '摩托罗拉'
  },
  {
    value: 1019,
    name: '联想'
  },
  {
    value: 23319,
    name: '海尔洗衣机'
  },
  {
    value: 12319,
    name: '黑人牙膏'
  },
  {
    value: 15319,
    name: '耐克运动鞋'
  },
  {
    value: 20319,
    name: '探路者'
  },
  {
    value: 26819,
    name: '六神花露水'
  },
  {
    value: 5719,
    name: 'iphone14'
  },
  {
    value: 7869,
    name: '东北大米'
  },
  {
    value: 7119,
    name: '海参'
  },
  {
    value: 9719,
    name: '人参'
  },
  {
    value: 6319,
    name: '格力空调'
  },
  {
    value: 3559,
    name: '小米摄像头'
  },
  {
    value: 2319,
    name: '五粮液'
  },
  {
    value: 3669,
    name: '飞天茅台'
  },
  {
    value: 6619,
    name: '小郎酒'
  },
  {
    value: 7719,
    name: '海之蓝'
  },
  {
    value: 2609,
    name: '国五液'
  },
  {
    value: 719,
    name: '小牛电动车'
  },
  {
    value: 969,
    name: '雅迪电动车'
  },
  {
    value: 719,
    name: '戴森吹风机'
  },
  {
    value: 93819,
    name: 'Mac'
  }
]);

Mock.mock('/api/geojson/china', chinaMapData);
