import { GameObject } from '@eva/eva.js';
import createImg from './base';
import { homeStore } from '../store/homeStore';

export default function createBtns() {
  const bgContainer = new GameObject('xxx', {
    size: { width: homeStore.getScreeSize().baseW, height: homeStore.getScreeSize().baseH }, // 与原背景尺寸一致
    origin: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
  });
  return bgContainer;
}
