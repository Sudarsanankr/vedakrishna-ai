import React, { useState } from 'react';
import { VEDIC_QUIZ, QuizQuestion } from '../data/interactiveTeachings';
import { X, CheckCircle2, AlertCircle, RefreshCw, Award } from 'lucide-react';
import { vedicAudio } from '../utils/audioSynthesizer';

interface VedicQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VedicQuizModal: React.FC<VedicQuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQuestion = VEDIC_QUIZ[currentIdx];
  const totalQuestions = VEDIC_QUIZ.length;
  const isSelected = selectedAnswers[currentQuestion.id] !== undefined;
  const chosenIndex = selectedAnswers[currentQuestion.id];

  const handleSelectOption = (optIndex: number) => {
    if (isSelected) return;
    const isCorrect = optIndex === currentQuestion.correctIndex;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id]: optIndex }));
    vedicAudio.playTempleBell(isCorrect ? 660 : 330);
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setSubmitted(true);
      vedicAudio.playTempleBell(528);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = Object.entries(selectedAnswers).filter(([qId, ans]) => {
    const q = VEDIC_QUIZ.find(item => item.id === parseInt(qId, 10));
    return q && q.correctIndex === ans;
  }).length;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-700" />
            <h3 className="font-serif text-xl font-medium text-stone-900">
              Vedic & Gita Epistemology Quiz
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <div className="mt-6">
            {/* Progress counter */}
            <div className="flex items-center justify-between text-xs font-sans text-stone-500 mb-2">
              <span>Question {currentIdx + 1} of {totalQuestions}</span>
              <span>Score: {score}</span>
            </div>

            <div className="w-full bg-stone-100 h-1.5 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-amber-600 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question Title */}
            <h4 className="text-base sm:text-lg font-serif font-medium text-stone-900 leading-snug mb-4">
              {currentQuestion.question}
            </h4>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, oIdx) => {
                let btnStyle = 'bg-white border-stone-200 hover:border-amber-400/70 hover:bg-stone-50 text-stone-800';

                if (isSelected) {
                  if (oIdx === currentQuestion.correctIndex) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500 font-medium';
                  } else if (oIdx === chosenIndex) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400';
                  } else {
                    btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={isSelected}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-sans transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation card upon answering */}
            {isSelected && (
              <div className="mt-5 p-4 rounded-xl bg-[#FAF7F2] border border-amber-900/15 text-xs font-sans space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-amber-900">
                  {chosenIndex === currentQuestion.correctIndex ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                  )}
                  <span>{currentQuestion.gitaVerse}</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Next button */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={handleNext}
                disabled={!isSelected}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-200 text-amber-950 rounded-xl text-xs font-medium font-sans transition-all"
              >
                {currentIdx < totalQuestions - 1 ? 'Next Question' : 'Complete Quiz'}
              </button>
            </div>
          </div>
        ) : (
          /* Results Screen */
          <div className="mt-6 text-center py-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-serif font-medium text-stone-900">
              Quiz Completed!
            </h4>
            <p className="text-sm font-sans text-stone-600 mt-1">
              You scored <span className="font-semibold text-amber-900">{score}</span> out of {totalQuestions}
            </p>

            <p className="text-xs font-sans text-stone-700 max-w-md mx-auto mt-4 bg-stone-50 p-4 rounded-xl border border-stone-200 leading-relaxed">
              {score >= 4
                ? "Excellent discernment! Your grasp of Nishkama Karma, Sthitaprajna, and Svadharma reflects ripe spiritual intellect (Sattva-Buddhi)."
                : "A wonderful effort! The Bhagavad Gita invites continuous reflection. Deepen your inquiry into the 18 Chapters."}
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={resetQuiz}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg font-sans flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg font-sans"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
