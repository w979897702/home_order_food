const prefix = "cloud://cloud1-4go0vz3f4d21968a.636c-cloud1-4go0vz3f4d21968a-1379673983/"
// 菜品数据
const dishes = [
  // 川菜
  ...[{
      id: 'd0101',
      categoryId: 'c01',
      name: '鱼香肉丝',
      image: `${prefix}鱼香肉丝.webp`,
    },
    {
      id: 'd0102',
      categoryId: 'c01',
      name: '青椒肉丝',
      image: `${prefix}青椒肉丝.webp`,
    },
    {
      id: 'd0103',
      categoryId: 'c01',
      name: '小炒黄牛肉',
      image: `${prefix}小炒黄牛肉.webp`,
    },
    {
      id: 'd0104',
      categoryId: 'c01',
      name: '麻婆豆腐',
      image: `${prefix}麻婆豆腐.webp`,
    }
  ],
  // 淮扬菜  c03
  ...[{
    id: 'd0301',
    categoryId: 'c03',
    name: '糖醋排骨',
    image: `${prefix}糖醋排骨.webp`,
  }, ],
  // 东北菜  c04
  ...[{
    id: 'd0401',
    categoryId: 'c04',
    name: '锅包肉',
    image: `${prefix}锅包肉.webp`,
  }],
  // 素菜  c09
  ...[{
    id: 'd0901',
    categoryId: 'c09',
    name: '清炒油麦菜',
    image: `${prefix}清炒油麦菜.jpg`,
  }],
  // 其他 c14
  ...[{
      id: 'd1401',
      categoryId: 'c14',
      name: '芥末虾球',
      image: `${prefix}芥末虾球.webp`,
    },
    {
      id: 'd1402',
      categoryId: 'c14',
      name: '可乐鸡翅',
      image: `${prefix}可乐鸡翅.webp`,
    },
    {
      id: 'd1403',
      categoryId: 'c14',
      name: '红烧肉',
      image: `${prefix}红烧肉.webp`,
    }
  ],
  // 拌面 
  ...[{
    id: 'd1101',
    categoryId: 'c11',
    name: '鲜椒牛肉拌面',
    image: `${prefix}鲜椒牛肉拌面.jpg`,
  }]
];

module.exports = dishes;