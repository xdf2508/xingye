import { DOMManager } from '../domManager';
import { homeStore } from '../store/homeStore';

export default function createBtns() {
  const domManager = DOMManager.getInstance();
  const screen = homeStore.getScreeSize();
  
  // 获取已存在的主容器
  const mainContainer = domManager.getElement('mainContainer');
  
  // 攻略
  const guideBtn = domManager.createImageElement('guide', './statics/guide.png', {
    position: { x: 0, y: 60 },
    size: { width: 60, height: 32 }
  });
  guideBtn.addEventListener('click', () => {
    alert('攻略')
  });
  
  // 规则
  const ruleBtn = domManager.createImageElement('rule', './statics/rule.png', {
    position: { x: 0, y: 100 },
    size: { width: 60, height: 32 }
  });
  ruleBtn.addEventListener('click', () => {
    alert('规则')
  });
  
  // 登出
  const logoutBtn = domManager.createImageElement('logout', './statics/logout.png', {
    position: { x: screen.baseW - 60, y: 30 },
    size: { width: 60, height: 32 }
  });
  logoutBtn.addEventListener('click', () => {
    alert('登出')
  });
  
  // 分享
  const shareBtn = domManager.createImageElement('share', './statics/share.png', {
    position: { x: screen.baseW - 60, y: 70 },
    size: { width: 60, height: 32 }
  });
  shareBtn.addEventListener('click', () => {
    alert('分享')
  });
  
  // 故事
  const storyBtn = domManager.createImageElement('story', './statics/story.png', {
    position: { x: screen.baseW - 60, y: 110 },
    size: { width: 60, height: 32 }
  });
  storyBtn.addEventListener('click', () => {
    alert('故事')
  });
  
  // 我的拼图
  const jigsawBtn = domManager.createImageElement('jigsawPuzzle', './statics/jigsaw_puzzle.png', {
    position: { x: 15, y: 250 },
    size: { width: 80, height: 80 }
  });
  jigsawBtn.addEventListener('click', () => {
    alert('我的拼图')
  });
  
  // 成长手册
  const growthHandbookBtn = domManager.createImageElement('growthHandbook', './statics/growth_handbook.png', {
    position: { x: 15, y: 360 },
    size: { width: 80, height: 80 }
  });
  growthHandbookBtn.addEventListener('click', () => {
    alert('成长手册')
  });
  
  // 福禄值明细
  const blessingBtn = domManager.createImageElement('blessingAndprosperity', './statics/blessing_and_prosperity.png', {
    position: { x: 15, y: 470 },
    size: { width: 90, height: 70 }
  });
  blessingBtn.addEventListener('click', () => {
    alert('福禄值明细')
  });
  
  // 我的奖品
  const myPrizeBtn = domManager.createImageElement('myPrize', './statics/my_prize.png', {
    position: { x: 15, y: 580 },
    size: { width: 80, height: 80 }
  });
  myPrizeBtn.addEventListener('click', () => {
    alert('我的奖品')
  });
  
  // 做任务
  const doTaskBtn = domManager.createImageElement('doTask', './statics/do_task.png', {
    position: { x: screen.baseW - 90, y: 580 },
    size: { width: 80, height: 80 }
  });
  doTaskBtn.addEventListener('click', () => {
    alert('做任务')
  });
  
  return mainContainer!;
}
