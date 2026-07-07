import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';

type QuestionOption = {
  label: string;
  value: 'florence' | 'cretace' | 'paris';
};

type Question = {
  question: string;
  options: QuestionOption[];
};

const QUESTIONS: Question[] = [
  {
    question: 'Quel type d\u2019experience recherchez-vous ?',
    options: [
      { label: 'Culturelle et artistique', value: 'florence' },
      { label: 'Aventure et nature', value: 'cretace' },
      { label: 'Elegance et raffinement', value: 'paris' },
    ],
  },
  {
    question: 'Votre periode preferee ?',
    options: [
      { label: 'Histoire moderne (XIXe-XXe siecle)', value: 'paris' },
      { label: 'Temps anciens et origines', value: 'cretace' },
      { label: 'Renaissance et classicisme', value: 'florence' },
    ],
  },
  {
    question: 'Vous preferez :',
    options: [
      { label: "L'effervescence urbaine", value: 'paris' },
      { label: 'La nature sauvage', value: 'cretace' },
      { label: "L'art et l'architecture", value: 'florence' },
    ],
  },
  {
    question: 'Votre activite ideale :',
    options: [
      { label: 'Visiter des monuments', value: 'paris' },
      { label: 'Observer la faune', value: 'cretace' },
      { label: 'Explorer des musees', value: 'florence' },
    ],
  },
];

const RESULTS: Record<
  QuestionOption['value'],
  { id: number; title: string; explanation: string }
> = {
  paris: {
    id: 1,
    title: 'Paris 1889',
    explanation:
      "Votre gout pour l'elegance urbaine et l'histoire moderne fait de la Belle Epoque parisienne votre destination ideale. Entre l'inauguration de la Tour Eiffel et l'effervescence de l'Exposition Universelle, vous vivrez un raffinement inegale.",
  },
  cretace: {
    id: 2,
    title: 'Cretace -65M annees',
    explanation:
      "Votre soif d'aventure et votre amour de la nature sauvage vous destinent au Cretace. Face aux dinosaures dans une nature encore vierge, vous vivrez une experience brute et inoubliable.",
  },
  florence: {
    id: 3,
    title: 'Florence 1504',
    explanation:
      "Votre sensibilite artistique et culturelle trouve son epanouissement dans la Renaissance florentine. Entre les ateliers de Michel-Ange et l'effervescence intellectuelle de l'epoque, vous serez comble.",
  },
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DestinationQuiz({ isOpen, onClose }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionOption['value'][]>([]);
  const [result, setResult] = useState<QuestionOption['value'] | null>(null);

  const handleAnswer = (value: QuestionOption['value']) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const counts: Record<string, number> = {};
      newAnswers.forEach((v) => {
        counts[v] = (counts[v] || 0) + 1;
      });
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as QuestionOption['value'];
      setResult(winner);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleDiscover = () => {
    if (!result) return;
    const destinationId = RESULTS[result].id;
    handleClose();
    setTimeout(() => {
      document.getElementById(`destination-${destinationId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-obsidian-950 border border-gold-400/20 rounded-2xl shadow-2xl p-6 sm:p-8"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gold-400 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {!result ? (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/15 border border-gold-400/30 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span className="text-xs font-semibold text-gold-400 tracking-wide">
                    Question {currentStep + 1} / {QUESTIONS.length}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6">
                  {QUESTIONS[currentStep].question}
                </h3>

                <div className="space-y-3">
                  {QUESTIONS[currentStep].options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full text-left px-5 py-4 rounded-xl bg-obsidian-900 border border-gold-400/10 hover:border-gold-400/40 hover:bg-obsidian-800 transition-all duration-300 text-gray-200 hover:text-white"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/15 border border-gold-400/30 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span className="text-xs font-semibold text-gold-400 tracking-wide">
                    Votre destination ideale
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold mb-4">
                  {RESULTS[result].title}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-8">{RESULTS[result].explanation}</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={handleDiscover} className="btn-primary justify-center flex-1">
                    Decouvrir cette destination
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 rounded-full text-sm font-medium text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    Refaire le quiz
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
