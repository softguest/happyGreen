// src/app/dashboard/learn/page.tsx
import { getAllPathways } from "@/actions/learning";
import { PathwaysList } from "@/components/learning/PathwaysList";

export const metadata = {
  title: "Learning Paths | Greener Base",
};

export default async function LearnPage() {
  const { pathways, userProgress } = await getAllPathways();

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Learning Pathways
        </h1>
        <p className="text-muted-foreground mt-1">
          Practical, step-by-step learning modules to build real green skills
        </p>
      </div>

      <PathwaysList pathways={pathways} userProgress={userProgress} />
    </div>
  );
}