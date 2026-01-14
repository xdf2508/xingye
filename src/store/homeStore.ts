type Listener = (key: string, value: any) => void;

class HomeStore {
  private static instance: HomeStore;
  // 核心业务数据
  private progressValue = 0;      // 当前进度数值（0-1000）
  private progressMaxValue = 1000; // 进度最大值（满1000升级）
  private maxLevel = 7; // 最高等级
  private progressBarWidthMax = 210; // 进度轴最大像素宽度
  private level = 1;              // 右边等级（LVx），左边等级 = level - 1
  private baseW: number = window.innerWidth; // 默认屏宽
  private baseH: number = window.innerHeight; // 默认屏高
  private waterSize: number = 50; // 每次浇水最少用量
  private waterRemainingSize: number = 0; // 剩余水量
  private waterStatus: string; // 是否允许浇灌

  // 数据监听回调列表
  private listeners: Listener[] = [];

  // 私有构造函数，确保全局唯一实例
  private constructor() { }

  // 获取单例实例
  public static getInstance(): HomeStore {
    if (!HomeStore.instance) {
      HomeStore.instance = new HomeStore();
    }
    return HomeStore.instance;
  }

  // ---------- 读取数据的方法 ----------
  // 获取屏幕尺寸
  public getScreeSize(): { baseW: number, baseH: number } {
    return { baseW: this.baseW, baseH: this.baseH };
  }

  // 获取当前进度数值（0-1000）
  public getProgressValue(): number {
    return this.progressValue;
  }

  // 进度数值转进度轴像素宽度（比例换算）
  public getProgressBarWidth(): number {
    return (this.progressValue / this.progressMaxValue) * this.progressBarWidthMax;
  }

  // 获取右边等级（LVx）
  public getRightLevel(): number {
    return this.level;
  }

  // 获取左边等级（右边等级-1）
  public getLeftLevel(): number {
    return this.level - 1;
  }

  // 获取进度文案（如 "50/1000"）
  public getProgressText(): string {
    return `${this.progressValue}/${this.progressMaxValue}`;
  }

  // 获取每次浇水使用水量
  public getWaterSize() {
    return this.waterSize;
  }

  // 获取当前剩余水量
  public getRemainingWaterSize() {
    return this.waterRemainingSize;
  }

  // 获取是否允许浇灌
  public getWaterStatus(): string {
    return this.waterStatus;
  }

  // ---------- 修改数据的方法 ----------
  // 增加进度（点击浇灌调用）
  public addProgress(): void {
    // 计算当前距离满级还需要多少进度
    const remainingToNextLevel = this.progressMaxValue - this.progressValue;

    // 如果剩余水量不足以填满当前等级，则按剩余水量增加进度
    // 否则只增加到满级，剩余的水留给下次使用
    let progressIncrease = 0;
    if (this.waterRemainingSize >= remainingToNextLevel) {
      // 剩余水量足够填满当前等级，只增加到满级
      progressIncrease = remainingToNextLevel;
    } else if (this.waterRemainingSize > 0) {
      // 剩余水量不足填满当前等级，按实际剩余水量增加
      progressIncrease = this.waterRemainingSize;
    } else {
      // 没有剩余水，直接返回
      return;
    }

    let newProgress = this.progressValue + progressIncrease;
    // 进度轴先变化，然后再检查当前进度轴是否已满，满了再通知进度轴变化重置进度为0
    this.progressValue = newProgress;
    this.notifyListeners('progress', this.progressValue); // 通知进度变化
    // 更新剩余水量
    this.waterAnimation(this.waterRemainingSize - progressIncrease); // 通知剩余水量变化
    setTimeout(() => {
      // 检查是否满1000，满则升级+进度重置
      if (newProgress >= this.progressMaxValue) {
        newProgress = 0; // 进度重置为0
        if (this.level >= this.maxLevel) {
          console.log('已达到最高等级');
          // 最高等级限制为7级
          return;
        }
        this.level += 1; // 等级+1
        this.notifyListeners('level', this.level); // 通知等级变化
      }
      this.progressValue = newProgress;
      this.notifyListeners('progress', this.progressValue); // 通知进度变化
    }, 500);
  }

  // 设置剩余水量
  public setWaterRemainSize(count: number) {
    this.waterRemainingSize = count;
    this.notifyListeners('count', this.waterRemainingSize); // 通知剩余克数变化
    // 设置是否允许再次浇灌
    this.setWaterStatus();
  }

  public setWaterStatus() {
    // 剩余水滴不足
    if (this.waterRemainingSize < this.waterSize) {
      this.waterStatus = 'NO_WATER';
    } else if (this.progressValue >= this.progressMaxValue && this.level >= this.maxLevel) {
      // 满级且进度已满
      this.waterStatus = 'LEVEL_MAX';
    } else {
      // 允许浇灌
      this.waterStatus = 'OK';
    }
    return this.waterStatus;
  }

  // 更新剩余水量动画
  public waterAnimation(waterCouont: number) {
    // 如果剩余水量少于50，则直接阻断
    if (this.waterRemainingSize < this.waterSize) {
      return;
    }
    // 从当前剩余水量开始减少，每次减少1，直到减少到为0
    // 1. 定义一个 sleep 函数
    // const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    // const runTask = async () => {
    //   for (let i = this.waterRemainingSize; i >= 0; i--) {
    //     // console.log(`执行第 ${i} 次`);
    //     this.setWaterRemainSize(i);
    //     // 2. 在循环中等待
    //     await sleep(1);
    //   }
    //   // console.log("全部执行完毕");
    // }
    // runTask();
    this.setWaterRemainSize(waterCouont);
  }

  // ---------- 监听相关方法 ----------
  public onDataChange(listener: Listener): void {
    this.listeners.push(listener);
  }

  public offDataChange(listener: Listener): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // 通知所有监听者数据变化
  private notifyListeners(key: string, value: any): void {
    this.listeners.forEach(listener => listener(key, value));
  }
}

// 导出全局唯一实例
export const homeStore = HomeStore.getInstance();