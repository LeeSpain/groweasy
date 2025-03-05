
import React from "react";
import { Button } from "@/components/ui-custom/Button";
import { Copy, CheckCircle, Clock } from "lucide-react";
import { Task } from "./types";

interface TaskItemProps {
  task: Task;
  copySuccess: Record<string, boolean>;
  handleCopy: (id: string, content: string) => void;
  getTimeAgo: (timestamp: string) => string;
}

const TaskItem = ({ task, copySuccess, handleCopy, getTimeAgo }: TaskItemProps) => {
  return (
    <div 
      key={task.id} 
      className="p-4 bg-secondary/50 rounded-lg border border-border transition-all hover:bg-secondary/80"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
            <CheckCircle size={12} className="mr-1" />
            {task.type === "social" ? "Posted" : "Sent"}
          </div>
          <span className="text-xs text-muted-foreground">
            <Clock size={12} className="inline mr-1" />
            {getTimeAgo(task.timestamp)}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleCopy(task.id, task.content)}
          className="h-8 px-2 text-xs"
        >
          {copySuccess[task.id] ? (
            <>
              <CheckCircle size={14} className="mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} className="mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>

      {task.type === "social" ? (
        <p className="text-sm">{task.content}</p>
      ) : (
        <>
          <div className="mb-3">
            <pre className="text-sm whitespace-pre-wrap font-sans">{task.content}</pre>
          </div>
          {task.details && (
            <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-border text-xs">
              <div className="bg-secondary rounded-full px-2.5 py-1">
                Sent: {task.details.sent}
              </div>
              {task.details.failed > 0 && (
                <div className="bg-red-100 text-red-700 rounded-full px-2.5 py-1">
                  Failed: {task.details.failed}
                </div>
              )}
              <div className="bg-blue-100 text-blue-700 rounded-full px-2.5 py-1">
                Opened: {task.details.opened}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskItem;
