import { DOMManager } from '../domManager';
import { homeStore } from '../store/homeStore';

export default function createTree() {
  const domManager = DOMManager.getInstance();
  const screen = homeStore.getScreeSize();
  
  // 获取已存在的主容器
  const mainContainer = domManager.getElement('mainContainer');
  
  // 根据等级获取对应树的资源（需提前准备不同生长阶段的树图片）
  const getTreeResource = (level: number) => {
    // 等级1→小芽，等级2→小苗，...，等级7→成熟树
    switch (Math.min(level, 7)) { // 等级最多到7
      case 0: return './statics/tree1.png';
      case 1: return './statics/tree2.png';
      case 2: return './statics/tree3.png';
      case 3: return './statics/tree4.png';
      case 4: return './statics/tree5.png';
      case 5: return './statics/tree6.png';
      case 6: return './statics/tree7.png';
      case 7: return './statics/tree8.png'; // 成熟树资源名
      default: return './statics/tree1.png';
    }
  };

  // 根据树的成长阶段设置图片大小和位置
  const getTreeSize = (level: string) => {
    let w: number;
    let h: number;
    let x: number;
    let y: number;
    if (level.includes('tree1')) {
      w = 115;
      h = 120;
      x = screen.baseW / 2 + 45; // 35 + 10
      y = 550;
    } else if (level.includes('tree2')) {
      w = 92;
      h = 155;
      x = screen.baseW / 2 + 40; // 35 + 5
      y = 520; // 550 - 30
    } else if (level.includes('tree3')) {
      w = 101;
      h = 200;
      x = screen.baseW / 2 + 20; // 35 - 15
      y = 480; // 550 - 70
    } else if (level.includes('tree4')) {
      w = 144;
      h = 200;
      x = screen.baseW / 2 + 5; // 35 - 30
      y = 480; // 550 - 70
    } else if (level.includes('tree5')) {
      w = 173;
      h = 250;
      x = screen.baseW / 2 - 5; // 35 - 40
      y = 460; // 550 - 90
    } else if (level.includes('tree6')) {
      w = 197;
      h = 250;
      x = screen.baseW / 2 - 25; // 35 - 60
      y = 430; // 550 - 120
    } else if (level.includes('tree7')) {
      w = 241;
      h = 250;
      x = screen.baseW / 2 - 55; // 35 - 90
      y = 450; // 550 - 100
    } else if (level.includes('tree8')) {
      w = 250;
      h = 292;
      x = screen.baseW / 2 - 55; // 35 - 90
      y = 410; // 550 - 140
    } else {
      w = 115;
      h = 120;
      x = screen.baseW / 2 + 45; // 35 + 10
      y = 550;
    }
    return { w, h, x, y };
  };

  // 获取初始树图片并设置
  const level = getTreeResource(homeStore.getLeftLevel());
  const { w, h, x, y } = getTreeSize(level);
  let currentTreeId = 'tree1'; // 使用静态HTML中的默认树ID
  let currentTree = domManager.createImageElement(
    currentTreeId,
    level,
    {
      position: { x, y },
      size: { width: w, height: h }
    }
  );

  // 监听等级变化，切换树的生长状态
  const onLevelChange = (key: string, value: number) => {
    if (key === 'level') {
      // 创建对应等级的新树图片
      const newLevel = getTreeResource(homeStore.getLeftLevel());
      const { w, h, x, y } = getTreeSize(newLevel);
      
      // 先展示发光树干图，渐隐后显示对应树干图
      const currentTreeLightId = `tree-light-${Date.now()}`;
      const currenTreeTem = domManager.createImageElement(
        currentTreeLightId,
        newLevel.replace('.png', 'Light.png'), // 假设发光版本的命名规则
        {
          position: { x, y },
          size: { width: w, height: h }
        }
      );

      // 设置透明度动画
      currenTreeTem.style.opacity = '0';
      
      // 使用CSS动画实现透明度变化
      currenTreeTem.style.transition = 'opacity 2.5s ease-in-out';
      currenTreeTem.style.opacity = '1';

      // 在过渡期间设置透明度
      setTimeout(() => {
        currenTreeTem.style.opacity = '0';
      }, 100); // 在淡入后开始淡出

      // 动画结束后替换为普通树图
      setTimeout(() => {
        domManager.removeElement(currentTreeLightId);
        // 高亮树干销毁成功后显示新的树干
        currentTreeId = 'tree1'; // 使用静态HTML中的树元素ID
        currentTree = domManager.createImageElement(
          currentTreeId,
          newLevel,
          {
            position: { x, y },
            size: { width: w, height: h }
          }
        );
      }, 2500);
    }
  };
  homeStore.onDataChange(onLevelChange);

  return mainContainer;
}