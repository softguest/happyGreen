// src/lib/ai/business-prompts.ts

export function buildPlannerSystemPrompt(userContext: {
  fullName: string;
  region: string | null;
  city: string | null;
  availableResources: string[];
}) {
  return `You are the Greener Base Business Planner AI — an expert in green micro-enterprise development for young Cameroonians.

## YOUR ROLE
You guide young people step-by-step through creating practical, low-cost green business plans. You understand the Cameroonian market, local supply chains, pricing in XAF, and the challenges young entrepreneurs face.

## USER CONTEXT
- **Name:** ${userContext.fullName}
- **Location:** ${userContext.city || userContext.region || "Cameroon"}
- **Available Resources:** ${userContext.availableResources?.join(", ") || "Not specified"}

## GUIDELINES
1. All monetary values in XAF (Central African CFA franc)
2. Focus on LOW-COST startup ideas (under 100,000 XAF when possible)
3. Be specific about local markets, suppliers, and customer segments
4. Include realistic revenue projections based on Cameroon market rates
5. Consider infrastructure limitations (power, internet, transport)
6. Recommend starting small and scaling gradually
7. Always mention environmental/climate benefits
8. Use simple, clear language — many users may be first-time entrepreneurs
9. Provide actionable, specific advice rather than generic business theory
10. Consider seasonal factors and local economic conditions`;
}

export function buildSectionPrompt(
  section: string,
  planContext: {
    title: string;
    skillName?: string;
    existingSections: Record<string, string>;
  }
) {
  const existingContext = Object.entries(planContext.existingSections)
    .filter(([_, v]) => v)
    .map(([k, v]) => `**${k}:** ${v}`)
    .join("\n\n");

  const prompts: Record<string, string> = {
    problemStatement: `Help the user write a clear PROBLEM STATEMENT for their green business idea: "${planContext.title}"${planContext.skillName ? ` (based on the skill: ${planContext.skillName})` : ""}.

${existingContext ? `Here's what they've written so far:\n${existingContext}\n\n` : ""}

Generate a compelling problem statement that:
1. Identifies a specific environmental or community problem in their area
2. Explains who is affected and how
3. Quantifies the problem if possible (e.g., "X tons of plastic waste generated daily in Douala")
4. Shows why this problem matters

Write 2-3 paragraphs. Be specific to their Cameroonian context. Return ONLY the problem statement text, no headers or labels.`,

    solution: `Help the user describe their SOLUTION for the business: "${planContext.title}"${planContext.skillName ? ` (skill: ${planContext.skillName})` : ""}.

${existingContext ? `Context from their plan:\n${existingContext}\n\n` : ""}

Generate a solution description that:
1. Clearly explains what product or service they will offer
2. How it directly addresses the problem
3. What makes it different or better than existing alternatives
4. The environmental benefit of this solution

Write 2-3 paragraphs. Be practical and specific. Return ONLY the solution text.`,

    targetCustomers: `Help the user define their TARGET CUSTOMERS for: "${planContext.title}".

${existingContext ? `Context:\n${existingContext}\n\n` : ""}

Identify 2-3 specific customer segments including:
1. Who they are (demographics, location)
2. Why they would buy this product/service
3. How many potential customers exist in their area
4. How to reach them

Be specific to the Cameroonian context. Return ONLY the target customers text.`,

    revenueModel: `Help the user define their REVENUE MODEL for: "${planContext.title}".

${existingContext ? `Context:\n${existingContext}\n\n` : ""}

Create a clear revenue model that explains:
1. What exactly they will sell (products, services, or both)
2. Pricing strategy with specific prices in XAF
3. How frequently customers will buy
4. Multiple revenue streams if applicable
5. A simple monthly revenue calculation

Include a pricing table or breakdown. Return ONLY the revenue model text.`,

    keyActivities: `List the KEY ACTIVITIES needed to run the business: "${planContext.title}".

${existingContext ? `Context:\n${existingContext}\n\n` : ""}

Provide 6-8 key activities organized as:
- Daily activities
- Weekly activities
- Monthly activities

Return as a JSON array of strings:
\`\`\`json
["Activity 1", "Activity 2", "Activity 3"]
\`\`\``,

    resourcesNeeded: `List the RESOURCES NEEDED for the business: "${planContext.title}".

${existingContext ? `Context:\n${existingContext}\n\n` : ""}

Categorize resources into:
- Equipment & Tools (with estimated costs in XAF)
- Materials & Supplies
- Human Resources
- Space/Location needs
- Digital/Tech needs

Return as a JSON array of strings:
\`\`\`json
["Resource 1 (cost)", "Resource 2 (cost)"]
\`\`\``,

    challenges: `Identify potential CHALLENGES AND RISKS for the business: "${planContext.title}".

${existingContext ? `Context:\n${existingContext}\n\n` : ""}

For each challenge, provide:
1. The challenge/risk
2. How likely it is
3. A mitigation strategy

Return as a JSON array of strings (each string = "Challenge: description | Mitigation: strategy"):
\`\`\`json
["Challenge description | Mitigation: strategy"]
\`\`\``,

    startupCost: `Calculate the STARTUP COSTS for the business: "${planContext.title}" in Cameroon.

${existingContext ? `Context:\n${existingContext}\n\n` : ""}

Provide a detailed cost breakdown in XAF with categories:
- Equipment & Tools
- Initial Materials/Inventory
- Licenses & Permits
- Marketing (initial)
- Working Capital (first month)
- Miscellaneous (10% buffer)

End with a TOTAL startup cost estimate. Also provide a "bare minimum" version for starting with the absolute least capital.

Return ONLY the cost breakdown text with the final total clearly stated. At the very end, on its own line, write: TOTAL: [number] (just the number, no XAF or formatting).`,

    monthlyRevenue: `Estimate the MONTHLY REVENUE potential for: "${planContext.title}" in Cameroon.

${existingContext ? `Context:\n${existingContext}\n\n` : ""}

Provide:
1. Revenue calculation per product/service
2. Realistic monthly sales volume for months 1-3, 4-6, 7-12
3. Monthly expenses breakdown
4. Net profit estimate per phase

End with the estimated monthly profit for months 4-6 (realistic established phase).

Return ONLY the revenue analysis text. At the very end, on its own line, write: MONTHLY: [number] (just the number).`,
  };

  return prompts[section] || `Help generate the ${section} section for the business plan "${planContext.title}".`;
}

export function buildFullPlanReviewPrompt(plan: {
  title: string;
  problemStatement: string | null;
  solution: string | null;
  targetCustomers: string | null;
  revenueModel: string | null;
  startupCostEstimate: number | null;
  monthlyRevenueEstimate: number | null;
  keyActivities: string[];
  resourcesNeeded: string[];
  challenges: string[];
}) {
  return `Review this green business plan and provide constructive feedback:

**Business:** ${plan.title}

**Problem:** ${plan.problemStatement || "Not yet defined"}

**Solution:** ${plan.solution || "Not yet defined"}

**Target Customers:** ${plan.targetCustomers || "Not yet defined"}

**Revenue Model:** ${plan.revenueModel || "Not yet defined"}

**Startup Cost:** ${plan.startupCostEstimate ? `${plan.startupCostEstimate.toLocaleString()} XAF` : "Not estimated"}

**Monthly Revenue:** ${plan.monthlyRevenueEstimate ? `${plan.monthlyRevenueEstimate.toLocaleString()} XAF` : "Not estimated"}

**Key Activities:** ${plan.keyActivities?.join(", ") || "Not defined"}

**Resources Needed:** ${plan.resourcesNeeded?.join(", ") || "Not defined"}

**Challenges:** ${plan.challenges?.join(", ") || "Not identified"}

Please provide:
1. **Strengths** (2-3 things done well)
2. **Areas for Improvement** (2-3 specific suggestions)
3. **Missing Elements** (anything critical that's missing)
4. **Overall Score** (out of 10)
5. **Next Steps** (3 specific actions to take this week)

Be encouraging but honest. Remember this is likely a young, first-time entrepreneur in Cameroon.`;
}