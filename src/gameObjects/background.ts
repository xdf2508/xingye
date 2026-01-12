import { DOMManager } from '../domManager';
import { homeStore } from '../store/homeStore';

export default function createBackground() {
  const domManager = DOMManager.getInstance();
  const screen = homeStore.getScreeSize();
  
  // 获取已存在的主容器
  const mainContainer = domManager.getElement('mainContainer');
  
  // 由于元素已在静态HTML中定义，我们只需获取它们的引用
  // 背景图
  domManager.createImageElement('bg', './statics/bg.png', {
    position: { x: 0, y: 0 },
    size: { width: screen.baseW, height: screen.baseH }
  });

  // 雨天背景图
  domManager.createImageElement('rainny', './statics/rain_bg.png', {
    position: { x: 0, y: 0 },
    size: { width: screen.baseW, height: screen.baseH }
  });

  // 红色人偶
  domManager.createImageElement('redToy', './statics/red_toy.png', {
    position: { x: screen.baseW / 2 - 80, y: screen.baseH / 2 + 50 },
    size: { width: 90, height: 80 }
  });

  // 粉色人偶
  domManager.createImageElement('pinkToy', './statics/pink_toy.png', {
    position: { x: screen.baseW / 2 + 40, y: screen.baseH / 2 + 70 },
    size: { width: 70, height: 80 }
  });

  // 兴业理财logo
  domManager.createImageElement('logo', './statics/logo.png', {
    position: { x: 20, y: 16 },
    size: { width: 90, height: 18 }
  });

  // 标题
  domManager.createImageElement('title', './statics/title.png', {
    position: { x: screen.baseW / 2 - 87.5, y: 55 },
    size: { width: 175, height: 70 }
  });

  // 获取等级轴容器
  domManager.createDivElement('levelContainer', {
    position: { x: screen.baseW / 2 - 165, y: 150 },
    size: { width: 330, height: 15 }
  });

  // 等级背景轴
  domManager.createImageElement('levelBg', './statics/level_bg.png', {
    position: { x: 0, y: 0 },
    size: { width: 330, height: 8 }
  });

  // 等级图标和透明泡泡
  // 等级1
  domManager.createImageElement('levelCircle1', './statics/level_circle.png', {
    position: { x: 20, y: -5 },
    size: { width: 16, height: 16 }
  });
  domManager.createImageElement('paopao1', './statics/paopao.png', {
    position: { x: 18, y: -10 },
    size: { width: 22, height: 28 }
  });

  // 等级2
  domManager.createImageElement('levelCircle2', './statics/level_circle.png', {
    position: { x: 60, y: -5 },
    size: { width: 16, height: 16 }
  });
  domManager.createImageElement('paopao2', './statics/paopao.png', {
    position: { x: 58, y: -10 },
    size: { width: 22, height: 28 }
  });

  // 等级3
  domManager.createImageElement('level3', './statics/level.png', {
    position: { x: 100, y: -10 },
    size: { width: 25, height: 25 }
  });
  domManager.createImageElement('paopao3', './statics/paopao.png', {
    position: { x: 98, y: -15 },
    size: { width: 33, height: 39 }
  });

  // 等级4
  domManager.createImageElement('levelCircle4', './statics/level_circle.png', {
    position: { x: 145, y: -5 },
    size: { width: 16, height: 16 }
  });
  domManager.createImageElement('paopao4', './statics/paopao.png', {
    position: { x: 143, y: -10 },
    size: { width: 22, height: 28 }
  });

  // 等级5
  domManager.createImageElement('level5', './statics/level.png', {
    position: { x: 185, y: -10 },
    size: { width: 25, height: 25 }
  });
  domManager.createImageElement('paopao5', './statics/paopao.png', {
    position: { x: 183, y: -15 },
    size: { width: 33, height: 39 }
  });

  // 等级6
  domManager.createImageElement('levelCircle6', './statics/level_circle.png', {
    position: { x: 240, y: -5 },
    size: { width: 16, height: 16 }
  });
  domManager.createImageElement('paopao6', './statics/paopao.png', {
    position: { x: 238, y: -10 },
    size: { width: 22, height: 28 }
  });

  // 等级7
  domManager.createImageElement('level7', './statics/level.png', {
    position: { x: 285, y: -10 },
    size: { width: 25, height: 25 }
  });
  domManager.createImageElement('paopao7', './statics/paopao.png', {
    position: { x: 283, y: -15 },
    size: { width: 33, height: 39 }
  });

  // 设置等级文案方法（获取文本元素而不是创建新元素）
  const setLvText = (custLevel: number, x: number, y: number = 23) => {
    const textId = `levelText${custLevel}`;
    const textElement = domManager.getElement(textId) as HTMLElement;
    if (textElement) {
      textElement.textContent = `Lv${custLevel}`;
    }
    return textElement;
  };
  // 获取已存在的等级文字元素
  setLvText(1, 20);
  setLvText(2, 60);
  setLvText(3, 100);
  setLvText(4, 145);
  setLvText(5, 185);
  setLvText(6, 240);
  setLvText(7, 285);
  
  return mainContainer; // 返回主容器元素
}