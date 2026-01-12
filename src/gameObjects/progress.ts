import { GameObject } from '@eva/eva.js';
import createImg from './base';
import { Text } from '@eva/plugin-renderer-text';
// 修正homeStore路径
import { homeStore } from '../store/homeStore';

export default function createProgress() {
  /** ----------------------- 从单例类获取初始数据 ---------------------------- */
  const initialProgressWidth = homeStore.getProgressBarWidth();
  const initialLeftLevel = homeStore.getLeftLevel();
  const initialRightLevel = homeStore.getRightLevel();
  const initialProgressText = homeStore.getProgressText();

  /** -----------------------基础容器创建start---------------------------- */
  const outter = new GameObject('outter', {
    position: {
      x: homeStore.getScreeSize().baseW / 2 - 125,
      y: 200,
    },
    size: {
      width: 330,
      height: 25,
    },
  });

  const inner = new GameObject('inner', {
    position: {
      x: 25,
      y: 8,
    },
    size: { width: initialProgressWidth, height: 10 },
  });

  createImg('progress', 250, 25, 0, 0, outter);
  const progressBar = createImg('progressInner', initialProgressWidth, 10, 0, 0, inner);
  /** -----------------------基础容器创建end---------------------------- */

  /** -----------------------进度轴左边等级文案start---------------------------- */
  const leftLvContainer = new GameObject("text", {
    position: {
      x: 8,
      y: 6,
    },
  });
  const leftLvText = new Text({
    text: `${initialLeftLevel}级`,
    style: {
      fontFamily: "Arial",
      fontSize: 10,
      fill: '#fff'
    }
  });
  leftLvContainer.addComponent(leftLvText);
  outter.addChild(leftLvContainer);
  /** -----------------------进度轴左边等级文案end---------------------------- */

  /** -----------------------内部进度轴中百分比start---------------------------- */
  const percentLvContainer = new GameObject("text", {
    position: {
      x: 160,
      y: 0,
    },
  });
  const percentLvText = new Text({
    text: initialProgressText,
    style: {
      fontFamily: "Arial",
      fontSize: 10,
      fill: '#fff'
    }
  });
  percentLvContainer.addComponent(percentLvText);
  inner.addChild(percentLvContainer);
  /** -----------------------内部进度轴中百分比end---------------------------- */

  /** -----------------------进度轴右侧葫芦start---------------------------- */
  const huluContainer = new GameObject("text", {
    position: {
      x: 205,
      y: -15,
    },
  });
  createImg('hulu', 30, 40, 0, 0, huluContainer);
  
  const levelTextRightContainer = new GameObject("text", {
    position: {
      x: 10,
      y: 18,
    },
  });
  const levelTextRight = new Text({
    text: `LV${initialRightLevel}`,
    style: {
      fontFamily: "Arial",
      fontSize: 8,
      fill: '#3c18eeff'
    }
  });
  levelTextRightContainer.addComponent(levelTextRight);
  huluContainer.addChild(levelTextRightContainer);
  inner.addChild(huluContainer);
  /** -----------------------进度轴右侧葫芦end---------------------------- */

  /** -----------------------监听单例类数据变化，自动更新UI---------------------------- */
  const dataChangeListener = (key: string, value: any) => {
    if (key === 'progress') {
      const newWidth = homeStore.getProgressBarWidth();
      progressBar.transform.size.width = newWidth;
      inner.transform.size.width = newWidth;
      percentLvText.text = homeStore.getProgressText();
    }
    if (key === 'level') {
      const newLeftLevel = homeStore.getLeftLevel();
      const newRightLevel = homeStore.getRightLevel();
      leftLvText.text = `${newLeftLevel}级`;
      levelTextRight.text = `Lv${newRightLevel}`;
    }
  };
  homeStore.onDataChange(dataChangeListener);

  outter.addChild(inner);
  return outter;
}