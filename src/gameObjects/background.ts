import { GameObject } from '@eva/eva.js';
import createImg from './base';

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
  createImg('bgSunny', window.innerWidth, window.innerHeight, 0, 0, bgContainer);

  // 下雨背景图
  // createImg('rainny', window.innerWidth, window.innerHeight, 0, 0, bgContainer);

  // 红色人偶
  createImg('redToy', 90, 80, window.innerWidth / 2 - 80, window.innerHeight / 2 + 50, bgContainer);

  // 树苗
  createImg('pinkToy', 70, 80, window.innerWidth / 2 + 40, window.innerHeight / 2 + 70, bgContainer);

  // 粉色人偶
  createImg('pinkToy', 70, 80, window.innerWidth / 2 + 40, window.innerHeight / 2 + 70, bgContainer);

  // 树苗
  createImg('tree1', 70, 80, window.innerWidth / 2 - 10, window.innerHeight / 2 + 40, bgContainer);

  // 兴业理财logo
  createImg('logo', 90, 18, 20, 16, bgContainer);

  // 标题
  createImg('title', 175, 70, window.innerWidth / 2 - 87.5, 55, bgContainer);

  return bgContainer; // 返回父容器（包含两层背景）
}