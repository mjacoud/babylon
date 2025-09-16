import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Send, Paperclip, X } from "lucide-react";

interface ComposeEmailProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: { to: string; subject: string; body: string }) => void;
  replyTo?: string;
}

export function ComposeEmail({ isOpen, onClose, onSend, replyTo }: ComposeEmailProps) {
  const [to, setTo] = useState(replyTo || "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSend = () => {
    if (to && subject && body) {
      onSend({ to, subject, body });
      setTo(replyTo || "");
      setSubject("");
      setBody("");
      onClose();
    }
  };

  const handleClose = () => {
    setTo(replyTo || "");
    setSubject("");
    setBody("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle>New Message</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 space-y-4 min-h-0">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
            />
          </div>
          
          <div className="space-y-2 flex-1 min-h-0 flex flex-col">
            <Label htmlFor="body">Message</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message here..."
              className="flex-1 min-h-[200px] resize-none"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t flex-shrink-0">
          <Button variant="ghost" size="sm" className="gap-2">
            <Paperclip className="h-4 w-4" />
            Attach files
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSend} className="gap-2">
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}