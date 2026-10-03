import React, { useState, useEffect, useCallback } from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';
import { api } from '../api/client';

interface LoginProps {
  onSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState('');
  const [unlocking, setUnlocking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Authenticate stealthily against backend without exposing secret code on client
  const checkCodeWithBackend = useCallback(
    async (codeToTest: string) => {
      if (unlocking || isUnlocked) return;
      try {
        await api.calculatorLogin(codeToTest.trim());
        setUnlocking(true);
        setIsUnlocked(true);
        setTimeout(() => {
          onSuccess();
        }, 700);
      } catch {
        // Normal calculator behavior: silent ignore on invalid code
      }
    },
    [unlocking, isUnlocked, onSuccess]
  );

  const inputDigit = (digit: string) => {
    if (unlocking) return;
    let nextDisplay = digit;
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      nextDisplay = display === '0' ? digit : display + digit;
      setDisplay(nextDisplay);
    }

    // Stealth check when code length is reached
    if (nextDisplay.length >= 6) {
      checkCodeWithBackend(nextDisplay);
    }
  };

  const inputDot = () => {
    if (unlocking) return;
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    if (unlocking) return;
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setHistory('');
  };

  const toggleSign = () => {
    if (unlocking) return;
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const inputPercent = () => {
    if (unlocking) return;
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperation: string) => {
    if (unlocking) return;
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
      setHistory(`${inputValue} ${nextOperation}`);
    } else if (operation) {
      const currentValue = prevValue || 0;
      let newValue = currentValue;

      if (operation === '+') newValue = currentValue + inputValue;
      else if (operation === '-') newValue = currentValue - inputValue;
      else if (operation === '×' || operation === '*') newValue = currentValue * inputValue;
      else if (operation === '÷' || operation === '/') newValue = currentValue / inputValue;

      setPrevValue(newValue);
      const resStr = String(newValue);
      setDisplay(resStr);
      setHistory(`${newValue} ${nextOperation}`);
      checkCodeWithBackend(resStr);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = async () => {
    if (unlocking) return;

    let evaluatedResult = display;
    const inputValue = parseFloat(display);

    if (prevValue !== null && operation) {
      let newValue = prevValue;
      if (operation === '+') newValue = prevValue + inputValue;
      else if (operation === '-') newValue = prevValue - inputValue;
      else if (operation === '×' || operation === '*') newValue = prevValue * inputValue;
      else if (operation === '÷' || operation === '/') newValue = prevValue / inputValue;

      evaluatedResult = String(newValue);
      setDisplay(evaluatedResult);
      setHistory(`${prevValue} ${operation} ${inputValue} =`);
      setPrevValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }

    // Stealthily verify result with backend
    await checkCodeWithBackend(evaluatedResult);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        inputDigit(e.key);
      } else if (e.key === '.') {
        inputDot();
      } else if (e.key === '+' || e.key === '-') {
        performOperation(e.key);
      } else if (e.key === '*') {
        performOperation('×');
      } else if (e.key === '/') {
        e.preventDefault();
        performOperation('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        clearAll();
      } else if (e.key === 'Backspace') {
        if (!waitingForOperand && display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Calculator Housing */}
      <div className="w-full max-w-[340px] bg-slate-900/90 border border-slate-800/80 backdrop-blur-2xl rounded-3xl p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative z-10 transition-all duration-300">
        
        {/* Subtle Calculator Header */}
        <div className="flex items-center justify-between px-2 mb-3 text-slate-500 text-xs">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span>CALC.v2</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            {isUnlocked ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                UNLOCKED
              </span>
            ) : (
              <span className="text-slate-600 flex items-center gap-1 font-mono">
                <Lock className="w-3 h-3" />
                DEG
              </span>
            )}
          </div>
        </div>

        {/* Display Screen */}
        <div
          className={`rounded-2xl p-4 mb-5 text-right transition-all duration-300 border ${
            isUnlocked
              ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-950/90 border-slate-800/80 shadow-inner'
          }`}
        >
          {/* Calculation History */}
          <div className="h-5 text-xs font-mono text-slate-500 truncate mb-1">
            {isUnlocked ? 'VERIFYING MASTER KEY...' : history || '\u00A0'}
          </div>

          {/* Active Result / Digits */}
          <div
            className={`font-mono font-bold tracking-tight truncate transition-all duration-300 ${
              isUnlocked
                ? 'text-emerald-400 text-3xl animate-pulse'
                : display.length > 9
                ? 'text-2xl text-white'
                : display.length > 6
                ? 'text-3xl text-white'
                : 'text-4xl text-white'
            }`}
          >
            {isUnlocked ? 'ACCESS GRANTED' : display}
          </div>
        </div>

        {/* Calculator Keypad Grid */}
        <div className="grid grid-cols-4 gap-2.5">
          {/* Row 1 */}
          <button
            onClick={clearAll}
            className="h-14 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-amber-400 font-bold text-lg active:scale-95 transition-all cursor-pointer"
          >
            C
          </button>
          <button
            onClick={toggleSign}
            className="h-14 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-bold text-lg active:scale-95 transition-all cursor-pointer"
          >
            ±
          </button>
          <button
            onClick={inputPercent}
            className="h-14 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-bold text-lg active:scale-95 transition-all cursor-pointer"
          >
            %
          </button>
          <button
            onClick={() => performOperation('÷')}
            className={`h-14 rounded-2xl font-bold text-xl active:scale-95 transition-all cursor-pointer ${
              operation === '÷'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30'
            }`}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputDigit('7')}
            className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-white font-semibold text-xl active:scale-95 transition-all cursor-pointer border border-slate-800/60"
          >
            7
          </button>
          <button
            onClick={() => inputDigit('8')}
            className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-white font-semibold text-xl active:scale-95 transition-all cursor-pointer border border-slate-800/60"
          >
            8
          </button>
          <button
            onClick={() => inputDigit('9')}
            className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-white font-semibold text-xl active:scale-95 transition-all cursor-pointer border border-slate-800/60"
          >
            9
          </button>
          <button
            onClick={() => performOperation('×')}
            className={`h-14 rounded-2xl font-bold text-xl active:scale-95 transition-all cursor-pointer ${
              operation === '×'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30'
            }`}
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputDigit('4')}
            className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-white font-semibold text-xl active:scale-95 transition-all cursor-pointer border border-slate-800/60"
          >
            4
          </button>
          <button
            onClick={() => inputDigit('5')}
            className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-white font-semibold text-xl active:scale-95 transition-all cursor-pointer border border-slate-800/60"
          >
            5
          </button>
          <button
            onClick={() => inputDigit('6')}
            className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-white font-semibold text-xl active:scale-95 transition-all cursor-pointer border border-slate-800/60"
          >
            6
          </button>
          <button
            onClick={() => performOperation('-')}
            className={`h-14 rounded-2xl font-bold text-xl active:scale-95 transition-all cursor-pointer ${
              operation === '-'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30'
            }`}
          >
            -
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputDigit('1')}
            className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-white font-semibold text-xl active:scale-95 transition-all cursor-pointer border border-slate-800/60"
          >
            1
          </button>
          <button
            onClick={() => inputDigit('2')}
            className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-white font-semibold text-xl active:scale-95 transition-all cursor-pointer border border-slate-800/60"
          >
            2
          </button>
          <button
            onClick={() => inputDigit('3')}
            className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-white font-semibold text-xl active:scale-95 transition-all cursor-pointer border border-slate-800/60"
          >
            3
          </button>
          <button
            onClick={() => performOperation('+')}
            className={`h-14 rounded-2xl font-bold text-xl active:scale-95 transition-all cursor-pointer ${
              operation === '+'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30'
            }`}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputDigit('0')}
            className="col-span-2 h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-white font-semibold text-xl pl-6 text-left active:scale-95 transition-all cursor-pointer border border-slate-800/60"
          >
            0
          </button>
          <button
            onClick={inputDot}
            className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-white font-semibold text-xl active:scale-95 transition-all cursor-pointer border border-slate-800/60"
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className="h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-2xl active:scale-95 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            =
          </button>
        </div>

        {/* Footer Brand */}
        <div className="mt-5 text-center">
          <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">
            Standard Scientific Utility
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
