
import { Task } from "@/components/command-demo/types";
import {
  ArrowUpDown,
  ChevronDown,
  Clock,
  Filter,
  Mail,
  RefreshCcw,
  Share2
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface TaskHistoryProps {
  tasks: Task[];
}

const TaskHistory = ({ tasks }: TaskHistoryProps) => {
  // In a real app, these would be state variables with handlers
  const statusFilters = ["all", "pending", "completed", "failed"];
  const typeFilters = ["all", "social", "email"];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">Task History</h3>
        <Button variant="outline" size="sm" icon={<RefreshCcw size={14} />}>
          Refresh
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search tasks..."
            className="pl-10"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" icon={<Filter size={14} />}>
                Type
                <ChevronDown size={14} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {typeFilters.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={type === "all"}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" icon={<Filter size={14} />}>
                Status
                <ChevronDown size={14} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {statusFilters.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={status === "all"}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" icon={<ArrowUpDown size={14} />}>
            Sort
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Content</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-muted/30">
                  <td className="py-3 px-4 text-sm">
                    {task.type === "social" ? (
                      <div className="flex items-center">
                        <Share2 size={16} className="mr-2 text-blue-500" />
                        <span>Social</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Mail size={16} className="mr-2 text-purple-500" />
                        <span>Email</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm max-w-xs truncate">
                    {task.content}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Badge variant="outline" className={`${getStatusColor(task.status)}`}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1.5" />
                      {formatDate(task.timestamp)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">View</Button>
                      {task.status === "failed" && (
                        <Button variant="outline" size="sm">Retry</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskHistory;
