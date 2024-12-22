// 待办事项的数据结构
export interface Todo {
  id: string;        // 唯一标识符
  text: string;      // 待办事项内容
  completed: boolean; // 完成状态
  createdAt: Date;   // 创建时间
}

// 过滤器类型
export type FilterType = 'all' | 'active' | 'completed'; 