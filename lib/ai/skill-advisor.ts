// // lib/ai/skill-advisor.ts
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// type Skill = {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
// };

// type AdvisorInput = {
//   region?: string | null;
//   interests: string[];
//   skills: Skill[];
// };

// export async function generateSkillRecommendations({
//   region,
//   interests,
//   skills,
// }: AdvisorInput) {
//   const prompt = `
// You are an AI advisor for a green skills platform for youths in Cameroon.

// Your task:
// - Recommend the TOP 3 most suitable green skills for a user.
// - You MUST ONLY choose from the provided skills.
// - Base recommendations on:
//   - User region: ${region ?? "Unknown"}
//   - User interests: ${interests.join(", ") || "None provided"}
// - Consider local feasibility, low startup cost, and climate relevance.

// Available skills:
// ${skills
//   .map(
//     (s) =>
//       `- (${s.id}) ${s.title}: ${s.description} [Category: ${s.category}]`
//   )
//   .join("\n")}

// Return JSON in this exact format:
// [
//   {
//     "skillId": "uuid",
//     "reason": "short, practical explanation"
//   }
// ]
// `;

//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.3,
//   });

//   const content = response.choices[0].message.content;

//   try {
//     return JSON.parse(content ?? "[]");
//   } catch {
//     return [];
//   }
// }

// export async function generateSkillAdvice({
//   skills,
//   region,
//   interests,
// }: AdvisorInput) {
//   return skills
//     .map((skill) => {
//       let score = 0;

//       if (interests.some(i =>
//         skill.category?.toLowerCase().includes(i.toLowerCase())
//       )) {
//         score += 40;
//       }

//       if (region.toLowerCase().includes("rural") &&
//           skill.title.toLowerCase().includes("agriculture")) {
//         score += 30;
//       }

//       // default baseline
//       score += 20;

//       return { ...skill, score };
//     })
//     .sort((a, b) => b.score - a.score);
// }


export type SkillInput = {
  id: string;
  name: string;
  category: string | null;
};

export type AdvisorInput = {
  skills: SkillInput[];
  region: string;
  interests: string[];
  goal: string;
  resources: string[];
};

export async function generateSkillAdvice({
  skills,
  region,
  interests,
}: AdvisorInput) {
  return skills
    .map((skill) => {
      let score = 0;

      if (interests.some(i =>
        skill.category?.toLowerCase().includes(i.toLowerCase())
      )) {
        score += 40;
      }

      if (region.toLowerCase().includes("rural") &&
          skill.name.toLowerCase().includes("agriculture")) {
        score += 30;
      }

      // default baseline
      score += 20;

      return { ...skill, score };
    })
    .sort((a, b) => b.score - a.score);
}
