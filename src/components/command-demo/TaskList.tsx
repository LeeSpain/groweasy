
import React from "react";
import { Send } from "lucide-react";
import TaskItem from "./TaskItem";
import { Task } from "./types";

interface TaskListProps {
  tasks: Task[];
  copySuccess: Record<string, boolean>;
  handleCopy: (id: string, content: string) => void;
  getTimeAgo: (timestamp: string) => string;
}

const TaskList = ({ tasks, copySuccess, handleCopy, getTimeAgo }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted/30 rounded-full p-4 mb-4">
          <Send size={24} className="text-muted-foreground" />
        </div>
        <h4 className="text-lg font-medium mb-2">No tasks yet</h4>
        <p className="text-muted-foreground max-w-md">
          Try a command like "Create content about my business" to generate results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task} 
          copySuccess={copySuccess} 
          handleCopy={handleCopy} 
          getTimeAgo={getTimeAgo}
        />
      ))}
    </div>
  );
};

export default TaskList;
