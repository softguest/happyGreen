export function buildModuleContentPrompt({
  skill,
  moduleTitle,
  difficulty,
  region,
}: {
  skill: string;
  moduleTitle: string;
  difficulty: string;
  region?: string;
}) {
  return `
You are an expert trainer in green skills and sustainable business in Africa, especially Cameroon.

Generate a detailed learning module.

Skill: ${skill}
Module Title: ${moduleTitle}
Difficulty: ${difficulty}
Region: ${region || "Cameroon"}

Make the content:
- Practical and beginner-friendly
- Focused on real-life application in Cameroon
- Business-oriented (how to make money)

Structure your response EXACTLY like this:

# ${moduleTitle}

## Overview
Explain clearly in simple terms.

## Why It Matters (Local Context)
Explain relevance in Cameroon/Africa.

## Tools & Materials Needed
List realistic, locally available tools.

## Step-by-Step Guide
Give actionable steps.

## Common Mistakes
List mistakes and how to avoid them.

## Pro Tips
Give expert insights.

## Income Opportunities
Explain how to make money from this skill.

## Practical Exercise
Give a real-world task.

## Quiz
Provide 3 multiple-choice questions in JSON format like:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "..."
  }
]
`;
}