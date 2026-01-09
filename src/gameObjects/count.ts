import { GameObject } from '@eva/eva.js';
import { Text } from '@eva/plugin-renderer-text';

export default function createCount() {
  // 当前克数
  let currentCount: number = 0;
  // 请求接口获取剩余克数
  // 设置圆圈容器
  const circleBg = new GameObject('circle', {
    position: {
      x: 200,
      y: 500,
    },
    size: {
      width: 300,
      height: 24,
    },
  });
  // 创建克数文案
  let currentCountObject = new GameObject('count', {
    position: {
      x: window.innerWidth / 2 + 67.5,
      y: 600
    },
  });
  // 将剩余克数添加到剩余克数容器中
  currentCountObject.addComponent(new Text({
    text: `${currentCount}克`,
    style: {
      // 字体设置：使用黑体以确保中文“克”字清晰
      fontFamily: "Arial, 'Microsoft YaHei', sans-serif",
      // 大小：根据圆圈大小适当调整，建议 20-24 左右
      fontSize: 16,
      // 样式：去掉 italic，改为正常
      fontStyle: "normal",
      // 粗细：图中文字较粗
      fontWeight: "thin",
      // 颜色：纯白
      fill: "#ffffff",
    }
  }));

  // 监听等级变化，切换树的生长状态
  // const onLevelChange = (key: string, value: number) => {
  //   if (key === 'level') {
  //     // 销毁旧树图片
  //     currentTree.destroy();
  //     // 创建对应等级的新树图片
  //     currentTree = createImg(
  //       getTreeResource(value),
  //       80, 120,
  //       0, 0,
  //       treeContainer
  //     );
  //   }
  // };
  // homeStore.onDataChange(onLevelChange);

  return currentCountObject;
}