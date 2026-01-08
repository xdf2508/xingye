import { GameObject } from '@eva/eva.js';
import createImg from './base';
import { homeStore } from '../store/homeStore';

export default function createTree() {
  // 树的容器（锚点设为底部中心，方便定位）
  const treeContainer = new GameObject('treeContainer', {
    position: { x: window.innerWidth / 2, y: 580 }, // 树的位置（对应截图中树苗位置）
    origin: { x: 0.5, y: 1 }, // 锚点：底部中心
    size: { width: 80, height: 120 } // 树的容器尺寸
  });

  // 根据等级获取对应树的资源（需提前准备不同生长阶段的树图片）
  const getTreeResource = (level: number) => {
    // 等级1→小芽，等级2→小苗，...，等级7→成熟树
    switch (Math.min(level, 7)) { // 等级最多到7
      case 1: return 'tree1'; // 小芽资源名
      case 2: return 'tree1'; // 小苗资源名
      case 3: return 'tree2'; // 小树资源名
      case 4: return 'tree2';
      case 5: return 'tree2';
      case 6: return 'tree2';
      case 7: return 'tree3'; // 成熟树资源名
      default: return 'tree3';
    }
  };

  // 创建初始树图片
  let currentTree = createImg(
    getTreeResource(homeStore.getRightLevel()),
    80, 120, // 树的宽高
    0, 0, // 相对容器的位置（锚点已设为底部中心，这里设0即可）
    treeContainer
  );

  // 监听等级变化，切换树的生长状态
  const onLevelChange = (key: string, value: number) => {
    if (key === 'level') {
      // 销毁旧树图片
      currentTree.destroy();
      // 创建对应等级的新树图片
      currentTree = createImg(
        getTreeResource(value),
        80, 120,
        0, 0,
        treeContainer
      );
    }
  };
  homeStore.onDataChange(onLevelChange);

  return treeContainer;
}