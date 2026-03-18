// src/components/learning/QuizSection.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Trophy,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Props {
  questions: QuizQuestion[];
  previousScore: number | null;
  onComplete: (score: number) => void;
}

export function QuizSection({ questions, previousScore, onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<
    Array<{ selected: number; correct: boolean }>
  >([]);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === question.correctIndex;
    if (isCorrect) setCorrectCount((prev) => prev + 1);

    setIsAnswered(true);
    setAnswers((prev) => [
      ...prev,
      { selected: selectedAnswer, correct: isCorrect },
    ]);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const finalCorrect = correctCount;
      const score = Math.round((finalCorrect / questions.length) * 100);
      setShowResults(true);
      onComplete(score);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setShowResults(false);
    setAnswers([]);
  };

  // Results screen
  if (showResults) {
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 60;

    return (
      <Card
        className={cn(
          "border-2",
          passed ? "border-green-300 bg-green-50" : "border-amber-300 bg-amber-50"
        )}
      >
        <CardContent className="p-6 md:p-8 text-center">
          {passed ? (
            <Trophy className="w-16 h-16 text-gold-500 mx-auto mb-4" />
          ) : (
            <RotateCcw className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          )}

          <h3 className="text-2xl font-heading font-bold text-gray-900">
            {passed ? "Great Job! 🎉" : "Keep Trying! 💪"}
          </h3>

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-700">{score}%</p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">
                {correctCount}/{questions.length}
              </p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4 max-w-md mx-auto">
            {passed
              ? "You've demonstrated a solid understanding of this module. Great work!"
              : "Review the lesson content and try the quiz again. You need 60% to pass."}
          </p>

          {/* Answer Summary */}
          <div className="mt-6 space-y-2 text-left max-w-md mx-auto">
            {questions.map((q, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-2 text-sm p-2 rounded-lg",
                  answers[i]?.correct ? "bg-green-100" : "bg-red-50"
                )}
              >
                {answers[i]?.correct ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-gray-800 text-xs">
                    {q.question}
                  </p>
                  {!answers[i]?.correct && (
                    <p className="text-xs text-gray-600 mt-0.5">
                      Correct: {q.options[q.correctIndex]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <Button
              onClick={handleRetry}
              variant="outline"
              className="border-gray-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Quiz question screen
  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 font-medium">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                i < currentQuestion
                  ? answers[i]?.correct
                    ? "bg-green-500"
                    : "bg-red-400"
                  : i === currentQuestion
                  ? "bg-green-700 ring-2 ring-green-200"
                  : "bg-gray-200"
              )}
            />
          ))}
        </div>
      </div>

      {/* Question Card */}
      <Card className="border border-gray-200">
        <CardContent className="p-5 md:p-6">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-green-700" />
            </div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-gray-900">
              {question.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctIndex;
              const showCorrect = isAnswered && isCorrect;
              const showWrong = isAnswered && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={isAnswered}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                    showCorrect
                      ? "border-green-500 bg-green-50"
                      : showWrong
                      ? "border-red-400 bg-red-50"
                      : isSelected
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                      showCorrect
                        ? "bg-green-500 text-white"
                        : showWrong
                        ? "bg-red-400 text-white"
                        : isSelected
                        ? "bg-green-700 text-white"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {showCorrect ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : showWrong ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      showCorrect
                        ? "text-green-800"
                        : showWrong
                        ? "text-red-700"
                        : isSelected
                        ? "text-green-800"
                        : "text-gray-700"
                    )}
                  >
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && question.explanation && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-800 font-medium mb-1">
                💡 Explanation
              </p>
              <p className="text-sm text-blue-700">{question.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end mt-6 gap-3">
            {!isAnswered ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="bg-green-800 hover:bg-green-700 text-white"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-green-800 hover:bg-green-700 text-white"
              >
                {isLastQuestion ? (
                  <>
                    See Results
                    <Trophy className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next Question
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Previous Score */}
      {previousScore !== null && (
        <p className="text-xs text-muted-foreground text-center">
          Your previous score: {previousScore}% — try to beat it!
        </p>
      )}
    </div>
  );
}