// This is a Server Component, so it can be async

import { auth } from '@clerk/nextjs/server';
import { db } from '@/config/db';
import { aiGeneratedContent } from '@/config/schema';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// ... (import UI components)

export default async function DeepContentPage({
  params,
}: {
  params: { moduleId: string; contentId: string };
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  // Fetch content from Neon DB using Drizzle, ensuring the user owns it
  const contentData = await db.query.aiGeneratedContent.findFirst({
    where: and(
      eq(aiGeneratedContent.id, params.contentId),
      eq(aiGeneratedContent.userId, userId)
    ),
    with: {
      module: {
        columns: {
          title: true,
        },
      },
    },
  });

  if (!contentData) {
    // Or show a "not found" page
    redirect(`/learning/modules/${params.moduleId}`);
  }

  const parsedContent = contentData.generatedContent as {
    sections: { title: string; content: string }[];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <Link
          href={`/learning/modules/${params.moduleId}`}
          className="text-sm text-emerald-600 hover:underline"
        >
          ← Back to {contentData.module.title}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">{contentData.topic}</h1>
        {/* ... other header details ... */}
      </div>

      {/* Content Sections */}
      <div className="space-y-4">
        {parsedContent.sections.map((section, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-xl text-emerald-700">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ReactMarkdown>{section.content}</ReactMarkdown>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Action Bar with Link to Chat */}
      <Card>
          {/* ... */}
          <Link href={`/learning/modules/${params.moduleId}/deep-content/${params.contentId}/chat`}>
              <Button>
                Start Chat
              </Button>
          </Link>
          {/* ... */}
      </Card>
    </div>
  );
}