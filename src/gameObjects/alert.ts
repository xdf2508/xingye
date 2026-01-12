import { GameObject } from '@eva/eva.js';
import createImg from './base';
import { homeStore } from '../store/homeStore';

export default function createBtns() {
  const bgContainer = new GameObject('xxx', {
    size: { width: homeStore.getScreeSize().baseW, height: homeStore.getScreeSize().baseH }, // 与原背景尺寸一致
    origin: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
  });
  // 攻略
  createImg('guide', 60, 32, 0, 60, bgContainer, () => {
    alert('攻略')
  });
  // 规则
  createImg('rule', 60, 32, 0, 100, bgContainer, () => {
    alert('规则')
  });
  // 
  createImg('logout', 60, 32, homeStore.getScreeSize().baseW - 60, 30, bgContainer, () => {
    alert('登出')
  });
  // 
  createImg('share', 60, 32, homeStore.getScreeSize().baseW - 60, 70, bgContainer, () => {
    alert('分享')
  });
  // 
  createImg('story', 60, 32, homeStore.getScreeSize().baseW - 60, 110, bgContainer, () => {
    alert('故事')
  });
  // 我的拼图
  createImg('jigsawPuzzle', 80, 80, 15, 250, bgContainer, () => {
    alert('我的拼图')
  });
  // 成长手册
  createImg('growthHandbook', 80, 80, 15, 360, bgContainer, () => {
    alert('成长手册')
  });
  // 福禄值明细
  createImg('blessingAndprosperity', 90, 70, 15, 470, bgContainer, () => {
    alert('福禄值明细')
  });
  // 我的奖品
  createImg('myPrize', 80, 80, 15, 580, bgContainer, () => {
    alert('我的奖品')
  });
  // 做任务
  createImg('doTask', 80, 80, homeStore.getScreeSize().baseW - 90, 580, bgContainer, () => {
    alert('做任务')
  });
  // 浇灌
  createImg('water', 135, 65, homeStore.getScreeSize().baseW / 2 - 67.5, 600, bgContainer, () => {
    alert('浇灌')
  });
  return bgContainer;
}
