import { DOMManager } from '../domManager';
import { homeStore } from '../store/homeStore';

export default function createProgress() {
  const domManager = DOMManager.getInstance();
  const screen = homeStore.getScreeSize();
  
  /** ----------------------- 从单例类获取初始数据 ---------------------------- */
  const initialProgressWidth = homeStore.getProgressBarWidth();
  const initialLeftLevel = homeStore.getLeftLevel();
  const initialRightLevel = homeStore.getRightLevel();
  const initialProgressText = homeStore.getProgressText();

  /** -----------------------获取已存在的主容器---------------------------- */
  const mainContainer = domManager.getElement('mainContainer');
  
  // 获取进度条元素
  domManager.createImageElement('progress', './statics/progress.png', {
    position: { x: screen.baseW / 2 - 125, y: 200 },
    size: { width: 250, height: 25 }
  });

  const innerId = 'progressInnerContainer';
  domManager.createDivElement(innerId, {
    position: {
      x: screen.baseW / 2 - 100, // 25px offset + absolute position
      y: 208, // 200 + 8
    },
    size: { width: initialProgressWidth, height: 10 }
  });

  // 获取内部进度条
  const progressBar = domManager.createImageElement('progressInner', './statics/progress_inner.png', {
    position: { x: 0, y: 0 },
    size: { width: initialProgressWidth, height: 10 }
  });
  /** -----------------------基础容器获取end---------------------------- */

  /** -----------------------进度轴左边等级文案start---------------------------- */
  const leftLvId = 'leftLevelText';
  const leftLvElement = domManager.getElement(leftLvId) as HTMLElement;
  if (leftLvElement) {
    leftLvElement.textContent = `${initialLeftLevel}级`;
  }
  /** -----------------------进度轴左边等级文案end---------------------------- */

  /** -----------------------内部进度轴中百分比start---------------------------- */
  const percentLvId = 'percentLevelText';
  const percentLvElement = domManager.getElement(percentLvId) as HTMLElement;
  if (percentLvElement) {
    percentLvElement.textContent = initialProgressText;
  }
  /** -----------------------内部进度轴中百分比end---------------------------- */

  /** -----------------------进度轴右侧葫芦start---------------------------- */
  const huluContainerId = 'huluContainer';
  domManager.createDivElement(huluContainerId, {
    position: {
      x: screen.baseW / 2 + 70, // 205 offset from progress + progress x position
      y: 185, // 200 - 15
    }
  });

  domManager.createImageElement('hulu', './statics/hulu.png', {
    position: { x: 0, y: 0 },
    size: { width: 30, height: 40 }
  });
  
  const levelTextRightId = 'levelTextRight';
  const levelTextRightElement = domManager.getElement(levelTextRightId) as HTMLElement;
  if (levelTextRightElement) {
    levelTextRightElement.textContent = `Lv${initialRightLevel}`;
  }
  /** -----------------------进度轴右侧葫芦end---------------------------- */

  /** -----------------------监听单例类数据变化，自动更新UI---------------------------- */
  const dataChangeListener = (key: string, value: any) => {
    if (key === 'progress') {
      const newWidth = homeStore.getProgressBarWidth();
      // 更新进度条宽度
      if (progressBar instanceof HTMLImageElement) {
        progressBar.style.width = `${newWidth}px`;
      }
      // 更新内部容器宽度
      const innerContainer = domManager.getElement(innerId);
      if (innerContainer) {
        innerContainer.style.width = `${newWidth}px`;
      }
      // 更新百分比文本
      const percentElement = domManager.getElement(percentLvId);
      if (percentElement) {
        percentElement.textContent = homeStore.getProgressText();
      }
    }
    if (key === 'level') {
      const newLeftLevel = homeStore.getLeftLevel();
      const newRightLevel = homeStore.getRightLevel();
      // 更新左侧等级文本
      const leftLevelElement = domManager.getElement(leftLvId);
      if (leftLevelElement) {
        leftLevelElement.textContent = `${newLeftLevel}级`;
      }
      // 更新右侧等级文本
      const rightLevelElement = domManager.getElement(levelTextRightId);
      if (rightLevelElement) {
        rightLevelElement.textContent = `Lv${newRightLevel}`;
      }
    }
  };
  homeStore.onDataChange(dataChangeListener);

  return mainContainer;
}