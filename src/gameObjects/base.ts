// ./base.ts
import { DOMManager, HTMLElementOptions } from '../domManager';
import { homeStore } from '../store/homeStore';

/**
 * 通用创建图片节点的基础方法（使用HTML DOM元素）
 * @param resource 图片资源名
 * @param width 图片宽度
 * @param height 图片高度
 * @param x 相对父容器的x坐标
 * @param y 相对父容器的y坐标
 * @param parentContainerId 可选：挂载的父容器ID（不传则挂载到主容器）
 * @param callback 可选：点击事件回调（不传则不绑定点击）
 * @returns 返回创建的HTML元素
 */
export default function createImg(
  resource: string,
  width: number,
  height: number,
  x: number,
  y: number,
  parentContainerId?: string,
  callback?: () => void // 不传则为undefined，避免空函数导致的逻辑误判
): HTMLElement {
  const domManager = DOMManager.getInstance();
  
  // 生成唯一的元素ID
  const elementId = `img-${resource}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // 创建HTML元素选项
  const options: HTMLElementOptions = {
    position: { x, y },
    size: { width, height },
    attributes: {
      'data-resource': resource // 用于标识资源名称
    }
  };

  // 创建图片元素
  const imgElement = domManager.createImageElement(elementId, getAssetPath(resource), options);

  // 3. 可选：绑定点击事件
  if (callback) {
    imgElement.style.cursor = 'pointer'; // 设置手型光标
    imgElement.addEventListener('click', callback);
    imgElement.addEventListener('touchstart', (e) => {
      e.preventDefault(); // 阻止触摸时的默认行为
      callback();
    });
  }

  // 4. 可选：设置父容器
  if (parentContainerId) {
    const parentElement = domManager.getElement(parentContainerId);
    if (parentElement) {
      // 将元素移动到指定父容器中
      parentElement.appendChild(imgElement);
    }
  }

  // 5. 返回创建的HTML元素
  return imgElement;
}

// 根据资源名获取实际的资源路径
function getAssetPath(resource: string): string {
  // 从 resources.ts 获取资源路径映射
  // 这里使用一个简单的映射关系
  const resourceMap: Record<string, string> = {
    'bg': './statics/bg.png',
    'bgSunny': './statics/bg_sunny.png',
    'rainny': './statics/rain.png',
    'redToy': './statics/red_toy.png',
    'pinkToy': './statics/pink_toy.png',
    'logo': './statics/logo.png',
    'title': './statics/title.png',
    'level': './statics/level.png',
    'levelCircle': './statics/level_circle.png',
    'paopao': './statics/paopao.png',
    'levelBg': './statics/level_bg.png',
    'hulu': './statics/hulu.png',
    'progressInner': './statics/progress_inner.png',
    'progress': './statics/progress.png',
    'jigsawPuzzle': './statics/jigsaw_puzzle.png',
    'puzzleDefault': './statics/puzzle_default.png',
    'puzzleAnger': './statics/puzzle_anger.png',
    'puzzleSleepy': './statics/puzzle_sleepy.png',
    'puzzleThink': './statics/puzzle_think.png',
    'puzzleLaughing': './statics/puzzle_laughing.png',
    'puzzlePlayfulAndSad': './statics/puzzle_playful_and_sad.png',
    'puzzleOutOfBodyExperience': './statics/puzzle_out_of_body_experience.png',
    'puzzleConfidenceAndFlustered': './statics/puzzle_confidence_and_flustered.png',
    'puzzleTip': './statics/puzzle_tip.png',
    'guide': './statics/guide.png',
    'rule': './statics/rule.png',
    'share': './statics/share.png',
    'story': './statics/story.png',
    'logout': './statics/logout.png',
    'growthHandbook': './statics/growth_handbook.png',
    'blessingAndprosperity': './statics/blessing_and_prosperity.png',
    'myPrize': './statics/my_prize.png',
    'doTask': './statics/do_task.png',
    'water': './statics/water.png',
    'dotaskTitle': './statics/dotask_title.png',
    'todo': './statics/todo.png',
    'finished': './statics/finished.png',
    'toBeCollected': './statics/to_be_collected.png',
    'getReady': './statics/get_ready.png',
    'strategy': './statics/strategy.png',
    'waterDrop': './statics/water_drop.png',
    'bubble': './statics/bubble.png',
    'eye': './statics/eye.png',
    'octagram': './statics/octagram.png',
    'octagramAdd': './statics/octagram_add.png',
    'personal': './statics/personal.png',
    'flag': './statics/flag.png',
    'prizeBg': './statics/prize_bg.png',
    'congratulations': './statics/congratulations.png',
    'waterDropMax': './statics/water_drop_max.png',
    'clickToSee': './statics/click_to_see.png',
    'close': './statics/close.png',
    'wateringCan': './statics/watering_can.png',
    'tree1': './statics/tree1.png',
    'tree1Light': './statics/tree1_light.png',
    'tree2': './statics/tree2.png',
    'tree2Light': './statics/tree2_light.png',
    'tree3': './statics/tree3.png',
    'tree3Light': './statics/tree3_light.png',
    'tree4': './statics/tree4.png',
    'tree4Light': './statics/tree4_light.png',
    'tree5': './statics/tree5.png',
    'tree5Light': './statics/tree5_light.png',
    'tree6': './statics/tree6.png',
    'tree6Light': './statics/tree6_light.png',
    'tree7': './statics/tree7.png',
    'tree7Light': './statics/tree7_light.png',
    'tree8': './statics/tree8.png',
    'tree8Light': './statics/tree8_light.png',
    'rewardLv1': './statics/reward_lv1.png',
    'rewardLv2': './statics/reward_lv2.png',
    'rewardLv3': './statics/reward_lv3.png',
    'rewardLv4': './statics/reward_lv4.png',
    'rewardLv5': './statics/reward_lv5.png',
    'rewardLv6': './statics/reward_lv6.png',
    'rewardLv7': './statics/reward_lv7.png',
    'regulation1': './statics/regulation1.png',
    'regulation2': './statics/regulation2.png',
    'regulation3': './statics/regulation3.png',
    'regulation4': './statics/regulation4.png',
    'regulation5': './statics/regulation5.png',
    'regulation6': './statics/regulation6.png',
    'regulation7': './statics/regulation7.png',
    'regulation8': './statics/regulation8.png',
    'fuluDesc': './statics/fulu_desc.png',
    'waterDropWithStart': './statics/water_drop_with_start.png',
    'fuluBg': './statics/fulu_bg.png',
    'gotoXxLight': './statics/goto_xx_light.png',
    'xxLight': './statics/xx_light.png',
    'clickToGet': './statics/click_to_get.png',
  };

  return resourceMap[resource] || './statics/default.png';
}