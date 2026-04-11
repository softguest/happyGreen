'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/config/db';
import { aiGeneratedContent, userProfiles } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { revalidatePath } from 'next/cache';

// Helper function (can be in a separate file)
function buildDeepContentPrompt(
  moduleData: any,
  topic: string,
  contentType: 'deep_dive' | 'explanation' | 'case_study' | 'exercise',
  userContext: { location?: string; interests?: string[] }
) {
  // Construct a prompt for the AI model using module and user context.
  // Replace or expand this template with your original prompt-building logic.
  const moduleTitle = (moduleData && (moduleData.title || (moduleData as any).name)) || 'the module';
  const location = userContext?.location || 'Cameroon';
  const interests = (userContext?.interests || []).join(', ') || 'general';

  return `Create a ${contentType} about "${topic}" for ${moduleTitle}. User location: ${location}. Interests: ${interests}. Provide a structured, learner-friendly response.`;
}
function parseGeneratedContent(
  generatedText: string,
  contentType: 'deep_dive' | 'explanation' | 'case_study' | 'exercise'
): string {
  // Basic parsing: trim whitespace and perform minimal normalization.
  // Expand this function to implement richer parsing/structuring as needed.
  try {
    const text = (generatedText ?? '').toString().trim();

    // Example simple normalization based on content type (customize if needed)
    if (contentType === 'exercise') {
      // Ensure exercises are returned as a plain string; could be JSON if desired.
      return text;
    } else if (contentType === 'case_study') {
      return text;
    } else if (contentType === 'explanation') {
      return text;
    } else {
      // deep_dive or fallback
      return text;
    }
  } catch (e) {
    return '';
  }
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateDeepContent(
  moduleId: string,
  topic: string,
  contentType: 'deep_dive' | 'explanation' | 'case_study' | 'exercise' = 'deep_dive'
) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    // 1. Get module and user context using Drizzle
    const moduleData = await db.query.learningModules.findFirst({
      where: (modules, { eq }) => eq(modules.id, moduleId),
    });

    if (!moduleData) {
      return { success: false, error: 'Module not found' };
    }
    
    // Fetch user profile from your DB to get context like location, interests
    const userProfile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.id, userId),
    });

    // 2. Build the prompt
    const userContext = {
      location: userProfile?.region || 'Cameroon',
      interests: userProfile?.interests || [],
    };
    const prompt = buildDeepContentPrompt(moduleData, topic, contentType, userContext);

    // 3. Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();
    const structuredContent = parseGeneratedContent(generatedText, contentType);

    // 4. Insert into Neon DB using Drizzle
    const [newContent] = await db
      .insert(aiGeneratedContent)
      .values({
        moduleId,
        userId,
        topic,
        promptUsed: prompt,
        generatedContent: structuredContent,
        contentType,
        userContext,
        tokensUsed: response.usageMetadata?.totalTokenCount || 0,
      })
      .returning({
        contentId: aiGeneratedContent.id,
      });

    // 5. Revalidate path to update the UI for the user
    revalidatePath(`/learning/modules/${moduleId}`);

    return {
      success: true,
      contentId: newContent.contentId,
      content: structuredContent,
    };
  } catch (error: any) {
    console.error('Content Generation Error:', error);
    return { success: false, error: 'Failed to generate content. Please try again.' };
  }
}