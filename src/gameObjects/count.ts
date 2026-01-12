import { homeStore } from '../store/homeStore';
import { DOMManager } from '../domManager';

export default function createCount() {
  const domManager = DOMManager.getInstance();
  const screen = homeStore.getScreeSize();
  
  // 当前克数
  let currentCount: number = 1000;
  
  // 获取已存在的主容器
  const mainContainer = domManager.getElement('mainContainer');
  
  // 获取已存在的克数容器
  const currentCountId = 'count';
  const currentCountObject = domManager.getElement(currentCountId) as HTMLElement;
  
  // 获取已存在的圆圈容器
  const outterId = 'outter';
  const outter = domManager.getElement(outterId) as HTMLElement;
  
  // 将剩余克数添加到剩余克数容器中
  if (outter) {
    outter.textContent = `${currentCount}克`;
  }

  return mainContainer;
}