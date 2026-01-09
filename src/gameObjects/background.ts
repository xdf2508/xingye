import { GameObject } from '@eva/eva.js';
import createImg from './base';
import { Text } from '@eva/plugin-renderer-text';

export default function createBackground() {
  // 1. 创建背景父容器（统一管理两层背景，保留你原有的位置/锚点配置）
  const bgContainer = new GameObject('bgContainer', {
    size: { width: window.innerWidth, height: window.innerHeight }, // 与原背景尺寸一致
    origin: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
    anchor: { x: 0, y: 0 },
  });

  // 背景图
  createImg('bg', window.innerWidth, window.innerHeight, 0, 0, bgContainer);

  // 阳光背景图
  // createImg('bgSunny', window.innerWidth, window.innerHeight, 0, 0, bgContainer);

  // 下雨背景图
  createImg('rainny', window.innerWidth, window.innerHeight, 0, 0, bgContainer);

  // 红色人偶
  createImg('redToy', 90, 80, window.innerWidth / 2 - 80, window.innerHeight / 2 + 50, bgContainer);

  // 粉色人偶
  createImg('pinkToy', 70, 80, window.innerWidth / 2 + 40, window.innerHeight / 2 + 70, bgContainer);

  // 粉色人偶
  createImg('pinkToy', 70, 80, window.innerWidth / 2 + 40, window.innerHeight / 2 + 70, bgContainer);

  // 兴业理财logo
  createImg('logo', 90, 18, 20, 16, bgContainer);

  // 标题
  createImg('title', 175, 70, window.innerWidth / 2 - 87.5, 55, bgContainer);

  /** 等级轴容器 */
  const levelContainer = new GameObject('levelContainer', {
    size: { width: 330, height: 15 }, // 与原背景尺寸一致
    position: { x: window.innerWidth / 2 - 165, y: 150 },
  });

  // 等级背景轴
  createImg('levelBg', 330, 8, 0, 0, levelContainer);

  // // 等级1
  createImg('levelCircle', 16, 16, 20, -5, levelContainer);
  // 等级轴上图标透明泡泡1
  createImg('paopao', 22, 28, 18, -10, levelContainer);

  // 等级2
  createImg('levelCircle', 16, 16, 60, -5, levelContainer);
  // 等级轴上图标透明泡泡2
  createImg('paopao', 22, 28, 58, -10, levelContainer);

  // 等级3
  createImg('level', 25, 25, 100, -10, levelContainer);
  // 等级轴上图标透明泡泡3
  createImg('paopao', 33, 39, 98, -15, levelContainer);

  // // 等级4
  createImg('levelCircle', 16, 16, 145, -5, levelContainer);
  // 等级轴上图标透明泡泡4
  createImg('paopao', 22, 28, 143, -10, levelContainer);

  // // 等级5
  createImg('level', 25, 25, 185, -10, levelContainer);
  // 等级轴上图标透明泡泡5
  createImg('paopao', 33, 39, 183, -15, levelContainer);

  // // 等级6
  createImg('levelCircle', 16, 16, 240, -5, levelContainer);
  // 等级轴上图标透明泡泡6
  createImg('paopao', 22, 28, 238, -10, levelContainer);

  // // 等级7
  createImg('level', 25, 25, 285, -10, levelContainer);
  // 等级轴上图标透明泡泡7
  createImg('paopao', 33, 39, 283, -15, levelContainer);


  // 设置等级文案方法
  const setLvText = (custLevel: number, x: number) => {
    /** 添加等级文字容器 */
    const leftLvContainer = new GameObject("levelText", {
      position: {
        x: x,
        y: 23,
      },
    });
    const textObject = new Text({
      text: `Lv${custLevel}`,
      style: {
        fontSize: 13,
        fill: '#000000'
      }
    });
    leftLvContainer.addComponent(textObject);
    return leftLvContainer;
  };
  // 把等级文字添加到等级进度轴容器中
  levelContainer.addChild(setLvText(1, 20));
  levelContainer.addChild(setLvText(2, 60));
  levelContainer.addChild(setLvText(3, 100));
  levelContainer.addChild(setLvText(4, 145));
  levelContainer.addChild(setLvText(5, 185));
  levelContainer.addChild(setLvText(6, 240));
  levelContainer.addChild(setLvText(7, 285));
  bgContainer.addChild(levelContainer);
  return bgContainer; // 返回父容器（包含两层背景）
}