// src/components/business/PlanPDFExport.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  plan: {
    id: string;
    title: string;
    problemStatement: string;
    solution: string;
    targetCustomers: string;
    revenueModel: string;
    startupCostEstimate: number;
    monthlyRevenueEstimate: number;
    keyActivities: string[];
    resourcesNeeded: string[];
    challenges: string[];
  };
  skillName?: string;
}

export function PlanPDFExport({ plan, skillName }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      // Dynamic import to avoid SSR issues
      const jsPDF = (await import("jspdf")).default;

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = 20;

      const addText = (
        text: string,
        fontSize: number,
        isBold: boolean = false,
        color: [number, number, number] = [33, 33, 33]
      ) => {
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        doc.setTextColor(...color);
      };

      const addWrappedText = (text: string, x: number, maxWidth: number) => {
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line: string) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, x, y);
          y += 6;
        });
      };

      const addSection = (title: string, content: string | string[]) => {
        if (y > 250) {
          doc.addPage();
          y = 20;
        }

        // Section title
        y += 4;
        doc.setFillColor(46, 125, 50);
        doc.rect(margin, y - 4, contentWidth, 8, "F");
        addText(title, 12, true, [255, 255, 255]);
        doc.text(title, margin + 4, y + 2);
        y += 14;

        // Section content
        addText("", 10, false, [55, 55, 55]);
        if (Array.isArray(content)) {
          content.forEach((item, i) => {
            if (y > 270) {
              doc.addPage();
              y = 20;
            }
            const bullet = `${i + 1}. ${item}`;
            addWrappedText(bullet, margin + 4, contentWidth - 8);
            y += 2;
          });
        } else if (content) {
          addWrappedText(content, margin + 4, contentWidth - 8);
        } else {
          addText("Not yet defined", 10, false, [150, 150, 150]);
          doc.text("Not yet defined", margin + 4, y);
          y += 8;
        }
        y += 6;
      };

      // ===== HEADER =====
      doc.setFillColor(46, 125, 50);
      doc.rect(0, 0, pageWidth, 40, "F");

      addText("Greener Base", 10, false, [200, 230, 200]);
      doc.text("Greener Base — Green Business Plan", margin, 14);

      addText(plan.title, 18, true, [255, 255, 255]);
      doc.text(plan.title, margin, 28);

      if (skillName) {
        addText(`Skill: ${skillName}`, 9, false, [200, 230, 200]);
        doc.text(`Skill: ${skillName}`, margin, 36);
      }

      y = 52;

      // Date
      addText(
        `Generated: ${new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`,
        8,
        false,
        [150, 150, 150]
      );
      doc.text(
        `Generated: ${new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`,
        margin,
        y
      );
      y += 12;

      // ===== SECTIONS =====
      addSection("Problem Statement", plan.problemStatement);
      addSection("Our Solution", plan.solution);
      addSection("Target Customers", plan.targetCustomers);
      addSection("Revenue Model", plan.revenueModel);

      // Financial Summary
      if (plan.startupCostEstimate || plan.monthlyRevenueEstimate) {
        if (y > 240) {
          doc.addPage();
          y = 20;
        }
        y += 4;
        doc.setFillColor(249, 168, 37);
        doc.rect(margin, y - 4, contentWidth, 8, "F");
        addText("Financial Summary", 12, true, [33, 33, 33]);
        doc.text("Financial Summary", margin + 4, y + 2);
        y += 14;

        if (plan.startupCostEstimate) {
          addText("Startup Cost:", 10, true, [55, 55, 55]);
          doc.text("Startup Cost:", margin + 4, y);
          addText(
            `${plan.startupCostEstimate.toLocaleString()} XAF`,
            10,
            false,
            [55, 55, 55]
          );
          doc.text(
            `${plan.startupCostEstimate.toLocaleString()} XAF`,
            margin + 50,
            y
          );
          y += 8;
        }

        if (plan.monthlyRevenueEstimate) {
          addText("Monthly Revenue:", 10, true, [55, 55, 55]);
          doc.text("Monthly Revenue:", margin + 4, y);
          addText(
            `${plan.monthlyRevenueEstimate.toLocaleString()} XAF`,
            10,
            false,
            [46, 125, 50]
          );
          doc.text(
            `${plan.monthlyRevenueEstimate.toLocaleString()} XAF`,
            margin + 50,
            y
          );
          y += 8;
        }

        if (plan.startupCostEstimate && plan.monthlyRevenueEstimate) {
          const payback = Math.ceil(
            plan.startupCostEstimate / plan.monthlyRevenueEstimate
          );
          addText("Payback Period:", 10, true, [55, 55, 55]);
          doc.text("Payback Period:", margin + 4, y);
          addText(`~${payback} months`, 10, false, [55, 55, 55]);
          doc.text(`~${payback} months`, margin + 50, y);
          y += 8;

          addText("Annual Revenue:", 10, true, [55, 55, 55]);
          doc.text("Annual Revenue:", margin + 4, y);
          addText(
            `${(plan.monthlyRevenueEstimate * 12).toLocaleString()} XAF`,
            10,
            false,
            [46, 125, 50]
          );
          doc.text(
            `${(plan.monthlyRevenueEstimate * 12).toLocaleString()} XAF`,
            margin + 50,
            y
          );
          y += 12;
        }
      }

      if (plan.keyActivities.length > 0) {
        addSection("Key Activities", plan.keyActivities);
      }
      if (plan.resourcesNeeded.length > 0) {
        addSection("Resources Needed", plan.resourcesNeeded);
      }
      if (plan.challenges.length > 0) {
        addSection("Challenges & Mitigation", plan.challenges);
      }

      // ===== FOOTER =====
      // const totalPages = doc.internal.getNumberOfPages();
      const totalPages = (doc as any).getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Greener Base — AI-Powered Green Business Plan | Page ${i} of ${totalPages}`,
          margin,
          doc.internal.pageSize.getHeight() - 10
        );
      }

      // Save
      const filename = `GreenSkill_BusinessPlan_${plan.title
        .replace(/[^a-zA-Z0-9]/g, "_")
        .substring(0, 30)}.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      variant="outline"
      size="sm"
      className="text-green-700 border-green-300 hover:bg-green-50"
    >
      {isGenerating ? (
        <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
      ) : (
        <Download className="w-4 h-4 mr-1.5" />
      )}
      {isGenerating ? "Generating..." : "PDF"}
    </Button>
  );
}