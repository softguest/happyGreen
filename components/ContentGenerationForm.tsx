'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { generateDeepContent } from '@/actions/ai-content/generateDeepContent';

// ... (import UI components like Button, Textarea, etc.)
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

export function ContentGenerationForm({ moduleId }: { moduleId: string }) {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState<'deep_dive' | 'explanation' | 'case_study' | 'exercise'>('deep_dive');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic to explore.');
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading('Generating your deep content...');

    const result = await generateDeepContent(moduleId, topic, contentType);

    setIsGenerating(false);

    if (result.success && result.contentId) {
      toast.success('Content generated successfully!', { id: toastId });
      // Redirect to the newly created content page
      router.push(`/learning/modules/${moduleId}/deep-content/${result.contentId}`);
    } else {
      toast.error(result.error || 'An unexpected error occurred.', { id: toastId });
    }
  };

  return (
    // ... JSX for the form remains the same as the previous example ...
    // The key is that the onClick handler now calls the imported server action.
    <Button
      onClick={handleGenerate}
      disabled={isGenerating || !topic.trim()}
      // ...
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Deep Content
        </>
      )}
    </Button>
  );
}