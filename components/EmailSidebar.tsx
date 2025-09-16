import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Inbox, 
  Send, 
  FileText, 
  Trash2, 
  Star, 
  Archive,
  Settings,
  Plus
} from "lucide-react";
import { cn } from "../lib/utils";

interface EmailSidebarProps {
  selectedFolder: string;
  onFolderChange: (folder: string) => void;
  onCompose: () => void;
  emailCounts: Record<string, number>;
}

const folders = [
  { id: 'inbox', name: 'Inbox', icon: Inbox },
  { id: 'starred', name: 'Starred', icon: Star },
  { id: 'sent', name: 'Sent', icon: Send },
  { id: 'drafts', name: 'Drafts', icon: FileText },
  { id: 'archive', name: 'Archive', icon: Archive },
  { id: 'trash', name: 'Trash', icon: Trash2 },
];

export function EmailSidebar({ selectedFolder, onFolderChange, onCompose, emailCounts }: EmailSidebarProps) {
  return (
    <div className="w-64 border-r bg-muted/30 p-4">
      <div className="mb-6">
        <Button 
          onClick={onCompose}
          className="w-full justify-start gap-2"
        >
          <Plus className="h-4 w-4" />
          Compose
        </Button>
      </div>
      
      <nav className="space-y-1">
        {folders.map((folder) => {
          const IconComponent = folder.icon;
          const count = emailCounts[folder.id] || 0;
          
          return (
            <Button
              key={folder.id}
              variant={selectedFolder === folder.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-between",
                selectedFolder === folder.id && "bg-secondary"
              )}
              onClick={() => onFolderChange(folder.id)}
            >
              <div className="flex items-center gap-3">
                <IconComponent className="h-4 w-4" />
                <span>{folder.name}</span>
              </div>
              {count > 0 && (
                <Badge variant="secondary" className="h-5 px-2 text-xs">
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>
      
      <div className="mt-8 pt-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}